import type { ColorValue } from "react-native";
import type { BorderStyle } from "../BorderStyle";

/**
 * The styling to apply to a tab in an underlined top tab bar.
 */
export type UnderlinedTopTabBarStyleState = {
  /**
   * The color of the tab's text.
   */
  readonly color: ColorValue;

  /**
   * The font family used for the tab's text.
   */
  readonly fontFamily: string;

  /**
   * The background color shown behind the text.
   */
  readonly backgroundColor: ColorValue;

  /**
   * The underline shown at the bottom of the tab (or null if none is to be
   * included).
   */
  readonly underline: null | BorderStyle;
};
