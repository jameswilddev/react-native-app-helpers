import * as React from "react";
import {
  MeasureOnSuccessCallback,
  StyleSheet,
  TextInput,
  TextStyle,
} from "react-native";
import type { ControlStyle } from "../../types/ControlStyle";
import { Hitbox } from "../Hitbox";
import {
  createControlStateStyleInstance,
  createControlStyleInstance,
  createControlTextStyleInstance,
} from "../helpers";
import type { SvgIcon } from "../../..";

type Instance = React.FunctionComponent<{
  /**
   * The text shown in the button.  When null, the placeholder is shown instead.
   */
  readonly label: null | string;

  /**
   * The placeholder text shown in the button when there is no text.
   */
  readonly placeholder: string;

  /**
   * When true, the button cannot be pressed and is styled as though disabled.
   * The button is otherwise able to be pressed and is styled as though enabled.
   */
  readonly disabled?: undefined | boolean;

  /**
   * When true, the control is styled as though it is valid.  It is otherwise
   * styled as though it is invalid.
   */
  readonly valid: boolean;

  /**
   * Called when the button is pressed.
   */
  onPress(): void;

  /**
   * When null, no icon is to be shown on the left.  Otherwise, the icon
   * component to render on the left.
   */
  readonly leftIcon?: SvgIcon;

  /**
   * When null, no icon is to be shown on the right.  Otherwise, the icon
   * component to render on the right.
   */
  readonly rightIcon?: SvgIcon;

  /**
   * Passed to useMeasure.
   */
  readonly onMeasure?: MeasureOnSuccessCallback;
}>;

/**
 * The arguments used to create a full-height pop-over component; for testing
 * higher-order components.
 */
type Introspection = {
  /**
   * The styling to use.
   */
  readonly controlStyle: ControlStyle;
};

/**
 * Creates a new React component which displays a button which could represent a
 * picker (select, date picker, etc.).
 * @param controlStyle  The styling to use.
 * @returns             The created React component.
 */
export const createPickerButtonComponent = (
  controlStyle: ControlStyle
): Instance & { readonly pickerButton: Introspection } => {
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
    validHitbox: createControlStyleInstance(
      controlStyle,
      controlStyle.blurredValid
    ),
    invalidHitbox: createControlStateStyleInstance(
      controlStyle,
      controlStyle.blurredInvalid
    ),
    disabledValidHitbox: createControlStateStyleInstance(
      controlStyle,
      controlStyle.disabledValid
    ),
    disabledInvalidHitbox: createControlStateStyleInstance(
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
    validTextInput: createControlTextStyleInstance(
      controlStyle,
      controlStyle.blurredValid
    ),
    invalidTextInput: createControlTextStyleInstance(
      controlStyle,
      controlStyle.blurredInvalid
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
    validTextInputWithLeftIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredValid
      ),
      ...withLeftIcon,
    },
    invalidTextInputWithLeftIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredInvalid
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
    validTextInputWithRightIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredValid
      ),
      ...withRightIcon,
    },
    invalidTextInputWithRightIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredInvalid
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
    validTextInputWithLeftAndRightIcons: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredValid
      ),
      ...withLeftAndRightIcons,
    },
    invalidTextInputWithLeftAndRightIcons: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredInvalid
      ),
      ...withLeftAndRightIcons,
    },
  });

  const PickerButton: Instance & { pickerButton?: Introspection } = ({
    label,
    placeholder,
    disabled,
    valid,
    onPress,
    leftIcon,
    rightIcon,
    onMeasure,
  }) => {
    disabled = disabled ?? false;

    const children: JSX.Element[] = [];

    if (leftIcon !== undefined) {
      children.push(
        React.createElement(leftIcon, {
          key: `leftIcon`,
          fill: disabled
            ? valid
              ? controlStyle.disabledValid.placeholderColor
              : controlStyle.disabledInvalid.placeholderColor
            : valid
            ? controlStyle.blurredValid.placeholderColor
            : controlStyle.blurredInvalid.placeholderColor,
        })
      );
    }

    children.push(
      <TextInput
        key="middle"
        style={
          disabled
            ? valid
              ? leftIcon === undefined
                ? rightIcon === undefined
                  ? styles.disabledValidTextInput
                  : styles.disabledValidTextInputWithRightIcon
                : rightIcon === undefined
                ? styles.disabledValidTextInputWithLeftIcon
                : styles.disabledValidTextInputWithLeftAndRightIcons
              : leftIcon === undefined
              ? rightIcon === undefined
                ? styles.disabledInvalidTextInput
                : styles.disabledInvalidTextInputWithRightIcon
              : rightIcon === undefined
              ? styles.disabledInvalidTextInputWithLeftIcon
              : styles.disabledInvalidTextInputWithLeftAndRightIcons
            : valid
            ? leftIcon === undefined
              ? rightIcon === undefined
                ? styles.validTextInput
                : styles.validTextInputWithRightIcon
              : rightIcon === undefined
              ? styles.validTextInputWithLeftIcon
              : styles.validTextInputWithLeftAndRightIcons
            : leftIcon === undefined
            ? rightIcon === undefined
              ? styles.invalidTextInput
              : styles.invalidTextInputWithRightIcon
            : rightIcon === undefined
            ? styles.invalidTextInputWithLeftIcon
            : styles.invalidTextInputWithLeftAndRightIcons
        }
        pointerEvents="none"
        editable={false}
        value={label ?? undefined}
        placeholder={placeholder}
        placeholderTextColor={
          disabled
            ? valid
              ? controlStyle.disabledValid.placeholderColor
              : controlStyle.disabledInvalid.placeholderColor
            : valid
            ? controlStyle.blurredValid.placeholderColor
            : controlStyle.blurredInvalid.placeholderColor
        }
      />
    );

    if (rightIcon !== undefined) {
      children.push(
        React.createElement(rightIcon, {
          key: `rightIcon`,
          fill: disabled
            ? valid
              ? controlStyle.disabledValid.placeholderColor
              : controlStyle.disabledInvalid.placeholderColor
            : valid
            ? controlStyle.blurredValid.placeholderColor
            : controlStyle.blurredInvalid.placeholderColor,
        })
      );
    }

    return (
      <Hitbox
        style={
          disabled
            ? valid
              ? styles.disabledValidHitbox
              : styles.disabledInvalidHitbox
            : valid
            ? styles.validHitbox
            : styles.invalidHitbox
        }
        onPress={onPress}
        disabled={disabled}
        onMeasure={onMeasure}
      >
        {children}
      </Hitbox>
    );
  };

  PickerButton.pickerButton = { controlStyle };

  return PickerButton as Instance & {
    readonly pickerButton: Introspection;
  };
};
