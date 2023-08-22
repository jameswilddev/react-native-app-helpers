import type * as React from 'react'
import type { SvgIcon } from '../SvgIcon'

/**
 * Props to be given to searchable multi-select components.
 * @template T The value of a listed option.
 */
export type SearchableMultiSelectProps<T> = React.PropsWithChildren<{
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
 * The icon to show on the right side of the button.
 */
  readonly rightIcon?: SvgIcon
}>
