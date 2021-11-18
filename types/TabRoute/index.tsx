import type * as React from "react";

/**
 * A React component which represents the content of a tab.
 * @template TOtherProps Any other props the route accepts.
 */
export type TabRoute<TOtherProps extends { readonly [key: string]: unknown }> =
  React.FunctionComponent<
    {
      readonly route: string;
    } & TOtherProps
  >;
