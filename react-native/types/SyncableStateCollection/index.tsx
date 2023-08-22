import type { Json } from '../Json'
import type { SyncableStateCollectionItem } from '../SyncableStateCollectionItem'

/**
 * Represents a collection which can be synced.
 * @template TData The data within an item.
 */
export type SyncableStateCollection<TData extends Json> = Readonly<Record<string, SyncableStateCollectionItem<TData>>>
