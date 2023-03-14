import * as Crypto from "expo-crypto";
import * as FileSystem from "expo-file-system";
import type { FileStoreInterface } from "../../types/FileStoreInterface";

/**
 * A wrapper around expo-file-system which stores files in a subdirectory of the
 * document directory and provides a mockable interface.
 */
export class FileStore implements FileStoreInterface {
  private subdirectoryName: null | string = null;
  private loading = false;
  private operationsInProgress = 0;

  async load(subdirectoryName: string): Promise<void> {
    if (this.loading) {
      throw new Error(`The file store is already loading.`);
    } else if (this.subdirectoryName === null) {
      try {
        this.loading = true;

        await FileSystem.makeDirectoryAsync(
          `${FileSystem.documentDirectory}/react-native-app-helpers/file-store/${subdirectoryName}`,
          { intermediates: true }
        );

        this.subdirectoryName = subdirectoryName;
      } finally {
        this.loading = false;
      }
    } else {
      throw new Error(`The file store is already loaded.`);
    }
  }

  generatePath(uuid: string): string {
    if (this.loading) {
      throw new Error(`The file store is currently loading.`);
    } else if (this.subdirectoryName === null) {
      throw new Error(`The file store is not loaded.`);
    } else {
      return `${FileSystem.documentDirectory}/react-native-app-helpers/file-store/${this.subdirectoryName}/${uuid}`;
    }
  }

  async list(): Promise<ReadonlyArray<string>> {
    if (this.loading) {
      throw new Error(`The file store is currently loading.`);
    } else if (this.subdirectoryName === null) {
      throw new Error(`The file store is not loaded.`);
    } else {
      try {
        this.operationsInProgress++;

        return await FileSystem.readDirectoryAsync(
          `${FileSystem.documentDirectory}/react-native-app-helpers/file-store/${this.subdirectoryName}`
        );
      } finally {
        this.operationsInProgress--;
      }
    }
  }

  async delete(uuid: string): Promise<void> {
    if (this.loading) {
      throw new Error(`The file store is currently loading.`);
    } else if (this.subdirectoryName === null) {
      throw new Error(`The file store is not loaded.`);
    } else {
      try {
        this.operationsInProgress++;

        await FileSystem.deleteAsync(this.generatePath(uuid));
      } finally {
        this.operationsInProgress--;
      }
    }
  }

  unload(): void {
    if (this.loading) {
      throw new Error(`The file store is currently loading.`);
    } else if (this.subdirectoryName === null) {
      throw new Error(`The file store is not loaded.`);
    } else if (this.operationsInProgress > 0) {
      throw new Error(
        `One or more file store operations are currently in progress.`
      );
    } else {
      this.subdirectoryName = null;
    }
  }

  async import(fileUri: string): Promise<string> {
    if (this.loading) {
      throw new Error(`The file store is currently loading.`);
    } else if (this.subdirectoryName === null) {
      throw new Error(`The file store is not loaded.`);
    } else {
      try {
        this.operationsInProgress++;

        const output = Crypto.randomUUID();

        await FileSystem.moveAsync({
          from: fileUri,
          to: this.generatePath(output),
        });

        return output;
      } finally {
        this.operationsInProgress--;
      }
    }
  }
}
