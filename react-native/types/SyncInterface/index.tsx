import type { Json } from '../Json'
import type { SyncableSchema } from '../SyncableSchema'
import type { SyncState } from '../SyncState'

/**
 * The methods made available by the Sync implementation.
 * @template TSchema                       The schema of the synced StateStore.
 * @template TAdditionalCollectionData     Any additional information which
 *                                         should be held against a collection,
 *                                         e.g. strings for progress bars.
 * @template TAdditionalCollectionItemData Any additional information which
 *                                         should be held against a collection
 *                                         item, e.g. strings for progress bars.
 */
export interface SyncInterface<
  TSchema extends SyncableSchema,
  TAdditionalCollectionData extends Record<string, unknown>,
  TAdditionalCollectionItemData extends Record<string, Json>
> {
  /**
   * When this value is greater than zero, file clean-up will not be performed.
   * This is intended to be used to prevent files which have been added to a
   * pending form being cleaned up; screens which may add or remove files in
   * React state before their references are committed to the state store MUST
   * increment this on mount and decrement it on unmount.
   */
  fileCleanUpBlockers: number

  /**
   * Adds a listener for events to this sync process.
   * @param eventType The type of the event to listen for.
   * @param listener  The callback to execute when the event is emitted.
   */
  addListener: (eventType: 'stateChange', listener: () => void) => void

  /**
   * Removes a listener for events from this sync process.
   * @param eventType The type of the event to listen for.
   * @param listener  The callback to no longer execute when the event is
   *                  emitted.
   */
  removeListener: (eventType: 'stateChange', listener: () => void) => void

  /**
   * Retrieves the current status of this sync process.
   * @returns The current status of this sync process.
   */
  getState: () => SyncState<
  TSchema,
  TAdditionalCollectionData,
  TAdditionalCollectionItemData
  >

  /**
   * @param abortSignal An AbortSignal which can be used to cancel the sync.
   * @returns           A description of the outcome of the synchronization
   *                    process and any further action required by the caller.
   * @throws            When sync is already in progress.
   */
  run: (
    abortSignal: null | AbortSignal
  ) => Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>
}
