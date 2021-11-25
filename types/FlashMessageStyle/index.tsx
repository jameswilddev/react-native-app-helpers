import type { ColorValue } from "react-native";
import type { BorderStyle } from "../BorderStyle";

/**
 * Describes the style of a flash message.
 * @template T The names of the types available.
 */
export type FlashMessageStyle<T extends string> = {
  /**
   * The font family to use.
   */
  readonly fontFamily: string;

  /**
   * The font size to use.
   */
  readonly fontSize: number;

  /**
   * The border radius to apply.
   */
  readonly radius: number;

  /**
   * The internal horizontal padding to include.
   */
  readonly horizontalPadding: number;

  /**
   * The internal vertical padding to include.
   */
  readonly verticalPadding: number;

  /**
   * Details specific to flash message types.
   */
  readonly types: {
    readonly [TKey in T]: {
      /**
       * The background color used by this type.
       */
      readonly backgroundColor: ColorValue;

      /**
       * The foreground color used by this type.
       */
      readonly color: ColorValue;

      /**
       * The border used by this type (or null if no border is to be included).
       */
      readonly border: null | BorderStyle;
    };
  };
};
