import type { Json } from '../Json'

/**
 * Represents an item of a collection which is in the process of having its
 * local changes pushed to the server.
 * @template TData The data within the item.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type PushingSyncableStateCollectionItem<TData extends Json> = {
  /**
   * Indicates the status of the item.
   */
  readonly status: 'pushing'

  /**
   * The item's data.
   */
  readonly data: TData
}
