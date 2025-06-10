import * as React from 'react'
import type { ControlStyle } from '../../types/ControlStyle'
import type { NullableTextAreaProps } from '../../types/NullableTextAreaProps'
import { createInputComponent } from '../createInputComponent'

/**
 * Creates a new input component pre-configured as a nullable text area.
 * @param controlStyle  The style of the component to create.
 * @param leftIcon      The icon to show on the left side, if any, else, null.
 * @param rightIcon     The icon to show on the right side, if any, else, null.
 * @param minimumLength When non-null, entered values must be greater for
 *                      validation to succeed.
 * @param maximumLength When non-null, entered values must be greater or equal
 *                      for validation to succeed.
 * @returns             The created component.
 */
export const createNullableTextAreaComponent = (
  controlStyle: ControlStyle,
  leftIcon: null | React.ReactNode | React.JSX.Element,
  rightIcon: null | React.ReactNode | React.JSX.Element,
  minimumLength: null | number,
  maximumLength: null | number
): React.FunctionComponent<NullableTextAreaProps> => {
  const NullableTextInputComponent = createInputComponent<null | string, null>(
    (value) =>
      value === null
        ? ''
        : value
          .trim()
          .replace('\r\n', '\n') // Normalize CRLF -> LF.
          .replace('\r', '\n') // Normalize CR -> LF.
          .replace(/[^\S\n]*\n[^\S\n]*/g, '\n') // Remove white space before or after new lines.
          .replace(/\n\n\n+/g, '\n\n'), // Limit to two LFs in a row.
    (unparsed) => {
      if (unparsed.trim() === '') {
        return null
      } else {
        const parsed = unparsed
          .trim()
          .replace('\r\n', '\n') // Normalize CRLF -> LF.
          .replace('\r', '\n') // Normalize CR -> LF.
          .replace(/[^\S\n]*\n[^\S\n]*/g, '\n') // Remove white space before or after new lines.
          .replace(/\n\n\n+/g, '\n\n') // Limit to two LFs in a row.

        if (minimumLength !== null && parsed.length < minimumLength) {
          return undefined
        } else if (maximumLength !== null && parsed.length > maximumLength) {
          return undefined
        } else {
          return parsed
        }
      }
    },
    controlStyle,
    true,
    'off',
    'default',
    'sentences',
    true,
    'left'
  )

  const NullableTextArea: React.FunctionComponent<NullableTextAreaProps> = ({ value, onChange, onFocus, disabled, placeholder, autoFocus }) => (
    <NullableTextInputComponent
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      disabled={disabled}
      placeholder={placeholder}
      context={null}
      secureTextEntry={false}
      onSubmit={() => {
        /* No-op. */
      }}
      autoFocus={autoFocus}
    />
  )

  return NullableTextArea
}
