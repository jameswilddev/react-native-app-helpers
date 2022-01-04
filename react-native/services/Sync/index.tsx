import { EventEmitter } from "events";
import type { StateStoreInterface } from "../../types/StateStoreInterface";
import type { RequestInterface } from "../../types/RequestInterface";
import type { Json } from "../../types/Json";
import type { SyncableSchema } from "../../types/SyncableSchema";
import type { SyncableState } from "../../types/SyncableState";
import type { PreflightResponse } from "../../types/PreflightResponse";
import type { LoggerInterface } from "../../types/LoggerInterface";
import type { SyncableStateCollection } from "../../types/SyncableStateCollection";
import type { SyncableStateCollectionItem } from "../../types/SyncableStateCollectionItem";
import type { SyncPullResponse } from "../../types/SyncPullResponse";
import type { PreflightResponseCollection } from "../../types/PreflightResponseCollection";
import type { PreflightResponseCollectionItem } from "../../types/PreflightResponseCollectionItem";
import type { SyncConfiguration } from "../../types/SyncConfiguration";
import type { SyncConfigurationCollection } from "../../types/SyncConfigurationCollection";
import type { FileStoreInterface } from "../../types/FileStoreInterface";
import type { SyncState } from "../../types/SyncState";

const camelCaseToKebabCase = (camelCase: string): string =>
  camelCase.replace(/([A-Z])/g, `-$1`).toLowerCase();

/**
 * Synchronizes a local StateStore with a server.
 * @template TSchema                       The schema of the synced StateStore.
 * @template TAdditionalCollectionData     Any additional information which
 *                                         should be held against a collection,
 *                                         e.g. strings for progress bars.
 * @template TAdditionalCollectionItemData Any additional information which
 *                                         should be held against a collection
 *                                         item, e.g. strings for progress bars.
 */
export class Sync<
  TSchema extends SyncableSchema,
  TAdditionalCollectionData extends Record<string, unknown>,
  TAdditionalCollectionItemData extends Record<string, Json>
> {
  /**
   * @param stateStore        The StateStore to sync.
   * @param request           The Request with which to sync.
   * @param logger            The Logger to which to log.
   * @param syncConfiguration The configuration to follow when syncing.
   */
  constructor(
    private readonly stateStore: StateStoreInterface<SyncableState<TSchema>>,
    private readonly request: RequestInterface,
    private readonly logger: LoggerInterface,
    private readonly syncConfiguration: SyncConfiguration<
      TSchema,
      TAdditionalCollectionData
    >,
    private readonly fileStore: FileStoreInterface
  ) {}

  /**
   * When this value is greater than zero, file clean-up will not be performed.
   * This is intended to be used to prevent files which have been added to a
   * pending form being cleaned up; screens which may add or remove files in
   * React state before their references are committed to the state store MUST
   * increment this on mount and decrement it on unmount.
   */
  fileCleanUpBlockers = 0;

  private readonly eventEmitter = new EventEmitter();

  /**
   * Adds a listener for events to this sync process.
   * @param eventType The type of the event to listen for.
   * @param listener  The callback to execute when the event is emitted.
   */
  addListener(eventType: `stateChange`, listener: () => void): void {
    this.eventEmitter.addListener(eventType, listener);
  }

  /**
   * Removes a listener for events from this sync process.
   * @param eventType The type of the event to listen for.
   * @param listener  The callback to no longer execute when the event is
   *                  emitted.
   */
  removeListener(eventType: `stateChange`, listener: () => void): void {
    this.eventEmitter.removeListener(eventType, listener);
  }

  private currentState: SyncState<
    TSchema,
    TAdditionalCollectionData,
    TAdditionalCollectionItemData
  > = {
    type: `notRunning`,
  };

  /**
   * Retrieves the current status of this sync process.
   * @returns The current status of this sync process.
   */
  getState(): SyncState<
    TSchema,
    TAdditionalCollectionData,
    TAdditionalCollectionItemData
  > {
    return this.currentState;
  }

  private setState(
    to: SyncState<
      TSchema,
      TAdditionalCollectionData,
      TAdditionalCollectionItemData
    >
  ): void {
    this.currentState = to;

    this.eventEmitter.emit(`stateChange`);
  }

  /**
   * @param abortSignal An AbortSignal which can be used to cancel the sync.
   * @returns           A description of the outcome of the synchronization
   *                    process and any further action required by the caller.
   * @throws            When sync is already in progress.
   */
  async run(
    abortSignal: null | AbortSignal
  ): Promise<`noChangesMade` | `needsToRunAgain` | `atLeastOneChangeMade`> {
    if (this.currentState.type !== `notRunning`) {
      throw new Error(`Sync is already running.`);
    } else {
      try {
        this.logger.information(`Sync is starting...`);

        this.logger.debug(`Searching for changes to push...`);

        this.setState({ type: `checkingForChangesToPush` });

        const pushesAndDeletions: (
          | {
              type: `push`;
              readonly beforeLogMessage: string;
              readonly afterLogMessage: string;
              readonly syncConfigurationCollection: SyncConfigurationCollection<
                TSchema[`collections`][keyof TSchema[`collections`]],
                TAdditionalCollectionData
              >;
              readonly completedFiles: null | number;
              readonly totalFiles: number;
              execute(): Promise<boolean>;
            }
          | {
              type: `deletion`;
              readonly beforeLogMessage: string;
              readonly afterLogMessage: string;
              execute(): Promise<boolean>;
            }
        )[] = [];

        const initialState = this.stateStore.get();
        let state = initialState;

        for (const collectionKey of this.syncConfiguration.collectionOrder) {
          const syncConfigurationCollection = this.syncConfiguration
            .collections[collectionKey] as SyncConfigurationCollection<
            Json,
            TAdditionalCollectionData
          >;

          let collection = state.collections[
            collectionKey
          ] as SyncableStateCollection<Json>;

          const kebabCasedCollectionKey = camelCaseToKebabCase(collectionKey);

          this.logger.debug(
            `Searching for changes to push in collection "${collectionKey}"...`
          );

          const uuids = Object.keys(collection).sort();

          for (const uuid of uuids) {
            const item = collection[uuid] as SyncableStateCollectionItem<Json>;

            let pushItem: boolean;

            switch (item.status) {
              case `awaitingPull`:
                this.logger.warning(
                  `Evidence of previous interrupted sync of "${collectionKey}" "${uuid}" found; another pull attempt will be made following the push phase.`
                );

                pushItem = false;
                break;

              case `pushing`:
                this.logger.warning(
                  `Evidence of previous interrupted push of "${collectionKey}" "${uuid}" found; another attempt will be made.`
                );

                pushItem = true;
                break;

              case `awaitingPush`:
                this.logger.information(
                  `Change of "${collectionKey}" "${uuid}" will be pushed.`
                );

                pushItem = true;
                break;

              case `upToDate`:
                this.logger.debug(
                  `No changes to push for "${collectionKey}" "${uuid}".`
                );

                pushItem = false;
                continue;
            }

            const referencedFiles = syncConfigurationCollection.listFiles(
              item.data
            );

            const filesToPush = referencedFiles.filter((file) =>
              state.addedFileUuids.includes(file.uuid)
            );

            if (pushItem) {
              pushesAndDeletions.push({
                type: `push`,
                beforeLogMessage: `Pushing change of "${collectionKey}" "${uuid}"...`,
                afterLogMessage: `Successfully pushed change of "${collectionKey}" "${uuid}".`,
                syncConfigurationCollection,
                completedFiles: null,
                totalFiles: filesToPush.length,
                execute: async () => {
                  await this.request.withoutResponse(
                    `PUT`,
                    `sync/${kebabCasedCollectionKey}/${uuid}`,
                    { type: `json`, value: item.data },
                    {},
                    abortSignal,
                    [`200`]
                  );

                  if (this.stateStore.get() === state) {
                    collection = {
                      ...collection,
                      [uuid]: {
                        status: `awaitingPull`,
                        data: item.data,
                      },
                    };

                    state = {
                      ...state,
                      collections: {
                        ...state.collections,
                        [collectionKey]: collection,
                      },
                    };

                    this.stateStore.set(state);

                    return true;
                  } else {
                    this.logger.warning(
                      `The state store changed during push of "${collectionKey}" "${uuid}"; sync has been interrupted and will need to run again.`
                    );

                    return false;
                  }
                },
              });
            } else {
              if (filesToPush.length > 0) {
                this.logger.warning(
                  `File(s) for "${collectionKey}" "${uuid}" were not pushed during the previous interrupted sync.  They will be pushed as part of this sync.`
                );
              }
            }

            let completedFiles = 0;

            for (const file of filesToPush) {
              this.logger.debug(
                `File "${file.uuid}" of "${collectionKey}" "${uuid}" will be pushed.`
              );

              pushesAndDeletions.push({
                type: `push`,
                beforeLogMessage: `Pushing file "${file.uuid}" of "${collectionKey}" "${uuid}"...`,
                afterLogMessage: `Successfully pushed file "${file.uuid}" of "${collectionKey}" "${uuid}".`,
                syncConfigurationCollection,
                completedFiles,
                totalFiles: filesToPush.length,
                execute: async () => {
                  await this.request.withoutResponse(
                    `PUT`,
                    file.route,
                    {
                      type: `file`,
                      fileUri: this.fileStore.generatePath(file.uuid),
                    },
                    {},
                    abortSignal,
                    [`200`]
                  );

                  if (this.stateStore.get() === state) {
                    const addedFileUuids = [...state.addedFileUuids];
                    const index = state.addedFileUuids.indexOf(file.uuid);
                    addedFileUuids.splice(index, 1);

                    state = {
                      ...state,
                      addedFileUuids,
                    };

                    this.stateStore.set(state);

                    return true;
                  } else {
                    this.logger.warning(
                      `The state store changed during push of file "${file.uuid}" of "${collectionKey}" "${uuid}"; sync has been interrupted and will need to run again.`
                    );

                    return false;
                  }
                },
              });

              completedFiles++;
            }
          }
        }

        for (const route of state.deletedFileRoutes) {
          pushesAndDeletions.push({
            type: `deletion`,
            beforeLogMessage: `Deleting file "${route}"...`,
            afterLogMessage: `Successfully pushed deletion of file "${route}".`,
            execute: async () => {
              await this.request.withoutResponse(
                `DELETE`,
                route,
                { type: `empty` },
                {},
                abortSignal,
                [`200`]
              );

              if (this.stateStore.get() === state) {
                const deletedFileRoutes = [...state.deletedFileRoutes];
                const index = state.deletedFileRoutes.indexOf(route);
                deletedFileRoutes.splice(index, 1);

                state = {
                  ...state,
                  deletedFileRoutes,
                };

                this.stateStore.set(state);

                return true;
              } else {
                this.logger.warning(
                  `The state store changed during deletion of file "${route}"; sync has been interrupted and will need to run again.`
                );

                return false;
              }
            },
          });
        }

        let completedPushesAndDeletions = 0;

        for (const pushOrDeletion of pushesAndDeletions) {
          this.logger.information(pushOrDeletion.beforeLogMessage);

          if (pushOrDeletion.type === `push`) {
            this.setState({
              type: `pushing`,
              completedSteps: completedPushesAndDeletions,
              totalSteps: pushesAndDeletions.length,
              completedFiles: pushOrDeletion.completedFiles,
              totalFiles: pushOrDeletion.totalFiles,
              syncConfigurationCollection:
                pushOrDeletion.syncConfigurationCollection,
            });
          } else {
            this.setState({
              type: `deleting`,
              completedSteps: completedPushesAndDeletions,
              totalSteps: pushesAndDeletions.length,
            });
          }

          if (!(await pushOrDeletion.execute())) {
            return `needsToRunAgain`;
          } else {
            this.logger.information(pushOrDeletion.afterLogMessage);

            completedPushesAndDeletions++;
          }
        }

        this.logger.debug(`Fetching preflight...`);

        this.setState({ type: `checkingForChangesToPull` });

        const preflightResponse = await this.request.returningJson<{
          readonly "200": PreflightResponse<
            TSchema,
            TAdditionalCollectionItemData
          >;
        }>(`GET`, `sync/preflight`, { type: `empty` }, {}, abortSignal, [
          `200`,
        ]);

        if (this.stateStore.get() !== state) {
          this.logger.warning(
            `The state store changed while fetching preflight; sync has been interrupted and will need to run again.`
          );

          return `needsToRunAgain`;
        }

        const pulls: {
          readonly syncConfigurationCollection: SyncConfigurationCollection<
            TSchema[`collections`][keyof TSchema[`collections`]],
            TAdditionalCollectionData
          >;
          readonly preflightResponseCollectionItem: PreflightResponseCollectionItem<TAdditionalCollectionItemData>;
          readonly beforeLogMessage: string;
          readonly afterLogMessage: string;
          execute(): Promise<boolean>;
        }[] = [];

        let completedPulls = 0;

        this.logger.debug(`Listing existing files...`);

        const existingFileUuids = await this.fileStore.list();

        if (this.stateStore.get() !== state) {
          this.logger.warning(
            `The state store changed while listing existing files; sync has been interrupted and will need to run again.`
          );

          return `needsToRunAgain`;
        }

        this.logger.debug(`Searching for changes to pull...`);

        for (const collectionKey of this.syncConfiguration.collectionOrder) {
          const syncConfigurationCollection = this.syncConfiguration
            .collections[collectionKey] as SyncConfigurationCollection<
            Json,
            TAdditionalCollectionData
          >;

          let stateCollection = state.collections[
            collectionKey
          ] as SyncableStateCollection<Json>;

          const preflightCollection = preflightResponse.value.collections[
            collectionKey
          ] as PreflightResponseCollection<TAdditionalCollectionItemData>;

          const kebabCasedCollectionKey = camelCaseToKebabCase(collectionKey);

          this.logger.debug(
            `Searching for new items to pull in collection "${collectionKey}"...`
          );

          const pullFiles = async (
            uuid: string,
            preflightResponseCollectionItem: PreflightResponseCollectionItem<TAdditionalCollectionItemData>,
            data: Json
          ): Promise<void> => {
            const filesToPull = syncConfigurationCollection
              .listFiles(data)
              .filter((file) => !existingFileUuids.includes(file.uuid));

            let completedFiles = 0;

            for (const file of filesToPull) {
              this.logger.information(
                `Pulling file "${file.uuid}" of "${collectionKey}" "${uuid}"...`
              );

              this.setState({
                type: `pullingFile`,
                syncConfigurationCollection,
                completedSteps: completedPulls,
                totalSteps: pulls.length,
                completedFiles,
                totalFiles: filesToPull.length,
                preflightResponseCollectionItem,
              });

              await this.request.returningFile(
                `GET`,
                file.route,
                { type: `empty` },
                {},
                null,
                this.fileStore.generatePath(file.uuid),
                [`200`]
              );

              this.logger.information(
                `Successfully pulled file "${file.uuid}" of "${collectionKey}" "${uuid}".`
              );

              completedFiles++;
            }
          };

          for (const uuid of Object.keys(preflightCollection)
            .filter(
              (uuid) =>
                !Object.prototype.hasOwnProperty.call(stateCollection, uuid)
            )
            .sort()) {
            const preflightResponseCollectionItem = preflightCollection[
              uuid
            ] as PreflightResponseCollectionItem<TAdditionalCollectionItemData>;

            pulls.push({
              syncConfigurationCollection,
              preflightResponseCollectionItem,
              beforeLogMessage: `Pulling new "${collectionKey}" "${uuid}"...`,
              afterLogMessage: `Successfully pulled new "${collectionKey}" "${uuid}".`,
              execute: async () => {
                const response = await this.request.returningJson<{
                  "200": SyncPullResponse<Json>;
                }>(
                  `PUT`,
                  `sync/${kebabCasedCollectionKey}/${uuid}`,
                  { type: `empty` },
                  {},
                  abortSignal,
                  [`200`]
                );

                if (
                  response.value.version ===
                  preflightResponseCollectionItem.version
                ) {
                  await pullFiles(
                    uuid,
                    preflightResponseCollectionItem,
                    response.value.data
                  );

                  if (this.stateStore.get() === state) {
                    stateCollection = {
                      ...stateCollection,
                      [uuid]: {
                        status: `upToDate`,
                        version: response.value.version,
                        data: response.value.data,
                      },
                    };

                    state = {
                      ...state,
                      collections: {
                        ...state.collections,
                        [collectionKey]: stateCollection,
                      },
                    };

                    return true;
                  } else {
                    this.logger.warning(
                      `The state store changed during pull of "${collectionKey}" "${uuid}"; sync has been interrupted and will need to run again.`
                    );

                    return false;
                  }
                } else {
                  this.logger.warning(
                    `The version of "${collectionKey}" "${uuid}" changed from "${preflightResponseCollectionItem.version}" at the time of preflight to "${response.value.version}" at the time of pull; sync has been interrupted and will need to run again.`
                  );

                  return false;
                }
              },
            });
          }

          this.logger.debug(
            `Searching for updated items to pull in collection "${collectionKey}"...`
          );

          for (const uuid of Object.keys(stateCollection)
            .filter((uuid) =>
              Object.prototype.hasOwnProperty.call(preflightCollection, uuid)
            )
            .sort()) {
            const stateItem = stateCollection[
              uuid
            ] as SyncableStateCollectionItem<Json>;
            const preflightResponseCollectionItem = preflightCollection[
              uuid
            ] as PreflightResponseCollectionItem<TAdditionalCollectionItemData>;

            let beforeLogMessage: string;

            switch (stateItem.status) {
              case `upToDate`:
                if (
                  preflightResponseCollectionItem.version === stateItem.version
                ) {
                  this.logger.debug(
                    `No pull required of "${collectionKey}" "${uuid}" as preflight and state store versions match ("${preflightResponseCollectionItem.version}").`
                  );

                  continue;
                } else {
                  this.logger.information(
                    `Previously pulled "${collectionKey}" "${uuid}" will be pulled again as versions do not match between preflight ("${preflightResponseCollectionItem.version}") and state store ("${stateItem.version}").`
                  );

                  beforeLogMessage = `Pulling "${collectionKey}" "${uuid}" as versions do not match between preflight ("${preflightResponseCollectionItem.version}") and state store ("${stateItem.version}")...`;
                  break;
                }

              case `awaitingPull`:
                this.logger.information(
                  `Previously pushed "${collectionKey}" "${uuid}" will be pulled.`
                );

                beforeLogMessage = `Pulling previously pushed "${collectionKey}" "${uuid}"...`;
                break;
            }

            pulls.push({
              syncConfigurationCollection,
              preflightResponseCollectionItem,

              // This would only be undefined if the item's status were `pushing` or `awaitingPush`;
              // neither of which is possible as we've completed the push phase and verified that
              // the UI has not made any changes.
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              beforeLogMessage: beforeLogMessage!,
              afterLogMessage: `Successfully pulled update of "${collectionKey}" "${uuid}".`,
              execute: async () => {
                const response = await this.request.returningJson<{
                  "200": SyncPullResponse<Json>;
                }>(
                  `GET`,
                  `sync/${kebabCasedCollectionKey}/${uuid}`,
                  { type: `empty` },
                  {},
                  abortSignal,
                  [`200`]
                );

                if (
                  response.value.version ===
                  preflightResponseCollectionItem.version
                ) {
                  await pullFiles(
                    uuid,
                    preflightResponseCollectionItem,
                    response.value.data
                  );

                  if (this.stateStore.get() === state) {
                    stateCollection = {
                      ...stateCollection,
                      [uuid]: {
                        status: `upToDate`,
                        version: response.value.version,
                        data: response.value.data,
                      },
                    };

                    state = {
                      ...state,
                      collections: {
                        ...state.collections,
                        [collectionKey]: stateCollection,
                      },
                    };

                    return true;
                  } else {
                    this.logger.warning(
                      `The state store changed during pull of "${collectionKey}" "${uuid}"; sync has been interrupted and will need to run again.`
                    );

                    return false;
                  }
                } else {
                  this.logger.warning(
                    `The version of "${collectionKey}" "${uuid}" changed from "${preflightResponseCollectionItem.version}" at the time of preflight to "${response.value.version}" at the time of pull; sync has been interrupted and will need to run again.`
                  );

                  return false;
                }
              },
            });
          }
        }

        for (const pull of pulls) {
          this.logger.information(pull.beforeLogMessage);

          this.setState({
            type: `pulling`,
            completedSteps: completedPulls,
            totalSteps: pulls.length,
            syncConfigurationCollection: pull.syncConfigurationCollection,
            preflightResponseCollectionItem:
              pull.preflightResponseCollectionItem,
          });

          if (!(await pull.execute())) {
            return `needsToRunAgain`;
          } else {
            this.logger.information(pull.afterLogMessage);

            completedPulls++;
          }
        }

        this.logger.debug(`Searching for changes to delete...`);

        const preDeletionState = state;

        for (const collectionKey of [
          ...this.syncConfiguration.collectionOrder,
        ].reverse()) {
          const stateCollection = state.collections[
            collectionKey
          ] as SyncableStateCollection<Json>;

          const preflightCollection = preflightResponse.value.collections[
            collectionKey
          ] as PreflightResponseCollection<TAdditionalCollectionItemData>;

          this.logger.debug(
            `Searching for items to delete from collection "${collectionKey}"...`
          );

          const uuidsToDelete = Object.keys(stateCollection)
            .filter(
              (uuid) =>
                !Object.prototype.hasOwnProperty.call(preflightCollection, uuid)
            )
            .sort();

          if (uuidsToDelete.length > 0) {
            const stateCollectionCopy = { ...stateCollection };

            for (const uuid of uuidsToDelete) {
              this.logger.information(
                `Deleting "${collectionKey}" "${uuid}"...`
              );
              delete stateCollectionCopy[uuid];
            }

            state = {
              ...state,
              collections: {
                ...state.collections,
                [collectionKey]: stateCollectionCopy,
              },
            };
          }
        }

        if (state === preDeletionState) {
          this.logger.debug(`Nothing to delete.`);
        } else {
          this.stateStore.set(state);
          this.logger.information(`Deletions applied.`);
        }

        this.logger.debug(`Searching for files to clean up...`);

        const allReferencedFileUuids: string[] = [];

        for (const collectionKey of this.syncConfiguration.collectionOrder) {
          const syncConfigurationCollection =
            this.syncConfiguration.collections[collectionKey];

          for (const syncableStateCollectionItem of Object.values(
            state.collections[collectionKey] as SyncableStateCollection<
              TSchema[`collections`]
            >
          )) {
            for (const file of syncConfigurationCollection.listFiles(
              syncableStateCollectionItem.data
            )) {
              allReferencedFileUuids.push(file.uuid);
            }
          }
        }

        const unreferencedExistingFileUuids = existingFileUuids.filter(
          (existingFileUuid) =>
            !allReferencedFileUuids.includes(existingFileUuid)
        );

        let atLeastOneChangeMade = state !== initialState;

        if (unreferencedExistingFileUuids.length === 0) {
          this.logger.debug(`No files to clean up.`);
        } else {
          if (this.fileCleanUpBlockers === 0) {
            atLeastOneChangeMade = true;

            for (const unreferencedExistingFileUuid of unreferencedExistingFileUuids) {
              this.logger.information(
                `Deleting unreferenced existing file "${unreferencedExistingFileUuid}"...`
              );

              await this.fileStore.delete(unreferencedExistingFileUuid);
            }
          } else {
            this.logger.warning(
              `Files to clean up were found, but file clean-up has been temporarily blocked (it is likely that the user interface has added files to disk which are not yet referenced within the state store).`
            );
          }
        }

        if (atLeastOneChangeMade) {
          this.logger.information(
            `Sync completed successfully; at least one change was made.`
          );

          return `atLeastOneChangeMade`;
        } else {
          this.logger.information(
            `Sync completed successfully; no changes were made.`
          );

          return `noChangesMade`;
        }
      } finally {
        this.setState({ type: `notRunning` });
      }
    }
  }
}
