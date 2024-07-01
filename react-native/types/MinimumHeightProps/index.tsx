import type * as React from 'react'

/**
 * Props to be given to minimum height components.
 */
export type MinimumHeightProps = React.PropsWithChildren<{
  /**
   * Describes how the component's width should be sized.
   */
  readonly width: 'fillsContainer' | 'fitsContent'
}>
