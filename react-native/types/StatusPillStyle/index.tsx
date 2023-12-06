import type { StatusPillStyleStatus } from '../StatusPillStyleStatus'

/**
 * Describes the style of a status pill.
 * @template T The type of status displayed.
 */
export interface StatusPillStyle<T extends string> {
  /**
   * The name of the font family shown.
   */
  readonly fontFamily: string

  /**
   * The size of the font shown.
   */
  readonly fontSize: number

  /**
   * The amount of padding around the text.
   */
  readonly padding: number

  /**
   * The styles of the individual statuses.
   */
  readonly statuses: {
    readonly [TStatus in T]: StatusPillStyleStatus;
  }
}
