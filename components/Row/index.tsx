import * as React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

const styles: { [key: string]: ViewStyle } = {};

/**
 * A React component which fills the container horizontally and applies a flex
 * row to its children.
 */
export const Row: React.FunctionComponent<{
  readonly height: `fitsContent` | `fillsContainer`;
  readonly horizontalDistribution:
  | `left`
  | `centered`
  | `right`
  | `spaced`
  | `spacedTouchingEnds`;
  readonly verticalAlignment: `top` | `centered` | `bottom` | `stretched`;
}> = ({ height, horizontalDistribution, verticalAlignment, children }) => {
  const styleKey = `${height}-${horizontalDistribution}-${verticalAlignment}`;

  if (!(styleKey in styles)) {
    const view: ViewStyle = { width: "100%", flexDirection: `row` };

    if (height === `fillsContainer`) {
      view.height = `100%`;
    }

    switch (horizontalDistribution) {
      case `centered`:
        view.justifyContent = `center`;
        break;

      case `right`:
        view.justifyContent = `flex-end`;
        break;

      case `spaced`:
        view.justifyContent = `space-evenly`;
        break;

      case `spacedTouchingEnds`:
        view.justifyContent = `space-between`;
        break;
    }

    switch (verticalAlignment) {
      case `top`:
        view.alignItems = `flex-start`;
        break;

      case `centered`:
        view.alignItems = `center`;
        break;

      case `bottom`:
        view.alignItems = `flex-end`;
        break;
    }

    styles[styleKey] = StyleSheet.create({ view }).view;
  }

  return <View style={styles[styleKey]}>{children}</View>;
};
