import * as React from "react";
import { StyleSheet, View } from "react-native";

/**
 * Creates a new React component which surrounds its children with padding.
 * @param paddings The padding values, where:
 *                 - One padding is applied on all sides.
 *                 - Two paddings are applied vertically then horizontally.
 *                 - Four paddings are applied to the top, right, bottom and
 *                   left.
 * @returns A new React component which surrounds its children with padding.
 */
export const createPaddingComponent = (
  ...paddings:
    | readonly [number]
    | readonly [number, number]
    | readonly [number, number, number, number]
): React.FunctionComponent => {
  const view: { [key: string]: number } = {};

  switch (paddings.length) {
    case 1:
      if (paddings[0]) {
        view[`padding`] = paddings[0];
      }
      break;

    case 2:
      if (paddings[0]) {
        view[`paddingVertical`] = paddings[0];
      }

      if (paddings[1]) {
        view[`paddingHorizontal`] = paddings[1];
      }
      break;

    case 4:
      if (paddings[0]) {
        view[`paddingTop`] = paddings[0];
      }

      if (paddings[1]) {
        view[`paddingRight`] = paddings[1];
      }

      if (paddings[2]) {
        view[`paddingBottom`] = paddings[2];
      }

      if (paddings[3]) {
        view[`paddingLeft`] = paddings[3];
      }
      break;
  }

  if (Object.keys(view).length === 0) {
    return ({ children }) => <View pointerEvents="box-none">{children}</View>;
  } else {
    const styles = StyleSheet.create({ view });

    return ({ children }) => (
      <View pointerEvents="box-none" style={styles.view}>
        {children}
      </View>
    );
  }
};
