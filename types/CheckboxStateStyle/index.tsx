import type * as React from "react";
import type { ColorValue } from "react-native";
import type { BorderStyle } from "../BorderStyle";

/**
 * Describes the style of a checkbox in a specific state.
 */
export type CheckboxStateStyle = {
  /**
   * The box's background color.
   */
  readonly backgroundColor: ColorValue;

  /**
   * The color of the checkbox's label text.
   */
  readonly color: ColorValue;

  /**
   * The element shown inside the box.
   */
  readonly boxChild: null | React.ReactNode | JSX.Element;

  /**
   * The border radius of the box.
   */
  readonly radius: number;

  /**
   * The style of the box's border.
   */
  readonly border: null | BorderStyle;
};
