import * as React from "react";
import { ColorValue, StyleSheet, Text } from "react-native";
import { Hitbox } from "../Hitbox";

/**
 * Creates a new React component which can be used to render text.
 * @param fontFamily The font family to use.
 * @param fontSize The font size to use.  Line height will be adjusted to match.
 * @param color The color to use.
 * @param alignment The horizontal alignment to use.
 * @param multiLine When true, text will wrap across multiple lines when it does
 *                  not fit within the available width.  When false, text will
 *                  be truncated with an ellipsis.
 * @returns A new React component which can be used to render text.
 */
export const createTextComponent = (
  fontFamily: string,
  fontSize: number,
  color: ColorValue,
  alignment: `left` | `center` | `right`,
  multiLine: boolean
): React.FunctionComponent<{
  /**
   * Similar to Text's onPress, but remote-controlled using the "enabled" static
   * property of Hitbox.
   */
  readonly onPress?: undefined | (() => void);
}> => {
  const styles = StyleSheet.create({
    text: {
      fontFamily,
      fontSize,
      lineHeight: fontSize * 1.4,
      color,
      textAlign: alignment,
    },
  });

  return ({ onPress, children }) => (
    <Text
      style={styles.text}
      numberOfLines={multiLine ? 0 : 1}
      {...(onPress
        ? {
            onPress: () => {
              if (Hitbox.enabled) {
                onPress();
              }
            },
          }
        : {})}
    >
      {children}
    </Text>
  );
};
