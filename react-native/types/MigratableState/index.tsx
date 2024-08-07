/**
 * Represents data which can have migrations ran against it.
 * @template T The data which can have migrations ran against it.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type MigratableState<T> = {
  /**
   * The UUIDs of all executed migrations.
   */
  readonly executedMigrationUuids?: readonly string[]
} & T
