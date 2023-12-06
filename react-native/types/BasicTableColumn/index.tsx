/**
 * Describes the schema of a column in a table which does not have a custom
 * renderer.
 * @template TKeyableColumnKey    The keys of keyable columns within the table.
 * @template TNonKeyableColumnKey The keys of non-keyable columns within the
 *                                table.
 */
export interface BasicTableColumn<
  TKeyableColumnKey extends string,
  TNonKeyableColumnKey extends string
> {
  /**
   * Describes the type of column.
   */
  readonly type: 'basic'

  /**
   * The label shown on the column's header.
   */
  readonly label: string

  /**
   * The width of the column.  This is a proportion.
   */
  readonly width: number

  /**
   * The key in the corresponding TableRow from which to retrieve a value.
   */
  readonly key: TKeyableColumnKey | TNonKeyableColumnKey

  /**
   * The horizontal alignment of the column's content.
   */
  readonly alignment: 'left' | 'middle' | 'right'
}
