import type * as React from 'react'

/**
 * Props to be given to fixed height components.
 */
export type FixedHeightProps = React.PropsWithChildren<{
  /**
   * Describes how the component's widthwidth should be sized.
   */
  readonly width: 'fillsContainer' | 'fitsContent'
}>
