import { Directory, File, Paths } from 'expo-file-system'
import { EventEmitter } from 'events'
import type { Json } from '../../types/Json'
import type { StateStoreInterface } from '../../types/StateStoreInterface'

interface StateStoreContent<T extends Json> {
  readonly version: string
  readonly value: T
}

/**
 * A wrapper around expo-file-system which adds:
 * - Concurrency control.
 * - JSON parsing and serialization.
 * - Change events.
 * - A synchronous read/write API (with asynchronous write-back).
 * - Versioning.
 * @template T The type of JSON stored.
 */
export class StateStore<T extends Json> implements StateStoreInterface<T> {
  private fileUri: null | File = null
  private value: undefined | T = undefined
  private writeQueueLength: 0 | 1 | 2 = 0
  private resolveOnUnload: null | (() => void) = null

  private readonly eventEmitter = new EventEmitter()

  /**
   * @param initial The value to use when no such record exists
   *                in expo-file-system.
   * @param version A string which identifies the version of the data structure
   *                within the state store.  States previously written with a
   *                differing version will be discarded and replaced with the
   *                initial value.  This can be used to handle drastic data
   *                store redesigns early in development.
   */
  constructor (private readonly initial: T, private readonly version: string) {}

  addListener (eventType: 'set', listener: () => void): void {
    this.eventEmitter.addListener(eventType, listener)
  }

  removeListener (eventType: 'set', listener: () => void): void {
    this.eventEmitter.removeListener(eventType, listener)
  }

  async load (key: string): Promise<void> {
    if (this.resolveOnUnload !== null) {
      throw new Error('The state store is currently unloading.')
    } else if (this.value !== undefined) {
      throw new Error('The state store is already loaded.')
    } else if (this.fileUri !== null) {
      throw new Error('The state store is already loading.')
    } else {
      const directoryUri = new Directory(Paths.document, 'react-native-app-helpers', 'state-store')
      const fileUri = new File(directoryUri, key)

      this.fileUri = fileUri

      directoryUri.create({ intermediates: true, idempotent: true, overwrite: false })

      if (fileUri.exists) {
        const raw = await fileUri.text()

        const content: StateStoreContent<T> = JSON.parse(raw)

        if (content.version === this.version) {
          this.value = content.value
        } else {
          this.value = this.initial
        }
      } else {
        this.value = this.initial
      }
    }
  }

  get (): T {
    if (this.resolveOnUnload !== null) {
      throw new Error('The state store is currently unloading.')
    } else if (this.fileUri === null) {
      throw new Error('The state store is not loaded.')
    } else if (this.value === undefined) {
      throw new Error('The state store is currently loading.')
    } else {
      return this.value
    }
  }

  private startWrite (): void {
    void (async () => {
      const content: StateStoreContent<T> = {
        version: this.version,
        value: this.value as T
      };

      // NOTE: Expo's developer team have removed atomic, asynchronous file
      //       writing from the latest expo-file-system.
      (this.fileUri as File).write(JSON.stringify(content), { encoding: 'utf8' })

      this.writeQueueLength--

      if (this.writeQueueLength > 0) {
        this.startWrite()
      } else if (this.resolveOnUnload !== null) {
        const resolveOnUnload = this.resolveOnUnload
        this.fileUri = null
        this.value = undefined
        this.resolveOnUnload = null
        resolveOnUnload()
      }
    })()
  }

  set (to: T): void {
    if (this.resolveOnUnload !== null) {
      throw new Error('The state store is currently unloading.')
    } else if (this.fileUri === null) {
      throw new Error('The state store is not loaded.')
    } else if (this.value === undefined) {
      throw new Error('The state store is currently loading.')
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

  async unload (): Promise<void> {
    if (this.resolveOnUnload !== null) {
      throw new Error('The state store is already unloading.')
    } else if (this.fileUri === null) {
      throw new Error('The state store is not loaded.')
    } else if (this.value === undefined) {
      throw new Error('The state store is currently loading.')
    } else if (this.writeQueueLength > 0) {
      await new Promise<void>((resolve) => {
        this.resolveOnUnload = resolve
      })
    } else {
      this.fileUri = null
      this.value = undefined
    }
  }
}
