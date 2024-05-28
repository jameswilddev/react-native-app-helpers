import validateEmail from 'filter-validate-email'
import * as React from 'react'
import type { ControlStyle } from '../../..'
import { createInputComponent } from '../createInputComponent'
import type { NullableEmailInputProps } from '../../types/NullableEmailInputProps'

/**
 * Creates a new input component pre-configured as a nullable email input.
 * @param controlStyle  The style of the component to create.
 * @param leftIcon      The icon to show on the left side, if any, else, null.
 * @param rightIcon     The icon to show on the right side, if any, else, null.
 * @param minimumLength When non-null, entered values must be greater for
 *                      validation to succeed.
 * @param maximumLength When non-null, entered values must be greater or equal
 *                      for validation to succeed.
 * @returns             The created component.
 */
export const createNullableEmailInputComponent = (
  controlStyle: ControlStyle,
  leftIcon: null | React.ReactNode | JSX.Element,
  rightIcon: null | React.ReactNode | JSX.Element,
  minimumLength: null | number,
  maximumLength: null | number
): React.FunctionComponent<NullableEmailInputProps> => {
  const NullableEmailInputComponent = createInputComponent<
  null | string,
  readonly string[]
  >(
    (value) => (value === null ? '' : value.toLowerCase().replace(/\s/g, '')),
    (unparsed, context) => {
      if (unparsed.trim() === '') {
        return null
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
    'left'
  )

  const NullableEmailInput: React.FunctionComponent<NullableEmailInputProps> = ({ value, onChange, disabled, placeholder, unique, autoFocus }) => (
    <NullableEmailInputComponent
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoFocus={autoFocus}
      placeholder={placeholder}
      context={unique}
      secureTextEntry={false}
      onSubmit={() => {
        /* No-op. */
      }}
    />
  )

  return NullableEmailInput
}
