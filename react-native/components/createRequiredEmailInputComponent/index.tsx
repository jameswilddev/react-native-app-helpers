import validateEmail from 'filter-validate-email'
import * as React from 'react'
import type { ControlStyle } from '../../..'
import { createInputComponent } from '../createInputComponent'
import type { RequiredEmailInputProps } from '../../types/RequiredEmailInputProps'

/**
 * Creates a new input component pre-configured as a required email input.
 * @param controlStyle  The style of the component to create.
 * @param leftIcon      The icon to show on the left side, if any, else, null.
 * @param rightIcon     The icon to show on the right side, if any, else, null.
 * @param minimumLength When non-null, entered values must be greater for
 *                      validation to succeed.
 * @param maximumLength When non-null, entered values must be greater or equal
 *                      for validation to succeed.
 * @returns             The created component.
 */
export const createRequiredEmailInputComponent = (
  controlStyle: ControlStyle,
  leftIcon: null | React.ReactNode | JSX.Element,
  rightIcon: null | React.ReactNode | JSX.Element,
  minimumLength: null | number,
  maximumLength: null | number
): React.FunctionComponent<RequiredEmailInputProps> => {
  const RequiredEmailInputComponent = createInputComponent<
  string,
  readonly string[]
  >(
    (value) => value.toLowerCase().replace(/\s/g, ''),
    (unparsed, context) => {
      if (unparsed.trim() === '') {
        return undefined
      } else {
        const parsed = unparsed.toLowerCase().replace(/\s/g, '')

        if (!validateEmail(parsed)) {
          return undefined
        } else if (minimumLength !== null && parsed.length < minimumLength) {
          return undefined
        } else if (maximumLength !== null && parsed.length > maximumLength) {
          return undefined
        } else {
          const match = parsed.toLowerCase()

          for (const option of context) {
            if (option.replace(/\s/g, '').toLowerCase() === match) {
              return undefined
            }
          }

          return parsed
        }
      }
    },
    controlStyle,
    false,
    'email',
    'email-address',
    'none',
    false,
    false,
    'left'
  )

  const RequiredEmailInput: React.FunctionComponent<RequiredEmailInputProps> = ({ value, onChange, disabled, placeholder, unique }) => (
    <RequiredEmailInputComponent
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      context={unique}
      secureTextEntry={false}
      onSubmit={() => {
        /* No-op. */
      }}
    />
  )

  return RequiredEmailInput
}
