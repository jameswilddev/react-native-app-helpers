/**
  * Props to be given to bottom tab bar components.
  * @template TTab           The type which represents the selected tab.
  */
export interface BottomTabBarProps<TTab extends string | number | null | undefined> {
  /**
   * The selected tab.
   */
  readonly tab: TTab

  /**
   * Called when the user presses an inactive tab.
   * @param to The tab which the user pressed.
   */
  setTab: (to: TTab) => void

  /**
   * Called when the user presses the active tab; this should return to the
   * "home" route of the active tab, e.g. return to the list of records if
   * currently viewing a particular record.
   */
  resetActiveTab: () => void
}
