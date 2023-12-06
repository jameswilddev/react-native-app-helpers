import type { TableRow } from '../TableRow'
import type { OfflineTableData } from '../OfflineTableData'
import type { SortDirection } from '../SortDirection'

/**
 * Props to be given to offline table components.
 * @template TKeyableColumnKey    The keys of keyable columns within the table.
 * @template TNonKeyableColumnKey The keys of non-keyable columns within the
 *                                table.
 * @template TRow                 The type of a row of data provided to the
 *                                table.
 * @template TContext             The type of the context in which the table is
 *                                being rendered.
 */
export interface OfflineTableProps<
TKeyableColumnKey extends string,
TNonKeyableColumnKey extends string,
TRow extends TableRow<TKeyableColumnKey, TNonKeyableColumnKey>,
TContext
> {
  /**
   * The data to show in the table.
   */
  readonly data: OfflineTableData<TKeyableColumnKey, TNonKeyableColumnKey, TRow>

  /**
   * The key of the column to sort by.
   */
  readonly sortBy: TKeyableColumnKey | TNonKeyableColumnKey

  /**
   * The direction in which to sort.
   */
  readonly sortDirection: SortDirection

  /**
   * Invoked when the user request a change of sort direction.
   * @param sortBy        The key of the column to sort by.
   * @param sortDirection The direction in which sorting is to be performed.
   */
  readonly onSortChange: (
    sortBy: TKeyableColumnKey | TNonKeyableColumnKey,
    sortDirection: SortDirection
  ) => void

  /**
   * A piece of text to the data by.  Not used if empty or white space.
   */
  readonly filter: string

  /**
   * Shown when there are no rows to display.
   */
  readonly whenEmpty: string

  /**
   * The context in which the table is being rendered.
   */
  readonly context: TContext

  /**
   * Called on pressing a row.
   * @param row The row pressed.
   */
  onPressRow?: (row: TRow) => void
}
