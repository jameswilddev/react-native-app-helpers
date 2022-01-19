import type { Json } from "../Json";

/**
 * Represents a singleton which has been synced.
 * @template TData The data within an item.
 */
export type UpToDateSyncableStateSingleton<TData extends Json> = {
  /**
   * Indicates the state of the singleton.
   */
  readonly type: `upToDate`;

  /**
   * A server-generated value which can be compared with the equivalent in the
   * preflight response to determine whether there are any changes to pull.
   */
  readonly version: number | string;

  /**
   * The value which has been synced.
   */
  readonly value: TData;
};
