import type { SvgIcon } from '../SvgIcon'

/**
 * Describes an icon on the left or right side of a header bar.
 */
export interface HeaderIcon {
  /**
   * The icon to show.
   */
  readonly icon: SvgIcon

  /**
   * The callback to execute when the button is pressed.
   */
  onPress: () => void
}
