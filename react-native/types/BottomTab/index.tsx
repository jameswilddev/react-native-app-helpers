import type { SvgIcon } from '../SvgIcon'

/**
 * Describes the content of a bottom tab.
 * @template TTab The type which represents the selected tab.
 */
export interface BottomTab<TTab extends string | number | null | undefined> {
  /**
   * The value this bottom tab represents (the tab is active when the bar's
   * value matches this, and pressing the tab selects this value).
   */
  readonly tab: TTab

  /**
   * The SVG icon to display in the tab button.
   */
  readonly icon: SvgIcon

  /**
   * The text label to display in the tab button.
   */
  readonly text: string
}
