import * as React from "react";
import {
  ColorValue,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import type { ButtonStyle } from "../../types/ButtonStyle";
import { Hitbox } from "../Hitbox";

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
  leftIcon?(color: ColorValue): null | React.ReactNode | JSX.Element;

  /**
   * Renders the button's right icon.
   * @param color The color of the icon.
   * @returns The icon to show, or null if no icon is to be shown.
   */
  rightIcon?(color: ColorValue): null | React.ReactNode | JSX.Element;

  /**
   * Executed when the button is pressed.
   */
  onPress(): void;

  /**
   * When true, the button is disabled and does not accept input.
   * When false, the button is not disabled and accepts input.
   */
  readonly disabled?: undefined | boolean;

  /**
   * The contents of the button.  This can be null (indicating no content), a
   * string, or a function which returns a custom element to display.
   */
  readonly children:
    | string
    | ((color: ColorValue) => null | React.ReactNode | JSX.Element);
}> => {
  const hitboxBase: ViewStyle = {
    alignItems: `center`,
  };

  if (buttonStyle.horizontalPadding) {
    hitboxBase.paddingHorizontal = buttonStyle.horizontalPadding;
  }

  if (buttonStyle.verticalPadding) {
    hitboxBase.paddingVertical = buttonStyle.verticalPadding;
  }

  const textBase: TextStyle = {
    fontFamily: buttonStyle.fontFamily,
    fontSize: buttonStyle.fontSize,
    lineHeight: buttonStyle.fontSize * 1.4,
  };

  const defaultHitbox: ViewStyle = {
    ...hitboxBase,
    backgroundColor: buttonStyle.default.backgroundColor,
  };

  if (buttonStyle.default.radius !== 0) {
    defaultHitbox.borderRadius = buttonStyle.default.radius;
  }

  if (buttonStyle.default.border !== null) {
    defaultHitbox.borderWidth = buttonStyle.default.border.width;

    defaultHitbox.borderColor = buttonStyle.default.border.color;
  }

  const disabledHitbox: ViewStyle = {
    ...hitboxBase,
    backgroundColor: buttonStyle.disabled.backgroundColor,
  };

  if (buttonStyle.disabled.radius !== 0) {
    disabledHitbox.borderRadius = buttonStyle.disabled.radius;
  }

  if (buttonStyle.disabled.border !== null) {
    disabledHitbox.borderWidth = buttonStyle.disabled.border.width;

    disabledHitbox.borderColor = buttonStyle.disabled.border.color;
  }

  const defaultBorderWidth =
    buttonStyle.default.border === null ? 0 : buttonStyle.default.border.width;

  const disabledBorderWidth =
    buttonStyle.disabled.border === null
      ? 0
      : buttonStyle.disabled.border.width;

  if (defaultBorderWidth !== disabledBorderWidth) {
    disabledHitbox.margin = defaultBorderWidth - disabledBorderWidth;
  }

  const leftIconBase: TextStyle = {};

  if (buttonStyle.iconSpacing) {
    leftIconBase.paddingLeft = buttonStyle.iconSpacing;
  }

  const rightIconBase: TextStyle = {};

  if (buttonStyle.iconSpacing) {
    rightIconBase.paddingRight = buttonStyle.iconSpacing;
  }

  const leftAndRightIconsBase: TextStyle = {};

  if (buttonStyle.iconSpacing) {
    leftAndRightIconsBase.paddingHorizontal = buttonStyle.iconSpacing;
  }

  const styles = StyleSheet.create({
    defaultHitbox,
    defaultHitboxWithIcons: {
      ...defaultHitbox,
      justifyContent: `center`,
      flexDirection: `row`,
    },
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
    disabledHitbox,
    disabledHitboxWithIcons: {
      ...disabledHitbox,
      justifyContent: `center`,
      flexDirection: `row`,
    },
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
    elementWrapperViewWithLeftIcon: {
      ...leftIconBase,
    },
    elementWrapperViewWithRightIcon: {
      ...rightIconBase,
    },
    elementWrapperViewWithLeftAndRightIcons: {
      ...leftAndRightIconsBase,
    },
  });

  return ({ leftIcon, rightIcon, onPress, disabled, children }) => {
    disabled = disabled ?? false;

    const color = disabled
      ? buttonStyle.disabled.color
      : buttonStyle.default.color;

    const leftIconElement = leftIcon ? leftIcon(color) : null;
    const rightIconElement = rightIcon ? rightIcon(color) : null;

    if (typeof children === `function`) {
      if (leftIconElement === null) {
        if (rightIconElement === null) {
          return (
            <Hitbox
              onPress={onPress}
              disabled={disabled}
              style={disabled ? styles.disabledHitbox : styles.defaultHitbox}
            >
              {children(color)}
            </Hitbox>
          );
        } else {
          if (buttonStyle.iconSpacing === 0) {
            return (
              <Hitbox
                onPress={onPress}
                disabled={disabled}
                style={
                  disabled
                    ? styles.disabledHitboxWithIcons
                    : styles.defaultHitboxWithIcons
                }
              >
                {children(color)}
                {rightIconElement}
              </Hitbox>
            );
          } else {
            return (
              <Hitbox
                onPress={onPress}
                disabled={disabled}
                style={
                  disabled
                    ? styles.disabledHitboxWithIcons
                    : styles.defaultHitboxWithIcons
                }
              >
                <View style={styles.elementWrapperViewWithRightIcon}>
                  {children(color)}
                </View>
                {rightIconElement}
              </Hitbox>
            );
          }
        }
      } else {
        if (rightIconElement === null) {
          if (buttonStyle.iconSpacing === 0) {
            return (
              <Hitbox
                onPress={onPress}
                disabled={disabled}
                style={
                  disabled
                    ? styles.disabledHitboxWithIcons
                    : styles.defaultHitboxWithIcons
                }
              >
                {leftIconElement}
                {children(color)}
              </Hitbox>
            );
          } else {
            return (
              <Hitbox
                onPress={onPress}
                disabled={disabled}
                style={
                  disabled
                    ? styles.disabledHitboxWithIcons
                    : styles.defaultHitboxWithIcons
                }
              >
                {leftIconElement}
                <View style={styles.elementWrapperViewWithLeftIcon}>
                  {children(color)}
                </View>
              </Hitbox>
            );
          }
        } else {
          if (buttonStyle.iconSpacing === 0) {
            return (
              <Hitbox
                onPress={onPress}
                disabled={disabled}
                style={
                  disabled
                    ? styles.disabledHitboxWithIcons
                    : styles.defaultHitboxWithIcons
                }
              >
                {leftIconElement}
                {children(color)}
                {rightIconElement}
              </Hitbox>
            );
          } else {
            return (
              <Hitbox
                onPress={onPress}
                disabled={disabled}
                style={
                  disabled
                    ? styles.disabledHitboxWithIcons
                    : styles.defaultHitboxWithIcons
                }
              >
                {leftIconElement}
                <View style={styles.elementWrapperViewWithLeftAndRightIcons}>
                  {children(color)}
                </View>
                {rightIconElement}
              </Hitbox>
            );
          }
        }
      }
    } else {
      if (leftIconElement === null) {
        if (rightIconElement === null) {
          return (
            <Hitbox
              onPress={onPress}
              disabled={disabled}
              style={disabled ? styles.disabledHitbox : styles.defaultHitbox}
            >
              <Text style={disabled ? styles.disabledText : styles.defaultText}>
                {children}
              </Text>
            </Hitbox>
          );
        } else {
          return (
            <Hitbox
              onPress={onPress}
              disabled={disabled}
              style={
                disabled
                  ? styles.disabledHitboxWithIcons
                  : styles.defaultHitboxWithIcons
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
            </Hitbox>
          );
        }
      } else {
        if (rightIconElement === null) {
          return (
            <Hitbox
              onPress={onPress}
              disabled={disabled}
              style={
                disabled
                  ? styles.disabledHitboxWithIcons
                  : styles.defaultHitboxWithIcons
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
            </Hitbox>
          );
        } else {
          return (
            <Hitbox
              onPress={onPress}
              disabled={disabled}
              style={
                disabled
                  ? styles.disabledHitboxWithIcons
                  : styles.defaultHitboxWithIcons
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
            </Hitbox>
          );
        }
      }
    }
  };
};
