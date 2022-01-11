import * as React from "react";
import type { Json } from "../../types/Json";
import type { SyncInterface } from "../../types/SyncInterface";
import type { SyncableSchema } from "../../types/SyncableSchema";

/**
 * A React hook which blocks sync file clean-up; this should be added to screens
 * which may import images to the file store before references to them are
 * committed to the state store.
 * @template TSchema                       The schema of the synced StateStore.
 * @template TAdditionalCollectionData     Any additional information which
 *                                         should be held against a collection,
 *                                         e.g. strings for progress bars.
 * @template TAdditionalCollectionItemData Any additional information which
 *                                         should be held against a collection
 *                                         item, e.g. strings for progress bars.
 * @param sync The Sync within which file clean-up is to be blocked.
 */
export function useSyncFileCleanUpBlocker<
  TSchema extends SyncableSchema,
  TAdditionalCollectionData extends Record<string, unknown>,
  TAdditionalCollectionItemData extends Record<string, Json>
>(
  sync: SyncInterface<
    TSchema,
    TAdditionalCollectionData,
    TAdditionalCollectionItemData
  >
): void {
  React.useEffect(() => {
    sync.fileCleanUpBlockers++;

    return () => {
      sync.fileCleanUpBlockers--;
    };
  }, []);
}
