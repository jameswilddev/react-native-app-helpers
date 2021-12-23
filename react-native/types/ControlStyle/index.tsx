import type { ControlStateStyle } from "../ControlStateStyle";

/**
 * Describes the style of a control (such as a text box or drop-down).
 */
export type ControlStyle = {
  /**
   * The name of the font family to use for text inside the control.
   */
  readonly fontFamily: string;

  /**
   * The size of text inside the control.
   */
  readonly fontSize: number;

  /**
   * The amount of padding above and below the text inside the control.
   */
  readonly paddingVertical: number;

  /**
   * The amount of padding to the left and right of the text and any icons
   * inside the control.
   */
  readonly paddingHorizontal: number;

  /**
   * The styling to apply when the control is not in focus, but its content is
   * valid.
   */
  readonly blurredValid: ControlStateStyle;

  /**
   * The styling to apply when the control is not in focus, and its content is
   * invalid.
   */
  readonly blurredInvalid: ControlStateStyle;

  /**
   * The styling to apply when the control is in focus, and its content is
   * valid.
   */
  readonly focusedValid: ControlStateStyle;

  /**
   * The styling to apply when the control is in focus, but its content is
   * invalid.
   */
  readonly focusedInvalid: ControlStateStyle;

  /**
   * The styling to apply when the control is in disabled, and its content is
   * valid.
   */
  readonly disabledValid: ControlStateStyle;

  /**
   * The styling to apply when the control is in disabled, but its content is
   * invalid.
   */
  readonly disabledInvalid: ControlStateStyle;
};
