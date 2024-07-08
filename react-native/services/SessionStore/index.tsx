import * as SecureStore from 'expo-secure-store'
import { EventEmitter } from 'events'
import type { Json } from '../../types/Json'
import type { ErrorReporterInterface } from '../../types/ErrorReporterInterface'

/**
 * A wrapper around expo-secure-store which adds:
 * - Concurrency control.
 * - JSON parsing and serialization.
 * - Change events.
 * - A synchronous read/write API (with asynchronous write-back).
 * @template T The type of JSON stored.
 */
export class SessionStore<T extends Json> {
  private unloaded = true
  private value: undefined | T = undefined
  private writeQueueLength: 0 | 1 | 2 = 0
  private resolveOnUnload: null | (() => void) = null

  private readonly eventEmitter = new EventEmitter()

  /**
   * @param initial          The value to use when no such record exists in the
   *                         store.
   * @param secureStorageKey The key of the record to read from/write to
   *                         expo-secure-store.
   * @param errorReporter    The error reporter to use.
   */
  constructor (
    private readonly initial: T,
    private readonly secureStorageKey: string,
    private readonly errorReporter: ErrorReporterInterface
  ) {}

  /**
   * Adds a listener for events to this session store.
   * @param eventType The type of the event to listen for.
   * @param listener  The callback to execute when the event is emitted.
   */
  addListener (eventType: 'set', listener: () => void): void {
    this.eventEmitter.addListener(eventType, listener)
  }

  /**
   * Removes a listener for events from this session store.
   * @param eventType The type of the event to listen for.
   * @param listener  The callback to no longer execute when the event is
   *                  emitted.
   */
  removeListener (eventType: 'set', listener: () => void): void {
    this.eventEmitter.removeListener(eventType, listener)
  }

  /**
   * Loads the content of the record in expo-secure-store into memory.
   * @throws When the session store is already loading.
   * @throws When the session store is already loaded.
   * @throws When the session store is currently unloading.
   */
  async load (): Promise<void> {
    if (this.resolveOnUnload !== null) {
      throw new Error('The session store is currently unloading.')
    } else if (this.value !== undefined) {
      throw new Error('The session store is already loaded.')
    } else if (!this.unloaded) {
      throw new Error('The session store is already loading.')
    } else {
      this.unloaded = false

      let raw: null | string = null

      try {
        raw = await SecureStore.getItemAsync(this.secureStorageKey)
      } catch (e) {
        this.errorReporter.report(e)
      }

      if (raw === null) {
        this.value = this.initial
      } else {
        this.value = JSON.parse(raw)
      }
    }
  }

  /**
   * Retrieves the current value from the store.
   * @returns The store's current value.
   * @throws When the session store is unloaded.
   * @throws When the session store is currently loading.
   * @throws When the session store is currently unloading.
   */
  get (): T {
    if (this.resolveOnUnload !== null) {
      throw new Error('The session store is currently unloading.')
    } else if (this.unloaded) {
      throw new Error('The session store is not loaded.')
    } else if (this.value === undefined) {
      throw new Error('The session store is currently loading.')
    } else {
      return this.value
    }
  }

  private startWrite (): void {
    void (async () => {
      await SecureStore.setItemAsync(
        this.secureStorageKey,
        JSON.stringify(this.value as T)
      )

      this.writeQueueLength--

      if (this.writeQueueLength > 0) {
        this.startWrite()
      } else if (this.resolveOnUnload !== null) {
        const resolveOnUnload = this.resolveOnUnload
        this.unloaded = true
        this.value = undefined
        this.resolveOnUnload = null
        resolveOnUnload()
      }
    })()
  }

  /**
   * Sets the current value in the store.  It will be written back to disk
   * asynchronously.
   * @param to The value to which to change.
   * @throws When the session store is unloaded.
   * @throws When the session store is currently loading.
   * @throws When the session store is currently unloading.
   */
  set (to: T): void {
    if (this.resolveOnUnload !== null) {
      throw new Error('The session store is currently unloading.')
    } else if (this.unloaded) {
      throw new Error('The session store is not loaded.')
    } else if (this.value === undefined) {
      throw new Error('The session store is currently loading.')
    } else {
      this.value = to

      if (this.writeQueueLength === 0) {
        this.writeQueueLength = 1
        this.startWrite()
      } else {
        this.writeQueueLength = 2
      }

      this.eventEmitter.emit('set')
    }
  }

  /**
   * Awaits any queued writes and unloads the current record from memory.
   */
  async unload (): Promise<void> {
    if (this.resolveOnUnload !== null) {
      throw new Error('The session store is already unloading.')
    } else if (this.unloaded) {
      throw new Error('The session store is not loaded.')
    } else if (this.value === undefined) {
      throw new Error('The session store is currently loading.')
    } else if (this.writeQueueLength > 0) {
      await new Promise<void>((resolve) => {
        this.resolveOnUnload = resolve
      })
    } else {
      this.unloaded = true
      this.value = undefined
    }
  }
}
