import * as FileSystem from "expo-file-system";
import { EventEmitter } from "events";
import type { Json } from "../../types/Json";

/**
 * A wrapper around expo-file-system which adds:
 * - Concurrency control.
 * - JSON parsing and serialization.
 * - Change events.
 * - A synchronous read/write API (with asynchronous write-back).
 * @template T The type of JSON stored.
 */
export class StateStore<T extends Json> {
  private fileUri: null | string = null;
  private value: undefined | T = undefined;
  private writeQueueLength: 0 | 1 | 2 = 0;
  private resolveOnUnload: null | (() => void) = null;

  private readonly eventEmitter = new EventEmitter();

  /**
   * @param initial The value to use when no such record exists
   *                in expo-file-system.
   */
  constructor(private readonly initial: T) {}

  /**
   * Adds a listener for events to this state store.
   * @param eventType The type of the event to listen for.
   * @param listener  The callback to execute when the event is emitted.
   */
  addListener(eventType: `set`, listener: () => void): void {
    this.eventEmitter.addListener(eventType, listener);
  }

  /**
   * Removes a listener for events from this state store.
   * @param eventType The type of the event to listen for.
   * @param listener  The callback to no longer execute when the event is
   *                  emitted.
   */
  removeListener(eventType: `set`, listener: () => void): void {
    this.eventEmitter.removeListener(eventType, listener);
  }

  /**
   * Loads the content of a record in expo-file-system into memory.
   * @param key The key of the record to read from/write to expo-file-store.
   * @throws When the state store is already loading.
   * @throws When the state store is already loaded.
   * @throws When the state store is currently unloading.
   */
  async load(key: string): Promise<void> {
    if (this.resolveOnUnload !== null) {
      throw new Error(`The state store is currently unloading.`);
    } else if (this.value !== undefined) {
      throw new Error(`The state store is already loaded.`);
    } else if (this.fileUri !== null) {
      throw new Error(`The state store is already loading.`);
    } else {
      const directoryUri = `${FileSystem.documentDirectory}/react-native-app-helpers/state-store`;
      const fileUri = `${directoryUri}/${key}`;

      this.fileUri = fileUri;

      await FileSystem.makeDirectoryAsync(directoryUri, {
        intermediates: true,
      });

      if ((await FileSystem.getInfoAsync(fileUri)).exists) {
        const raw = await FileSystem.readAsStringAsync(fileUri);
        this.value = JSON.parse(raw);
      } else {
        this.value = this.initial;
      }
    }
  }

  /**
   * Retrieves the current value from the store.
   * @returns The store's current value.
   * @throws When the state store is unloaded.
   * @throws When the state store is currently loading.
   * @throws When the state store is currently unloading.
   */
  get(): T {
    if (this.resolveOnUnload !== null) {
      throw new Error(`The state store is currently unloading.`);
    } else if (this.fileUri === null) {
      throw new Error(`The state store is not loaded.`);
    } else if (this.value === undefined) {
      throw new Error(`The state store is currently loading.`);
    } else {
      return this.value;
    }
  }

  private startWrite(): void {
    (async () => {
      await FileSystem.writeAsStringAsync(
        this.fileUri as string,
        JSON.stringify(this.value as T)
      );

      this.writeQueueLength--;

      if (this.writeQueueLength > 0) {
        this.startWrite();
      } else if (this.resolveOnUnload !== null) {
        const resolveOnUnload = this.resolveOnUnload;
        this.fileUri = null;
        this.value = undefined;
        this.resolveOnUnload = null;
        resolveOnUnload();
      }
    })();
  }

  /**
   * Sets the current value in the store.  It will be written back to disk
   * asynchronously.
   * @param to The value to which to change.
   * @throws When the state store is unloaded.
   * @throws When the state store is currently loading.
   * @throws When the state store is currently unloading.
   */
  set(to: T): void {
    if (this.resolveOnUnload !== null) {
      throw new Error(`The state store is currently unloading.`);
    } else if (this.fileUri === null) {
      throw new Error(`The state store is not loaded.`);
    } else if (this.value === undefined) {
      throw new Error(`The state store is currently loading.`);
    } else {
      this.value = to;

      if (this.writeQueueLength === 0) {
        this.writeQueueLength = 1;
        this.startWrite();
      } else {
        this.writeQueueLength = 2;
      }

      this.eventEmitter.emit(`set`);
    }
  }

  /**
   * Awaits any queued writes and unloads the current record from memory.
   */
  async unload(): Promise<void> {
    if (this.resolveOnUnload !== null) {
      throw new Error(`The state store is already unloading.`);
    } else if (this.fileUri === null) {
      throw new Error(`The state store is not loaded.`);
    } else if (this.value === undefined) {
      throw new Error(`The state store is currently loading.`);
    } else if (this.writeQueueLength > 0) {
      await new Promise<void>((resolve) => {
        this.resolveOnUnload = resolve;
      });
    } else {
      this.fileUri = null;
      this.value = undefined;
    }
  }
}
