import type { BottomTabBarStyleState } from "../BottomTabBarStateStyle";

/**
 * Describes the style of a bottom tab bar.
 */
export type BottomTabBarStyle = {
  /**
   * The amount of padding between the top of the tab bar and the top of the
   * icon.
   */
  readonly topPadding: number;

  /**
   * The amount of spacing between the bottom of the icon and the top of the
   * text label.
   */
  readonly iconTextSpacing: number;

  /**
   * The size of the text label.
   */
  readonly fontSize: number;

  /**
   * The amount of padding between the bottom of the text label and the bottom
   * of the tab bar.
   */
  readonly bottomPadding: number;

  /**
   * Styling to apply to inactive segments.
   */
  readonly inactive: BottomTabBarStyleState;

  /**
   * Styling to apply to active segments.
   */
  readonly active: BottomTabBarStyleState;
};
