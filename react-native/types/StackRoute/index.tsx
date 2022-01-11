import type * as React from "react";
import type { RouteParameters } from "../RouteParameters";
import type { StackRouterState } from "../StackRouterState";

/**
 * Describes an item of stack router state.
 */
type Item<T extends RouteParameters> = {
  readonly [TKey in keyof T]: {
    /**
     * Uniquely identifies this card within the stack.
     */
    readonly uuid: string;

    /**
     * The key of the route.
     */
    readonly key: TKey;

    /**
     * The parameters passed to the route.
     */
    readonly parameters: T[TKey];
  };
}[keyof T];

/**
 * A React component which can be used to render a route within a stack router.
 * @template TRouteParameters The parameters to the stack router's routes.
 * @template TRouteKey        The key of this route.
 * @template TOtherProps      Any other props the route accepts.
 */
export type StackRoute<
  TRouteParameters extends RouteParameters,
  TRouteKey extends keyof TRouteParameters,
  TOtherProps extends { readonly [key: string]: unknown }
> = React.FunctionComponent<
  {
    /**
     * Call to add one or more card(s) to the top of the stack.
     * @param itemsToAdd The card(s) to add.
     */
    push(...itemsToAdd: ReadonlyArray<Item<TRouteParameters>>): void;

    /**
     * Pops one or more card(s) from the top of the stack.
     * @param numberOfItemsToRemove The number of card(s) to remove.  Defaults
     *                              to 1 when not given.
     */
    pop(numberOfItemsToRemove?: number): void;

    /**
     * Pops one or more card(s) from the top of stack, then adds one or more
     * card(s) to the top of the stack in their place.
     * @param numberOfItemsToRemove The number of card(s) to remove.
     * @param itemsToAdd            The card(s) to add in their place.
     */
    replace(
      numberOfItemsToRemove: number,
      ...itemsToAdd: ReadonlyArray<Item<TRouteParameters>>
    ): void;

    /**
     * Resets the entire card stack to a new stack.
     * @param replacementItems The replacement stack.
     */
    reset(...replacementItems: ReadonlyArray<Item<TRouteParameters>>): void;

    /**
     * The route parameters for this card.
     */
    readonly parameters: TRouteParameters[TRouteKey];

    /**
     * The state of the stack router.
     */
    readonly routeState: StackRouterState<TRouteParameters>;

    /**
     * Sets a new state within the stack router.
     * @param to The new state to set.
     */
    setRouteState(to: StackRouterState<TRouteParameters>): void;

    /**
     * This function should not be used by your routes and is included here as
     * an implementation oversight.  Called when the user makes a gesture to go
     * back, e.g. swiping from the left or pressing the hardware "back" button.
     * @param pop    Call to proceed, popping the current card from the top of
     *               the stack.
     * @param cancel Call to cancel; for a swipe gesture, this will unswipe the
     *               top card.
     */
    onBack(pop: () => void, cancel: () => void): void;

    /**
     * When true, the card is at the top of the stack and is visible (unless
     * something else like a parent tab router is hiding the stack itself).  It
     * is otherwise underneath another card.  Note that swiping to go back may
     * reveal a card which is not top!
     */
    readonly top: boolean;

    /**
     * When true, the card is at the bottom of the stack and it is not possible
     * to pop it (as there would be no card underneath to reveal).  When false,
     * at least one card is beneath this one to which it is possible to pop.
     */
    readonly bottom: boolean;
  } & TOtherProps
>;
