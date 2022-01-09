import type * as React from "react";
import type { RouteParameters } from "../RouteParameters";
import type { StackRouterState } from "../StackRouterState";

/**
 * Describes an item of stack router state.
 */
type Item<T extends RouteParameters> = {
  readonly [TKey in keyof T]: {
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
  } & TOtherProps
>;
