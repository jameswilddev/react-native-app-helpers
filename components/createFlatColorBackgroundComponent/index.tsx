import * as React from "react";
import { ColorValue, StyleSheet, View } from "react-native";

/**
 * Creates a new React component which displays a solid color background behind
 * its children.
 * @param color The color to use.
 * @returns a new React component which displays a solid color background behind
 * its children.
 */
export const createFlatColorBackgroundComponent = (
  color: ColorValue
): React.FunctionComponent => {
  const styles = StyleSheet.create({
    view: {
      backgroundColor: color,
    },
  });

  return ({ children }) => <View style={styles.view}>{children}</View>;
};
