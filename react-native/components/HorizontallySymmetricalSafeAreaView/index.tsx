import * as React from "react";
import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const coerceToNumber = (value: undefined | number | string): null | number => {
  if (value === undefined) {
    return null;
  } else if (typeof value === `string`) {
    return Number.parseFloat(value);
  } else {
    return value;
  }
};

/**
 * Similar to SafeAreaView, but ensures that the left and right safe area insets
 * are identical.  This means that, for example, the notch will not push a tab
 * bar's contents off-center when the device is horizontal.
 */
export const HorizontallySymmetricalSafeAreaView: React.FunctionComponent<
  ViewProps & {
    /**
     * When true, the safe area at the top of the screen will be added to any
     * top padding within the style.  It will otherwise use the style's top
     * padding.
     */
    readonly top?: boolean;

    /**
     * When true, the safe area at the bottom of the screen will be added to any
     * bottom padding within the style.  It will otherwise use the style's
     * bottom padding.
     */
    readonly bottom?: boolean;

    /**
     * When true, the widest of the safe areas at the left and right of the
     * screen will be added to any left padding within the style.  It will
     * otherwise use the style's left padding.
     */
    readonly left?: boolean;

    /**
     * When true, the widest of the safe areas at the left and right of the
     * screen will be added to any right padding within the style.  It will
     * otherwise use the style's right padding.
     */
    readonly right?: boolean;
  }
> = ({ style, left, right, top, bottom, ...otherProps }) => {
  const safeAreaInsets = useSafeAreaInsets();

  const horizontalInset = Math.max(safeAreaInsets.left, safeAreaInsets.right);

  let stylePadding: null | number = null;
  let stylePaddingVertical: null | number = null;
  let stylePaddingHorizontal: null | number = null;
  let stylePaddingTop: null | number = null;
  let stylePaddingBottom: null | number = null;
  let stylePaddingLeft: null | number = null;
  let stylePaddingRight: null | number = null;

  const processStyleObject = (styleObject: ViewStyle): void => {
    stylePadding = coerceToNumber(styleObject.padding) ?? stylePadding;
    stylePaddingVertical =
      coerceToNumber(styleObject.paddingVertical) ?? stylePaddingVertical;
    stylePaddingHorizontal =
      coerceToNumber(styleObject.paddingHorizontal) ?? stylePaddingHorizontal;
    stylePaddingTop = coerceToNumber(styleObject.paddingTop) ?? stylePaddingTop;
    stylePaddingBottom =
      coerceToNumber(styleObject.paddingBottom) ?? stylePaddingBottom;
    stylePaddingLeft =
      coerceToNumber(styleObject.paddingLeft) ?? stylePaddingLeft;
    stylePaddingRight =
      coerceToNumber(styleObject.paddingRight) ?? stylePaddingRight;
  };

  const recurseStyleTree = (recursedStyle: StyleProp<ViewStyle>): void => {
    if (Array.isArray(recursedStyle)) {
      for (const child of recursedStyle) {
        recurseStyleTree(child as StyleProp<ViewStyle>);
      }
    } else if (
      recursedStyle !== undefined &&
      typeof recursedStyle !== `object`
    ) {
      throw new Error(
        `Registered styles cannot be used with HorizontallySymmetricalSafeAreaView.`
      );
    } else if (recursedStyle !== undefined && recursedStyle !== null) {
      processStyleObject(recursedStyle as ViewStyle);
    }
  };

  recurseStyleTree(style);

  const styleTop = stylePaddingTop ?? stylePaddingVertical ?? stylePadding ?? 0;
  const effectiveTop = (top ? safeAreaInsets.top : 0) + styleTop;

  const styleBottom =
    stylePaddingBottom ?? stylePaddingVertical ?? stylePadding ?? 0;
  const effectiveBottom = (bottom ? safeAreaInsets.bottom : 0) + styleBottom;

  const styleLeft =
    stylePaddingLeft ?? stylePaddingHorizontal ?? stylePadding ?? 0;
  const effectiveLeft = (left ? horizontalInset : 0) + styleLeft;

  const styleRight =
    stylePaddingRight ?? stylePaddingHorizontal ?? stylePadding ?? 0;
  const effectiveRight = (right ? horizontalInset : 0) + styleRight;

  let composedStyle: StyleProp<ViewStyle>;

  if (
    styleLeft === effectiveLeft &&
    styleRight === effectiveRight &&
    styleTop === effectiveTop &&
    styleBottom === effectiveBottom
  ) {
    composedStyle = style;
  } else {
    const additionalStyle: ViewStyle = {};

    if (
      effectiveTop !== styleTop &&
      effectiveBottom !== styleBottom &&
      effectiveLeft !== styleLeft &&
      effectiveRight !== styleRight &&
      effectiveTop === effectiveBottom &&
      effectiveTop === effectiveLeft &&
      effectiveTop === effectiveRight &&
      stylePaddingVertical === null &&
      stylePaddingHorizontal === null &&
      stylePaddingTop === null &&
      stylePaddingBottom === null &&
      stylePaddingLeft === null &&
      stylePaddingRight === null
    ) {
      additionalStyle.padding = effectiveTop;
    } else {
      if (
        effectiveTop !== styleTop &&
        effectiveBottom !== styleBottom &&
        effectiveTop === effectiveBottom &&
        stylePaddingTop === null &&
        stylePaddingBottom === null
      ) {
        additionalStyle.paddingVertical = effectiveTop;
      } else {
        if (effectiveTop !== styleTop) {
          additionalStyle.paddingTop = effectiveTop;
        }

        if (effectiveBottom !== styleBottom) {
          additionalStyle.paddingBottom = effectiveBottom;
        }
      }

      if (
        effectiveLeft !== styleLeft &&
        effectiveRight !== styleRight &&
        effectiveLeft === effectiveRight &&
        stylePaddingLeft === null &&
        stylePaddingRight === null
      ) {
        additionalStyle.paddingHorizontal = effectiveLeft;
      } else {
        if (effectiveLeft !== styleLeft) {
          additionalStyle.paddingLeft = effectiveLeft;
        }

        if (effectiveRight !== styleRight) {
          additionalStyle.paddingRight = effectiveRight;
        }
      }
    }

    if (style) {
      composedStyle = [style, additionalStyle];
    } else {
      composedStyle = additionalStyle;
    }
  }

  return (
    <View style={composedStyle} pointerEvents="box-none" {...otherProps} />
  );
};
