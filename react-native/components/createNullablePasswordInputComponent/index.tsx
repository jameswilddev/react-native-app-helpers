import * as React from "react";
import type { ControlStyle } from "../../..";
import { createInputComponent } from "../createInputComponent";

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
): React.FunctionComponent<{
  /**
   * The value to edit.  When undefined, it is treated as an invalid empty
   * string.
   */
  readonly value: undefined | null | string;

  /**
   * Invoked when the user edits the password in the box.
   * @param parsed   The value parsed, or undefined should it not be parseable.
   * @param complete True when the user has finished editing, otherwise, false.
   */
  onChange(parsed: undefined | null | string, complete: boolean): void;

  /**
   * When true, the password box is rendered semi-transparently and does not
   * accept focus or input.
   */
  readonly disabled?: undefined | boolean;

  /**
   * Text to be shown when no value has been entered.
   */
  readonly placeholder: string;

  /**
   * The value entered must exactly equal this when not null.
   */
  readonly match: null | string;
}> => {
  const NullablePasswordInputComponent = createInputComponent<
    null | string,
    null | string
  >(
    (value) => value ?? ``,
    (unparsed, context) => {
      if (context !== null && unparsed !== context) {
        return undefined;
      } else if (unparsed === ``) {
        return null;
      } else if (minimumLength !== null && unparsed.length < minimumLength) {
        return undefined;
      } else if (maximumLength !== null && unparsed.length > maximumLength) {
        return undefined;
      } else {
        return unparsed;
      }
    },
    controlStyle,
    false,
    `off`,
    `default`,
    `sentences`,
    false,
    false,
    `left`
  );

  return ({ value, onChange, disabled, placeholder, match }) => (
    <NullablePasswordInputComponent
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      context={match}
      secureTextEntry={true}
      onSubmit={() => {
        /* No-op. */
      }}
    />
  );
};
