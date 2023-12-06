import * as React from 'react'
import type { SvgIcon } from '../../types/SvgIcon'
import type { ControlStyle } from '../../types/ControlStyle'
import { createFullHeightPopoverComponent } from '../createFullHeightPopoverComponent'
import { createSearchableSelectChildrenComponent } from './createSearchableSelectChildrenComponent'
import type { SearchableSelectProps } from '../../types/SearchableSelectProps'

/**
 * Creates a new React component which provides a searchable list of options on
 * pressing a button.
 * @template T         The value of a listed option.
 * @param controlStyle The style to apply to the component.
 * @param rightIcon    When null, no icon is to be placed on the right side of
 *                     the button.  Otherwise, the icon to show there.
 * @returns            The created React component.
 */
export function createSearchableSelectComponent<
  T extends null | number | string
> (
  controlStyle: ControlStyle,
  rightIcon: null | SvgIcon
): React.FunctionComponent<SearchableSelectProps<T>> {
  const FullHeightPopover = createFullHeightPopoverComponent(
    controlStyle,
    rightIcon
  )
  const ContentComponent =
    createSearchableSelectChildrenComponent<T>(controlStyle)

  const SearchableSelect: React.FunctionComponent<SearchableSelectProps<T>> = ({
    disabled,
    placeholder,
    required,
    value,
    onChange,
    options,
    noMatchesText
  }) => {
    const selectedOption =
      options.find((option) => option.value === value) ?? null

    return (
      <FullHeightPopover
        disabled={disabled === true || options.length === 0}
        valid={!required || selectedOption !== null}
        label={selectedOption === null ? null : selectedOption.label}
        placeholder={placeholder}
      >
        {(close) => (
          <ContentComponent
            options={options}
            selectedOption={selectedOption}
            onChange={onChange}
            placeholder={placeholder}
            close={close}
            noMatchesText={noMatchesText}
          />
        )}
      </FullHeightPopover>
    )
  }

  return SearchableSelect
}
