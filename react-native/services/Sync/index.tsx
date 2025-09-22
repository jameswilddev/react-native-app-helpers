import { EventEmitter } from 'events'
import type { StateStoreInterface } from '../../types/StateStoreInterface'
import type { RequestInterface } from '../../types/RequestInterface'
import type { Json } from '../../types/Json'
import type { SyncableSchema } from '../../types/SyncableSchema'
import type { SyncableState } from '../../types/SyncableState'
import type { PreflightResponse } from '../../types/PreflightResponse'
import type { LoggerInterface } from '../../types/LoggerInterface'
import type { SyncableStateCollection } from '../../types/SyncableStateCollection'
import type { SyncableStateCollectionItem } from '../../types/SyncableStateCollectionItem'
import type { SyncPullResponse } from '../../types/SyncPullResponse'
import type { PreflightResponseCollection } from '../../types/PreflightResponseCollection'
import type { PreflightResponseCollectionItem } from '../../types/PreflightResponseCollectionItem'
import type { SyncConfiguration } from '../../types/SyncConfiguration'
import type { SyncConfigurationCollection } from '../../types/SyncConfigurationCollection'
import type { FileStoreInterface } from '../../types/FileStoreInterface'
import type { SyncState } from '../../types/SyncState'
import type { SyncInterface } from '../../types/SyncInterface'
import type { SyncableStateSingleton } from '../../types/SyncableStateSingleton'
import type { PreflightResponseSingleton } from '../../types/PreflightResponseSingleton'

const camelCaseToKebabCase = (camelCase: string): string =>
  camelCase.replace(/([A-Z])/g, '-$1').toLowerCase()

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
> implements
    SyncInterface<
    TSchema,
    TAdditionalCollectionData,
    TAdditionalCollectionItemData
    > {
  /**
   * @param stateStore        The StateStore to sync.
   * @param request           The Request with which to sync.
   * @param logger            The Logger to which to log.
   * @param syncConfiguration The configuration to follow when syncing.
   */
  constructor (
    private readonly stateStore: StateStoreInterface<SyncableState<TSchema>>,
    private readonly request: RequestInterface,
    private readonly logger: LoggerInterface,
    private readonly syncConfiguration: SyncConfiguration<
    TSchema,
    TAdditionalCollectionData
    >,
    private readonly fileStore: FileStoreInterface
  ) {}

  fileCleanUpBlockers = 0

  private readonly eventEmitter = new EventEmitter()

  addListener (eventType: 'stateChange', listener: () => void): void {
    this.eventEmitter.addListener(eventType, listener)
  }

  removeListener (eventType: 'stateChange', listener: () => void): void {
    this.eventEmitter.removeListener(eventType, listener)
  }

  private currentState: SyncState<
  TSchema,
  TAdditionalCollectionData,
  TAdditionalCollectionItemData
  > = {
      type: 'notStarted',
      running: false
    }

  getState (): SyncState<
  TSchema,
  TAdditionalCollectionData,
  TAdditionalCollectionItemData
  > {
    return this.currentState
  }

  private setState (
    to: SyncState<
    TSchema,
    TAdditionalCollectionData,
    TAdditionalCollectionItemData
    >
  ): void {
    this.currentState = to

    this.eventEmitter.emit('stateChange')
  }

  async run (
    abortSignal: null | AbortSignal
  ): Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'> {
    if (this.currentState.running) {
      throw new Error('Sync is already running.')
    } else {
      try {
        this.logger.information('Sync is starting...')

        this.logger.debug('Listing existing files...')

        const existingFileUuids = await this.fileStore.list()

        const initialState = this.stateStore.get()
        let state = initialState

        const nonexistentAddedFileUuids = state.addedFileUuids.filter(
          (uuid) => !existingFileUuids.includes(uuid)
        )

        for (const nonexistentAddedFileUuid of nonexistentAddedFileUuids) {
          this.logger.warning(
            `The state store lists file UUID "${nonexistentAddedFileUuid}" as requiring push, but no such file exists on disk.  It is most likely that the application closed before state could be written back to disk after successfully pushing a deleted record, but this may indicate the presence of a bug.`
          )
        }

        if (nonexistentAddedFileUuids.length > 0) {
          state = {
            ...state,
            addedFileUuids: state.addedFileUuids.filter((addedFileUuid) =>
              existingFileUuids.includes(addedFileUuid)
            )
          }

          this.stateStore.set(state)
        }

        this.logger.debug('Searching for changes to push...')

        this.setState({ type: 'checkingForChangesToPush', running: true })

        const pushesAndDeletions: Array< | {
          type: 'push'
          readonly beforeLogMessage: string
          readonly syncConfigurationCollection: SyncConfigurationCollection<
          TSchema['collections'][keyof TSchema['collections']],
          TAdditionalCollectionData
          >
          readonly completedFiles: null | number
          readonly totalFiles: number
          execute: () => Promise<boolean>
          skip: () => boolean
        }
        | {
          type: 'deletion'
          readonly beforeLogMessage: string
          execute: () => Promise<boolean>
          skip: () => boolean
        }> = []

        for (const step of this.syncConfiguration.order) {
          const stepKey = step.key as string

          switch (step.type) {
            case 'collection': {
              const syncConfigurationCollection = this.syncConfiguration
                .collections[step.key] as SyncConfigurationCollection<
              Json,
              TAdditionalCollectionData
              >

              let collection = state.collections[
                step.key
              ] as SyncableStateCollection<Json>

              const kebabCasedCollectionKey = camelCaseToKebabCase(stepKey)

              this.logger.debug(
                `Searching for changes to push in collection "${stepKey}"...`
              )

              const uuids = Object.keys(collection).sort()

              for (const uuid of uuids) {
                const uuidString = uuid

                const item = collection[
                  uuidString
                ] as SyncableStateCollectionItem<Json>

                let pushItem: boolean

                switch (item.status) {
                  case 'awaitingPull':
                    this.logger.warning(
                      `Evidence of previously interrupted sync of "${stepKey}" "${uuidString}" found; another pull attempt will be made following the push phase.`
                    )

                    pushItem = false
                    break

                  case 'pushing':
                    this.logger.warning(
                      `Evidence of previously interrupted push of "${stepKey}" "${uuidString}" found; another attempt will be made.`
                    )

                    pushItem = true
                    break

                  case 'awaitingPush':
                    this.logger.information(
                      `Change of "${stepKey}" "${uuidString}" will be pushed.`
                    )

                    pushItem = true
                    break

                  case 'upToDate':
                    this.logger.debug(
                      `No changes to push for "${stepKey}" "${uuidString}".`
                    )

                    pushItem = false
                    continue
                }

                const referencedFiles = syncConfigurationCollection.listFiles(
                  uuidString,
                  item.data
                )

                const filesToPush = referencedFiles.filter((file) =>
                  state.addedFileUuids.includes(file.uuid)
                )

                if (pushItem) {
                  pushesAndDeletions.push({
                    type: 'push',
                    beforeLogMessage: `Pushing change of "${stepKey}" "${uuidString}"...`,
                    syncConfigurationCollection,
                    completedFiles: null,
                    totalFiles: filesToPush.length,
                    execute: async () => {
                      const statusCode = await this.request.withoutResponse(
                        'PUT',
                        `sync/${kebabCasedCollectionKey}/${uuidString}`,
                        { type: 'json', value: item.data },
                        {},
                        abortSignal,
                        ['200', '404', '403']
                      )

                      if (this.stateStore.get() === state) {
                        if (statusCode === '200') {
                          collection = {
                            ...collection,
                            [uuidString]: {
                              status: 'awaitingPull',
                              data: item.data
                            }
                          }

                          state = {
                            ...state,
                            collections: {
                              ...state.collections,
                              [stepKey]: collection
                            }
                          }

                          this.stateStore.set(state)

                          this.logger.information(
                            `Successfully pushed change of "${stepKey}" "${uuidString}".`
                          )

                          return true
                        } else {
                          const collectionCopy = {
                            ...collection
                          }

                          // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                          delete collectionCopy[uuidString]

                          collection = collectionCopy

                          const affectedFileUuids = syncConfigurationCollection
                            .listFiles(uuidString, item.data)
                            .map((file) => file.uuid)

                          state = {
                            ...state,
                            collections: {
                              ...state.collections,
                              [stepKey]: collection
                            },
                            addedFileUuids: state.addedFileUuids.filter(
                              (fileUuid) =>
                                !affectedFileUuids.includes(fileUuid)
                            )
                          }

                          this.stateStore.set(state)

                          this.logger.warning(
                            `The API returned status code "${statusCode}" during push of "${stepKey}" "${uuidString}", indicating that the user has lost access.  The local changes have been lost.`
                          )

                          return true
                        }
                      } else {
                        this.logger.warning(
                          `The state store changed during push of "${stepKey}" "${uuidString}"; sync has been interrupted and will need to run again.`
                        )

                        return false
                      }
                    },
                    skip: () => false
                  })
                } else {
                  if (filesToPush.length > 0) {
                    this.logger.warning(
                      `File(s) for "${stepKey}" "${uuidString}" were not pushed during the previous interrupted sync.  They will be pushed as part of this sync.`
                    )
                  }
                }

                let completedFiles = 0

                for (const file of filesToPush) {
                  this.logger.information(
                    `File "${file.uuid}" of "${stepKey}" "${uuidString}" will be pushed.`
                  )

                  pushesAndDeletions.push({
                    type: 'push',
                    beforeLogMessage: `Pushing file "${file.uuid}" of "${stepKey}" "${uuidString}"...`,
                    syncConfigurationCollection,
                    completedFiles,
                    totalFiles: filesToPush.length,
                    execute: async () => {
                      const statusCode = await this.request.withoutResponse(
                        'PUT',
                        file.route,
                        {
                          type: 'file',
                          fileUri: this.fileStore.generatePath(file.uuid)
                        },
                        {},
                        abortSignal,
                        ['200', '404', '403']
                      )

                      if (this.stateStore.get() === state) {
                        const addedFileUuids = [...state.addedFileUuids]
                        const index = state.addedFileUuids.indexOf(file.uuid)
                        addedFileUuids.splice(index, 1)

                        state = {
                          ...state,
                          addedFileUuids
                        }

                        this.stateStore.set(state)

                        if (statusCode === '200') {
                          this.logger.information(
                            `Successfully pushed file "${file.uuid}" of "${stepKey}" "${uuidString}".`
                          )

                          return true
                        } else {
                          this.logger.warning(
                            `The API returned status code "${statusCode}" during push of file "${file.uuid}" of "${stepKey}" "${uuidString}", indicating that the user has lost access.  The local changes will temporarily remain locally, but will most likely be lost during the pull phase.`
                          )

                          return true
                        }
                      } else {
                        this.logger.warning(
                          `The state store changed during push of file "${file.uuid}" of "${stepKey}" "${uuidString}"; sync has been interrupted and will need to run again.`
                        )

                        return false
                      }
                    },
                    skip: () =>
                      !Object.prototype.hasOwnProperty.call(
                        state.collections[stepKey],
                        uuidString
                      )
                  })

                  completedFiles++
                }
              }

              break
            }
          }
        }

        for (const route of state.deletedFileRoutes) {
          pushesAndDeletions.push({
            type: 'deletion',
            beforeLogMessage: `Deleting file "${route}"...`,
            execute: async () => {
              const statusCode = await this.request.withoutResponse(
                'DELETE',
                route,
                { type: 'empty' },
                {},
                abortSignal,
                ['200', '404', '403']
              )

              if (this.stateStore.get() === state) {
                const deletedFileRoutes = [...state.deletedFileRoutes]
                const index = state.deletedFileRoutes.indexOf(route)
                deletedFileRoutes.splice(index, 1)

                state = {
                  ...state,
                  deletedFileRoutes
                }

                this.stateStore.set(state)

                if (statusCode === '200') {
                  this.logger.information(
                    `Successfully deleted file "${route}".`
                  )

                  return true
                } else {
                  this.logger.warning(
                    `The API returned status code "${statusCode}" during deletion of file "${route}", indicating that the user has lost access.  Another attempt will not be made.`
                  )

                  return true
                }
              } else {
                this.logger.warning(
                  `The state store changed during deletion of file "${route}"; sync has been interrupted and will need to run again.`
                )

                return false
              }
            },
            skip: () => false
          })
        }

        let completedPushesAndDeletions = 0

        for (const pushOrDeletion of pushesAndDeletions) {
          if (pushOrDeletion.skip()) {
            completedPushesAndDeletions++
          } else {
            this.logger.information(pushOrDeletion.beforeLogMessage)

            if (pushOrDeletion.type === 'push') {
              this.setState({
                type: 'pushing',
                running: true,
                completedSteps: completedPushesAndDeletions,
                totalSteps: pushesAndDeletions.length,
                completedFiles: pushOrDeletion.completedFiles,
                totalFiles: pushOrDeletion.totalFiles,
                syncConfigurationCollection:
                  pushOrDeletion.syncConfigurationCollection
              })
            } else {
              this.setState({
                type: 'deleting',
                running: true,
                completedSteps: completedPushesAndDeletions,
                totalSteps: pushesAndDeletions.length
              })
            }

            if (!(await pushOrDeletion.execute())) {
              this.setState({ type: 'failed', running: false })
              return 'needsToRunAgain'
            } else {
              completedPushesAndDeletions++
            }
          }
        }

        this.logger.debug('Fetching preflight...')

        this.setState({ type: 'checkingForChangesToPull', running: true })

        const preflightResponse = await this.request.returningJson<{
          readonly '200': PreflightResponse<
          TSchema,
          TAdditionalCollectionItemData
          >
        }>('GET', 'sync/preflight', { type: 'empty' }, {}, abortSignal, [
          '200'
        ])

        const pulls: Array< | {
          readonly type: 'collectionItem'
          readonly syncConfigurationCollection: SyncConfigurationCollection<
          TSchema['collections'][keyof TSchema['collections']],
          TAdditionalCollectionData
          >
          readonly preflightResponseCollectionItem: PreflightResponseCollectionItem<TAdditionalCollectionItemData>
          readonly beforeLogMessage: string
          execute: () => Promise<boolean>
        }
        | {
          readonly type: 'singleton'
          readonly beforeLogMessage: string
          execute: () => Promise<boolean>
        }> = []

        let completedPulls = 0

        this.logger.debug('Searching for changes to pull...')

        for (const step of this.syncConfiguration.order) {
          const stepKey = step.key as string

          switch (step.type) {
            case 'singleton': {
              const stateSingleton = state.singletons[
                step.key
              ] as SyncableStateSingleton<Json>

              const preflightSingleton = preflightResponse.value.singletons[
                step.key
              ] as PreflightResponseSingleton

              const kebabCasedSingletonKey = camelCaseToKebabCase(stepKey)

              switch (stateSingleton.type) {
                case 'absent':
                  this.logger.information(
                    `New singleton "${stepKey}" will be pulled.`
                  )

                  pulls.push({
                    type: 'singleton',
                    beforeLogMessage: `Pulling singleton "${stepKey}"...`,
                    execute: async () => {
                      const response = await this.request.returningJson<{
                        '200': SyncPullResponse<Json>
                      }>(
                        'GET',
                        `sync/${kebabCasedSingletonKey}`,
                        { type: 'empty' },
                        {},
                        abortSignal,
                        ['200']
                      )
                      if (
                        response.value.version === preflightSingleton.version
                      ) {
                        if (this.stateStore.get() === state) {
                          state = {
                            ...state,
                            singletons: {
                              ...state.singletons,
                              [step.key]: {
                                type: 'upToDate',
                                version: preflightSingleton.version,
                                value: response.value.data
                              }
                            }
                          }

                          this.stateStore.set(state)

                          this.logger.information(
                            `Successfully pulled new singleton "${stepKey}".`
                          )

                          return true
                        } else {
                          this.logger.warning(
                            `The state store changed during pull of singleton "${stepKey}"; sync has been interrupted and will need to run again.`
                          )

                          return false
                        }
                      } else {
                        this.logger.warning(
                          `The version of singleton "${stepKey}" changed from "${preflightSingleton.version}" at the time of preflight to "${response.value.version}" at the time of pull; sync has been interrupted and will need to run again.`
                        )

                        return false
                      }
                    }
                  })
                  break

                case 'upToDate':
                  if (preflightSingleton.version === stateSingleton.version) {
                    this.logger.debug(
                      `No pull required of singleton "${stepKey}" as preflight and state store versions match ("${preflightSingleton.version}").`
                    )
                  } else {
                    this.logger.information(
                      `Previously pulled singleton "${stepKey}" will be pulled again as versions do not match between preflight ("${preflightSingleton.version}") and state store ("${stateSingleton.version}").`
                    )

                    pulls.push({
                      type: 'singleton',
                      beforeLogMessage: `Pulling singleton "${stepKey}"...`,
                      execute: async () => {
                        const response = await this.request.returningJson<{
                          '200': SyncPullResponse<Json>
                        }>(
                          'GET',
                          `sync/${kebabCasedSingletonKey}`,
                          { type: 'empty' },
                          {},
                          abortSignal,
                          ['200']
                        )
                        if (
                          response.value.version === preflightSingleton.version
                        ) {
                          if (this.stateStore.get() === state) {
                            state = {
                              ...state,
                              singletons: {
                                ...state.singletons,
                                [step.key]: {
                                  type: 'upToDate',
                                  version: preflightSingleton.version,
                                  value: response.value.data
                                }
                              }
                            }

                            this.stateStore.set(state)

                            this.logger.information(
                              `Successfully pulled update of singleton "${stepKey}".`
                            )

                            return true
                          } else {
                            this.logger.warning(
                              `The state store changed during pull of singleton "${stepKey}"; sync has been interrupted and will need to run again.`
                            )

                            return false
                          }
                        } else {
                          this.logger.warning(
                            `The version of singleton "${stepKey}" changed from "${preflightSingleton.version}" at the time of preflight to "${response.value.version}" at the time of pull; sync has been interrupted and will need to run again.`
                          )

                          return false
                        }
                      }
                    })
                  }
                  break
              }

              break
            }

            case 'collection': {
              const syncConfigurationCollection = this.syncConfiguration
                .collections[step.key] as SyncConfigurationCollection<
              Json,
              TAdditionalCollectionData
              >

              let stateCollection = state.collections[
                step.key
              ] as SyncableStateCollection<Json>

              const preflightCollection = preflightResponse.value.collections[
                step.key
              ] as PreflightResponseCollection<TAdditionalCollectionItemData>

              const kebabCasedCollectionKey = camelCaseToKebabCase(stepKey)

              this.logger.debug(
                `Searching for new items to pull in collection "${stepKey}"...`
              )

              const pullFiles = async (
                uuid: string,
                preflightResponseCollectionItem: PreflightResponseCollectionItem<TAdditionalCollectionItemData>,
                data: Json
              ): Promise<boolean> => {
                const filesToPull = syncConfigurationCollection
                  .listFiles(uuid, data)
                  .filter((file) => !existingFileUuids.includes(file.uuid))

                let completedFiles = 0

                for (const file of filesToPull) {
                  this.logger.information(
                    `Pulling file "${file.uuid}" of "${stepKey}" "${uuid}"...`
                  )

                  this.setState({
                    type: 'pullingFile',
                    running: true,
                    syncConfigurationCollection,
                    completedSteps: completedPulls,
                    totalSteps: pulls.length,
                    completedFiles,
                    totalFiles: filesToPull.length,
                    preflightResponseCollectionItem
                  })

                  await this.request.returningFile(
                    'GET',
                    file.route,
                    { type: 'empty' },
                    {},
                    null,
                    this.fileStore.generatePath(file.uuid)
                  )

                  this.logger.information(
                    `Successfully pulled file "${file.uuid}" of "${stepKey}" "${uuid}".`
                  )

                  completedFiles++
                }

                return true
              }

              for (const uuid of Object.keys(preflightCollection)
                .filter(
                  (uuid) =>
                    !Object.prototype.hasOwnProperty.call(stateCollection, uuid)
                )
                .sort()) {
                const preflightResponseCollectionItem = preflightCollection[
                  uuid
                ] as PreflightResponseCollectionItem<TAdditionalCollectionItemData>

                this.logger.information(
                  `New "${stepKey}" "${uuid}" will be pulled.`
                )

                pulls.push({
                  type: 'collectionItem',
                  syncConfigurationCollection,
                  preflightResponseCollectionItem,
                  beforeLogMessage: `Pulling new "${stepKey}" "${uuid}"...`,
                  execute: async () => {
                    const response = await this.request.returningJson<{
                      '200': SyncPullResponse<Json>
                      '404': Json
                      '403': Json
                    }>(
                      'GET',
                      `sync/${kebabCasedCollectionKey}/${uuid}`,
                      { type: 'empty' },
                      {},
                      abortSignal,
                      ['200', '404', '403']
                    )

                    if (response.statusCode === '200') {
                      if (
                        response.value.version ===
                        preflightResponseCollectionItem.version
                      ) {
                        if (
                          !(await pullFiles(
                            uuid,
                            preflightResponseCollectionItem,
                            response.value.data
                          ))
                        ) {
                          return false
                        }

                        if (this.stateStore.get() === state) {
                          stateCollection = {
                            ...stateCollection,
                            [uuid]: {
                              status: 'upToDate',
                              version: response.value.version,
                              data: response.value.data
                            }
                          }

                          state = {
                            ...state,
                            collections: {
                              ...state.collections,
                              [step.key]: stateCollection
                            }
                          }

                          this.stateStore.set(state)

                          this.logger.information(
                            `Successfully pulled new "${stepKey}" "${uuid}".`
                          )

                          return true
                        } else {
                          this.logger.warning(
                            `The state store changed during pull of "${stepKey}" "${uuid}"; sync has been interrupted and will need to run again.`
                          )

                          return false
                        }
                      } else {
                        this.logger.warning(
                          `The version of "${stepKey}" "${uuid}" changed from "${preflightResponseCollectionItem.version}" at the time of preflight to "${response.value.version}" at the time of pull; sync has been interrupted and will need to run again.`
                        )

                        return false
                      }
                    } else {
                      this.logger.warning(
                        `The API returned status code "${response.statusCode}" during the pull of "${stepKey}" "${uuid}", indicating that the user has lost access since the time of preflight; sync has been interrupted and will need to run again.`
                      )

                      return false
                    }
                  }
                })
              }

              this.logger.debug(
                `Searching for updated items to pull in collection "${stepKey}"...`
              )

              for (const uuid of Object.keys(stateCollection)
                .filter((uuid) =>
                  Object.prototype.hasOwnProperty.call(
                    preflightCollection,
                    uuid
                  )
                )
                .sort()) {
                const stateItem = stateCollection[
                  uuid
                ] as SyncableStateCollectionItem<Json>
                const preflightResponseCollectionItem = preflightCollection[
                  uuid
                ] as PreflightResponseCollectionItem<TAdditionalCollectionItemData>

                let beforeLogMessage: string

                switch (stateItem.status) {
                  case 'upToDate':
                    if (
                      preflightResponseCollectionItem.version ===
                      stateItem.version
                    ) {
                      this.logger.debug(
                        `No pull required of "${stepKey}" "${uuid}" as preflight and state store versions match ("${preflightResponseCollectionItem.version}").`
                      )

                      continue
                    } else {
                      this.logger.information(
                        `Previously pulled "${stepKey}" "${uuid}" will be pulled again as versions do not match between preflight ("${preflightResponseCollectionItem.version}") and state store ("${stateItem.version}").`
                      )

                      beforeLogMessage = `Pulling updated "${stepKey}" "${uuid}"...`
                      break
                    }

                  case 'awaitingPull':
                    this.logger.information(
                      `Previously pushed "${stepKey}" "${uuid}" will be pulled.`
                    )

                    beforeLogMessage = `Pulling previously pushed "${stepKey}" "${uuid}"...`
                    break
                }

                pulls.push({
                  type: 'collectionItem',

                  syncConfigurationCollection,
                  preflightResponseCollectionItem,

                  // This would only be undefined if the item's status were `pushing` or `awaitingPush`;
                  // neither of which is possible as we've completed the push phase and verified that
                  // the UI has not made any changes.
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  beforeLogMessage: beforeLogMessage!,
                  execute: async () => {
                    const response = await this.request.returningJson<{
                      '200': SyncPullResponse<Json>
                      '404': Json
                      '403': Json
                    }>(
                      'GET',
                      `sync/${kebabCasedCollectionKey}/${uuid}`,
                      { type: 'empty' },
                      {},
                      abortSignal,
                      ['200', '404', '403']
                    )

                    if (response.statusCode === '200') {
                      if (
                        response.value.version ===
                        preflightResponseCollectionItem.version
                      ) {
                        if (
                          !(await pullFiles(
                            uuid,
                            preflightResponseCollectionItem,
                            response.value.data
                          ))
                        ) {
                          return false
                        }

                        if (this.stateStore.get() === state) {
                          stateCollection = {
                            ...stateCollection,
                            [uuid]: {
                              status: 'upToDate',
                              version: response.value.version,
                              data: response.value.data
                            }
                          }

                          state = {
                            ...state,
                            collections: {
                              ...state.collections,
                              [step.key]: stateCollection
                            }
                          }

                          this.stateStore.set(state)

                          this.logger.information(
                            `Successfully pulled update of "${stepKey}" "${uuid}".`
                          )

                          return true
                        } else {
                          this.logger.warning(
                            `The state store changed during pull of "${stepKey}" "${uuid}"; sync has been interrupted and will need to run again.`
                          )

                          return false
                        }
                      } else {
                        this.logger.warning(
                          `The version of "${stepKey}" "${uuid}" changed from "${preflightResponseCollectionItem.version}" at the time of preflight to "${response.value.version}" at the time of pull; sync has been interrupted and will need to run again.`
                        )

                        return false
                      }
                    } else {
                      this.logger.warning(
                        `The API returned status code "${response.statusCode}" during the pull of "${stepKey}" "${uuid}", indicating that the user has lost access since the time of preflight; sync has been interrupted and will need to run again.`
                      )

                      return false
                    }
                  }
                })
              }

              break
            }
          }
        }

        for (const pull of pulls) {
          this.logger.information(pull.beforeLogMessage)

          switch (pull.type) {
            case 'singleton':
              this.setState({
                type: 'pullingSingleton',
                running: true,
                completedSteps: completedPulls,
                totalSteps: pulls.length
              })
              break

            case 'collectionItem':
              this.setState({
                type: 'pullingCollectionItem',
                running: true,
                completedSteps: completedPulls,
                totalSteps: pulls.length,
                syncConfigurationCollection: pull.syncConfigurationCollection,
                preflightResponseCollectionItem:
                  pull.preflightResponseCollectionItem
              })
              break
          }

          if (!(await pull.execute())) {
            this.setState({ type: 'failed', running: false })
            return 'needsToRunAgain'
          } else {
            completedPulls++
          }
        }

        this.logger.debug('Searching for changes to delete...')

        const preDeletionState = state

        for (const collectionKey of [...this.syncConfiguration.order]
          .filter((step) => step.type === 'collection')
          .map((step) => step.key)
          .reverse()) {
          const typedCollectionKey = collectionKey as string

          const stateCollection = state.collections[
            typedCollectionKey
          ] as SyncableStateCollection<Json>

          const preflightCollection = preflightResponse.value.collections[
            collectionKey
          ] as PreflightResponseCollection<TAdditionalCollectionItemData>

          this.logger.debug(
            `Searching for items to delete from collection "${typedCollectionKey}"...`
          )

          const uuidsToDelete = Object.keys(stateCollection)
            .filter(
              (uuid) =>
                !Object.prototype.hasOwnProperty.call(preflightCollection, uuid)
            )
            .sort()

          if (uuidsToDelete.length > 0) {
            const stateCollectionCopy = { ...stateCollection }

            for (const uuid of uuidsToDelete) {
              const uuidString = uuid
              this.logger.information(
                `Deleting "${typedCollectionKey}" "${uuidString}"...`
              )

              // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
              delete stateCollectionCopy[uuidString]
            }

            state = {
              ...state,
              collections: {
                ...state.collections,
                [typedCollectionKey]: stateCollectionCopy
              }
            }
          }
        }

        if (state === preDeletionState) {
          this.logger.debug('Nothing to delete.')
        } else if (this.stateStore.get() !== preDeletionState) {
          this.logger.warning(
            'The state store changed before deletions could be applied; sync has been interrupted and will need to run again.'
          )

          this.setState({ type: 'failed', running: false })
          return 'needsToRunAgain'
        } else {
          this.stateStore.set(state)
          this.logger.information('Deletions applied.')
        }

        this.logger.debug('Searching for files to clean up...')

        const allReferencedFileUuids: string[] = []

        for (const step of this.syncConfiguration.order) {
          switch (step.type) {
            case 'collection': {
              const syncConfigurationCollection =
                this.syncConfiguration.collections[step.key]

              for (const [uuid, syncableStateCollectionItem] of Object.entries(
                state.collections[step.key] as SyncableStateCollection<
                TSchema['collections']
                >
              )) {
                for (const file of syncConfigurationCollection.listFiles(
                  uuid,
                  syncableStateCollectionItem.data as TSchema['collections'][keyof TSchema['collections']]
                )) {
                  allReferencedFileUuids.push(file.uuid)
                }
              }

              break
            }
          }
        }

        const unreferencedExistingFileUuids = existingFileUuids.filter(
          (existingFileUuid) =>
            !allReferencedFileUuids.includes(existingFileUuid)
        )

        let atLeastOneChangeMade = state !== initialState

        if (unreferencedExistingFileUuids.length === 0) {
          this.logger.debug('No files to clean up.')
        } else {
          if (this.fileCleanUpBlockers === 0) {
            atLeastOneChangeMade = true

            for (const unreferencedExistingFileUuid of unreferencedExistingFileUuids) {
              this.logger.information(
                `Deleting unreferenced existing file "${unreferencedExistingFileUuid}"...`
              )

              await this.fileStore.delete(unreferencedExistingFileUuid)
            }
          } else {
            this.logger.warning(
              'Files to clean up were found, but file clean-up has been temporarily blocked (it is likely that the user interface has added files to disk which are not yet referenced within the state store).'
            )
          }
        }

        if (atLeastOneChangeMade) {
          this.logger.information(
            'Sync completed successfully; at least one change was made.'
          )

          this.setState({ type: 'succeeded', running: false })
          return 'atLeastOneChangeMade'
        } else {
          this.logger.information(
            'Sync completed successfully; no changes were made.'
          )

          this.setState({ type: 'succeeded', running: false })
          return 'noChangesMade'
        }
      } catch (e) {
        this.setState({ type: 'failed', running: false })
        throw e
      }
    }
  }
}
