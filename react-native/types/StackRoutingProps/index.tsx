import type { RouteParameters } from '../RouteParameters'
import type { StackRouterState } from '../StackRouterState'

/**
 * Props to be given to stack routing components.
 */
export type StackRoutingProps<TRouteParameters extends RouteParameters, TOtherProps extends Readonly<Record<string, unknown>>> = {
  /**
   * The current route state.
   */
  readonly routeState: StackRouterState<TRouteParameters>

  /**
   * Called when the current route state should change.
   * @param to The state to which the current route state should change.
   */
  readonly setRouteState: (to: StackRouterState<TRouteParameters>) => void

  /**
   * Called when the user makes a gesture to go back, e.g. swiping from the
   * left or pressing the hardware "back" button.
   * @param pop    Call to proceed, popping the current card from the top of
   *               the stack.
   * @param cancel Call to cancel; for a swipe gesture, this will unswipe the
   *               top card.
   */
  onBack: (pop: () => void, cancel: () => void) => void
} & TOtherProps
