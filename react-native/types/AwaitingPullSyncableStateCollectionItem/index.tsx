import type { Json } from "../Json";

/**
 * Represents an item of a collection which has pushed its changes to the server
 * and now needs to pull a refreshed copy.
 * @template TData The data within the item.
 */
export type AwaitingPullSyncableStateCollectionItem<TData extends Json> = {
  /**
   * Indicates the status of the item.
   */
  readonly status: `awaitingPull`;

  /**
   * The item's data.
   */
  readonly data: TData;
};
