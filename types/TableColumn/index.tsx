/**
 * Describes the schema of a column in a table.
 * @template TKeyableColumnKey    The keys of keyable columns within the table.
 * @template TNonKeyableColumnKey The keys of non-keyable columns within the
 *                                table.
 */
export type TableColumn<
  TKeyableColumnKey extends string,
  TNonKeyableColumnKey extends string
> = {
  /**
   * The label shown on the column's header.
   */
  readonly label: string;

  /**
   * The key in the corresponding TableRow from which to retrieve a value.
   */
  readonly key: TKeyableColumnKey | TNonKeyableColumnKey;

  /**
   * The width of the column.  This is a proportion.
   */
  readonly width: number;
};
