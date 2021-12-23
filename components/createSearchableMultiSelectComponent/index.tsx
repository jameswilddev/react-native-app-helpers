import * as React from "react";
import type { ControlStyle } from "../../types/ControlStyle";
import { createFullHeightPopoverComponent } from "../createFullHeightPopoverComponent";
import { createSearchableMultiSelectChildrenComponent } from "./createSearchableMultiSelectChildrenComponent";

/**
 * Creates a new React component which provides a searchable list of options
 * (of which any number can be selected) on pressing a button.
 * @template T         The value of a listed option.
 * @param controlStyle The style to apply to the component.
 * @returns            The created React component.
 */
export function createSearchableMultiSelectComponent<
  T extends null | number | string
>(
  controlStyle: ControlStyle
): React.FunctionComponent<{
  /**
   * When true, it will not be possible to select an option.  It will otherwise
   * be possible to do so.
   */
  readonly disabled?: undefined | boolean;

  /**
   * Text to be shown on the button when no value has been selected.
   */
  readonly placeholder: string;

  /**
   * The current values.
   */
  readonly values: ReadonlyArray<T>;

  /**
   * Invoked when the current values change.
   * @param to The values which were selected.
   */
  onChange(to: ReadonlyArray<T>): void;

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
    createSearchableMultiSelectChildrenComponent<T>(controlStyle);

  return ({
    disabled,
    placeholder,
    values,
    onChange,
    options,
    noMatchesText,
  }) => {
    const selectedOptionLabels = options
      .filter((option) => values.includes(option.value))
      .map((option) => option.label)
      .sort()
      .join(`, `);

    return (
      <FullHeightPopover
        disabled={disabled || options.length === 0}
        valid
        label={selectedOptionLabels || null}
        placeholder={placeholder}
        children={(close) => (
          <ContentComponent
            options={options}
            values={values}
            onChange={onChange}
            placeholder={selectedOptionLabels || placeholder}
            close={close}
            noMatchesText={noMatchesText}
          />
        )}
      />
    );
  };
}
