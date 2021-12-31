import type { SyncableSchema } from "../SyncableSchema";
import type { SyncConfigurationCollection } from "../SyncConfigurationCollection";

/**
 * Describes implementation details of a sync process.
 * @template TSchema                   The schema which is being synced.
 * @template TAdditionalCollectionData Any additional information which should
 *                                     be held against a collection, e.g.
 *                                     strings for progress bars.
 */
export type SyncConfiguration<
  TSchema extends SyncableSchema,
  TAdditionalCollectionData extends Record<string, unknown>
> = {
  /**
   * The collections which are to be synced.  This order will be followed for
   * additions and updates, then reversed for deletions in a subsequent pass.
   */
  readonly collections: ReadonlyArray<
    SyncConfigurationCollection<TSchema, TAdditionalCollectionData>
  >;
};
