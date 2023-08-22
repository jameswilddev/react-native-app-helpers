/**
 * The methods made available by the PictureHelper implementation.
 */
export interface PictureHelperInterface {
  /**
   * Shows a modal for taking a picture.
   * @param saveToMediaLibrary When true, any pictures taken are saved to the
   *                           user's media library.  They will otherwise not be
   *                           saved there.
   * @param onPermissionDenied Called when permission(s) are denied.  You should
   *                           ask the user whether they want to visit the
   *                           settings screen, which can be done by invoking
   *                           the callback's argument.
   * @param onCancel           Called when the user cancels without taking a
   *                           picture.  The modal will have closed
   *                           automatically.
   * @param onSuccess          Called when the user has taken a picture; the
   *                           UUID of the saved picture is given as an
   *                           argument.  The modal will have closed
   *                           automatically.
   */
  takePicture: (
    saveToMediaLibrary: boolean,
    onPermissionDenied: (showSettingsScreen: () => void) => Promise<void>,
    onCancel: () => Promise<void>,
    onSuccess: (uuid: string) => Promise<void>
  ) => Promise<void>

  /**
   * Shows a modal for selecting a single picture from the user's media library.
   * @param onPermissionDenied Called when permission(s) are denied.  You should
   *                           ask the user whether they want to visit the
   *                           settings screen, which can be done by invoking
   *                           the callback's argument.
   * @param onCancel           Called when the user cancels without selecting
   *                           a picture.  The modal will have closed
   *                           automatically.
   * @param onSuccess          Called when the user has selected a picture; the
   *                           UUID of the saved picture is given as an
   *                           argument.  The modal will have closed
   *                           automatically.
   */
  selectOnePictureFromMediaLibrary: (
    onPermissionDenied: (showSettingsScreen: () => void) => Promise<void>,
    onCancel: () => Promise<void>,
    onSuccess: (uuid: string) => Promise<void>
  ) => Promise<void>

  /**
   * Shows a modal for selecting multiple pictures from the user's media
   * library.
   * @param onPermissionDenied Called when permission(s) are denied.  You should
   *                           ask the user whether they want to visit the
   *                           settings screen, which can be done by invoking
   *                           the callback's argument.
   * @param onCancel           Called when the user cancels without selecting
   *                           any pictures.  The modal will have closed
   *                           automatically.
   * @param onSuccess          Called when the user has some pictures; the UUIDs
   *                           of the pictures saved are given as an argument.
   *                           The modal will have closed automatically.
   */
  selectMultiplePicturesFromMediaLibrary: (
    onPermissionDenied: (showSettingsScreen: () => void) => Promise<void>,
    onCancel: () => Promise<void>,
    onSuccess: (uuids: readonly string[]) => Promise<void>
  ) => Promise<void>
}
