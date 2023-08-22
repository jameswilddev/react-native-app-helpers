import type * as React from 'react'

/**
 * Props to be given to text components.
 */
export type TextProps = React.PropsWithChildren<{
  /**
   * Similar to Text's onPress, but remote-controlled using the "enabled" static
   * property of Hitbox.
   */
  readonly onPress?: undefined | (() => void)
}>
