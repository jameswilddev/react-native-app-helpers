import type { QueryParameter } from '../QueryParameter'

/**
 * A map of query parameter keys to values.
 */
export type QueryParameters = Readonly<Record<string, QueryParameter>>
