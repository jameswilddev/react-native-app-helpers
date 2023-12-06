/**
 * Props to be given to required text input components.
 */
export interface RequiredTextInputProps {
  /**
   * The value to edit.  When undefined, it is treated as an invalid empty
   * string.
   */
  readonly value: undefined | string

  /**
   * Invoked when the user edits the text in the box.
   * @param parsed   The value parsed, or undefined should it not be parseable.
   * @param complete True when the user has finished editing, otherwise, false.
   */
  onChange: (parsed: undefined | string, complete: boolean) => void

  /**
   * When true, the text box is rendered semi-transparently and does not accept
   * focus or input.
   */
  readonly disabled?: undefined | boolean

  /**
   * Text to be shown when no value has been entered.
   */
  readonly placeholder: string

  /**
   * The value entered must not appear in this list.
   */
  readonly unique?: undefined | readonly string[]
}
