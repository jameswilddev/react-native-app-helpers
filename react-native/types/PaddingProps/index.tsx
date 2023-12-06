import type * as React from 'react'

/**
 * Props to be given to padding components.
 */
export type PaddingProps = React.PropsWithChildren<{
  /**
   * Describes how the padding component should be sized.
   */
  readonly size: 'fitsContent' | 'fillsContainer'
}>
