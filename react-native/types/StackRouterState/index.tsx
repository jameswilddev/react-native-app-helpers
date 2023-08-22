import type { RouteParameters } from '../RouteParameters'

type Item<T extends RouteParameters> = {
  readonly [TKey in keyof T]: {
    /**
     * Uniquely identifies this card within the stack.
     */
    readonly uuid: string

    /**
     * The route key.
     */
    readonly key: TKey

    /**
     * The parameters to the route.
     */
    readonly parameters: T[TKey]
  };
}[keyof T]

/**
 * The state of a stack router.
 * @template T The parameters of the route table of which a state is being
 *             produced.
 */
export type StackRouterState<T extends RouteParameters> = ReadonlyArray<
Item<T>
>
