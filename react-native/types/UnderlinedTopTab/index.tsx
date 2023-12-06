/**
 * Describes the content of an underlined top tab.
 * @template TTab The type which represents the selected tab.
 */
export interface UnderlinedTopTab<TTab extends string | number | null | undefined> {
  /**
     * The value this top tab represents (the tab is active when the bar's value
     * matches this, and pressing the tab selects this value).
     */
  readonly tab: TTab

  /**
     * The text label to display in the tab button.
     */
  readonly text: string
}
