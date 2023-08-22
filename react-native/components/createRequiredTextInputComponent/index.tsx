import * as React from 'react'
import type { ControlStyle } from '../../..'
import { createInputComponent } from '../createInputComponent'
import type { RequiredTextInputProps } from '../../types/RequiredTextInputProps'

/**
 * Creates a new input component pre-configured as a required text input.
 * @param controlStyle   The style of the component to create.
 * @param leftIcon       The icon to show on the left side, if any, else, null.
 * @param rightIcon      The icon to show on the right side, if any, else, null.
 * @param minimumLength  When non-null, entered values must be greater for
 *                       validation to succeed.
 * @param maximumLength  When non-null, entered values must be greater or equal
 *                       for validation to succeed.
 * @param autoCapitalize The capitalization behavior to use.
 * @returns              The created component.
 */
export const createRequiredTextInputComponent = (
  controlStyle: ControlStyle,
  leftIcon: null | React.ReactNode | JSX.Element,
  rightIcon: null | React.ReactNode | JSX.Element,
  minimumLength: null | number,
  maximumLength: null | number,
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters'
): React.FunctionComponent<RequiredTextInputProps> => {
  const RequiredTextInputComponent = createInputComponent<
  string,
  readonly string[]
  >(
    (value) => value.trim().replace(/\s+/g, ' '),
    (unparsed, context) => {
      if (unparsed.trim() === '') {
        return undefined
      } else {
        const parsed = unparsed.trim().replace(/\s+/g, ' ')

        if (minimumLength !== null && parsed.length < minimumLength) {
          return undefined
        } else if (maximumLength !== null && parsed.length > maximumLength) {
          return undefined
        } else {
          const match = parsed.toLowerCase()

          for (const option of context) {
            if (option.trim().replace(/\s+/g, ' ').toLowerCase() === match) {
              return undefined
            }
          }

          return parsed
        }
      }
    },
    controlStyle,
    false,
    'off',
    'default',
    autoCapitalize,
    false,
    false,
    'left'
  )

  return ({ value, onChange, disabled, placeholder, unique }) => (
    <RequiredTextInputComponent
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      context={unique ?? []}
      secureTextEntry={false}
      onSubmit={() => {
        /* No-op. */
      }}
    />
  )
}
