import * as React from "react";
import type { ControlStyle } from "../../types/ControlStyle";
import { createFullHeightPopoverComponent } from "../createFullHeightPopoverComponent";
import { createSearchableSelectChildrenComponent } from "./createSearchableSelectChildrenComponent";

/**
 * Creates a new React component which provides a searchable list of options on
 * pressing a button.
 * @template T         The value of a listed option.
 * @param controlStyle The style to apply to the component.
 * @returns            The created React component.
 */
export function createSearchableSelectComponent<
  T extends null | number | string
>(
  controlStyle: ControlStyle
): React.FunctionComponent<{
  /**
   * When true, it will not be possible to select an option.  It will otherwise
   * be possible to do so.
   */
  readonly disabled: boolean;

  /**
   * Text to be shown on the button when no value has been selected.
   */
  readonly placeholder: string;

  /**
   * When true, the control will be styled as invalid should no option have its
   * current value.  It will otherwise always appear valid.
   */
  readonly required: boolean;

  /**
   * The current value.
   */
  readonly value: T;

  /**
   * Invoked when the current value changes.
   * @param to The value which was selected.
   */
  onChange(to: T): void;

  /**
   * The options displayed.
   */
  readonly options: ReadonlyArray<{
    /**
     * The label to show to the user (also used for searching).
     */
    readonly label: string;

    /**
     * The value which can be selected.
     */
    readonly value: T;
  }>;

  /**
   * Text which is displayed when no options match the user's input.
   */
  readonly noMatchesText: string;
}> {
  const FullHeightPopover = createFullHeightPopoverComponent(controlStyle);
  const ContentComponent =
    createSearchableSelectChildrenComponent<T>(controlStyle);

  return ({
    disabled,
    placeholder,
    required,
    value,
    onChange,
    options,
    noMatchesText,
  }) => {
    const selectedOption =
      options.find((option) => option.value === value) ?? null;

    return (
      <FullHeightPopover
        disabled={disabled || options.length === 0}
        valid={!required || selectedOption !== null}
        label={selectedOption === null ? null : selectedOption.label}
        placeholder={placeholder}
        children={(close) => (
          <ContentComponent
            options={options}
            selectedOption={selectedOption}
            onChange={onChange}
            placeholder={placeholder}
            close={close}
            noMatchesText={noMatchesText}
          />
        )}
      />
    );
  };
}
