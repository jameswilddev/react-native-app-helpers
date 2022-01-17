import type { Json } from "../Json";

/**
 * Describes implementation details of a collection during a sync process.
 * @template TData                     The data within an item.
 * @template TAdditionalCollectionData Any additional information which should
 *                                     be held against a collection, e.g.
 *                                     strings for progress bars.
 */
export type SyncConfigurationCollection<
  TData extends Json,
  TAdditionalCollectionData extends Record<string, unknown>
> = {
  /**
   * Lists the files referenced by an item.
   * @param uuid The UUID of the item from which to list files.
   * @param data The data of the item from which to list files.
   * @returns    A description of the files referenced by this item.
   */
  listFiles(
    uuid: string,
    data: TData
  ): ReadonlyArray<{
    /**
     * The request route at which the file can be GET, PUT or DELETEd.
     */
    readonly route: string;

    /**
     * A unique identifier for the file.
     */
    readonly uuid: string;
  }>;
} & TAdditionalCollectionData;
