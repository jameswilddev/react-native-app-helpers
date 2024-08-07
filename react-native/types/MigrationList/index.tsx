import type { Json } from '../Json'

/**
 * A list of migrations to be ran in order.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MigrationList = ReadonlyArray<readonly [string, (previous: Readonly<Record<string | number, Json>>) => Readonly<Record<string | number, Json>>]>
