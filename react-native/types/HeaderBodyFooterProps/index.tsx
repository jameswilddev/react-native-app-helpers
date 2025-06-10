import type * as React from 'react'

/**
 * Props to be given to header/body/footer components.
 */
export type HeaderBodyFooterProps = React.PropsWithChildren<{
  /**
   * The element to use as the header, if any.
   */
  readonly header?: null | React.ReactNode | React.JSX.Element

  /**
   * The element to use as the body, if any.
   */
  readonly body?: null | React.ReactNode | React.JSX.Element

  /**
   * The element to use as the footer, if any.
   */
  readonly footer?: null | React.ReactNode | React.JSX.Element
}>
