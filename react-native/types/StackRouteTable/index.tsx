import type { RouteParameters } from '../RouteParameters'
import type { StackRoute } from '../StackRoute'

/**
 * A table which maps route keys to React components for a stack router.
 * @template TRouteParameters The parameters of the routes being mapped.
 * @template TOtherProps      Any other props the routes accept.
 */
export type StackRouteTable<
  TRouteParameters extends RouteParameters,
  TOtherProps extends Readonly<Record<string, unknown>>
> = {
  readonly [TKey in keyof TRouteParameters]: StackRoute<
  TRouteParameters,
  TKey,
  TOtherProps
  >;
}
