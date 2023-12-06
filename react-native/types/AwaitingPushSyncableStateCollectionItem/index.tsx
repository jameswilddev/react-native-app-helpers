import type { Json } from '../Json'

/**
 * Represents an item of a collection which needs to have its changes pushed to
 * the server on the next sync.
 * @template TData The data within the item.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type AwaitingPushSyncableStateCollectionItem<TData extends Json> = {
  /**
   * Indicates the status of the item.
   */
  readonly status: 'awaitingPush'

  /**
   * The item's data.
   */
  readonly data: TData
}
