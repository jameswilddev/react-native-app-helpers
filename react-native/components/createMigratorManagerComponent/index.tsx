import * as React from 'react'
import type { Json } from '../../types/Json'
import type { MigratorInterface } from '../../types/MigratorInterface'
import type { MigratableState } from '../../types/MigratableState'

/**
 * Creates a React component which automatically manages a migrator, displaying
 * a loading screen and executing it if appropriate.
 * @template T     The type of state to migrate.
 * @param migrator The migrator.
 * @returns        A React component which automatically manages the migrator,
 *                 displaying a loading screen and executing it if appropriate.
 */
export const createMigratorManagerComponent = <T extends Readonly<Record<string | number, Json>>>(
  migrator: MigratorInterface<T>
): React.FunctionComponent<{
    /**
     * The state to migrate.
     */
    readonly state: MigratableState<T>

    /**
     * Called once migration completes.
     * @param to The resulting state..
     */
    readonly setState: (to: MigratableState<T>) => void

    /**
     * The JSX to display while the state is migrated.
     */
    readonly migrating: React.JSX.Element

    /**
     * The JSX to display once the state is migrated.
     */
    readonly ready: React.JSX.Element
  }> => {
  return ({ state, setState, migrating, ready }) => {
    const executionRequired = migrator.executionRequired(state)

    React.useEffect(() => {
      if (executionRequired) {
        setState(migrator.execute(state))
      }
    }, [executionRequired])

    return executionRequired ? migrating : ready
  }
}
