import type * as Permissions from "expo-permissions";

/**
 * The methods made available by the PermissionHelper implementation.
 */
export interface PermissionHelperInterface {
  /**
   * Acquires one or more Expo permissions.
   * @param permissions The permission(s) to acquire.
   * @param onFailure   Called when permission(s) are denied.  You should ask
   *                    the user whether they want to visit the settings screen,
   *                    which can be done by invoking the callback's argument.
   * @param onSuccess   Called when all permission(s) are granted.  Note that
   *                    for some permissions, such as the camera roll, this
   *                    might only grant access to a small subset of resources.
   */
  acquire(
    permissions: ReadonlyArray<Permissions.PermissionType>,
    onFailure: (showSettingsScreen: () => void) => Promise<void>,
    onSuccess: () => Promise<void>
  ): Promise<void>;
}
