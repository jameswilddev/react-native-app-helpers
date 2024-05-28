import * as React from 'react'
import type { SvgIcon } from '../../types/SvgIcon'
import type { ControlStyle } from '../../types/ControlStyle'
import { createFullHeightPopoverComponent } from '../createFullHeightPopoverComponent'
import { createSearchableMultiSelectChildrenComponent } from './createSearchableMultiSelectChildrenComponent'
import type { SearchableMultiSelectProps } from '../../types/SearchableMultiSelectProps'

/**
 * Creates a new React component which provides a searchable list of options
 * (of which any number can be selected) on pressing a button.
 * @template T         The value of a listed option.
 * @param controlStyle The style to apply to the component.
 * @param rightIcon    When null, no icon is to be placed on the right side of
 *                     the button.  Otherwise, the icon to show there.
 * @returns            The created React component.
 */
export function createSearchableMultiSelectComponent<
  T extends null | number | string
> (
  controlStyle: ControlStyle,
  rightIcon: null | SvgIcon
): React.FunctionComponent<SearchableMultiSelectProps<T>> {
  const FullHeightPopover = createFullHeightPopoverComponent(
    controlStyle,
    rightIcon
  )
  const ContentComponent =
    createSearchableMultiSelectChildrenComponent<T>(controlStyle)

  const SearchableMultiSelect: React.FunctionComponent<SearchableMultiSelectProps<T>> = ({
    disabled,
    placeholder,
    values,
    onChange,
    options,
    noMatchesText
  }) => {
    const selectedOptionLabels = options
      .filter((option) => values.includes(option.value))
      .map((option) => option.label)
      .sort()
      .join(', ')

    return (
      <FullHeightPopover
        disabled={disabled || options.length === 0}
        valid
        label={selectedOptionLabels === '' ? null : selectedOptionLabels}
        placeholder={placeholder}
      >
        {(close) => (
          <ContentComponent
            options={options}
            values={values}
            onChange={onChange}
            placeholder={selectedOptionLabels === '' ? placeholder : selectedOptionLabels}
            close={close}
            noMatchesText={noMatchesText}
          />
        )}
      </FullHeightPopover>
    )
  }

  return SearchableMultiSelect
}
