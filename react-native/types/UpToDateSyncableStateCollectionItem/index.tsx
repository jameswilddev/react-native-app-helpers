import type { Json } from "../Json";

/**
 * Represents an item of a collection which has been synced.
 * @template TData The data within the item.
 */
export type UpToDateSyncableStateCollectionItem<TData extends Json> = {
  /**
   * Indicates the status of the item.
   */
  readonly status: `upToDate`;

  /**
   * A server-generated value which can be compared with the equivalent in the
   * preflight response to determine whether there are any changes to pull.
   */
  readonly version: number | string;

  /**
   * The item's data.
   */
  readonly data: TData;
};
