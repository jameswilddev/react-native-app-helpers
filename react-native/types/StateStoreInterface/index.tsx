import type { Json } from '../../types/Json'

/**
 * The methods made available by the StateStore implementation.
 * @template T The type of JSON stored.
 */
export interface StateStoreInterface<T extends Json> {
  /**
   * Adds a listener for events to this state store.
   * @param eventType The type of the event to listen for.
   * @param listener  The callback to execute when the event is emitted.
   */
  addListener: (eventType: 'set', listener: () => void) => void

  /**
   * Removes a listener for events from this state store.
   * @param eventType The type of the event to listen for.
   * @param listener  The callback to no longer execute when the event is
   *                  emitted.
   */
  removeListener: (eventType: 'set', listener: () => void) => void

  /**
   * Loads the content of a record in expo-file-system into memory.
   * @param key The key of the record to read from/write to expo-file-store.
   * @throws When the state store is already loading.
   * @throws When the state store is already loaded.
   * @throws When the state store is currently unloading.
   */
  load: (key: string) => Promise<void>

  /**
   * Retrieves the current value from the store.
   * @returns The store's current value.
   * @throws When the state store is unloaded.
   * @throws When the state store is currently loading.
   * @throws When the state store is currently unloading.
   */
  get: () => T

  /**
   * Sets the current value in the store.  It will be written back to disk
   * asynchronously.
   * @param to The value to which to change.
   * @throws When the state store is unloaded.
   * @throws When the state store is currently loading.
   * @throws When the state store is currently unloading.
   */
  set: (to: T) => void

  /**
   * Awaits any queued writes and unloads the current record from memory.
   */
  unload: () => Promise<void>
}
