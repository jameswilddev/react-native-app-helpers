import type { TableRow } from "../TableRow";

/**
 * Describes the schema of a column in a table which has a custom renderer.
 * @template TKeyableColumnKey    The keys of keyable columns within the table.
 * @template TNonKeyableColumnKey The keys of non-keyable columns within the
 *                                table.
 * @template TRow                 The type of a row of data provided to the
 *                                table.
 */
export type CustomElementTableColumn<
  TKeyableColumnKey extends string,
  TNonKeyableColumnKey extends string,
  TRow extends TableRow<TKeyableColumnKey, TNonKeyableColumnKey>
> = {
  /**
   * Describes the type of column.
   */
  readonly type: `customElement`;

  /**
   * The label shown on the column's header.
   */
  readonly label: string;

  /**
   * The width of the column.  This is a proportion.
   */
  readonly width: number;

  /**
   * Renders the content of the column for a specified row.
   * @param tableRow The table row for which to render a column's content.
   * @returns        The rendered column content.
   */
  render(tableRow: TRow): null | React.ReactNode | JSX.Element;

  /**
   * Determines whether a search string occurs within this column on a given
   * table row.
   * @param tableRow The table row to check.
   * @param filter   The search string to check for, in lower case, with leading
   *                 and trailing white space trimmed and internal whitespace
   *                 collapsed to single spaces.
   * @returns        True when the given search string occurs within this
   *                 column on the given table row, otherwise, false.
   */
  containsSearchTerm(tableRow: TRow, filter: string): boolean;
};
