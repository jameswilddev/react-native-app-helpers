import type * as React from 'react'

/**
 * Props to be given to limited width components.
 */
export type LimitedWidthProps = React.PropsWithChildren<{
  /**
   * Describes how the component's height should be sized.
   */
  readonly height: 'fillsContainer' | 'fitsContent'
}>
