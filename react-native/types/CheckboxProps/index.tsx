/**
 * Props to be given to checkbox components.
 */
export type CheckboxProps = React.PropsWithChildren<{
  /**
   * When true, the checkbox is checked.  It is otherwise unchecked.
   */
  value: boolean

  /**
   * Invoked when the checkbox is pressed.
   * @param to True when the checkbox is changing from unchecked to checked,
   *           otherwise, false.
   */
  onChange: (to: boolean) => void

  /**
   * When true, the checkbox will show alternative styles and will not accept
   * input.  It will otherwise show its default styles and accept input.
   */
  disabled: boolean
}>
