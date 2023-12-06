import * as React from 'react'
import type { ControlStyle } from '../../..'
import { createInputComponent } from '../createInputComponent'
import type { RequiredIntegerInputProps } from '../../types/RequiredIntegerInputProps'

/**
 * Creates a new input component pre-configured as a required integer input.
 * @param controlStyle         The style of the component to create.
 * @param leftIcon             The icon to show on the left side, if any, else,
 *                             null.
 * @param rightIcon            The icon to show on the right side, if any, else,
 *                             null.
 * @param greaterThan          When non-null, entered values must be greater for
 *                             validation to succeed.
 * @param greaterThanOrEqualTo When non-null, entered values must be greater or
 *                             equal for validation to succeed.
 * @param lessThan             When non-null, entered values must be lesser for
 *                             validation to succeed.
 * @param lessThanOrEqualTo    When non-null, entered values must be lesser or
 *                             equal for validation to succeed.
 * @param alignment            The alignment of the text within the input.
 * @returns                    The created component.
 */
export const createRequiredIntegerInputComponent = (
  controlStyle: ControlStyle,
  leftIcon: null | React.ReactNode | JSX.Element,
  rightIcon: null | React.ReactNode | JSX.Element,
  greaterThan: null | number,
  greaterThanOrEqualTo: null | number,
  lessThan: null | number,
  lessThanOrEqualTo: null | number,
  alignment: 'left' | 'right'
): React.FunctionComponent<RequiredIntegerInputProps> => {
  const RequiredIntegerInputComponent = createInputComponent<number, null>(
    (value) => String(value),
    (unparsed) => {
      if (/^\s*[+-]?\d+\.?\s*$/.test(unparsed)) {
        const parsed = Number.parseInt(unparsed)

        if (greaterThan !== null && parsed <= greaterThan) {
          return undefined
        } else if (lessThan !== null && parsed >= lessThan) {
          return undefined
        } else if (
          greaterThanOrEqualTo !== null &&
          parsed < greaterThanOrEqualTo
        ) {
          return undefined
        } else if (lessThanOrEqualTo !== null && parsed > lessThanOrEqualTo) {
          return undefined
        } else {
          return parsed
        }
      } else {
        return undefined
      }
    },
    controlStyle,
    false,
    'off',
    'numeric',
    'none',
    false,
    false,
    alignment
  )

  const RequiredIntegerInput: React.FunctionComponent<RequiredIntegerInputProps> = ({ value, onChange, disabled, placeholder }) => (
    <RequiredIntegerInputComponent
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      context={null}
      secureTextEntry={false}
      onSubmit={() => {
        /* No-op. */
      }}
    />
  )

  return RequiredIntegerInput
}
