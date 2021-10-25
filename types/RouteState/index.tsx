import type { RouteParameters } from "../RouteParameters";

/**
 * The state which can be persisted for a specific route key and parameter set.
 * @template T The parameters of the route table of which a state is being
 *             produced.
 */
export type RouteState<T extends RouteParameters> = {
  readonly [TKey in keyof T]: {
    readonly key: TKey;
    readonly parameters: T[TKey];
  };
}[keyof T];
