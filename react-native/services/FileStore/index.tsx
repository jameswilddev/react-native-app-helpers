import { Directory, File, Paths } from 'expo-file-system'
import type { FileStoreInterface } from '../../types/FileStoreInterface'
import type { UuidGenerator } from '../UuidGenerator'

/**
 * A wrapper around expo-file-system which stores files in a subdirectory of the
 * document directory and provides a mockable interface.
 */
export class FileStore implements FileStoreInterface {
  constructor (private readonly uuidGenerator: UuidGenerator) {}

  private subdirectoryName: null | string = null
  private loading = false
  private operationsInProgress = 0

  async load (subdirectoryName: string): Promise<void> {
    if (this.loading) {
      throw new Error('The file store is already loading.')
    } else if (this.subdirectoryName === null) {
      try {
        this.loading = true

        const directory = new Directory(Paths.document, 'react-native-app-helpers', 'file-store', subdirectoryName)
        directory.create({ intermediates: true })

        this.subdirectoryName = subdirectoryName
      } finally {
        this.loading = false
      }
    } else {
      throw new Error('The file store is already loaded.')
    }
  }

  generatePath (uuid: string): ReadonlyArray<Directory | string> {
    if (this.loading) {
      throw new Error('The file store is currently loading.')
    } else if (this.subdirectoryName === null) {
      throw new Error('The file store is not loaded.')
    } else {
      return [Paths.document, 'react-native-app-helpers', 'file-store', this.subdirectoryName, uuid]
    }
  }

  async list (): Promise<readonly string[]> {
    if (this.loading) {
      throw new Error('The file store is currently loading.')
    } else if (this.subdirectoryName === null) {
      throw new Error('The file store is not loaded.')
    } else {
      try {
        this.operationsInProgress++

        const directory = new Directory(Paths.document, 'react-native-app-helpers', 'file-store', this.subdirectoryName)

        return (directory.list()).map(x => x.name)
      } finally {
        this.operationsInProgress--
      }
    }
  }

  async delete (uuid: string): Promise<void> {
    if (this.loading) {
      throw new Error('The file store is currently loading.')
    } else if (this.subdirectoryName === null) {
      throw new Error('The file store is not loaded.')
    } else {
      try {
        this.operationsInProgress++

        const file = new File(...this.generatePath(uuid))
        file.delete()
      } finally {
        this.operationsInProgress--
      }
    }
  }

  unload (): void {
    if (this.loading) {
      throw new Error('The file store is currently loading.')
    } else if (this.subdirectoryName === null) {
      throw new Error('The file store is not loaded.')
    } else if (this.operationsInProgress > 0) {
      throw new Error(
        'One or more file store operations are currently in progress.'
      )
    } else {
      this.subdirectoryName = null
    }
  }

  async import (fileUri: string): Promise<string> {
    if (this.loading) {
      throw new Error('The file store is currently loading.')
    } else if (this.subdirectoryName === null) {
      throw new Error('The file store is not loaded.')
    } else {
      try {
        this.operationsInProgress++

        const output = this.uuidGenerator.generate()

        const file = new File(fileUri)

        file.move(new File(...this.generatePath(output)))

        return output
      } finally {
        this.operationsInProgress--
      }
    }
  }

  async importPreservingOriginal (fileUri: string): Promise<string> {
    if (this.loading) {
      throw new Error('The file store is currently loading.')
    } else if (this.subdirectoryName === null) {
      throw new Error('The file store is not loaded.')
    } else {
      try {
        this.operationsInProgress++

        const output = this.uuidGenerator.generate()

        const file = new File(fileUri)

        file.copy(new File(...this.generatePath(output)))

        return output
      } finally {
        this.operationsInProgress--
      }
    }
  }
}
