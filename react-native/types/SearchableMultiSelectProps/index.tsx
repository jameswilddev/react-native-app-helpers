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
 * The current values.
 */
  readonly values: readonly T[]

  /**
 * Invoked when the current values change.
 * @param to The values which were selected.
 */
  onChange: (to: readonly T[]) => void

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
