import type { ColorValue } from "react-native";

/**
 * Describes the style of a bottom tab bar for segments which are in a
 * particular state.
 */
export type BottomTabBarStyleState = {
  /**
   * The background color of the segment.
   */
  readonly background: ColorValue;

  /**
   * The fill color of the segment's SVG icon.
   */
  readonly iconFill: ColorValue;
  /**
   * The text color within the segment.
   */
  readonly color: ColorValue;

  /**
   * The font family used for text within the segment.
   */
  readonly fontFamily: string;
};
