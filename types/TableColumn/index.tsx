import type { BasicTableColumn } from "../BasicTableColumn";
import type { CustomElementTableColumn } from "../CustomElementTableColumn";
import type { CustomTextTableColumn } from "../CustomTextTableColumn";
import type { TableRow } from "../TableRow";

/**
 * Describes the schema of a column in a table.
 * @template TKeyableColumnKey    The keys of keyable columns within the table.
 * @template TNonKeyableColumnKey The keys of non-keyable columns within the
 *                                table.
 * @template TRow                 The type of a row of data provided to the
 *                                table.
 * @template TContext             The type of the context in which the table is
 *                                being rendered.
 */
export type TableColumn<
  TKeyableColumnKey extends string,
  TNonKeyableColumnKey extends string,
  TRow extends TableRow<TKeyableColumnKey, TNonKeyableColumnKey>,
  TContext
> =
  | BasicTableColumn<TKeyableColumnKey, TNonKeyableColumnKey>
  | CustomElementTableColumn<
      TKeyableColumnKey,
      TNonKeyableColumnKey,
      TRow,
      TContext
    >
  | {
      readonly [TKey in
        | TKeyableColumnKey
        | TNonKeyableColumnKey]: CustomTextTableColumn<TKey, TRow, TContext>;
    }[TKeyableColumnKey | TNonKeyableColumnKey];
