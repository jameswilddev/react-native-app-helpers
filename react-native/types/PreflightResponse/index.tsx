import type { PreflightResponseCollection } from "../PreflightResponseCollection";
import type { SyncableSchema } from "../SyncableSchema";

/**
 * The response to a successful preflight request.
 * @template TSchema                       The schema of the data which is being
 *                                         synced.
 * @template TAdditionalCollectionItemData Any additional information which
 *                                         should be held against a collection
 *                                         item, e.g. strings for progress bars.
 */
export type PreflightResponse<
  TSchema extends SyncableSchema,
  TAdditionalCollectionItemData extends Record<string, unknown>
> = {
  /**
   * The collections available to be synced.
   */
  readonly collections: {
    readonly [TKey in keyof TSchema[`collections`]]: PreflightResponseCollection<TAdditionalCollectionItemData>;
  };
};
