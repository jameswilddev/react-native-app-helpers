/**
 * Props to be given to status pill components.
 * @template T The type of status displayed.
 */
export interface StatusPillProps<T extends string> {
  /**
   * The status of the pill.
   */
  readonly status: T
}
