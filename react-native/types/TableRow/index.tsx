import type { KeyableTableCell } from '../KeyableTableCell'
import type { NonKeyableTableCell } from '../NonKeyableTableCell'

/**
 * A row of data within a table.
 * @template TKeyableColumnKey    The keys of keyable columns within the table.
 * @template TNonKeyableColumnKey The keys of non-keyable columns within the
 *                                table.
 */
export type TableRow<
  TKeyableColumnKey extends string,
  TNonKeyableColumnKey extends string
> = { readonly [TKey in TKeyableColumnKey]: KeyableTableCell } & {
  readonly [TKey in TNonKeyableColumnKey]:
  | KeyableTableCell
  | NonKeyableTableCell;
}
