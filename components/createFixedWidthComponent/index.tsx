import * as React from "react";
import { StyleSheet, View } from "react-native";

/**
 * Creates a React component which has a fixed width (and fills its container
 * vertically).
 * @param width The width of the component
 * @returns     The created component.
 */
export const createFixedWidthComponent = (
  width: number
): React.FunctionComponent => {
  const styles = StyleSheet.create({
    view: {
      width,
      height: `100%`,
    },
  });

  return ({ children }) => <View style={styles.view}>{children}</View>;
};
