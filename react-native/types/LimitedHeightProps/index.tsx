import type * as React from 'react'

/**
 * Props to be given to limited height components.
 */
export type LimitedHeightProps = React.PropsWithChildren<{
  /**
   * Describes how the component's width should be sized.
   */
  readonly width: 'fillsContainer' | 'fitsContent'
}>
