import type * as React from 'react'
import type { HeaderIcon } from '../HeaderIcon'

/**
 * Props to be given to header components.
 */
export type HeaderProps = React.PropsWithChildren<{
  /**
     * The icons to show on the left.
     */
  readonly leftIcons: readonly HeaderIcon[]

  /**
     * The icons to show on the right.
     */
  readonly rightIcons: readonly HeaderIcon[]
}>
