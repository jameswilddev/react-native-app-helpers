import type * as React from 'react'

/**
 * Props to be given to card components.
 */
export type CardProps = React.PropsWithChildren<{
  /**
   * Describes how the card's width should be sized.
   */
  readonly width: 'fillsContainer' | 'fitsContent'

  /**
   * Describes how the card's height should be sized.
   */
  readonly height: 'fillsContainer' | 'fitsContent'
}>
