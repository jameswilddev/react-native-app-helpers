import type { SplitButtonStateStyle } from "../SplitButtonStateStyle";

/**
 * Describes the style of a type of a split button.
 */
export type SplitButtonTypeStyle = {
  /**
   * The style applied when a button of this type is not selected, but also
   * not disabled.
   */
  readonly inactiveEnabled: SplitButtonStateStyle;

  /**
   * The style applied when a button of this type is selected.
   */
  readonly activeEnabled: SplitButtonStateStyle;

  /**
   * The style applied when a button of this type is disabled and not
   * selected.
   */
  readonly inactiveDisabled: SplitButtonStateStyle;

  /**
   * The style applied when a button of this type is disabled and selected.
   */
  readonly activeDisabled: SplitButtonStateStyle;
};
