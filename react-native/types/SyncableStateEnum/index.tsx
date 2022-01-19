import type { AbsentSyncableStateEnum } from "../AbsentSyncableStateEnum";
import type { Json } from "../Json";
import type { UpToDateSyncableStateEnum } from "../UpToDateSyncableStateEnum";

/**
 * Represents an enum which can be synced.
 * @template TData The data within an item.
 */
export type SyncableStateEnum<TData extends Json> =
  | AbsentSyncableStateEnum
  | UpToDateSyncableStateEnum<TData>;
