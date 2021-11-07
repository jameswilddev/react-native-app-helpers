import type { TextStyle, ViewStyle } from "react-native";
import type { ControlStyle } from "../../types/ControlStyle";
import type { ControlStateStyle } from "../../types/ControlStateStyle";

export const createControlStyleInstance = (
  controlStyle: ControlStyle,
  controlStateStyle: ControlStateStyle
): ViewStyle => {
  const output: ViewStyle = {
    backgroundColor: controlStateStyle.backgroundColor,
    flexDirection: `row`,
    alignItems: "center",
  };

  if (controlStyle.paddingHorizontal) {
    output.paddingHorizontal = controlStyle.paddingHorizontal;
  }

  if (controlStateStyle.radius) {
    output.borderRadius = controlStateStyle.radius;
  }

  if (controlStateStyle.border !== null) {
    output.borderWidth = controlStateStyle.border.width;
    output.borderColor = controlStateStyle.border.color;
  }

  return output;
};

export const createControlStateStyleInstance = (
  controlStyle: ControlStyle,
  controlStateStyle: ControlStateStyle
): ViewStyle => {
  const output = createControlStyleInstance(controlStyle, controlStateStyle);

  const effectiveBorderWidth =
    controlStateStyle.border === null ? 0 : controlStateStyle.border.width;
  const effectiveRelativeToBorderWidth =
    controlStyle.blurredValid.border === null
      ? 0
      : controlStyle.blurredValid.border.width;

  if (effectiveBorderWidth !== effectiveRelativeToBorderWidth) {
    output.margin = effectiveRelativeToBorderWidth - effectiveBorderWidth;
  }

  return output;
};

export const createControlTextStyleInstance = (
  controlStyle: ControlStyle,
  controlStateStyle: ControlStateStyle
): TextStyle => {
  const output: TextStyle = {
    flexGrow: 1,
    color: controlStateStyle.textColor,
    fontFamily: controlStyle.fontFamily,
    fontSize: controlStyle.fontSize,
    lineHeight: controlStyle.fontSize * 1.4,
  };

  if (controlStyle.paddingVertical) {
    output.paddingVertical = controlStyle.paddingVertical;
  }

  return output;
};
