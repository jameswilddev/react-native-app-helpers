import type { Json } from '../Json'
import type { PreflightResponseCollectionItem } from '../PreflightResponseCollectionItem'
import type { SyncableSchema } from '../SyncableSchema'
import type { SyncConfigurationCollection } from '../SyncConfigurationCollection'

/**
 * The state of a sync service.
 * @template TSchema                       The schema of the synced StateStore.
 * @template TAdditionalCollectionData     Any additional information which
 *                                         should be held against a collection,
 *                                         e.g. strings for progress bars.
 * @template TAdditionalCollectionItemData Any additional information which
 *                                         should be held against a collection
 *                                         item, e.g. strings for progress bars.
 */
export type SyncState<
  TSchema extends SyncableSchema,
  TAdditionalCollectionData extends Record<string, unknown>,
  TAdditionalCollectionItemData extends Record<string, Json>
> =
  | {
    /**
       * Indicates the type of sync status.
       */
    readonly type: 'notStarted'

    /**
     * Indicates whether this status is actively syncing.
     */
    readonly running: false
  }
  | {
    /**
       * Indicates the type of sync status.
       */
    readonly type: 'failed'

    /**
     * Indicates whether this status is actively syncing.
     */
    readonly running: false
  }
  | {
    /**
       * Indicates the type of sync status.
       */
    readonly type: 'succeeded'

    /**
     * Indicates whether this status is actively syncing.
     */
    readonly running: false
  }
  | {
    /**
       * Indicates the type of sync status.
       */
    readonly type: 'checkingForChangesToPush'

    /**
     * Indicates whether this status is actively syncing.
     */
    readonly running: true
  }
  | {
    /**
       * Indicates the type of sync status.
       */
    readonly type: 'pushing'

    /**
     * Indicates whether this status is actively syncing.
     */
    readonly running: true

    /**
       * The number of push/delete steps executed so far (not including the item
       * in progress).
       */
    readonly completedSteps: number

    /**
       * The number of push/delete steps which will be pushed should sync
       * succeed.
       */
    readonly totalSteps: number

    /**
       * When null, the item itself is being pushed.  Otherwise, the number of
       * files pushed so far for this item (not including the file in progress).
       */
    readonly completedFiles: null | number

    /**
       * The number of files which will be pushed for this item should sync
       * succeed.
       */
    readonly totalFiles: number

    /**
       * The collection which is currently being pushed.
       */
    readonly syncConfigurationCollection: SyncConfigurationCollection<
    TSchema['collections'][keyof TSchema['collections']],
    TAdditionalCollectionData
    >
  }
  | {
    /**
       * Indicates the type of sync status.
       */
    readonly type: 'deleting'

    /**
     * Indicates whether this status is actively syncing.
     */
    readonly running: true

    /**
       * The number of push/delete steps executed so far (not including the item
       * in progress).
       */
    readonly completedSteps: number

    /**
       * The number of push/delete steps which will be pushed should sync
       * succeed.
       */
    readonly totalSteps: number
  }
  | {
    /**
       * Indicates the type of sync status.
       */
    readonly type: 'checkingForChangesToPull'

    /**
     * Indicates whether this status is actively syncing.
     */
    readonly running: true
  }
  | {
    /**
       * Indicates the type of sync status.
       */
    readonly type: 'pullingSingleton'

    /**
     * Indicates whether this status is actively syncing.
     */
    readonly running: true

    /**
       * The number of items pulled so far (not including the item in progress).
       */
    readonly completedSteps: number

    /**
       * The number of items which will be pulled should sync succeed.
       */
    readonly totalSteps: number
  }
  | {
    /**
       * Indicates the type of sync status.
       */
    readonly type: 'pullingCollectionItem'

    /**
     * Indicates whether this status is actively syncing.
     */
    readonly running: true

    /**
       * The number of items pulled so far (not including the item in progress).
       */
    readonly completedSteps: number

    /**
       * The number of items which will be pulled should sync succeed.
       */
    readonly totalSteps: number

    /**
       * The collection which is currently being pulled.
       */
    readonly syncConfigurationCollection: SyncConfigurationCollection<
    TSchema['collections'][keyof TSchema['collections']],
    TAdditionalCollectionData
    >

    /**
       * The item which is currently being pulled, as described by the
       * preflight response.
       */
    readonly preflightResponseCollectionItem: PreflightResponseCollectionItem<TAdditionalCollectionItemData>
  }
  | {
    /**
       * Indicates the type of sync status.
       */
    readonly type: 'pullingFile'

    /**
     * Indicates whether this status is actively syncing.
     */
    readonly running: true

    /**
       * The number of items pulled so far (not including the item in progress).
       */
    readonly completedSteps: number

    /**
       * The number of items which will be pulled should sync succeed.
       */
    readonly totalSteps: number

    /**
       * The number of files pulled for this item so far (not including the file
       * in progress).
       */
    readonly completedFiles: number

    /**
       * The number of files which will be pulled for this item should sync
       * succeed.
       */
    readonly totalFiles: number

    /**
       * The collection which is currently being pulled.
       */
    readonly syncConfigurationCollection: SyncConfigurationCollection<
    TSchema['collections'][keyof TSchema['collections']],
    TAdditionalCollectionData
    >

    /**
       * The item which is currently being pulled, as described by the
       * preflight response.
       */
    readonly preflightResponseCollectionItem: PreflightResponseCollectionItem<TAdditionalCollectionItemData>
  }
