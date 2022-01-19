/**
 * Represents a singleton which could be synced, but has not yet been pulled
 * down.
 */
export type AbsentSyncableStateSingleton = {
  /**
   * Indicates the state of the singleton.
   */
  readonly type: `absent`;
};
