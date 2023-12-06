import { randomUUID } from 'expo-crypto'
import type { UuidGeneratorInterface } from '../../types/UuidGeneratorInterface'

/**
 * Generates UUIDs.
 */
export class UuidGenerator implements UuidGeneratorInterface {
  generate (): string {
    return randomUUID().toLowerCase()
  }
}
