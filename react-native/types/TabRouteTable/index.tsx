import type { TabRoute } from '../TabRoute'

/**
 * A table which maps route keys to React components.
 * @template TRoute      The key used to select a route.
 * @template TOtherProps Any other props the routes accept.
 */
export type TabRouteTable<
  TRoute extends string,
  TOtherProps extends Readonly<Record<string, unknown>>
> = {
  readonly [TRouteKey in TRoute]: TabRoute<TOtherProps>;
}
