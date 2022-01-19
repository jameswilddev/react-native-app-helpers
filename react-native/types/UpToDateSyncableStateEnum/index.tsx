import type { Json } from "../Json";

/**
 * Represents an enum which has been synced
 * @template TData The data within an item.
 */
export type UpToDateSyncableStateEnum<TData extends Json> = {
  /**
   * Indicates the state of the enum.
   */
  readonly type: `upToDate`;

  /**
   * A server-generated value which can be compared with the equivalent in the
   * preflight response to determine whether there are any changes to pull.
   */
  readonly version: number | string;

  /**
   * The values which have been synced.
   */
  readonly values: {
    readonly [uuid: string]: TData;
  };
};
