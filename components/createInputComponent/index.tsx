import * as React from "react";
import { StyleSheet, TextInput, TextStyle, View } from "react-native";
import { useRefresh } from "../../hooks/useRefresh";
import type { ControlStyle } from "../../types/ControlStyle";
import {
  createControlStateStyleInstance,
  createControlStyleInstance,
  createControlTextStyleInstance,
} from "../helpers";

type Instance<T> = React.FunctionComponent<{
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
}>;

/**
 * The arguments used to create an input component; for testing higher-order
 * components.
 * @template T The type of value which results from the editing of text.
 */
type Introspection<T> = {
  /**
   * A function which takes the value passed into the component and transforms
   * it into raw text for editing.
   */
  stringify: (value: T) => string;

  /**
   * A function which attempts to convert raw text back into a value to output,
   * returning undefined if this is not possible.
   */
  tryParse: (value: string) => undefined | T;

  /**
   * The styling to use.
   */
  readonly controlStyle: ControlStyle;

  /**
   * When true, the text may wrap onto multiple lines.  It will otherwise scroll
   * one line horizontally.
   */
  readonly multiLine: boolean;

  /**
   * The type of auto-complete suggestions to provide.
   */
  readonly autoComplete: `off` | `email` | `password`;

  /**
   * The type of keyboard to show.
   */
  readonly keyboardType: `default` | `email-address` | `numeric`;

  /**
   * When true, the text input will steal focus on mount.  It will otherwise
   * wait for the user to interact with it.
   */
  readonly autoFocus: boolean;
};

/**
 * Creates a React component which allows for the editing of text.
 * @template T         The type of value which results from the editing of text.
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
 * @param autoFocus    When true, the text input will steal focus on mount.  It
 *                     will otherwise wait for the user to interact with it.
 * @returns            A React component which allows for the editing of text.
 */
export function createInputComponent<T>(
  stringify: (value: T) => string,
  tryParse: (value: string) => undefined | T,
  controlStyle: ControlStyle,
  multiLine: boolean,
  autoComplete: `off` | `email` | `password`,
  keyboardType: `default` | `email-address` | `numeric`,
  autoFocus: boolean
): Instance<T> & {
  /**
   * The arguments used to create this input component; for testing higher-order
   * components.
   */
  readonly inputComponent: Introspection<T>;
} {
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
    blurredValidView: createControlStyleInstance(
      controlStyle,
      controlStyle.blurredValid
    ),
    blurredInvalidView: createControlStateStyleInstance(
      controlStyle,
      controlStyle.blurredInvalid
    ),
    focusedValidView: createControlStateStyleInstance(
      controlStyle,
      controlStyle.focusedValid
    ),
    focusedInvalidView: createControlStateStyleInstance(
      controlStyle,
      controlStyle.focusedInvalid
    ),
    disabledValidView: createControlStateStyleInstance(
      controlStyle,
      controlStyle.disabledValid
    ),
    disabledInvalidView: createControlStateStyleInstance(
      controlStyle,
      controlStyle.disabledInvalid
    ),
    disabledValidTextInput: createControlTextStyleInstance(
      controlStyle,
      controlStyle.disabledValid
    ),
    disabledInvalidTextInput: createControlTextStyleInstance(
      controlStyle,
      controlStyle.disabledInvalid
    ),
    blurredValidTextInput: createControlTextStyleInstance(
      controlStyle,
      controlStyle.blurredValid
    ),
    blurredInvalidTextInput: createControlTextStyleInstance(
      controlStyle,
      controlStyle.blurredInvalid
    ),
    focusedValidTextInput: createControlTextStyleInstance(
      controlStyle,
      controlStyle.focusedValid
    ),
    focusedInvalidTextInput: createControlTextStyleInstance(
      controlStyle,
      controlStyle.focusedInvalid
    ),
    disabledValidTextInputWithLeftIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.disabledValid
      ),
      ...withLeftIcon,
    },
    disabledInvalidTextInputWithLeftIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.disabledInvalid
      ),
      ...withLeftIcon,
    },
    blurredValidTextInputWithLeftIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredValid
      ),
      ...withLeftIcon,
    },
    blurredInvalidTextInputWithLeftIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredInvalid
      ),
      ...withLeftIcon,
    },
    focusedValidTextInputWithLeftIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.focusedValid
      ),
      ...withLeftIcon,
    },
    focusedInvalidTextInputWithLeftIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.focusedInvalid
      ),
      ...withLeftIcon,
    },
    disabledValidTextInputWithRightIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.disabledValid
      ),
      ...withRightIcon,
    },
    disabledInvalidTextInputWithRightIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.disabledInvalid
      ),
      ...withRightIcon,
    },
    blurredValidTextInputWithRightIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredValid
      ),
      ...withRightIcon,
    },
    blurredInvalidTextInputWithRightIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredInvalid
      ),
      ...withRightIcon,
    },
    focusedValidTextInputWithRightIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.focusedValid
      ),
      ...withRightIcon,
    },
    focusedInvalidTextInputWithRightIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.focusedInvalid
      ),
      ...withRightIcon,
    },
    disabledValidTextInputWithLeftAndRightIcons: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.disabledValid
      ),
      ...withLeftAndRightIcons,
    },
    disabledInvalidTextInputWithLeftAndRightIcons: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.disabledInvalid
      ),
      ...withLeftAndRightIcons,
    },
    blurredValidTextInputWithLeftAndRightIcons: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredValid
      ),
      ...withLeftAndRightIcons,
    },
    blurredInvalidTextInputWithLeftAndRightIcons: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredInvalid
      ),
      ...withLeftAndRightIcons,
    },
    focusedValidTextInputWithLeftAndRightIcons: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.focusedValid
      ),
      ...withLeftAndRightIcons,
    },
    focusedInvalidTextInputWithLeftAndRightIcons: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.focusedInvalid
      ),
      ...withLeftAndRightIcons,
    },
  });

  const Input: Instance<T> & { inputComponent?: Introspection<T> } = ({
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

    const ref = React.useRef<null | TextInput>(null);
    const firstLayout = React.useRef(true);

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
          {...(autoFocus
            ? {
                ref,
                onLayout() {
                  if (firstLayout.current) {
                    firstLayout.current = false;
                    ref.current?.focus();
                  }
                },
              }
            : {})}
          style={
            disabled
              ? valid
                ? leftIcon === null
                  ? rightIcon === null
                    ? styles.disabledValidTextInput
                    : styles.disabledValidTextInputWithRightIcon
                  : rightIcon === null
                  ? styles.disabledValidTextInputWithLeftIcon
                  : styles.disabledValidTextInputWithLeftAndRightIcons
                : leftIcon === null
                ? rightIcon === null
                  ? styles.disabledInvalidTextInput
                  : styles.disabledInvalidTextInputWithRightIcon
                : rightIcon === null
                ? styles.disabledInvalidTextInputWithLeftIcon
                : styles.disabledInvalidTextInputWithLeftAndRightIcons
              : focused.current
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
            disabled
              ? valid
                ? controlStyle.disabledValid.placeholderColor
                : controlStyle.disabledInvalid.placeholderColor
              : focused.current
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

  Input.inputComponent = {
    stringify,
    tryParse,
    controlStyle,
    multiLine,
    autoComplete,
    keyboardType,
    autoFocus,
  };

  return Input as Instance<T> & { readonly inputComponent: Introspection<T> };
}
