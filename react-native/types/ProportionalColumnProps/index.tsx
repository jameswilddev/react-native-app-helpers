/**
 * Props to be given to proportional column components.
 * @template T Keys representing the columns within.
 */
export interface ProportionalColumnProps<T extends readonly never[]> {
  /**
   * How the component should size itself horizontally.
   */
  readonly width: 'fitsContent' | 'fillsContainer'

  /**
   * How the columns should align themselves horizontally.
   */
  readonly horizontalAlignment: 'left' | 'centered' | 'right' | 'stretched'

  /**
   * The contents of the rows, in order.
   */
  readonly children: { readonly [TItem in keyof T]: null | React.JSX.Element }
}
