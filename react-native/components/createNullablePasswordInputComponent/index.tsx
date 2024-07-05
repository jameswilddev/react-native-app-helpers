import * as React from 'react'
import type { ControlStyle } from '../../types/ControlStyle'
import type { NullablePasswordInputProps } from '../../types/NullablePasswordInputProps'
import { createInputComponent } from '../createInputComponent'

/**
 * Creates a new input component pre-configured as a required password input.
 * @param controlStyle  The style of the component to create.
 * @param leftIcon      The icon to show on the left side, if any, else, null.
 * @param rightIcon     The icon to show on the right side, if any, else, null.
 * @param minimumLength When non-null, entered values must be greater for
 *                      validation to succeed.
 * @param maximumLength When non-null, entered values must be greater or equal
 *                      for validation to succeed.
 * @returns             The created component.
 */
export const createNullablePasswordInputComponent = (
  controlStyle: ControlStyle,
  leftIcon: null | React.ReactNode | JSX.Element,
  rightIcon: null | React.ReactNode | JSX.Element,
  minimumLength: null | number,
  maximumLength: null | number
): React.FunctionComponent<NullablePasswordInputProps> => {
  const NullablePasswordInputComponent = createInputComponent<
  null | string,
  null | string
  >(
    (value) => value ?? '',
    (unparsed, context) => {
      if (context !== null && unparsed !== context) {
        return undefined
      } else if (unparsed === '') {
        return null
      } else if (minimumLength !== null && unparsed.length < minimumLength) {
        return undefined
      } else if (maximumLength !== null && unparsed.length > maximumLength) {
        return undefined
      } else {
        return unparsed
      }
    },
    controlStyle,
    false,
    'off',
    'default',
    'sentences',
    false,
    'left'
  )

  const NullablePasswordInput: React.FunctionComponent<NullablePasswordInputProps> = ({ value, onChange, onFocus, disabled, placeholder, match, autoFocus }) => (
    <NullablePasswordInputComponent
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      disabled={disabled}
      placeholder={placeholder}
      context={match}
      secureTextEntry={true}
      onSubmit={() => {
        /* No-op. */
      }}
      autoFocus={autoFocus}
    />
  )

  return NullablePasswordInput
}
