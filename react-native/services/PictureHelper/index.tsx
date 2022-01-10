import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import type { FileStoreInterface } from "../../..";
import type { PermissionHelper } from "../PermissionHelper";
import type { PictureHelperInterface } from "../../types/PictureHelperInterface";

/**
 * Provides helpers for working with pictures.
 */
export class PictureHelper implements PictureHelperInterface {
  /**
   * @param fileStore        The file store in which pictures are to be stored.
   * @param permissionHelper The permission helper which will be used when
   *                         acquiring pictures.
   */
  constructor(
    private readonly fileStore: FileStoreInterface,
    private readonly permissionHelper: PermissionHelper
  ) {}

  async takePicture(
    saveToMediaLibrary: boolean,
    onPermissionDenied: (showSettingsScreen: () => void) => Promise<void>,
    onCancel: () => Promise<void>,
    onSuccess: (uuid: string) => Promise<void>
  ): Promise<void> {
    await this.permissionHelper.acquire(
      [Permissions.CAMERA, Permissions.MEDIA_LIBRARY],
      onPermissionDenied,
      async () => {
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 0.7,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          exif: false,
          base64: false,

          // Workaround for https://github.com/expo/expo/issues/14903#issuecomment-966161497.
          presentationStyle: 0,
        });

        if (result.cancelled) {
          await onCancel();
        } else {
          if (saveToMediaLibrary) {
            await MediaLibrary.saveToLibraryAsync(result.uri);
          }

          const uuid = await this.fileStore.import(result.uri);

          await onSuccess(uuid);
        }
      }
    );
  }

  async selectOnePictureFromMediaLibrary(
    onPermissionDenied: (showSettingsScreen: () => void) => Promise<void>,
    onCancel: () => Promise<void>,
    onSuccess: (uuid: string) => Promise<void>
  ): Promise<void> {
    await this.permissionHelper.acquire(
      [Permissions.MEDIA_LIBRARY],
      onPermissionDenied,
      async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 0.7,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          exif: false,
          base64: false,
          allowsMultipleSelection: false,

          // Workaround for https://github.com/expo/expo/issues/14903#issuecomment-966161497.
          presentationStyle: 0,
        });

        if (result.cancelled) {
          await onCancel();
        } else {
          await onSuccess(await this.fileStore.import(result.uri));
        }
      }
    );
  }

  async selectMultiplePicturesFromMediaLibrary(
    onPermissionDenied: (showSettingsScreen: () => void) => Promise<void>,
    onCancel: () => Promise<void>,
    onSuccess: (uuids: ReadonlyArray<string>) => Promise<void>
  ): Promise<void> {
    await this.permissionHelper.acquire(
      [Permissions.MEDIA_LIBRARY],
      onPermissionDenied,
      async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 0.7,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          exif: false,
          base64: false,
          allowsMultipleSelection: true,

          // Workaround for https://github.com/expo/expo/issues/14903#issuecomment-966161497.
          presentationStyle: 0,
        });

        if (result.cancelled) {
          await onCancel();
        } else {
          await onSuccess(
            await Promise.all(
              result.selected.map((image) => this.fileStore.import(image.uri))
            )
          );
        }
      }
    );
  }
}
