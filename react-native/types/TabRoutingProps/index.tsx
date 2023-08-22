/**
 * Props to be given to tab routing components.
 */
export type TabRoutingProps<TRoute extends string, TOtherProps extends Readonly<Record<string, unknown>>> = {
  /**
     * The key of the route to display.
     */
  readonly route: TRoute
} & TOtherProps
