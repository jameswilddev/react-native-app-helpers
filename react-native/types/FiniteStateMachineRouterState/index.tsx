import type { RouteParameters } from "../RouteParameters";

/**
 * The state of a finite state machine router.
 * @template T The parameters of the route table of which a state is being
 *             produced.
 */
export type FiniteStateMachineRouterState<T extends RouteParameters> = {
  readonly [TKey in keyof T]: {
    readonly key: TKey;
    readonly parameters: T[TKey];
  };
}[keyof T];
