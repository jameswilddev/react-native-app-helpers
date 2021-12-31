import type { SyncableSchema } from "../SyncableSchema";
import type { SyncableStateCollection } from "../SyncableStateCollection";

/**
 * Represents a local mirror of data which can be synced.
 * @template T The schema of the data.
 */
export type SyncableState<T extends SyncableSchema> = {
  /**
   * The collections within the syncable state.
   */
  readonly collections: {
    readonly [TKey in keyof T[`collections`]]: SyncableStateCollection<
      T[`collections`][TKey]
    >;
  };
};
