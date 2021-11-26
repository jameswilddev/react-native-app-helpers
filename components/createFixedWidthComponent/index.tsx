import * as React from "react";
import { StyleSheet, View } from "react-native";

/**
 * Creates a React component which has a fixed width.
 * @param width The width of the component
 * @returns     The created component.
 */
export const createFixedWidthComponent = (
  width: number
): React.FunctionComponent<{
  /** Determines how the column is to be sized vertically. */
  readonly height: `fillsContainer` | `fitsContent`;
}> => {
  const styles = StyleSheet.create({
    fillsContainer: {
      width,
      height: `100%`,
    },
    fitsContent: {
      width,
    },
  });

  return ({ children, height }) => (
    <View
      style={
        height === `fillsContainer` ? styles.fillsContainer : styles.fitsContent
      }
    >
      {children}
    </View>
  );
};
