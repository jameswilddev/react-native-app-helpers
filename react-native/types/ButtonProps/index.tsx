import type * as React from 'react'
import type { ColorValue } from 'react-native'

/**
 * Props to be given to button components.
 */
export interface ButtonProps {
  /**
   * Renders the button's left icon.
   * @param color The color of the icon.
   * @returns The icon to show, or null if no icon is to be shown.
   */
  leftIcon?: undefined | ((color: ColorValue) => null | React.ReactNode | React.JSX.Element)

  /**
   * Renders the button's right icon.
   * @param color The color of the icon.
   * @returns The icon to show, or null if no icon is to be shown.
   */
  rightIcon?: undefined | ((color: ColorValue) => null | React.ReactNode | React.JSX.Element)

  /**
   * Executed when the button is pressed.
   */
  onPress: () => void

  /**
   * When true, the button is disabled and does not accept input.
   * When false, the button is not disabled and accepts input.
   */
  readonly disabled: boolean

  /**
   * The contents of the button.  This can be null (indicating no content), a
   * string, or a function which returns a custom element to display.
   */
  readonly children:
  | string
  | ((color: ColorValue) => null | React.ReactNode | React.JSX.Element)
}
