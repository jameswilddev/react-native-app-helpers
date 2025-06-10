import * as React from 'react'
import type { ControlStyle } from '../../..'
import { createInputComponent } from '../createInputComponent'
import type { RequiredPasswordInputProps } from '../../types/RequiredPasswordInputProps'

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
export const createRequiredPasswordInputComponent = (
  controlStyle: ControlStyle,
  leftIcon: null | React.ReactNode | React.JSX.Element,
  rightIcon: null | React.ReactNode | React.JSX.Element,
  minimumLength: null | number,
  maximumLength: null | number
): React.FunctionComponent<RequiredPasswordInputProps> => {
  const RequiredPasswordInputComponent = createInputComponent<
  string,
  null | string
  >(
    (value) => value,
    (unparsed, context) => {
      if (context !== null && unparsed !== context) {
        return undefined
      } else if (unparsed === '') {
        return undefined
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

  const RequiredPasswordInput: React.FunctionComponent<RequiredPasswordInputProps> = ({ value, onChange, onFocus, disabled, placeholder, match, autoFocus }) => (
    <RequiredPasswordInputComponent
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

  return RequiredPasswordInput
}
