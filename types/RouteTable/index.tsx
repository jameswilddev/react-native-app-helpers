import type { Route } from "../Route";
import type { RouteParameters } from "../RouteParameters";

/**
 * A table which maps route keys to React components.
 * @template TRouteParameters The parameters of the routes being mapped.
 * @template TOtherProps      Any other props the routes accept.
 */
export type RouteTable<
  TRouteParameters extends RouteParameters,
  TOtherProps extends { readonly [key: string]: any }
  > = {
    readonly [TKey in keyof TRouteParameters]: Route<
      TRouteParameters[TKey],
      TOtherProps
    >;
  };
