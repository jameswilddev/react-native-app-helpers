import type { CheckboxStateStyle } from '../CheckboxStateStyle'

/**
 * Describes the style of a checkbox.
 */
export interface CheckboxStyle {
  /**
   * The name of the font family of the checkbox's label text.
   */
  readonly fontFamily: string

  /**
   * The size of the font of the checkbox's label text.
   */
  readonly fontSize: number

  /**
   * The width and height of the box.
   */
  readonly boxSize: number

  /**
   * The spacing between the box and its label.
   */
  readonly boxLabelSpacing: number

  /**
   * The style to apply when the checkbox is disabled and unchecked.
   */
  readonly disabledFalse: CheckboxStateStyle

  /**
   * The style to apply when the checkbox is disabled and checked.
   */
  readonly disabledTrue: CheckboxStateStyle

  /**
   * The style to apply when the checkbox is unchecked and not disabled.
   */
  readonly enabledFalse: CheckboxStateStyle

  /**
   * The style to apply when the checkbox is checked and not disabled.
   */
  readonly enabledTrue: CheckboxStateStyle
}
