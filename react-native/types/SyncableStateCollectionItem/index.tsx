import type { AwaitingPullSyncableStateCollectionItem } from '../AwaitingPullSyncableStateCollectionItem'
import type { AwaitingPushSyncableStateCollectionItem } from '../AwaitingPushSyncableStateCollectionItem'
import type { Json } from '../Json'
import type { PushingSyncableStateCollectionItem } from '../PushingSyncableStateCollectionItem'
import type { UpToDateSyncableStateCollectionItem } from '../UpToDateSyncableStateCollectionItem'

/**
 * Represents an item of a collection which can be synced.
 * @template TData The data within the item.
 */
export type SyncableStateCollectionItem<TData extends Json> =
  | AwaitingPushSyncableStateCollectionItem<TData>
  | PushingSyncableStateCollectionItem<TData>
  | AwaitingPullSyncableStateCollectionItem<TData>
  | UpToDateSyncableStateCollectionItem<TData>
