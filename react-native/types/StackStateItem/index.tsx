import type { RouteParameters } from '../RouteParameters'

/**
 * Describes an item of stack router state.
 * @template TRouteParameters The parameters to the stack router's routes.
 */
export type StackStateItem<T extends RouteParameters> = {
  readonly [TKey in keyof T]: {
    /**
     * Uniquely identifies this card within the stack.
     */
    readonly uuid: string

    /**
     * The key of the route.
     */
    readonly key: TKey

    /**
     * The parameters passed to the route.
     */
    readonly parameters: T[TKey]
  };
}[keyof T]
