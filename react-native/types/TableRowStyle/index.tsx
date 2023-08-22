import type { ColorValue } from 'react-native'

/**
 * The style of a row within a table.
 */
export interface TableRowStyle {
  /**
   * The color of the text within the row.
   */
  readonly color: ColorValue

  /**
   * The background color of the row.
   */
  readonly background: ColorValue
}
