/**
 * Describes the schema of a column in a table which has a custom text
 * representation.
 * @template TKey     The key of the column within a row of data provided to the
 *                    table.
 * @template TRow     The type of a row of data provided to the table.
 * @template TContext The type of the context in which the table is being
 *                    rendered.
 */
export type CustomTextTableColumn<
  TKey extends string,
  TRow extends { readonly [TKeyItem in TKey]: null | number | string },
  TContext
> = {
  /**
   * Describes the type of column.
   */
  readonly type: `customText`;

  /**
   * The label shown on the column's header.
   */
  readonly label: string;

  /**
   * The width of the column.  This is a proportion.
   */
  readonly width: number;

  /**
   * Renders the visible and filterable content of the column for a specified
   * row.
   * @param value   The value from which to render.
   * @param context The context in which the table is being rendered.
   * @returns       The rendered column content.
   */
  render(
    value: TRow[TKey],
    context: TContext
  ): null | boolean | number | string;

  /**
   * The key in the corresponding TableRow which the column represents.
   */
  readonly key: TKey;
};
