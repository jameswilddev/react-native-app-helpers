import type { Json } from "../Json";

/**
 * The an item in a collection within a response to a successful preflight
 * request.
 * @template TAdditionalCollectionItemData Any additional information which
 *                                         should be held against a collection
 *                                         item, e.g. strings for progress bars.
 */
export type PreflightResponseCollectionItem<
  TAdditionalCollectionItemData extends Record<string, Json>
> = {
  /**
   * The current version of the item.  If the record either does not exist
   * locally or has a different version number, it is to be pulled down.
   */
  readonly version: string | number;
} & TAdditionalCollectionItemData;
