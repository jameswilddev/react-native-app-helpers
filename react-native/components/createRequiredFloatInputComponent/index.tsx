import * as React from 'react'
import type { ControlStyle } from '../../..'
import { createInputComponent } from '../createInputComponent'
import type { RequiredFloatInputProps } from '../../types/RequiredFloatInputProps'

/**
 * Creates a new input component pre-configured as a required float input.
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
 * @param decimalPlaces        When null, any number of decimal places may be
 *                             specified.  Otherwise, the number of decimal
 *                             places accepted/shown.
 * @returns                    The created component.
 */
export const createRequiredFloatInputComponent = (
  controlStyle: ControlStyle,
  leftIcon: null | React.ReactNode | JSX.Element,
  rightIcon: null | React.ReactNode | JSX.Element,
  greaterThan: null | number,
  greaterThanOrEqualTo: null | number,
  lessThan: null | number,
  lessThanOrEqualTo: null | number,
  alignment: 'left' | 'right',
  decimalPlaces: null | number
): React.FunctionComponent<RequiredFloatInputProps> => {
  const RequiredFloatInputComponent = createInputComponent<number, null>(
    (value) =>
      decimalPlaces === null ? String(value) : value.toFixed(decimalPlaces),
    (unparsed) => {
      if (
        /^\s*[+-]?\d+\s*$|^\s*[+-]?\d+\.\d+\s*$|^\s*[+-]?\.\d+\s*$|^\s*[+-]?\d+\.\s*$/.test(
          unparsed
        )
      ) {
        if (decimalPlaces !== null) {
          const splitByDecimalPlace = unparsed.split('.')

          if (
            splitByDecimalPlace.length > 1 &&
            (splitByDecimalPlace[1] as string).replace(/\D/g, '').length >
              decimalPlaces
          ) {
            return undefined
          }
        }

        const parsed = Number.parseFloat(unparsed)

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

  return ({ value, onChange, disabled, placeholder }) => (
    <RequiredFloatInputComponent
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
}
