import type { Json } from '../Json'

/**
 * The schema of information which can be synced.
 */
export interface SyncableSchema {
  /**
   * The singletons which can be synced.
   */
  readonly singletons: Readonly<Record<string, Json>>

  /**
   * The collections which can be synced.
   */
  readonly collections: Readonly<Record<string, Json>>
}
