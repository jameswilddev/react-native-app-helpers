import type { SyncableSchema } from "../SyncableSchema";
import type { SyncableStateCollection } from "../SyncableStateCollection";
import type { SyncableStateSingleton } from "../SyncableStateSingleton";

/**
 * Represents a local mirror of data which can be synced.
 * @template T The schema of the data.
 */
export type SyncableState<T extends SyncableSchema> = {
  /**
   * The singletons within the syncable state.
   */
  readonly singletons: {
    readonly [TKey in keyof T[`singletons`]]: SyncableStateSingleton<
      T[`singletons`][TKey]
    >;
  };

  /**
   * The collections within the syncable state.
   */
  readonly collections: {
    readonly [TKey in keyof T[`collections`]]: SyncableStateCollection<
      T[`collections`][TKey]
    >;
  };

  /**
   * The UUIDs of the files which are to be pushed during the next sync.
   */
  readonly addedFileUuids: ReadonlyArray<string>;

  /**
   * The routes of the files which are to be deleted during the next sync.
   */
  readonly deletedFileRoutes: ReadonlyArray<string>;
};
