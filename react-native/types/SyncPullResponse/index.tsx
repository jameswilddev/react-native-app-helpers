import type { Json } from "../Json";

/**
 * The response to a request for an item during sync.
 */
export type SyncPullResponse<TData extends Json> = {
  /**
   * The version of the synced item.  This must be compared to the preflight
   * response to ensure that nothing has changed since, otherwise, sync must be
   * restarted.
   */
  readonly version: number | string;

  /**
   * The data of the synced item.
   */
  readonly data: TData;
};
