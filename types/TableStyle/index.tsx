import type { ColorValue } from "react-native";
import type { BorderStyle } from "../BorderStyle";
import type { TableRowStyle } from "../TableRowStyle";

/**
 * Describes the styling applied to a table.
 */
export type TableStyle = {
  /**
   * Styles which apply to the header of the table.
   */
  readonly header: {
    /**
     * The font family to use within the table's header cells.
     */
    readonly fontFamily: string;

    /**
     * The font size to use within the table's header cells.
     */
    readonly fontSize: number;

    /**
     * The color of the table's header cells.
     */
    readonly background: ColorValue;

    /**
     * The color of the text within the table's header cells.
     */
    readonly color: ColorValue;

    /**
     * The vertical padding to apply within the table's header cells.
     */
    readonly verticalPadding: number;
  };

  readonly headerFirstRowSeparator: null | BorderStyle;

  /**
   * Styles which apply to cells within the body of the table.
   */
  readonly body: {
    /**
     * The font family to use within the table's body cells.
     */
    readonly fontFamily: string;

    /**
     * The font size to use within the table's body cells.
     */
    readonly fontSize: number;

    /**
     * The horizontal padding to apply within the table's body cells.
     */
    readonly horizontalPadding: number;

    /**
     * The vertical padding to apply within the table's body cells.
     */
    readonly verticalPadding: number;

    /**
     * Styling to apply on odd rows.
     */
    readonly odd: TableRowStyle;

    /**
     * Styling to apply on even rows.
     */
    readonly even: TableRowStyle;
  };

  /**
   * The separator to display between rows (or null if none).
   */
  readonly rowSeparator: null | BorderStyle;

  /**
   * Styles to apply to the placeholder shown when there are no rows in the
   * table.
   */
  readonly empty: {
    /**
     * The font family to use for the placeholder.
     */
    readonly fontFamily: string;

    /**
     * The font size to use for the placeholder.
     */
    readonly fontSize: number;

    /**
     * The amount of horizontal padding to include within the placeholder.
     */
    readonly horizontalPadding: number;

    /**
     * The amount of vertical padding to include within the placeholder.
     */
    readonly verticalPadding: number;

    /**
     * The background color to use behind the placeholder text.
     */
    readonly background: ColorValue;

    /**
     * The color of the placeholder text.
     */
    readonly color: ColorValue;
  };
};
