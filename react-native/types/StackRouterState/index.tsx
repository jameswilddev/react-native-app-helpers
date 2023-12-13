import type { RouteParameters } from '../RouteParameters'
import type { StackStateItem } from '../StackStateItem'

/**
 * The state of a stack router.
 * @template T The parameters of the route table of which a state is being
 *             produced.
 */
export type StackRouterState<T extends RouteParameters> = ReadonlyArray<StackStateItem<T>>
