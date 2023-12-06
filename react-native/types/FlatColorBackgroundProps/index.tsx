import type * as React from 'react'

/**
 * Props to be given to flat color background components.
 */
export type FlatColorBackgroundProps = React.PropsWithChildren<{
  /**
   * Describes how the background component should be sized.
   */
  readonly size: 'fitsContent' | 'fillsContainer'
}>
