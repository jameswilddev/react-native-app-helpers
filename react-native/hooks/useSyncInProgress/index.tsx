import * as React from 'react'
import type { Json } from '../../types/Json'
import type { SyncInterface } from '../../types/SyncInterface'
import type { SyncableSchema } from '../../types/SyncableSchema'
import { useRefresh } from '../useRefresh'

/**
 * A React hook which determines whether a sync is in progress and triggers a
 * re-render should that change.
 * @template TSchema                       The schema of the synced StateStore.
 * @template TAdditionalCollectionData     Any additional information which
 *                                         should be held against a collection,
 *                                         e.g. strings for progress bars.
 * @template TAdditionalCollectionItemData Any additional information which
 *                                         should be held against a collection
 *                                         item, e.g. strings for progress bars.
 * @param sync The sync service which is to be monitored.
 * @returns    True when a sync is in progress, otherwise, false.
 */
export function useSyncInProgress<
  TSchema extends SyncableSchema,
  TAdditionalCollectionData extends Record<string, unknown>,
  TAdditionalCollectionItemData extends Record<string, Json>
> (
  sync: SyncInterface<
  TSchema,
  TAdditionalCollectionData,
  TAdditionalCollectionItemData
  >
): boolean {
  const refresh = useRefresh()

  React.useEffect(() => {
    let syncPreviouslyInProgress = sync.getState().type !== 'notRunning'

    const listener = (): void => {
      const syncInProgress = sync.getState().type !== 'notRunning'

      if (syncInProgress !== syncPreviouslyInProgress) {
        syncPreviouslyInProgress = syncInProgress
        refresh()
      }
    }

    sync.addListener('stateChange', listener)

    return () => {
      sync.removeListener('stateChange', listener)
    }
  }, [])

  return sync.getState().type !== 'notRunning'
}
