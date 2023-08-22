import type { ColorValue } from 'react-native'
import type { BorderStyle } from '../BorderStyle'

/**
 * Describes the style of a type of a split button in a particular state.
 */
export interface SplitButtonStateStyle {
  /**
   * The background color shown behind the text.
   */
  readonly backgroundColor: ColorValue

  /**
   * The color of text.
   */
  readonly color: ColorValue

  /**
   * The radius of the button's corners.
   */
  readonly radius: number

  /**
   * The style of the borders of the button, if any, otherwise, null.
   */
  readonly border: null | BorderStyle
}
