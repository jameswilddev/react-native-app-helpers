import type { Json } from "../Json";
import type { PreflightResponseCollectionItem } from "../PreflightResponseCollectionItem";

/**
 * A collection within a response to a successful preflight request.
 * @template TAdditionalCollectionItemData Any additional information which
 *                                         should be held against a collection
 *                                         item, e.g. strings for progress bars.
 */
export type PreflightResponseCollection<
  TAdditionalCollectionItemData extends Record<string, Json>
> = {
  /**
   * The items within the collection.
   */
  readonly [
    uuid: string
  ]: PreflightResponseCollectionItem<TAdditionalCollectionItemData>;
};
