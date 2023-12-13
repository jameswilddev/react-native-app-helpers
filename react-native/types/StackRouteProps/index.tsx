import type { RouteParameters } from '../RouteParameters'
import type { StackStateItem } from '../StackStateItem'
import type { StackRouterState } from '../StackRouterState'

/**
 * Props given to stack routes.
 * @template TRouteParameters The parameters to the stack router's routes.
 * @template TRouteKey        The key of this route.
 */
export interface StackRouteProps<TRouteParameters extends RouteParameters, TRouteKey extends keyof TRouteParameters> {
  /**
     * Call to add one or more card(s) to the top of the stack.
     * @param itemsToAdd The card(s) to add.
     */
  push: (...itemsToAdd: ReadonlyArray<StackStateItem<TRouteParameters>>) => void

  /**
     * Pops one or more card(s) from the top of the stack.
     * @param numberOfItemsToRemove The number of card(s) to remove.  Defaults
     *                              to 1 when not given.
     */
  pop: (numberOfItemsToRemove?: number) => void

  /**
     * Pops one or more card(s) from the top of stack, then adds one or more
     * card(s) to the top of the stack in their place.
     * @param numberOfItemsToRemove The number of card(s) to remove.
     * @param itemsToAdd            The card(s) to add in their place.
     */
  replace: (
    numberOfItemsToRemove: number,
    ...itemsToAdd: ReadonlyArray<StackStateItem<TRouteParameters>>
  ) => void

  /**
     * Resets the entire card stack to a new stack.
     * @param replacementItems The replacement stack.
     */
  reset: (...replacementItems: ReadonlyArray<StackStateItem<TRouteParameters>>) => void

  /**
     * Changes the parameters of this card.
     * @param parameters The replacement parameters.
     */
  setParameters: (parameters: TRouteParameters[TRouteKey]) => void

  /**
     * The route parameters for this card.
     */
  readonly parameters: TRouteParameters[TRouteKey]

  /**
     * The state of the stack router.
     */
  readonly routeState: StackRouterState<TRouteParameters>

  /**
     * Sets a new state within the stack router.
     * @param to The new state to set.
     */
  setRouteState: (to: StackRouterState<TRouteParameters>) => void

  /**
     * This function should not be used by your routes and is included here as
     * an implementation oversight.  Called when the user makes a gesture to go
     * back, e.g. swiping from the left or pressing the hardware "back" button.
     * @param pop    Call to proceed, popping the current card from the top of
     *               the stack.
     * @param cancel Call to cancel; for a swipe gesture, this will unswipe the
     *               top card.
     */
  onBack: (pop: () => void, cancel: () => void) => void

  /**
     * When true, the card is at the top of the stack and is visible (unless
     * something else like a parent tab router is hiding the stack itself).  It
     * is otherwise underneath another card.  Note that swiping to go back may
     * reveal a card which is not top!
     */
  readonly top: boolean

  /**
     * When true, the card is at the bottom of the stack and it is not possible
     * to pop it (as there would be no card underneath to reveal).  When false,
     * at least one card is beneath this one to which it is possible to pop.
     */
  readonly bottom: boolean
}
