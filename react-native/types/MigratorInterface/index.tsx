import type { MigratableState } from '../MigratableState'

/**
 * The methods made available by the migrator implementation.
 * @template T The data to be migrated.
 */
export interface MigratorInterface<T> {
  /**
   * Checks whether there are any migrations to execute.
   * @param state The state to migrate.
   * @return True when all migrations have been executed, otherwise, false.
   */
  executionRequired: (state: MigratableState<T>) => boolean

  /**
   * Executes migrations.
   * @param state The state to migrate.
   * @return The resulting state once migrations have completed.
   */
  execute: (state: MigratableState<T>) => MigratableState<T>
}
