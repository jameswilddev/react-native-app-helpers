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
 */
export type TableColumn<
  TKeyableColumnKey extends string,
  TNonKeyableColumnKey extends string,
  TRow extends TableRow<TKeyableColumnKey, TNonKeyableColumnKey>
> =
  | BasicTableColumn<TKeyableColumnKey, TNonKeyableColumnKey>
  | CustomElementTableColumn<TKeyableColumnKey, TNonKeyableColumnKey, TRow>
  | {
      readonly [TKey in
        | TKeyableColumnKey
        | TNonKeyableColumnKey]: CustomTextTableColumn<TKey, TRow>;
    }[TKeyableColumnKey | TNonKeyableColumnKey];
