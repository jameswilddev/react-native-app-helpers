import * as React from "react";
import type { ControlStyle } from "../..";
import { createInputComponent } from "../createInputComponent";

/**
 * Creates a new input component pre-configured as a nullable integer input.
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
 * @returns                    The created component.
 */
export const createNullableIntegerInputComponent = (
  controlStyle: ControlStyle,
  leftIcon: null | React.ReactNode | JSX.Element,
  rightIcon: null | React.ReactNode | JSX.Element,
  greaterThan: null | number,
  greaterThanOrEqualTo: null | number,
  lessThan: null | number,
  lessThanOrEqualTo: null | number
): React.FunctionComponent<{
  /**
   * The value to edit.  When undefined, it is treated as an invalid empty
   * string.
   */
  readonly value: undefined | null | number;

  /**
   * Invoked when the user edits the text in the box.
   * @param parsed   The value parsed, or undefined should it not be parseable.
   * @param complete True when the user has finished editing, otherwise, false.
   */
  onChange(parsed: undefined | null | number, complete: boolean): void;

  /**
   * When true, the text box is rendered semi-transparently and does not accept
   * focus or input.
   */
  readonly disabled?: undefined | boolean;

  /**
   * Text to be shown when no value has been entered.
   */
  readonly placeholder: string;
}> => {
  const NullableIntegerInputComponent = createInputComponent<
    null | number,
    null
  >(
    (value) => (value === null ? `` : String(value)),
    (unparsed) => {
      if (unparsed.trim() === ``) {
        return null;
      } else if (/^\s*[+-]?\d+\.?\s*$/.test(unparsed)) {
        const parsed = Number.parseInt(unparsed);

        if (greaterThan !== null && parsed <= greaterThan) {
          return undefined;
        } else if (lessThan !== null && parsed >= lessThan) {
          return undefined;
        } else if (
          greaterThanOrEqualTo !== null &&
          parsed < greaterThanOrEqualTo
        ) {
          return undefined;
        } else if (lessThanOrEqualTo !== null && parsed > lessThanOrEqualTo) {
          return undefined;
        } else {
          return parsed;
        }
      } else {
        return undefined;
      }
    },
    controlStyle,
    false,
    `off`,
    `numeric`,
    false,
    false
  );

  return ({ value, onChange, disabled, placeholder }) => (
    <NullableIntegerInputComponent
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
