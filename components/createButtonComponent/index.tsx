import * as React from "react";
import {
  ColorValue,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import type { ButtonStyle } from "../../types/ButtonStyle";

/**
 * Creates a new React component which renders a button.
 * @param buttonStyle The style to apply to the button.
 * @returns
 */
export const createButtonComponent = (
  buttonStyle: ButtonStyle
): React.FunctionComponent<{
  /**
   * Renders the button's left icon.
   * @param color The color of the icon.
   * @returns The icon to show, or null if no icon is to be shown.
   */
  leftIcon(color: ColorValue): null | React.ReactNode | JSX.Element;

  /**
   * Renders the button's right icon.
   * @param color The color of the icon.
   * @returns The icon to show, or null if no icon is to be shown.
   */
  rightIcon(color: ColorValue): null | React.ReactNode | JSX.Element;

  /**
   * Executed when the button is pressed.
   */
  onPress(): void;

  /**
   * When true, the button is disabled and does not accept input.
   * When false, the button is not disabled and accepts input.
   */
  readonly disabled: boolean;
}> => {
  const TouchableOpacityBase: ViewStyle = {
    justifyContent: `center`,
    alignItems: `center`,
  };

  if (buttonStyle.horizontalPadding) {
    TouchableOpacityBase.paddingHorizontal = buttonStyle.horizontalPadding;
  }

  if (buttonStyle.verticalPadding) {
    TouchableOpacityBase.paddingVertical = buttonStyle.verticalPadding;
  }

  const textBase: TextStyle = {
    fontFamily: buttonStyle.fontFamily,
    fontSize: buttonStyle.fontSize,
    lineHeight: buttonStyle.fontSize * 1.4,
  };

  const defaultTouchableOpacity: ViewStyle = {
    ...TouchableOpacityBase,
    backgroundColor: buttonStyle.default.backgroundColor,
  };

  if (buttonStyle.default.radius !== 0) {
    defaultTouchableOpacity.borderRadius = buttonStyle.default.radius;
  }

  if (buttonStyle.default.border !== null) {
    defaultTouchableOpacity.borderWidth = buttonStyle.default.border.width;

    defaultTouchableOpacity.borderColor = buttonStyle.default.border.color;
  }

  const disabledTouchableOpacity: ViewStyle = {
    ...TouchableOpacityBase,
    backgroundColor: buttonStyle.disabled.backgroundColor,
  };

  if (buttonStyle.disabled.radius !== 0) {
    disabledTouchableOpacity.borderRadius = buttonStyle.disabled.radius;
  }

  if (buttonStyle.disabled.border !== null) {
    disabledTouchableOpacity.borderWidth = buttonStyle.disabled.border.width;

    disabledTouchableOpacity.borderColor = buttonStyle.disabled.border.color;
  }

  const defaultBorderWidth =
    buttonStyle.default.border === null ? 0 : buttonStyle.default.border.width;

  const disabledBorderWidth =
    buttonStyle.disabled.border === null
      ? 0
      : buttonStyle.disabled.border.width;

  if (defaultBorderWidth !== disabledBorderWidth) {
    disabledTouchableOpacity.margin = defaultBorderWidth - disabledBorderWidth;
  }

  const leftIconBase: TextStyle = {};

  if (buttonStyle.horizontalPadding) {
    leftIconBase.paddingLeft = buttonStyle.horizontalPadding;
  }

  const rightIconBase: TextStyle = {};

  if (buttonStyle.horizontalPadding) {
    rightIconBase.paddingRight = buttonStyle.horizontalPadding;
  }

  const leftAndRightIconsBase: TextStyle = {};

  if (buttonStyle.horizontalPadding) {
    leftAndRightIconsBase.paddingHorizontal = buttonStyle.horizontalPadding;
  }

  const styles = StyleSheet.create({
    defaultTouchableOpacity,
    defaultText: {
      ...textBase,
      color: buttonStyle.default.color,
    },
    defaultTextWithLeftIcon: {
      ...textBase,
      color: buttonStyle.default.color,
      ...leftIconBase,
    },
    defaultTextWithRightIcon: {
      ...textBase,
      color: buttonStyle.default.color,
      ...rightIconBase,
    },
    defaultTextWithLeftAndRightIcons: {
      ...textBase,
      color: buttonStyle.default.color,
      ...leftAndRightIconsBase,
    },
    disabledTouchableOpacity,
    disabledText: {
      ...textBase,
      color: buttonStyle.disabled.color,
    },
    disabledTextWithLeftIcon: {
      ...textBase,
      color: buttonStyle.disabled.color,
      ...leftIconBase,
    },
    disabledTextWithRightIcon: {
      ...textBase,
      color: buttonStyle.disabled.color,
      ...rightIconBase,
    },
    disabledTextWithLeftAndRightIcons: {
      ...textBase,
      color: buttonStyle.disabled.color,
      ...leftAndRightIconsBase,
    },
  });

  return ({ leftIcon, rightIcon, onPress, disabled, children }) => {
    const color = disabled
      ? buttonStyle.disabled.color
      : buttonStyle.default.color;

    const leftIconElement = leftIcon(color);
    const rightIconElement = rightIcon(color);

    if (leftIconElement === null) {
      if (rightIconElement === null) {
        return (
          <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={
              disabled
                ? styles.disabledTouchableOpacity
                : styles.defaultTouchableOpacity
            }
          >
            <Text style={disabled ? styles.disabledText : styles.defaultText}>
              {children}
            </Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={
              disabled
                ? styles.disabledTouchableOpacity
                : styles.defaultTouchableOpacity
            }
          >
            <Text
              style={
                disabled
                  ? styles.disabledTextWithRightIcon
                  : styles.defaultTextWithRightIcon
              }
            >
              {children}
            </Text>
            {rightIconElement}
          </TouchableOpacity>
        );
      }
    } else {
      if (rightIconElement === null) {
        return (
          <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={
              disabled
                ? styles.disabledTouchableOpacity
                : styles.defaultTouchableOpacity
            }
          >
            {leftIconElement}
            <Text
              style={
                disabled
                  ? styles.disabledTextWithLeftIcon
                  : styles.defaultTextWithLeftIcon
              }
            >
              {children}
            </Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={
              disabled
                ? styles.disabledTouchableOpacity
                : styles.defaultTouchableOpacity
            }
          >
            {leftIconElement}
            <Text
              style={
                disabled
                  ? styles.disabledTextWithLeftAndRightIcons
                  : styles.defaultTextWithLeftAndRightIcons
              }
            >
              {children}
            </Text>
            {rightIconElement}
          </TouchableOpacity>
        );
      }
    }
  };
};
