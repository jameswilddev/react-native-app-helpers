import * as React from 'react'
import {
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle
} from 'react-native'
import type { ButtonStyle } from '../../types/ButtonStyle'
import { Hitbox } from '../Hitbox'
import type { ButtonProps } from '../../types/ButtonProps'

/**
 * Creates a new React component which renders a button.
 * @param buttonStyle The style to apply to the button.
 * @returns
 */
export const createButtonComponent = (
  buttonStyle: ButtonStyle
): React.FunctionComponent<ButtonProps> => {
  const hitboxBase: ViewStyle = {
    alignItems: 'center'
  }

  if (buttonStyle.horizontalPadding !== 0) {
    hitboxBase.paddingHorizontal = buttonStyle.horizontalPadding
  }

  if (buttonStyle.verticalPadding !== 0) {
    hitboxBase.paddingVertical = buttonStyle.verticalPadding
  }

  const textBase: TextStyle = {
    fontFamily: buttonStyle.fontFamily,
    fontSize: buttonStyle.fontSize,
    fontWeight: buttonStyle.fontWeight,
    lineHeight: buttonStyle.fontSize * 1.4
  }

  const defaultHitbox: ViewStyle = {
    ...hitboxBase,
    backgroundColor: buttonStyle.default.backgroundColor
  }

  if (buttonStyle.default.radius !== 0) {
    defaultHitbox.borderRadius = buttonStyle.default.radius
  }

  if (buttonStyle.default.border !== null) {
    defaultHitbox.borderWidth = buttonStyle.default.border.width

    defaultHitbox.borderColor = buttonStyle.default.border.color
  }

  const disabledHitbox: ViewStyle = {
    ...hitboxBase,
    backgroundColor: buttonStyle.disabled.backgroundColor
  }

  if (buttonStyle.disabled.radius !== 0) {
    disabledHitbox.borderRadius = buttonStyle.disabled.radius
  }

  if (buttonStyle.disabled.border !== null) {
    disabledHitbox.borderWidth = buttonStyle.disabled.border.width

    disabledHitbox.borderColor = buttonStyle.disabled.border.color
  }

  const defaultBorderWidth =
    buttonStyle.default.border === null ? 0 : buttonStyle.default.border.width

  const disabledBorderWidth =
    buttonStyle.disabled.border === null
      ? 0
      : buttonStyle.disabled.border.width

  if (defaultBorderWidth !== disabledBorderWidth) {
    disabledHitbox.margin = defaultBorderWidth - disabledBorderWidth
  }

  const leftIconBase: TextStyle = {}

  if (buttonStyle.iconSpacing !== 0) {
    leftIconBase.paddingLeft = buttonStyle.iconSpacing
  }

  const rightIconBase: TextStyle = {}

  if (buttonStyle.iconSpacing !== 0) {
    rightIconBase.paddingRight = buttonStyle.iconSpacing
  }

  const leftAndRightIconsBase: TextStyle = {}

  if (buttonStyle.iconSpacing !== 0) {
    leftAndRightIconsBase.paddingHorizontal = buttonStyle.iconSpacing
  }

  const styles = StyleSheet.create({
    defaultHitbox,
    defaultHitboxWithIcons: {
      ...defaultHitbox,
      justifyContent: 'center',
      flexDirection: 'row'
    },
    defaultText: {
      ...textBase,
      color: buttonStyle.default.color
    },
    defaultTextWithLeftIcon: {
      ...textBase,
      color: buttonStyle.default.color,
      ...leftIconBase
    },
    defaultTextWithRightIcon: {
      ...textBase,
      color: buttonStyle.default.color,
      ...rightIconBase
    },
    defaultTextWithLeftAndRightIcons: {
      ...textBase,
      color: buttonStyle.default.color,
      ...leftAndRightIconsBase
    },
    disabledHitbox,
    disabledHitboxWithIcons: {
      ...disabledHitbox,
      justifyContent: 'center',
      flexDirection: 'row'
    },
    disabledText: {
      ...textBase,
      color: buttonStyle.disabled.color
    },
    disabledTextWithLeftIcon: {
      ...textBase,
      color: buttonStyle.disabled.color,
      ...leftIconBase
    },
    disabledTextWithRightIcon: {
      ...textBase,
      color: buttonStyle.disabled.color,
      ...rightIconBase
    },
    disabledTextWithLeftAndRightIcons: {
      ...textBase,
      color: buttonStyle.disabled.color,
      ...leftAndRightIconsBase
    },
    elementWrapperViewWithLeftIcon: {
      ...leftIconBase
    },
    elementWrapperViewWithRightIcon: {
      ...rightIconBase
    },
    elementWrapperViewWithLeftAndRightIcons: {
      ...leftAndRightIconsBase
    }
  })

  return ({ leftIcon, rightIcon, onPress, disabled, children }) => {
    disabled = disabled ?? false

    const color = disabled
      ? buttonStyle.disabled.color
      : buttonStyle.default.color

    const leftIconElement = leftIcon === null ? null : leftIcon(color)
    const rightIconElement = rightIcon === null ? null : rightIcon(color)

    if (typeof children === 'function') {
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
          )
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
            )
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
            )
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
            )
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
            )
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
            )
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
            )
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
          )
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
          )
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
          )
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
          )
        }
      }
    }
  }
}
