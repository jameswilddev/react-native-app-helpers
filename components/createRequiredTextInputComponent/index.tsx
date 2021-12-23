import * as React from "react";
import type { ControlStyle } from "../..";
import { createInputComponent } from "../createInputComponent";

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
  autoCapitalize: `none` | `sentences` | `words` | `characters`
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
  readonly disabled?: undefined | boolean;

  /**
   * Text to be shown when no value has been entered.
   */
  readonly placeholder: string;

  /**
   * The value entered must not appear in this list.
   */
  readonly unique?: undefined | ReadonlyArray<string>;
}> => {
  const RequiredTextInputComponent = createInputComponent<
    string,
    ReadonlyArray<string>
  >(
    (value) => value.trim().replace(/\s+/g, ` `),
    (unparsed, context) => {
      if (unparsed.trim() === ``) {
        return undefined;
      } else {
        const parsed = unparsed.trim().replace(/\s+/g, ` `);

        if (minimumLength !== null && parsed.length < minimumLength) {
          return undefined;
        } else if (maximumLength !== null && parsed.length > maximumLength) {
          return undefined;
        } else {
          const match = parsed.toLowerCase();

          for (const option of context) {
            if (option.trim().replace(/\s+/g, ` `).toLowerCase() === match) {
              return undefined;
            }
          }

          return parsed;
        }
      }
    },
    controlStyle,
    false,
    `off`,
    `default`,
    autoCapitalize,
    false,
    false
  );

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
  );
};
