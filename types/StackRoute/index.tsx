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
    push(...itemsToAdd: ReadonlyArray<Item<TRouteParameters>>): void;
    pop(numberOfItemsToRemove?: number): void;
    replace(
      numberOfItemsToRemove: number,
      ...itemsToAdd: ReadonlyArray<Item<TRouteParameters>>
    ): void;
    reset(...replacementItems: ReadonlyArray<Item<TRouteParameters>>): void;
    readonly parameters: TRouteParameters[TRouteKey];
    readonly routeState: StackRouterState<TRouteParameters>;
    readonly setRouteState: (to: StackRouterState<TRouteParameters>) => void;
  } & TOtherProps
>;
