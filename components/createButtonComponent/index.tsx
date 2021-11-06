import * as React from "react";
import {
  ColorValue,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
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
  const touchableWithoutFeedbackBase: ViewStyle = {
    justifyContent: `center`,
    alignItems: `center`,
  };

  if (buttonStyle.horizontalPadding) {
    touchableWithoutFeedbackBase.paddingHorizontal =
      buttonStyle.horizontalPadding;
  }

  if (buttonStyle.verticalPadding) {
    touchableWithoutFeedbackBase.paddingVertical = buttonStyle.verticalPadding;
  }

  const textBase: TextStyle = {
    fontFamily: buttonStyle.fontFamily,
    fontSize: buttonStyle.fontSize,
    lineHeight: buttonStyle.fontSize * 1.4,
  };

  const defaultTouchableWithoutFeedback: ViewStyle = {
    ...touchableWithoutFeedbackBase,
    backgroundColor: buttonStyle.default.backgroundColor,
  };

  if (buttonStyle.default.radius !== 0) {
    defaultTouchableWithoutFeedback.borderRadius = buttonStyle.default.radius;
  }

  if (buttonStyle.default.border !== null) {
    defaultTouchableWithoutFeedback.borderWidth =
      buttonStyle.default.border.width;

    defaultTouchableWithoutFeedback.borderColor =
      buttonStyle.default.border.color;
  }

  const disabledTouchableWithoutFeedback: ViewStyle = {
    ...touchableWithoutFeedbackBase,
    backgroundColor: buttonStyle.disabled.backgroundColor,
  };

  if (buttonStyle.disabled.radius !== 0) {
    disabledTouchableWithoutFeedback.borderRadius = buttonStyle.disabled.radius;
  }

  if (buttonStyle.disabled.border !== null) {
    disabledTouchableWithoutFeedback.borderWidth =
      buttonStyle.disabled.border.width;

    disabledTouchableWithoutFeedback.borderColor =
      buttonStyle.disabled.border.color;
  }

  const defaultBorderWidth =
    buttonStyle.default.border === null ? 0 : buttonStyle.default.border.width;

  const disabledBorderWidth =
    buttonStyle.disabled.border === null
      ? 0
      : buttonStyle.disabled.border.width;

  if (defaultBorderWidth !== disabledBorderWidth) {
    disabledTouchableWithoutFeedback.margin =
      defaultBorderWidth - disabledBorderWidth;
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
    defaultTouchableWithoutFeedback,
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
    disabledTouchableWithoutFeedback,
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
          <TouchableWithoutFeedback
            onPress={onPress}
            disabled={disabled}
            style={
              disabled
                ? styles.disabledTouchableWithoutFeedback
                : styles.defaultTouchableWithoutFeedback
            }
          >
            <Text style={disabled ? styles.disabledText : styles.defaultText}>
              {children}
            </Text>
          </TouchableWithoutFeedback>
        );
      } else {
        return (
          <TouchableWithoutFeedback
            onPress={onPress}
            disabled={disabled}
            style={
              disabled
                ? styles.disabledTouchableWithoutFeedback
                : styles.defaultTouchableWithoutFeedback
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
          </TouchableWithoutFeedback>
        );
      }
    } else {
      if (rightIconElement === null) {
        return (
          <TouchableWithoutFeedback
            onPress={onPress}
            disabled={disabled}
            style={
              disabled
                ? styles.disabledTouchableWithoutFeedback
                : styles.defaultTouchableWithoutFeedback
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
          </TouchableWithoutFeedback>
        );
      } else {
        return (
          <TouchableWithoutFeedback
            onPress={onPress}
            disabled={disabled}
            style={
              disabled
                ? styles.disabledTouchableWithoutFeedback
                : styles.defaultTouchableWithoutFeedback
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
          </TouchableWithoutFeedback>
        );
      }
    }
  };
};
