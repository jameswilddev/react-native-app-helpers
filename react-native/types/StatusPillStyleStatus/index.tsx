import type { ColorValue } from "react-native";

/**
 * The style of a particular status of a status pill.
 */
export type StatusPillStyleStatus = {
  /**
   * The text shown when in this status.
   */
  readonly label: string;

  /**
   * The color of the text.
   */
  readonly color: ColorValue;

  /**
   * The color of the pill itself.
   */
  readonly background: ColorValue;
};
