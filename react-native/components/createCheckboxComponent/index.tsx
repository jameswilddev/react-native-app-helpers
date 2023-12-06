import * as React from 'react'
import { StyleSheet, View, Text, type ViewStyle, type TextStyle } from 'react-native'
import type { CheckboxStateStyle } from '../../types/CheckboxStateStyle'
import type { CheckboxStyle } from '../../types/CheckboxStyle'
import { Hitbox } from '../Hitbox'
import type { CheckboxProps } from '../../types/CheckboxProps'

const createViewStyle = (
  checkboxStyle: CheckboxStyle,
  checkboxStateStyle: CheckboxStateStyle
): ViewStyle => {
  const output: ViewStyle = {
    backgroundColor: checkboxStateStyle.backgroundColor,
    width: checkboxStyle.boxSize,
    height: checkboxStyle.boxSize,
    justifyContent: 'center',
    alignItems: 'center'
  }

  if (checkboxStateStyle.border !== null) {
    output.borderWidth = checkboxStateStyle.border.width
    output.borderColor = checkboxStateStyle.border.color
  }

  if (checkboxStateStyle.radius !== 0) {
    output.borderRadius = checkboxStateStyle.radius
  }

  const relativeBorderWidth =
    (checkboxStyle.enabledFalse.border === null
      ? 0
      : checkboxStyle.enabledFalse.border.width) -
    (checkboxStateStyle.border === null ? 0 : checkboxStateStyle.border.width)

  if (relativeBorderWidth !== 0) {
    output.margin = relativeBorderWidth
  }

  if (checkboxStyle.fontSize * 1.4 > checkboxStyle.boxSize) {
    output.marginTop =
      relativeBorderWidth +
      (checkboxStyle.fontSize * 1.4 - checkboxStyle.boxSize) / 2
  }

  return output
}

const createTextStyle = (
  checkboxStyle: CheckboxStyle,
  checkboxStateStyle: CheckboxStateStyle
): TextStyle => {
  const output: TextStyle = {
    fontFamily: checkboxStyle.fontFamily,
    fontSize: checkboxStyle.fontSize,
    lineHeight: checkboxStyle.fontSize * 1.4,
    color: checkboxStateStyle.color
  }

  if (checkboxStyle.boxLabelSpacing !== 0) {
    output.paddingLeft = checkboxStyle.boxLabelSpacing
  }

  if (checkboxStyle.boxSize > checkboxStyle.fontSize * 1.4) {
    output.paddingTop =
      (checkboxStyle.boxSize - checkboxStyle.fontSize * 1.4) / 2
  }

  return output
}

/**
 * Creates a React component representing a form checkbox.
 * @param checkboxStyle The style to apply to the checkbox.
 * @returns             The created React component.
 */
export const createCheckboxComponent = (
  checkboxStyle: CheckboxStyle
): React.FunctionComponent<CheckboxProps> => {
  const styles = StyleSheet.create({
    hitbox: {
      width: '100%',
      flexDirection: 'row'
    },
    disabledFalseView: createViewStyle(
      checkboxStyle,
      checkboxStyle.disabledFalse
    ),
    disabledTrueView: createViewStyle(
      checkboxStyle,
      checkboxStyle.disabledTrue
    ),
    enabledFalseView: createViewStyle(
      checkboxStyle,
      checkboxStyle.enabledFalse
    ),
    enabledTrueView: createViewStyle(checkboxStyle, checkboxStyle.enabledTrue),
    disabledFalseText: createTextStyle(
      checkboxStyle,
      checkboxStyle.disabledFalse
    ),
    disabledTrueText: createTextStyle(
      checkboxStyle,
      checkboxStyle.disabledTrue
    ),
    enabledFalseText: createTextStyle(
      checkboxStyle,
      checkboxStyle.enabledFalse
    ),
    enabledTrueText: createTextStyle(checkboxStyle, checkboxStyle.enabledTrue)
  })

  const Checkbox: React.FunctionComponent<CheckboxProps> = ({ value, onChange, disabled, children }) => (
    <Hitbox
      disabled={disabled}
      onPress={() => {
        onChange(!value)
      }}
      style={styles.hitbox}
    >
      <View
        style={
          value
            ? disabled
              ? styles.disabledTrueView
              : styles.enabledTrueView
            : disabled
              ? styles.disabledFalseView
              : styles.enabledFalseView
        }
      >
        {value
          ? disabled
            ? checkboxStyle.disabledTrue.boxChild
            : checkboxStyle.enabledTrue.boxChild
          : disabled
            ? checkboxStyle.disabledFalse.boxChild
            : checkboxStyle.enabledFalse.boxChild}
      </View>
      <Text
        style={
          value
            ? disabled
              ? styles.disabledTrueText
              : styles.enabledTrueText
            : disabled
              ? styles.disabledFalseText
              : styles.enabledFalseText
        }
      >
        {children}
      </Text>
    </Hitbox>
  )

  return Checkbox
}
