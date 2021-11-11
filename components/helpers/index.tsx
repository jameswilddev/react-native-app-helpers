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

export const createDropDownStateStyleInstance = (
  controlStateStyle: ControlStateStyle,
  maxHeight: number
): ViewStyle => {
  const output: ViewStyle = {
    position: `absolute`,
    maxHeight,
    backgroundColor: controlStateStyle.backgroundColor,
    overflow: `hidden`,
  };

  if (controlStateStyle.radius !== 0) {
    output.borderRadius = controlStateStyle.radius;
  }

  if (controlStateStyle.border !== null) {
    output.borderWidth = controlStateStyle.border.width;
    output.borderColor = controlStateStyle.border.color;
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

export const createControlPlaceholderTextStyleInstance = (
  controlStyle: ControlStyle,
  controlStateStyle: ControlStateStyle
): TextStyle => {
  const output: TextStyle = createControlTextStyleInstance(
    controlStyle,
    controlStateStyle
  );

  output.color = controlStateStyle.placeholderColor;

  return output;
};

export const withoutTopBorder = (input: ViewStyle): ViewStyle => {
  const output = { ...input };

  if (output.borderWidth) {
    output.borderTopWidth = 0;
  }

  if (output.borderRadius) {
    output.borderBottomLeftRadius = output.borderRadius;
    output.borderBottomRightRadius = output.borderRadius;
    delete output.borderRadius;
  }

  if (output.margin) {
    output.marginTop = 0;
  }

  return output;
};

export const withoutBottomBorder = (input: ViewStyle): ViewStyle => {
  const output = { ...input };

  if (output.borderWidth) {
    output.borderBottomWidth = 0;
  }

  if (output.borderRadius) {
    output.borderTopLeftRadius = output.borderRadius;
    output.borderTopRightRadius = output.borderRadius;
    delete output.borderRadius;
  }

  if (output.margin) {
    output.marginBottom = 0;
  }

  return output;
};

export const shadow = (radius: number): ViewStyle => {
  if (radius < 0) {
    throw new Error(`Shadow radius cannot be less than 0.`);
  }

  if (radius > 24) {
    throw new Error(`Shadow radius cannot be greater than 24.`);
  }

  return {
    elevation: radius,
    shadowColor: `black`,
    shadowOffset: { width: 0, height: radius / 2 },
    shadowRadius: (radius * 2) / 3,
    shadowOpacity: 0.3,
  };
};
