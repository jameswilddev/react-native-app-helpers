import * as Permissions from "expo-permissions";
import type { PermissionHelperInterface } from "../../types/PermissionHelperInterface";
import { showSettingsScreen } from "../../utilities/showSettingsScreen";

/**
 * Provides helpers for working with permissions.
 */
export class PermissionHelper implements PermissionHelperInterface {
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
  async acquire(
    permissions: ReadonlyArray<Permissions.PermissionType>,
    onFailure: (showSettingsScreen: () => void) => Promise<void>,
    onSuccess: () => Promise<void>
  ): Promise<void> {
    const result = await Permissions.askAsync(...permissions);

    if (result.granted) {
      await onSuccess();
    } else {
      await onFailure(showSettingsScreen);
    }
  }
}
