import type * as React from 'react'

/**
 * Props to be given to image background components.
 */
export type ImageBackgroundProps = React.PropsWithChildren<{
  /**
   * Describes how the background component should be sized.
   */
  readonly size: 'fitsContent' | 'fillsContainer'
}>
