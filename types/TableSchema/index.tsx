import type { TableColumn } from "../TableColumn";
import type { TableRow } from "../TableRow";

/**
 * Describes the schema of a table.
 * @template TKeyableColumnKey    The keys of keyable columns within the table.
 * @template TNonKeyableColumnKey The keys of non-keyable columns within the
 *                                table.
 * @template TRow                 The type of a row of data provided to the
 *                                table.
 * @template TContext             The type of the context in which the table is
 *                                being rendered.
 */
export type TableSchema<
  TKeyableColumnKey extends string,
  TNonKeyableColumnKey extends string,
  TRow extends TableRow<TKeyableColumnKey, TNonKeyableColumnKey>,
  TContext
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
    TableColumn<TKeyableColumnKey, TNonKeyableColumnKey, TRow, TContext>
  >;
};
