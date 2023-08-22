import type { FlashMessageState } from '../FlashMessageState'

/**
 * Props to be given to flash message components.
 * @template T The names of the types available.
 */
export interface FlashMessageProps<T extends string> {
  /**
   * When null, the flash message is closed.  When non-null, the details of the
   * flash message which may be displayed (the user can dismiss the current
   * message).
   */
  readonly state: null | FlashMessageState<T>
}
