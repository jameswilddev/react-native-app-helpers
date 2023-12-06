import type { RouteParameters } from '../RouteParameters'
import type { FiniteStateMachineRouterState } from '../FiniteStateMachineRouterState'

/**
 * Props to be given to finite state machine routing components.
 */
export type FiniteStateMachineRoutingProps<TRouteParameters extends RouteParameters, TOtherProps extends Readonly<Record<string, unknown>>> = {
  /**
   * The current route state.
   */
  readonly routeState: FiniteStateMachineRouterState<TRouteParameters>
} & TOtherProps
