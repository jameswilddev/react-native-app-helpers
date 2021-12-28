import * as React from "react";
import { StyleSheet, ViewProps } from "react-native";
import { HorizontallySymmetricalSafeAreaView } from "../HorizontallySymmetricalSafeAreaView";

const styles = StyleSheet.create({
  fillsContainerFillsContainer: {
    width: `100%`,
    height: `100%`,
  },
  fitsContentFillsContainer: {
    height: `100%`,
  },
  fillsContainerFitsContent: {
    width: `100%`,
  },
});

/**
 * A SafeAreaView which can be sized to fill its container.
 */
export const SizedHorizontallySymmetricalSafeAreaView: React.FunctionComponent<
  ViewProps & {
    /**
     * When true, the safe area at the top of the screen will be included as
     * padding; it will otherwise not be included.
     */
    readonly top?: boolean;

    /**
     * When true, the safe area at the bottom of the screen will be included as
     * padding; it will otherwise not be included.
     */
    readonly bottom?: boolean;

    /**
     * When true, the widest of the safe areas at the left and right of the
     * screen will be included as left padding; it will otherwise not be
     * included.
     */
    readonly left?: boolean;

    /**
     * When true, the widest of the safe areas at the left and right of the
     * screen will be included as right padding; it will otherwise not be
     * included.
     */
    readonly right?: boolean;

    /**
     * The width of the view.
     */
    readonly width: `fillsContainer` | `fitsContent`;

    /**
     * The height of the view.
     */
    readonly height: `fillsContainer` | `fitsContent`;
  }
> = ({ width, height, ...props }) => {
  if (width === `fillsContainer`) {
    if (height === `fillsContainer`) {
      return (
        <HorizontallySymmetricalSafeAreaView
          style={styles.fillsContainerFillsContainer}
          {...props}
        />
      );
    } else {
      return (
        <HorizontallySymmetricalSafeAreaView
          style={styles.fillsContainerFitsContent}
          {...props}
        />
      );
    }
  } else {
    if (height === `fillsContainer`) {
      return (
        <HorizontallySymmetricalSafeAreaView
          style={styles.fitsContentFillsContainer}
          {...props}
        />
      );
    } else {
      return <HorizontallySymmetricalSafeAreaView {...props} />;
    }
  }
};
