/**
 * Props to be given to sidebar components.
 */
export interface SidebarProps {
  /**
   * The element to show in the left sidebar.
   */
  readonly left?: JSX.Element

  /**
   * The element to show in the middle, with fluid width.
   */
  readonly body?: JSX.Element

  /**
   * The element to show in the right sidebar.
   */
  readonly right?: JSX.Element
}
