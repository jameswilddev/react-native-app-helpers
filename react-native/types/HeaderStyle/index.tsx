import type { ColorValue } from 'react-native'

/**
 * Describes the style of a header bar.
 */
export interface HeaderStyle {
  /**
   * The color of the text within the header bar.
   */
  readonly textColor: ColorValue

  /**
   * The font family of the text within the header bar.
   */
  readonly fontFamily: string

  /**
   * The font size of the text withing the header bar.
   */
  readonly fontSize: number

  /**
   * The header bar's background color.
   */
  readonly background: ColorValue

  /**
   * The distance between the edges of the screen and icons (safe areas will be
   * added to this padding).
   */
  readonly outerHorizontalPadding: number

  /**
   * The distance between icons on the same side.
   */
  readonly innerHorizontalPadding: number

  /**
   * The amount of padding above and below text and icons (the top safe area
   * will be added above text and icons).
   */
  readonly verticalPadding: number
}
