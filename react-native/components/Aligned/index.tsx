import * as React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

const base: { readonly width: string; readonly height: string } = {
  width: `100%`,
  height: `100%`,
};

const top: { readonly justifyContent: `flex-start` } = {
  justifyContent: `flex-start`,
};

const verticalCenter: { readonly justifyContent: `center` } = {
  justifyContent: `center`,
};

const bottom: { readonly justifyContent: `flex-end` } = {
  justifyContent: `flex-end`,
};

const left: { readonly alignItems: `flex-start` } = {
  alignItems: `flex-start`,
};

const horizontalCenter: { readonly alignItems: `center` } = {
  alignItems: `center`,
};

const right: { readonly alignItems: `flex-end` } = {
  alignItems: `flex-end`,
};

const styles = StyleSheet.create({
  leftTop: { ...base, ...left, ...top },
  centerTop: { ...base, ...horizontalCenter, ...top },
  rightTop: { ...base, ...right, ...top },
  leftCenter: { ...base, ...left, ...verticalCenter },
  centerCenter: { ...base, ...horizontalCenter, ...verticalCenter },
  rightCenter: { ...base, ...right, ...verticalCenter },
  leftBottom: { ...base, ...left, ...bottom },
  centerBottom: { ...base, ...horizontalCenter, ...bottom },
  rightBottom: { ...base, ...right, ...bottom },
});

/**
 * A React component which fills its container and aligns its children
 * horizontally and vertically.
 */
export const Aligned: React.FunctionComponent<
  React.PropsWithChildren<{
    readonly horizontally: `left` | `centered` | `right`;
    readonly vertically: `top` | `centered` | `bottom`;
  }>
> = ({ horizontally, vertically, children }) => {
  let style: ViewStyle;

  switch (horizontally) {
    case `left`:
      switch (vertically) {
        case `top`:
          style = styles.leftTop;
          break;

        case `centered`:
          style = styles.leftCenter;
          break;

        case `bottom`:
          style = styles.leftBottom;
          break;
      }
      break;

    case `centered`:
      switch (vertically) {
        case `top`:
          style = styles.centerTop;
          break;

        case `centered`:
          style = styles.centerCenter;
          break;

        case `bottom`:
          style = styles.centerBottom;
          break;
      }
      break;

    case `right`:
      switch (vertically) {
        case `top`:
          style = styles.rightTop;
          break;

        case `centered`:
          style = styles.rightCenter;
          break;

        case `bottom`:
          style = styles.rightBottom;
          break;
      }
      break;
  }

  return (
    <View style={style} pointerEvents="box-none">
      {children}
    </View>
  );
};
