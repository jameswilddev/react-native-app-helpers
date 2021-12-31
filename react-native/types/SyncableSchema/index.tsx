import type { Json } from "../Json";

/**
 * The schema of information which can be synced.
 */
export type SyncableSchema = {
  /**
   * The collections which can be synced.
   */
  readonly collections: {
    readonly [key: string]: Json;
  };
};
