import * as React from "react";
import { StyleSheet, View } from "react-native";

/**
 * Creates a React component which has a maximum width.
 * @param maximumWidth The maximum width of the component
 * @returns     The created component.
 */
export const createLimitedWidthComponent = (
  maximumWidth: number
): React.FunctionComponent<
  React.PropsWithChildren<{
    /** Determines how the column is to be sized vertically. */
    readonly height: `fillsContainer` | `fitsContent`;
  }>
> => {
  const styles = StyleSheet.create({
    fillsContainer: {
      maxWidth: maximumWidth,
      height: `100%`,
    },
    fitsContent: {
      maxWidth: maximumWidth,
    },
  });

  return ({ children, height }) => (
    <View
      style={
        height === `fillsContainer` ? styles.fillsContainer : styles.fitsContent
      }
      pointerEvents="box-none"
    >
      {children}
    </View>
  );
};
