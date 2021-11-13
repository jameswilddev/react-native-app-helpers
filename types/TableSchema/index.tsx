import type { TableColumn } from "../TableColumn";

/**
 * Describes the schema of a table.
 * @template TKeyableColumnKey    The keys of keyable columns within the table.
 * @template TNonKeyableColumnKey The keys of non-keyable columns within the
 *                                table.
 */
export type TableSchema<
  TKeyableColumnKey extends string,
  TNonKeyableColumnKey extends string
  > = {
    /**
     * The key of the column which is used to uniquely identify rows within the
     * table.
     */
    readonly key: TKeyableColumnKey;

    /**
     * The column headers shown within the table.
     */
    readonly columns: ReadonlyArray<
      TableColumn<TKeyableColumnKey, TNonKeyableColumnKey>
    >;
  };
