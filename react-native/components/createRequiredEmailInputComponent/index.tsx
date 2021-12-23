import validateEmail from "filter-validate-email";
import * as React from "react";
import type { ControlStyle } from "../../..";
import { createInputComponent } from "../createInputComponent";

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
): React.FunctionComponent<{
  /**
   * The value to edit.  When undefined, it is treated as an invalid empty
   * string.
   */
  readonly value: undefined | string;

  /**
   * Invoked when the user edits the address in the box.
   * @param parsed   The value parsed, or undefined should it not be parseable.
   * @param complete True when the user has finished editing, otherwise, false.
   */
  onChange(parsed: undefined | string, complete: boolean): void;

  /**
   * When true, the text box is rendered semi-transparently and does not accept
   * focus or input.
   */
  readonly disabled?: undefined | boolean;

  /**
   * Text to be shown when no value has been entered.
   */
  readonly placeholder: string;

  /**
   * The value entered must not appear in this list.
   */
  readonly unique: ReadonlyArray<string>;
}> => {
  const RequiredEmailInputComponent = createInputComponent<
    string,
    ReadonlyArray<string>
  >(
    (value) => value.toLowerCase().replace(/\s/g, ``),
    (unparsed, context) => {
      if (unparsed.trim() === ``) {
        return undefined;
      } else {
        const parsed = unparsed.toLowerCase().replace(/\s/g, ``);

        if (!validateEmail(parsed)) {
          return undefined;
        } else if (minimumLength !== null && parsed.length < minimumLength) {
          return undefined;
        } else if (maximumLength !== null && parsed.length > maximumLength) {
          return undefined;
        } else {
          const match = parsed.toLowerCase();

          for (const option of context) {
            if (option.replace(/\s/g, ``).toLowerCase() === match) {
              return undefined;
            }
          }

          return parsed;
        }
      }
    },
    controlStyle,
    false,
    `email`,
    `email-address`,
    `none`,
    false,
    false
  );

  return ({ value, onChange, disabled, placeholder, unique }) => (
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
  );
};
