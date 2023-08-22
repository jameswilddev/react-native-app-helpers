import * as React from 'react'
import type { SvgIcon } from '../../types/SvgIcon'
import type { ControlStyle } from '../../types/ControlStyle'
import { createFullHeightPopoverComponent } from '../createFullHeightPopoverComponent'
import { createCreatableSelectChildrenComponent } from './createCreatableSelectChildrenComponent'
import type { CreatableSelectProps } from '../../types/CreatableSelectProps'

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
): React.FunctionComponent<CreatableSelectProps> {
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
