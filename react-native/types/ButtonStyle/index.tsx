import type { ButtonStateStyle } from '../ButtonStateStyle'

/**
 * Describes the style of a button.
 */
export interface ButtonStyle {
  /**
   * The font family of the text on the button.
   */
  readonly fontFamily: string

  /**
   * The size of the text on the button.
   */
  readonly fontSize: number

  /**
   * The weight of the text on the button.
   */
  readonly fontWeight?:
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | undefined

  /**
   * The amount of horizontal padding inside the button.
   */
  readonly horizontalPadding: number

  /**
   * The amount of vertical padding inside the button.
   */
  readonly verticalPadding: number

  /**
   * The amount of spacing between icons and text.
   */
  readonly iconSpacing: number

  /**
   * The style to apply when the button is not disabled.
   */
  readonly default: ButtonStateStyle

  /**
   * The style to apply when the button is disabled.
   */
  readonly disabled: ButtonStateStyle
}
