import type { UnderlinedTopTabBarStyleState } from "../UnderlinedTopTabBarStyleState";

/**
 * The style applied to an underlined top tab bar.
 */
export type UnderlinedTopTabBarStyle = {
  /**
   * The size of text on tabs.
   */
  readonly fontSize: number;

  /**
   * The padding above and below tabs.  Underlines subtract from this.
   */
  readonly verticalPadding: number;

  /**
   * The style to apply to inactive tabs.
   */
  readonly inactive: UnderlinedTopTabBarStyleState;

  /**
   * The style to apply to active tabs.
   */
  readonly active: UnderlinedTopTabBarStyleState;
};
