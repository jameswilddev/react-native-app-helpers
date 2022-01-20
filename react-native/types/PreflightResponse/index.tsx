import type { Json } from "../Json";
import type { PreflightResponseCollection } from "../PreflightResponseCollection";
import type { PreflightResponseSingleton } from "../PreflightResponseSingleton";
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
  TAdditionalCollectionItemData extends Record<string, Json>
> = {
  /**
   * The singletons available to be synced.
   */
  readonly singletons: {
    readonly [TKey in keyof TSchema[`singletons`]]: PreflightResponseSingleton;
  };

  /**
   * The collections available to be synced.
   */
  readonly collections: {
    readonly [TKey in keyof TSchema[`collections`]]: PreflightResponseCollection<TAdditionalCollectionItemData>;
  };
};
