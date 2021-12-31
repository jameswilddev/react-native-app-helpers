import type { SyncableSchema } from "../SyncableSchema";

/**
 * Describes implementation details of a collection during a sync process.
 * @template TSchema                   The schema which is being synced.
 * @template TAdditionalCollectionData Any additional information which should
 *                                     be held against a collection, e.g.
 *                                     strings for progress bars.
 */
export type SyncConfigurationCollection<
  TSchema extends SyncableSchema,
  TAdditionalCollectionData extends Record<string, unknown>
> = {
  readonly [TKey in keyof TSchema[`collections`]]: {
    /**
     * The key of the collection described.
     */
    readonly key: TKey;

    /**
     * Lists the files referenced by an item.
     * @param data The data of the item from which to list files.
     * @returns    A description of the files referenced by this item.
     */
    listFiles(item: TSchema[`collections`][TKey]): ReadonlyArray<{
      /**
       * The request route at which the file can be GET or PUT.
       */
      readonly route: string;

      /**
       * A unique identifier for the file.
       */
      readonly uuid: string;
    }>;
  } & TAdditionalCollectionData;
}[keyof TSchema[`collections`]];
