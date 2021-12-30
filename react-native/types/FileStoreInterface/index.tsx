/**
 * The methods made available by the FileStore implementation.
 */
export interface FileStoreInterface {
  /**
   * Loads a subdirectory into the file store.  The subdirectory is guaranteed
   * to exist by the time the returned promise resolves.
   * @param subdirectoryName The name of the subdirectory to load into the file
   *                         store.
   * @throws                 When the file store is already loaded.
   * @throws                 When the file store is loading.
   */
  load(subdirectoryName: string): Promise<void>;

  /**
   * Generates a path to a file.
   * @param uuid The UUID of the file for which to generate a path.
   * @returns    A path to the specified file.  This file may not exist or
   *             contain invalid data.
   * @throws     When the file store is not loaded.
   * @throws     When the file store is loading.
   */
  generatePath(uuid: string): string;

  /**
   * Lists the UUIDs of all files which exist under the current subdirectory.
   * @returns The UUIDs of all files which exist under the current subdirectory.
   * @throws  When the file store is not loaded.
   * @throws  When the file store is loading.
   */
  list(): Promise<ReadonlyArray<string>>;

  /**
   * Deletes the specified file if it exists (and does nothing if it does not).
   * @param uuid The UUID of the file to delete should it exist.
   * @throws  When the file store is not loaded.
   * @throws  When the file store is loading.
   */
  delete(uuid: string): Promise<void>;

  /**
   * Unloads the currently loaded subdirectory.
   * @throws When the file store is not loaded.
   * @throws When the file store is loading.
   * @throws When one or more operations are in progress.
   */
  unload(): void;
}
