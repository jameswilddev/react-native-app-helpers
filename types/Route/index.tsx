import type * as React from "react";
import type { Json } from "../Json";

/**
 * A React component which can be used to render a route.
 * @template TRouteParameters The parameters to the route.
 * @template TOtherProps      Any other props the route accepts.
 */
export type Route<
  TRouteParameters extends Json,
  TOtherProps extends { readonly [key: string]: any }
> = React.FunctionComponent<
  {
    readonly routeState: {
      readonly key: string;
      readonly parameters: TRouteParameters;
    };
  } & TOtherProps
>;
