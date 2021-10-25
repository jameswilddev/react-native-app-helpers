import * as React from "react";
import type { FunctionComponent } from "react";
import type { RouteParameters } from "../../types/RouteParameters";
import type { RouteTable } from "../../types/RouteTable";
import type { RouteState } from "../../types/RouteState";

/**
 * Creates a React component which renders a route from state.
 * @template TRouteParameters The parameters of the routes mapped.
 * @template TOtherProps      Any other props the routes accept.
 * @param routeTable          The route table the component will render from.
 * @returns                   A React component which renders a route from the
 *                            given table.
 */
export const createRoutingComponent = <
  TRouteParameters extends RouteParameters,
  TOtherProps extends { readonly [key: string]: any }
>(
  routeTable: RouteTable<TRouteParameters, TOtherProps>
): FunctionComponent<
  { readonly routeState: RouteState<TRouteParameters> } & TOtherProps
> => {
  routeTable;
  return (props) =>
    React.createElement(routeTable[props.routeState.key], props);
};
