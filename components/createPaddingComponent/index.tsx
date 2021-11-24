import * as React from "react";
import { StyleSheet, View } from "react-native";

const globalStyles = StyleSheet.create({
  containerFillingView: {
    width: `100%`,
    height: `100%`,
    flex: 1,
  },
});

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
): React.FunctionComponent<{
  readonly size: `fitsContent` | `fillsContainer`;
}> => {
  const contentFittingView: { [key: string]: number } = {};

  switch (paddings.length) {
    case 1:
      if (paddings[0]) {
        contentFittingView[`padding`] = paddings[0];
      }
      break;

    case 2:
      if (paddings[0]) {
        contentFittingView[`paddingVertical`] = paddings[0];
      }

      if (paddings[1]) {
        contentFittingView[`paddingHorizontal`] = paddings[1];
      }
      break;

    case 4:
      if (paddings[0]) {
        contentFittingView[`paddingTop`] = paddings[0];
      }

      if (paddings[1]) {
        contentFittingView[`paddingRight`] = paddings[1];
      }

      if (paddings[2]) {
        contentFittingView[`paddingBottom`] = paddings[2];
      }

      if (paddings[3]) {
        contentFittingView[`paddingLeft`] = paddings[3];
      }
      break;
  }

  if (Object.keys(contentFittingView).length === 0) {
    return ({ size, children }) =>
      size === `fillsContainer` ? (
        <View
          style={globalStyles.containerFillingView}
          pointerEvents="box-none"
        >
          {children}
        </View>
      ) : (
        <View pointerEvents="box-none">{children}</View>
      );
  } else {
    const localStyles = StyleSheet.create({
      contentFittingView,
      containerFillingView: {
        ...contentFittingView,
        flex: 1,
        width: `100%`,
        height: `100%`,
      },
    });

    return ({ size, children }) =>
      size === `fillsContainer` ? (
        <View pointerEvents="box-none" style={localStyles.containerFillingView}>
          {children}
        </View>
      ) : (
        <View pointerEvents="box-none" style={localStyles.contentFittingView}>
          {children}
        </View>
      );
  }
};
