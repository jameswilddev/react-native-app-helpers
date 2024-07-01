import type * as React from 'react'

/**
 * Props to be given to minimum width components.
 */
export type MinimumWidthProps = React.PropsWithChildren<{
  /**
   * Describes how the component's height should be sized.
   */
  readonly height: 'fillsContainer' | 'fitsContent'
}>
