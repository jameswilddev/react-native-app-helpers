import type { RouteParameters } from "../RouteParameters";

type Item<T extends RouteParameters> = {
  readonly [TKey in keyof T]: {
    readonly key: TKey;
    readonly parameters: T[TKey];
  };
}[keyof T];

/**
 * The state of a stack router.
 * @template T The parameters of the route table of which a state is being
 *             produced.
 */
export type StackRouterState<T extends RouteParameters> = ReadonlyArray<
  Item<T>
>;
