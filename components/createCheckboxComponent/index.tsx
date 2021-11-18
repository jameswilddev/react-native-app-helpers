import * as React from "react";
import { StyleSheet, View, Text, ViewStyle, TextStyle } from "react-native";
import type { CheckboxStateStyle } from "../../types/CheckboxStateStyle";
import type { CheckboxStyle } from "../../types/CheckboxStyle";
import { Hitbox } from "../Hitbox";

const createViewStyle = (
  checkboxStyle: CheckboxStyle,
  checkboxStateStyle: CheckboxStateStyle
): ViewStyle => {
  const output: ViewStyle = {
    backgroundColor: checkboxStateStyle.backgroundColor,
    width: checkboxStyle.boxSize,
    height: checkboxStyle.boxSize,
    justifyContent: `center`,
    alignItems: `center`,
  };

  if (checkboxStateStyle.border !== null) {
    output.borderWidth = checkboxStateStyle.border.width;
    output.borderColor = checkboxStateStyle.border.color;
  }

  if (checkboxStateStyle.radius !== 0) {
    output.borderRadius = checkboxStateStyle.radius;
  }

  const relativeBorderWidth =
    (checkboxStyle.enabledFalse.border === null
      ? 0
      : checkboxStyle.enabledFalse.border.width) -
    (checkboxStateStyle.border === null ? 0 : checkboxStateStyle.border.width);

  if (relativeBorderWidth !== 0) {
    output.margin = relativeBorderWidth;
  }

  return output;
};

const createTextStyle = (
  checkboxStyle: CheckboxStyle,
  checkboxStateStyle: CheckboxStateStyle
): TextStyle => {
  const output: TextStyle = {
    fontFamily: checkboxStyle.fontFamily,
    fontSize: checkboxStyle.fontSize,
    lineHeight: checkboxStyle.fontSize * 1.4,
    color: checkboxStateStyle.color,
  };

  if (checkboxStyle.boxLabelSpacing !== 0) {
    output.paddingLeft = checkboxStyle.boxLabelSpacing;
  }

  return output;
};

/**
 * Creates a React component representing a form checkbox.
 * @param checkboxStyle The style to apply to the checkbox.
 * @returns             The created React component.
 */
export const createCheckboxComponent = (
  checkboxStyle: CheckboxStyle
): React.FunctionComponent<{
  /**
   * When true, the checkbox is checked.  It is otherwise unchecked.
   */
  value: boolean;

  /**
   * Invoked when the checkbox is pressed.
   * @param to True when the checkbox is changing from unchecked to checked,
   *           otherwise, false.
   */
  onChange(to: boolean): void;

  /**
   * When true, the checkbox will show alternative styles and will not accept
   * input.  It will otherwise show its default styles and accept input.
   */
  disabled: boolean;
}> => {
  const styles = StyleSheet.create({
    hitbox: {
      width: `100%`,
      flexDirection: `row`,
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
    enabledTrueText: createTextStyle(checkboxStyle, checkboxStyle.enabledTrue),
  });

  return ({ value, onChange, disabled, children }) => (
    <Hitbox
      disabled={disabled}
      onPress={() => {
        onChange(!value);
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
  );
};
