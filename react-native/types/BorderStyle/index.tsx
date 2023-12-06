import type { ColorValue } from 'react-native'

/**
 * Describes the style of the border of a control (such as a text box or
 * drop-down).
 */
export interface BorderStyle {
  /**
   * The thickness of the border.
   */
  readonly width: number

  /**
   * The color of the border.
   */
  readonly color: ColorValue
}
