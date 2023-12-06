import type * as React from 'react'

/**
 * Props to be given to fixed width components.
 */
export type FixedWidthProps = React.PropsWithChildren<{
  /**
   * Describes how the component's height should be sized.
   */
  readonly height: 'fillsContainer' | 'fitsContent'
}>
