import * as React from 'react'
import {
  type MeasureOnSuccessCallback,
  StyleSheet,
  TextInput,
  type TextStyle
} from 'react-native'
import type { ControlStyle } from '../../types/ControlStyle'
import { Hitbox } from '../Hitbox'
import {
  createControlStateStyleInstance,
  createControlStyleInstance,
  createControlTextStyleInstance
} from '../helpers'
import type { SvgIcon } from '../../..'

type Instance = React.FunctionComponent<{
  /**
   * The text shown in the button.  When null, the placeholder is shown instead.
   */
  readonly label: null | string

  /**
   * The placeholder text shown in the button when there is no text.
   */
  readonly placeholder: string

  /**
   * When true, the button cannot be pressed and is styled as though disabled.
   * The button is otherwise able to be pressed and is styled as though enabled.
   */
  readonly disabled: boolean

  /**
   * When true, the control is styled as though it is valid.  It is otherwise
   * styled as though it is invalid.
   */
  readonly valid: boolean

  /**
   * Called when the button is pressed.
   */
  onPress: () => void

  /**
   * When null, no icon is to be shown on the left.  Otherwise, the icon
   * component to render on the left.
   */
  readonly leftIcon?: SvgIcon

  /**
   * When null, no icon is to be shown on the right.  Otherwise, the icon
   * component to render on the right.
   */
  readonly rightIcon?: SvgIcon

  /**
   * Passed to useMeasure.
   */
  readonly onMeasure?: MeasureOnSuccessCallback
}>

/**
 * The arguments used to create a full-height pop-over component; for testing
 * higher-order components.
 */
interface Introspection {
  /**
   * The styling to use.
   */
  readonly controlStyle: ControlStyle

  /**
   * When null, no icon is to be shown on the right.  Otherwise, the icon
   * component to render on the right.
   */
  readonly rightIcon?: SvgIcon
}

/**
 * Creates a new React component which displays a button which could represent a
 * picker (select, date picker, etc.).
 * @param controlStyle  The styling to use.
 * @returns             The created React component.
 */
export const createPickerButtonComponent = (
  controlStyle: ControlStyle
): Instance & { readonly pickerButton: Introspection } => {
  const withLeftIcon: TextStyle = controlStyle.paddingHorizontal === 0
    ? {}
    : { paddingLeft: controlStyle.paddingHorizontal }

  const withRightIcon: TextStyle = controlStyle.paddingHorizontal === 0
    ? {}
    : { paddingRight: controlStyle.paddingHorizontal }

  const withLeftAndRightIcons: TextStyle = controlStyle.paddingHorizontal === 0
    ? {}
    : { paddingHorizontal: controlStyle.paddingHorizontal }

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
      controlStyle.disabledValid,
      'left'
    ),
    disabledInvalidTextInput: createControlTextStyleInstance(
      controlStyle,
      controlStyle.disabledInvalid,
      'left'
    ),
    validTextInput: createControlTextStyleInstance(
      controlStyle,
      controlStyle.blurredValid,
      'left'
    ),
    invalidTextInput: createControlTextStyleInstance(
      controlStyle,
      controlStyle.blurredInvalid,
      'left'
    ),
    disabledValidTextInputWithLeftIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.disabledValid,
        'left'
      ),
      ...withLeftIcon
    },
    disabledInvalidTextInputWithLeftIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.disabledInvalid,
        'left'
      ),
      ...withLeftIcon
    },
    validTextInputWithLeftIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredValid,
        'left'
      ),
      ...withLeftIcon
    },
    invalidTextInputWithLeftIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredInvalid,
        'left'
      ),
      ...withLeftIcon
    },
    disabledValidTextInputWithRightIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.disabledValid,
        'left'
      ),
      ...withRightIcon
    },
    disabledInvalidTextInputWithRightIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.disabledInvalid,
        'left'
      ),
      ...withRightIcon
    },
    validTextInputWithRightIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredValid,
        'left'
      ),
      ...withRightIcon
    },
    invalidTextInputWithRightIcon: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredInvalid,
        'left'
      ),
      ...withRightIcon
    },
    disabledValidTextInputWithLeftAndRightIcons: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.disabledValid,
        'left'
      ),
      ...withLeftAndRightIcons
    },
    disabledInvalidTextInputWithLeftAndRightIcons: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.disabledInvalid,
        'left'
      ),
      ...withLeftAndRightIcons
    },
    validTextInputWithLeftAndRightIcons: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredValid,
        'left'
      ),
      ...withLeftAndRightIcons
    },
    invalidTextInputWithLeftAndRightIcons: {
      ...createControlTextStyleInstance(
        controlStyle,
        controlStyle.blurredInvalid,
        'left'
      ),
      ...withLeftAndRightIcons
    }
  })

  const PickerButton: Instance & { pickerButton?: Introspection } = ({
    label,
    placeholder,
    disabled,
    valid,
    onPress,
    leftIcon,
    rightIcon,
    onMeasure
  }) => {
    const children: JSX.Element[] = []

    if (leftIcon !== undefined) {
      children.push(
        React.createElement(leftIcon, {
          key: 'leftIcon',
          fill: disabled
            ? valid
              ? controlStyle.disabledValid.iconColor
              : controlStyle.disabledInvalid.iconColor
            : valid
              ? controlStyle.blurredValid.iconColor
              : controlStyle.blurredInvalid.iconColor
        })
      )
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
    )

    if (rightIcon !== undefined) {
      children.push(
        React.createElement(rightIcon, {
          key: 'rightIcon',
          fill: disabled
            ? valid
              ? controlStyle.disabledValid.iconColor
              : controlStyle.disabledInvalid.iconColor
            : valid
              ? controlStyle.blurredValid.iconColor
              : controlStyle.blurredInvalid.iconColor
        })
      )
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
    )
  }

  PickerButton.pickerButton = { controlStyle }

  return PickerButton as Instance & {
    readonly pickerButton: Introspection
  }
}
