import type { SplitButtonTypeStyle } from '../SplitButtonTypeStyle'

/**
 * Describes the style of a split button.
 * @template T The types of button within the split row.
 */
export interface SplitButtonStyle<T extends string> {
  /**
   * The font family of the text on the buttons.
   */
  readonly fontFamily: string

  /**
   * The size of the text on the buttons.
   */
  readonly fontSize: number

  /**
   * The amount of horizontal padding inside the buttons.
   */
  readonly horizontalPadding: number

  /**
   * The amount of vertical padding inside the buttons.
   */
  readonly verticalPadding: number

  /**
   * The border width treated as "neutral"; margin will be used to ensure that
   * any states with differing border widths will be aligned correctly.
   */
  readonly neutralBorderWidth: number

  /**
   * The styles of the individual button types.
   */
  readonly types: {
    readonly [TTypeItem in T]: SplitButtonTypeStyle;
  }
}
