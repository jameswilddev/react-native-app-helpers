import type { SyncableStateCollectionItem } from '../../types/SyncableStateCollectionItem'
import type { SyncableSchema } from '../../types/SyncableSchema'
import type { SyncableState } from '../../types/SyncableState'
import type { SyncConfiguration } from '../../types/SyncConfiguration'

/**
 * Provides helpers for working with states which can be synced.
 * @template TSchema                   The schema which can be synced.
 * @template TAdditionalCollectionData Any additional information which should
 *                                     be held against a collection, e.g.
 *                                     strings for progress bars.
 */
export class SyncableStateHelper<
  TSchema extends SyncableSchema,
  TAdditionalCollectionData extends Record<string, unknown>
> {
  /**
   * @param syncConfiguration The sync configuration to use.
   */
  constructor (
    private readonly syncConfiguration: SyncConfiguration<
    TSchema,
    TAdditionalCollectionData
    >
  ) {}

  /**
   * Inserts or updates a collection item.  Additionally manages any added or
   * deleted files.
   * @param state         The current state.
   * @param collectionKey The key of the collection in which to make changes.
   * @param uuid          The UUID of the collection item to insert or update.
   * @param data          The data of the collection item to insert or update.
   * @param setState      Called when the next state has been computed.
   */
  upsertCollection<T extends keyof TSchema['collections']>(
    state: SyncableState<TSchema>,
    collectionKey: T,
    uuid: string,
    data: TSchema['collections'][T],
    setState: (to: SyncableState<TSchema>) => void
  ): void {
    const syncConfigurationCollection =
      this.syncConfiguration.collections[collectionKey]
    const nextFileUuids = syncConfigurationCollection
      .listFiles(uuid, data)
      .map((file) => file.uuid)

    const collection = state.collections[collectionKey]

    if (Object.prototype.hasOwnProperty.call(collection, uuid)) {
      const previousItem = collection[uuid] as SyncableStateCollectionItem<
      TSchema['collections'][T]
      >

      const previousFiles = syncConfigurationCollection.listFiles(
        uuid,
        previousItem.data
      )

      const previousFileUuids = previousFiles.map((file) => file.uuid)

      const deletedFiles = previousFiles.filter(
        (previousFile) => !nextFileUuids.includes(previousFile.uuid)
      )

      const deletedFileUuids = deletedFiles.map((file) => file.uuid)

      setState({
        ...state,
        collections: {
          ...state.collections,
          [collectionKey]: {
            ...collection,
            [uuid]: {
              status: 'awaitingPush',
              data
            }
          }
        },
        addedFileUuids: [
          ...state.addedFileUuids.filter(
            (addedFileUuid) => !deletedFileUuids.includes(addedFileUuid)
          ),
          ...nextFileUuids.filter(
            (fileUuid) => !previousFileUuids.includes(fileUuid)
          )
        ],
        deletedFileRoutes: [
          ...state.deletedFileRoutes,
          ...deletedFiles.map((file) => file.route)
        ]
      })
    } else {
      setState({
        ...state,
        collections: {
          ...state.collections,
          [collectionKey]: {
            ...collection,
            [uuid]: {
              status: 'awaitingPush',
              data
            }
          }
        },
        addedFileUuids: [...state.addedFileUuids, ...nextFileUuids]
      })
    }
  }
}
