import * as React from "react";
import { StyleSheet } from "react-native";
import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from "react-native-safe-area-context";

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
export const SizedSafeAreaView: React.FunctionComponent<
  NativeSafeAreaViewProps & {
    readonly width: `fillsContainer` | `fitsContent`;
    readonly height: `fillsContainer` | `fitsContent`;
  }
> = ({ width, height, ...props }) => {
  if (width === `fillsContainer`) {
    if (height === `fillsContainer`) {
      return (
        <SafeAreaView
          pointerEvents="box-none"
          style={styles.fillsContainerFillsContainer}
          {...props}
        />
      );
    } else {
      return (
        <SafeAreaView
          pointerEvents="box-none"
          style={styles.fillsContainerFitsContent}
          {...props}
        />
      );
    }
  } else {
    if (height === `fillsContainer`) {
      return (
        <SafeAreaView
          pointerEvents="box-none"
          style={styles.fitsContentFillsContainer}
          {...props}
        />
      );
    } else {
      return <SafeAreaView pointerEvents="box-none" {...props} />;
    }
  }
};
