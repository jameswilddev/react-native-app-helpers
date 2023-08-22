import * as React from 'react'
import type { SvgIcon } from '../../types/SvgIcon'
import type { ControlStyle } from '../../types/ControlStyle'
import { createFullHeightPopoverComponent } from '../createFullHeightPopoverComponent'
import { createCreatableSelectChildrenComponent } from './createCreatableSelectChildrenComponent'

/**
 * Creates a new React component which provides a creatable list of options on
 * pressing a button.
 * @template T         The value of a listed option.
 * @param controlStyle The style to apply to the component.
 * @param rightIcon    When null, no icon is to be placed on the right side of
 *                     the button.  Otherwise, the icon to show there.
 * @returns            The created React component.
 */
export function createCreatableSelectComponent<
  T extends null | number | string
> (
  controlStyle: ControlStyle,
  rightIcon: null | SvgIcon
): React.FunctionComponent<{
  /**
   * When true, it will not be possible to select an option.  It will otherwise
   * be possible to do so.
   */
    readonly disabled?: undefined | boolean

    /**
   * Text to be shown on the button when no value has been selected.
   */
    readonly placeholder: string

    /**
   * When true, the control will be styled as invalid should no option have its
   * current value.  It will otherwise always appear valid.
   */
    readonly required: boolean

    /**
   * The current value.
   */
    readonly value: T

    /**
   * Invoked when the current value changes.
   * @param to The value which was selected.
   */
    onChange: (to: T) => void

    /**
   * Invoked when the user opts to create a new record.
   * @param label The label the user provided.
   */
    onCreate: (label: string) => void

    /**
   * The options displayed.
   */
    readonly options: ReadonlyArray<{
    /**
     * The label to show to the user (also used for searching).
     */
      readonly label: string

      /**
     * The value which can be selected.
     */
      readonly value: T
    }>

    /**
   * Text which is displayed when no options match the user's input.
   */
    readonly noMatchesText: string

    /**
   * Text which is displayed when the user's input does not exactly match any
   * records.
   */
    readonly willCreateText: string
  }> {
  const FullHeightPopover = createFullHeightPopoverComponent(
    controlStyle,
    rightIcon
  )
  const ContentComponent =
    createCreatableSelectChildrenComponent<T>(controlStyle)

  return ({
    disabled,
    placeholder,
    required,
    value,
    onChange,
    onCreate,
    options,
    noMatchesText,
    willCreateText
  }) => {
    const selectedOption =
      options.find((option) => option.value === value) ?? null

    return (
      <FullHeightPopover
        disabled={disabled}
        valid={!required || selectedOption !== null}
        label={selectedOption === null ? null : selectedOption.label}
        placeholder={placeholder}
      >
        {(close) => (
          <ContentComponent
            options={options}
            selectedOption={selectedOption}
            onChange={onChange}
            onCreate={onCreate}
            placeholder={placeholder}
            close={close}
            noMatchesText={noMatchesText}
            willCreateText={willCreateText}
          />
        )}
      </FullHeightPopover>
    )
  }
}
