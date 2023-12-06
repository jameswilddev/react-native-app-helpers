import type { AbsentSyncableStateSingleton } from '../AbsentSyncableStateSingleton'
import type { Json } from '../Json'
import type { UpToDateSyncableStateSingleton } from '../UpToDateSyncableStateSingleton'

/**
 * Represents a singleton which can be synced.
 * @template TData The data within an item.
 */
export type SyncableStateSingleton<TData extends Json> =
  | AbsentSyncableStateSingleton
  | UpToDateSyncableStateSingleton<TData>
