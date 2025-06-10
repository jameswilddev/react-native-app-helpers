/**
 * Props to be given to sidebar components.
 */
export interface SidebarProps {
  /**
   * The element to show in the left sidebar.
   */
  readonly left?: React.JSX.Element

  /**
   * The element to show in the middle, with fluid width.
   */
  readonly body?: React.JSX.Element

  /**
   * The element to show in the right sidebar.
   */
  readonly right?: React.JSX.Element
}
