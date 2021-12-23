import type { ColorValue } from "react-native";
import type { BorderStyle } from "../BorderStyle";

/**
 * Describes the style of a control (such as a text box or drop-down) in a
 * particular state (focused/blurred, valid/invalid).
 */
export type ControlStateStyle = {
  /**
   * The color of text which is not a placeholder.
   */
  readonly textColor: ColorValue;

  /**
   * The color of text which is a placeholder.
   */
  readonly placeholderColor: ColorValue;

  /**
   * The color of the control's background.
   */
  readonly backgroundColor: ColorValue;

  /**
   * The radius of the corners of the control.
   */
  readonly radius: number;

  /**
   * The style of the control's border, or null should no border be desired.
   */
  readonly border: null | BorderStyle;
};
