import * as React from "react";
import {
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useRefresh } from "../../hooks/useRefresh";
import type { ControlStateStyle } from "../../types/ControlStateStyle";
import type { ControlStyle } from "../../types/ControlStyle";

const createViewStyle = (
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

const createRelativeViewStyle = (
  controlStyle: ControlStyle,
  controlStateStyle: ControlStateStyle,
  relativeTo: ControlStateStyle
): ViewStyle => {
  const output = createViewStyle(controlStyle, controlStateStyle);

  const effectiveBorderWidth =
    controlStateStyle.border === null ? 0 : controlStateStyle.border.width;
  const effectiveRelativeToBorderWidth =
    relativeTo.border === null ? 0 : relativeTo.border.width;

  if (effectiveBorderWidth !== effectiveRelativeToBorderWidth) {
    output.margin = effectiveRelativeToBorderWidth - effectiveBorderWidth;
  }

  return output;
};

const createTextInputStyle = (
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

/**
 * Creates a React component which allows for the editing of text.
 * @template T         The type of value which results from the editing of
 *                     text.
 * @param stringify    A function which takes the value passed into the
 *                     component and transforms it into raw text for editing.
 * @param tryParse     A function which attempts to convert raw text back into
 *                     a value to output, returning undefined if this is not
 *                     possible.
 * @param controlStyle The styling to use.
 * @param multiLine    When true, the text may wrap onto multiple lines.  It
 *                     will otherwise scroll one line horizontally.
 * @param autoComplete The type of auto-complete suggestions to provide.
 * @param keyboardType The type of keyboard to show.
 * @returns            A React component which allows for the editing of text.
 */
export function createInputComponent<T>(
  stringify: (value: T) => string,
  tryParse: (value: string) => undefined | T,
  controlStyle: ControlStyle,
  multiLine: boolean,
  autoComplete: `off` | `email` | `password`,
  keyboardType: `default` | `email-address` | `numeric`
): React.FunctionComponent<{
  /**
   * The icon to show on the left side, if any, else, null.
   */
  leftIcon: null | React.ReactNode | JSX.Element;

  /**
   * The icon to show on the right side, if any, else, null.
   */
  rightIcon: null | React.ReactNode | JSX.Element;

  /**
   * The value to edit.  When undefined, it is treated as an invalid empty
   * string.
   */
  value: undefined | T;

  /**
   * Invoked when the user edits the text in the box.
   * @param parsed   The value parsed, or undefined should it not be parseable.
   * @param complete True when the user has finished editing, otherwise, false.
   */
  onChange(parsed: undefined | T, complete: boolean): void;

  /**
   * When true, the text value is starred out rather than being rendered (for
   * password fields).
   */
  secureTextEntry: boolean;

  /**
   * When true, the text box is rendered semi-transparently and does not accept
   * focus or input.
   */
  disabled: boolean;

  /**
   * Text to be shown when no value has been entered.
   */
  placeholder: string;

  /**
   * Invoked when the content of the text box is valid and the enter key is
   * pressed.
   * @param parsed The parsed value.
   */
  onSubmit(parsed: T): void;
}> {
  const withLeftIcon: TextStyle = controlStyle.paddingHorizontal
    ? { paddingLeft: controlStyle.paddingHorizontal }
    : {};

  const withRightIcon: TextStyle = controlStyle.paddingHorizontal
    ? { paddingRight: controlStyle.paddingHorizontal }
    : {};

  const withLeftAndRightIcons: TextStyle = controlStyle.paddingHorizontal
    ? { paddingHorizontal: controlStyle.paddingHorizontal }
    : {};

  const styles = StyleSheet.create({
    blurredValidView: createViewStyle(controlStyle, controlStyle.blurredValid),
    blurredInvalidView: createRelativeViewStyle(
      controlStyle,
      controlStyle.blurredInvalid,
      controlStyle.blurredValid
    ),
    focusedValidView: createRelativeViewStyle(
      controlStyle,
      controlStyle.focusedValid,
      controlStyle.blurredValid
    ),
    focusedInvalidView: createRelativeViewStyle(
      controlStyle,
      controlStyle.focusedInvalid,
      controlStyle.blurredValid
    ),
    disabledValidView: {
      ...createViewStyle(controlStyle, controlStyle.blurredValid),
      opacity: 0.5,
    },
    disabledInvalidView: {
      ...createRelativeViewStyle(
        controlStyle,
        controlStyle.blurredInvalid,
        controlStyle.blurredValid
      ),
      opacity: 0.5,
    },
    blurredValidTextInput: createTextInputStyle(
      controlStyle,
      controlStyle.blurredValid
    ),
    blurredInvalidTextInput: createTextInputStyle(
      controlStyle,
      controlStyle.blurredInvalid
    ),
    focusedValidTextInput: createTextInputStyle(
      controlStyle,
      controlStyle.focusedValid
    ),
    focusedInvalidTextInput: createTextInputStyle(
      controlStyle,
      controlStyle.focusedInvalid
    ),
    blurredValidTextInputWithLeftIcon: {
      ...createTextInputStyle(controlStyle, controlStyle.blurredValid),
      ...withLeftIcon,
    },
    blurredInvalidTextInputWithLeftIcon: {
      ...createTextInputStyle(controlStyle, controlStyle.blurredInvalid),
      ...withLeftIcon,
    },
    focusedValidTextInputWithLeftIcon: {
      ...createTextInputStyle(controlStyle, controlStyle.focusedValid),
      ...withLeftIcon,
    },
    focusedInvalidTextInputWithLeftIcon: {
      ...createTextInputStyle(controlStyle, controlStyle.focusedInvalid),
      ...withLeftIcon,
    },
    blurredValidTextInputWithRightIcon: {
      ...createTextInputStyle(controlStyle, controlStyle.blurredValid),
      ...withRightIcon,
    },
    blurredInvalidTextInputWithRightIcon: {
      ...createTextInputStyle(controlStyle, controlStyle.blurredInvalid),
      ...withRightIcon,
    },
    focusedValidTextInputWithRightIcon: {
      ...createTextInputStyle(controlStyle, controlStyle.focusedValid),
      ...withRightIcon,
    },
    focusedInvalidTextInputWithRightIcon: {
      ...createTextInputStyle(controlStyle, controlStyle.focusedInvalid),
      ...withRightIcon,
    },
    blurredValidTextInputWithLeftAndRightIcons: {
      ...createTextInputStyle(controlStyle, controlStyle.blurredValid),
      ...withLeftAndRightIcons,
    },
    blurredInvalidTextInputWithLeftAndRightIcons: {
      ...createTextInputStyle(controlStyle, controlStyle.blurredInvalid),
      ...withLeftAndRightIcons,
    },
    focusedValidTextInputWithLeftAndRightIcons: {
      ...createTextInputStyle(controlStyle, controlStyle.focusedValid),
      ...withLeftAndRightIcons,
    },
    focusedInvalidTextInputWithLeftAndRightIcons: {
      ...createTextInputStyle(controlStyle, controlStyle.focusedInvalid),
      ...withLeftAndRightIcons,
    },
  });

  return ({
    leftIcon,
    rightIcon,
    value,
    onChange,
    secureTextEntry,
    disabled,
    placeholder,
    onSubmit,
  }) => {
    const refresh = useRefresh();

    const stringifiedValue = value === undefined ? `` : stringify(value);

    const editing = React.useRef(stringifiedValue);

    const previousStringifiedValue = React.useRef(stringifiedValue);

    if (stringifiedValue !== previousStringifiedValue.current || disabled) {
      editing.current = stringifiedValue;
      previousStringifiedValue.current = stringifiedValue;
    }

    const focused = React.useRef(false);

    if (disabled) {
      focused.current = false;
    }

    const valid = tryParse(editing.current) !== undefined;

    return (
      <View
        style={
          disabled
            ? valid
              ? styles.disabledValidView
              : styles.disabledInvalidView
            : focused.current
              ? valid
                ? styles.focusedValidView
                : styles.focusedInvalidView
              : valid
                ? styles.blurredValidView
                : styles.blurredInvalidView
        }
      >
        {leftIcon}
        <TextInput
          style={
            focused.current
              ? valid
                ? leftIcon === null
                  ? rightIcon === null
                    ? styles.focusedValidTextInput
                    : styles.focusedValidTextInputWithRightIcon
                  : rightIcon === null
                    ? styles.focusedValidTextInputWithLeftIcon
                    : styles.focusedValidTextInputWithLeftAndRightIcons
                : leftIcon === null
                  ? rightIcon === null
                    ? styles.focusedInvalidTextInput
                    : styles.focusedInvalidTextInputWithRightIcon
                  : rightIcon === null
                    ? styles.focusedInvalidTextInputWithLeftIcon
                    : styles.focusedInvalidTextInputWithLeftAndRightIcons
              : valid
                ? leftIcon === null
                  ? rightIcon === null
                    ? styles.blurredValidTextInput
                    : styles.blurredValidTextInputWithRightIcon
                  : rightIcon === null
                    ? styles.blurredValidTextInputWithLeftIcon
                    : styles.blurredValidTextInputWithLeftAndRightIcons
                : leftIcon === null
                  ? rightIcon === null
                    ? styles.blurredInvalidTextInput
                    : styles.blurredInvalidTextInputWithRightIcon
                  : rightIcon === null
                    ? styles.blurredInvalidTextInputWithLeftIcon
                    : styles.blurredInvalidTextInputWithLeftAndRightIcons
          }
          value={editing.current}
          multiline={multiLine}
          scrollEnabled={false}
          autoComplete={autoComplete}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor={
            focused.current
              ? valid
                ? controlStyle.focusedValid.placeholderColor
                : controlStyle.focusedInvalid.placeholderColor
              : valid
                ? controlStyle.blurredValid.placeholderColor
                : controlStyle.blurredInvalid.placeholderColor
          }
          onChangeText={(to) => {
            editing.current = to;
            refresh();

            onChange(tryParse(to), false);
          }}
          onEndEditing={(e) => {
            const parsed = tryParse(e.nativeEvent.text);

            if (parsed === undefined) {
              editing.current = e.nativeEvent.text;
            } else {
              editing.current = stringify(parsed);
            }

            refresh();

            onChange(parsed, true);
          }}
          onFocus={() => {
            focused.current = true;
            refresh();
          }}
          onBlur={() => {
            focused.current = false;
            refresh();
          }}
          blurOnSubmit={valid}
          onSubmitEditing={(e) => {
            const parsed = tryParse(e.nativeEvent.text);

            if (parsed === undefined) {
              editing.current = e.nativeEvent.text;
              refresh();
            } else {
              editing.current = stringify(parsed);
              refresh();
              onSubmit(parsed);
            }
          }}
        />
        {rightIcon}
      </View>
    );
  };
}
