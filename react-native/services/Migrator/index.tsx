import type { MigratableState } from '../../types/MigratableState'
import type { MigrationList } from '../../types/MigrationList'
import type { MigratorInterface } from '../../types/MigratorInterface'
import type { Json } from '../../types/Json'

/**
 * Executes migrations.
 * @template T The data to be migrated.
 */
export class Migrator<T> implements MigratorInterface<T> {
  /**
   * @param migrationList The migrations to execute.
   */
  constructor (private readonly migrationList: MigrationList) {}

  executionRequired (state: MigratableState<T>): boolean {
    return !Object.prototype.hasOwnProperty.call(state, 'executedMigrationUuids') ||
    state.executedMigrationUuids === undefined ||
    this.migrationList.some(migration => !(state.executedMigrationUuids as readonly string[]).includes(migration[0]))
  }

  execute (state: MigratableState<T>): MigratableState<T> {
    let initial = state

    if (!Object.prototype.hasOwnProperty.call(initial, 'executedMigrationUuids') || initial.executedMigrationUuids === undefined) {
      initial = { ...initial, executedMigrationUuids: [] }
    }

    let next = initial as { readonly executedMigrationUuids: readonly string[] } & Readonly<Record<string | number, Json>>

    for (const migration of this.migrationList) {
      if (!next.executedMigrationUuids.includes(migration[0])) {
        next = {
          ...migration[1](next),
          executedMigrationUuids: [
            ...next.executedMigrationUuids,
            migration[0]
          ]
        }
      }
    }

    return next as MigratableState<T>
  }
}
