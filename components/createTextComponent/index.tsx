import * as React from "react";
import { ColorValue, StyleSheet, Text } from "react-native";

/**
 * Creates a new React component which can be used to render text.
 * @param fontFamily The font family to use.
 * @param fontSize The font size to use.  Line height will be adjusted to match.
 * @param color The color to use.
 * @param alignment The horizontal alignment to use.
 * @param multiLine When true, text will wrap across multiple lines when it does
 *                  not fit within the available wideth.  When false, text will
 *                  be truncated with an ellipsis.
 * @returns A new React component which can be used to render text.
 */
export const createTextComponent = (
  fontFamily: string,
  fontSize: number,
  color: ColorValue,
  alignment: "left" | "center" | "right",
  multiLine: boolean
): React.FunctionComponent => {
  const styles = StyleSheet.create({
    text: {
      fontFamily,
      fontSize,
      lineHeight: fontSize * 1.4,
      color,
      textAlign: alignment,
      width: "100%",
    },
  });

  return ({ children }) => (
    <Text style={styles.text} numberOfLines={multiLine ? 0 : 1}>
      {children}
    </Text>
  );
};
