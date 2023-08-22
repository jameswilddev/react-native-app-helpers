/**
 * Props to be given to header components.
 * @template TTab The type which represents the selected tab.
 */
export interface UnderlinedTopTabBarProps<TTab extends string | number | null | undefined> {
  /**
   * The current tab.
   */
  readonly tab: TTab

  /**
   * Called when the current tab should change.
   * @param to The tab to change to.
   */
  setTab: (to: TTab) => void
}
