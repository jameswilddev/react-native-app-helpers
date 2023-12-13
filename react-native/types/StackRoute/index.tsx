import type * as React from 'react'
import type { RouteParameters } from '../RouteParameters'
import type { StackRouteProps } from '../StackRouteProps'

/**
 * A React component which can be used to render a route within a stack router.
 * @template TRouteParameters The parameters to the stack router's routes.
 * @template TRouteKey        The key of this route.
 * @template TOtherProps      Any other props the route accepts.
 */
export interface StackRoute<
  TRouteParameters extends RouteParameters,
  TRouteKey extends keyof TRouteParameters,
  TOtherProps extends Readonly<Record<string, unknown>>
> {
  readonly component: React.FunctionComponent<
  StackRouteProps<TRouteParameters, TRouteKey> & TOtherProps
  >

  /**
   * When true, the card can be swiped away to dismiss it (e.g. the left edge page-turning gesture on iOS/Android).
   * It may be necessary to set this to false when cards include draggable elements, as the touch handler on the card can interfere with those of its contents.
   * This does NOT affect hardware back buttons.
   */
  readonly allowsSwiping: boolean
}
