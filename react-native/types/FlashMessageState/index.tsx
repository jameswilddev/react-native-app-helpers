/**
 * Describes the state of a flash message.
 * @template T The names of the types available.
 */
export interface FlashMessageState<T extends string> {
  /**
   * The name of the type to display.
   */
  readonly type: T

  /**
   * The message to display.
   */
  readonly message: string
}
