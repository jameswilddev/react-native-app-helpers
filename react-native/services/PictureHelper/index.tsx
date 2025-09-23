import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import type { FileStoreInterface } from '../../..'
import type { PermissionHelper } from '../PermissionHelper'
import type { PictureHelperInterface } from '../../types/PictureHelperInterface'

/**
 * Provides helpers for working with pictures.
 */
export class PictureHelper implements PictureHelperInterface {
  /**
   * @param fileStore        The file store in which pictures are to be stored.
   * @param permissionHelper The permission helper which will be used when
   *                         acquiring pictures.
   * @param quality          The compression quality to use, where 0 is minimum
   *                         and 1 is maximum.
   */
  constructor (
    private readonly fileStore: FileStoreInterface,
    private readonly permissionHelper: PermissionHelper,
    private readonly quality: number
  ) {}

  async takePicture (
    saveToMediaLibrary: boolean,
    onPermissionDenied: (showSettingsScreen: () => void) => Promise<void>,
    onCancel: () => Promise<void>,
    onSuccess: (uuid: string) => Promise<void>
  ): Promise<void> {
    await this.permissionHelper.acquire(
      [{
        get: ImagePicker.getCameraPermissionsAsync,
        request: ImagePicker.requestCameraPermissionsAsync
      }, {
        get: ImagePicker.getMediaLibraryPermissionsAsync,
        request: ImagePicker.requestMediaLibraryPermissionsAsync
      }],
      onPermissionDenied,
      async () => {
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: this.quality,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          exif: false,
          base64: false,

          // Workaround for https://github.com/expo/expo/issues/14903#issuecomment-966161497.
          presentationStyle:
            // TODO: why is this export missing at runtime?
            'fullScreen' as ImagePicker.UIImagePickerPresentationStyle
        })

        if (result.canceled || result.assets.length === 0) {
          await onCancel()
        } else {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const uri = result.assets[0]!.uri

          if (saveToMediaLibrary) {
            await MediaLibrary.saveToLibraryAsync(uri)
          }

          const uuid = await this.fileStore.import(uri)

          await onSuccess(uuid)
        }
      }
    )
  }

  async selectOnePictureFromMediaLibrary (
    onPermissionDenied: (showSettingsScreen: () => void) => Promise<void>,
    onCancel: () => Promise<void>,
    onSuccess: (uuid: string) => Promise<void>
  ): Promise<void> {
    await this.permissionHelper.acquire(
      [{
        get: ImagePicker.getMediaLibraryPermissionsAsync,
        request: ImagePicker.requestMediaLibraryPermissionsAsync
      }],
      onPermissionDenied,
      async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: this.quality,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          exif: false,
          base64: false,
          allowsMultipleSelection: false,

          // Workaround for https://github.com/expo/expo/issues/14903#issuecomment-966161497.
          presentationStyle:
            // TODO: why is this export missing at runtime?
            'fullScreen' as ImagePicker.UIImagePickerPresentationStyle
        })

        if (result.canceled || result.assets.length < 1) {
          await onCancel()
        } else {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          await onSuccess(await this.fileStore.import(result.assets[0]!.uri))
        }
      }
    )
  }

  async selectMultiplePicturesFromMediaLibrary (
    onPermissionDenied: (showSettingsScreen: () => void) => Promise<void>,
    onCancel: () => Promise<void>,
    onSuccess: (uuids: readonly string[]) => Promise<void>
  ): Promise<void> {
    await this.permissionHelper.acquire(
      [{
        get: ImagePicker.getMediaLibraryPermissionsAsync,
        request: ImagePicker.requestMediaLibraryPermissionsAsync
      }],
      onPermissionDenied,
      async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: this.quality,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          exif: false,
          base64: false,
          allowsMultipleSelection: true,

          // Workaround for https://github.com/expo/expo/issues/14903#issuecomment-966161497.
          presentationStyle:
            // TODO: why is this export missing at runtime?
            'fullScreen' as ImagePicker.UIImagePickerPresentationStyle
        })

        if (result.canceled) {
          await onCancel()
        } else {
          await onSuccess(
            await Promise.all(
              result.assets.map(async (image) => await this.fileStore.import(image.uri))
            )
          )
        }
      }
    )
  }
}
