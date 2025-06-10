/**
 * Props to be given to proportional row components.
 * @template T Keys representing the columns within.
 */
export interface ProportionalRowProps<T extends readonly never[]> {
  /**
   * How the component should size itself vertically.
   */
  readonly height: 'fitsContent' | 'fillsContainer'

  /**
 * How the columns should align themselves vertically.
 */
  readonly verticalAlignment: 'top' | 'centered' | 'bottom' | 'stretched'

  /**
 * The contents of the columns, in order.
 */
  readonly children: { readonly [TItem in keyof T]: null | React.JSX.Element }
}
