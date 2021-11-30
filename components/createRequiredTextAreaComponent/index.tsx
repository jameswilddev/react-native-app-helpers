import * as React from "react";
import type { ControlStyle } from "../..";
import { createInputComponent } from "../createInputComponent";

/**
 * Creates a new input component pre-configured as a required text area.
 * @param controlStyle  The style of the component to create.
 * @param leftIcon      The icon to show on the left side, if any, else, null.
 * @param rightIcon     The icon to show on the right side, if any, else, null.
 * @param minimumLength When non-null, entered values must be greater for
 *                      validation to succeed.
 * @param maximumLength When non-null, entered values must be greater or equal
 *                      for validation to succeed.
 * @returns             The created component.
 */
export const createRequiredTextAreaComponent = (
  controlStyle: ControlStyle,
  leftIcon: null | React.ReactNode | JSX.Element,
  rightIcon: null | React.ReactNode | JSX.Element,
  minimumLength: null | number,
  maximumLength: null | number
): React.FunctionComponent<{
  /**
   * The value to edit.  When undefined, it is treated as an invalid empty
   * string.
   */
  readonly value: undefined | string;

  /**
   * Invoked when the user edits the text in the box.
   * @param parsed   The value parsed, or undefined should it not be parseable.
   * @param complete True when the user has finished editing, otherwise, false.
   */
  onChange(parsed: undefined | string, complete: boolean): void;

  /**
   * When true, the text box is rendered semi-transparently and does not accept
   * focus or input.
   */
  readonly disabled: boolean;

  /**
   * Text to be shown when no value has been entered.
   */
  readonly placeholder: string;
}> => {
  const RequiredTextInputComponent = createInputComponent<string, null>(
    (value) =>
      value
        .trim()
        .replace(`\r\n`, `\n`) // Normalize CRLF -> LF.
        .replace(`\r`, `\n`) // Normalize CR -> LF.
        .replace(/[^\S\n]*\n[^\S\n]*/g, `\n`) // Remove white space before or after new lines.
        .replace(/\n\n\n+/g, `\n\n`), // Limit to two LFs in a row.
    (unparsed) => {
      if (unparsed.trim() === ``) {
        return undefined;
      } else {
        const parsed = unparsed
          .trim()
          .replace(`\r\n`, `\n`) // Normalize CRLF -> LF.
          .replace(`\r`, `\n`) // Normalize CR -> LF.
          .replace(/[^\S\n]*\n[^\S\n]*/g, `\n`) // Remove white space before or after new lines.
          .replace(/\n\n\n+/g, `\n\n`); // Limit to two LFs in a row.

        if (minimumLength !== null && parsed.length < minimumLength) {
          return undefined;
        } else if (maximumLength !== null && parsed.length > maximumLength) {
          return undefined;
        } else {
          return parsed;
        }
      }
    },
    controlStyle,
    true,
    `off`,
    `default`,
    false,
    true
  );

  return ({ value, onChange, disabled, placeholder }) => (
    <RequiredTextInputComponent
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
  );
};
