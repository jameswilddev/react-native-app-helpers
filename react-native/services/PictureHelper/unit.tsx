const ImagePicker = jest.requireMock(`expo-image-picker`);
const MediaLibrary = jest.requireMock(`expo-media-library`);
const Permissions = jest.requireMock(`expo-permissions`);
import {
  PictureHelper,
  PermissionHelperInterface,
  FileStoreInterface,
  showSettingsScreen,
} from "../../..";

test(`take picture without saving to media library permission denied`, async () => {
  const fileStore: FileStoreInterface = {
    load: jest.fn(),
    list: jest.fn(),
    delete: jest.fn(),
    generatePath: jest.fn(),
    import: jest.fn(),
    unload: jest.fn(),
  };

  const permissionHelper: PermissionHelperInterface = {
    acquire: jest.fn(async (permissions, permissionDenied) => {
      permissions;

      await permissionDenied(showSettingsScreen);
    }),
  };

  const onPermissionDenied = jest.fn();
  const onCancel = jest.fn().mockResolvedValue(undefined);
  const onSuccess = jest.fn();

  const pictureHelper = new PictureHelper(fileStore, permissionHelper);

  await pictureHelper.takePicture(
    false,
    onPermissionDenied,
    onCancel,
    onSuccess
  );

  expect(onPermissionDenied).toHaveBeenCalledTimes(1);
  expect(onPermissionDenied).toHaveBeenCalledWith(showSettingsScreen);
  expect(onCancel).not.toHaveBeenCalled();
  expect(onSuccess).not.toHaveBeenCalled();

  expect(ImagePicker.launchCameraAsync).not.toHaveBeenCalled();
  expect(ImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();
  expect(MediaLibrary.saveToLibraryAsync).not.toHaveBeenCalled();
  expect(fileStore.load).not.toHaveBeenCalled();
  expect(fileStore.list).not.toHaveBeenCalled();
  expect(fileStore.delete).not.toHaveBeenCalled();
  expect(fileStore.generatePath).not.toHaveBeenCalled();
  expect(fileStore.import).not.toHaveBeenCalled();
  expect(fileStore.unload).not.toHaveBeenCalled();
  expect(permissionHelper.acquire).toBeCalledTimes(1);
  expect(permissionHelper.acquire).toBeCalledWith(
    [Permissions.CAMERA, Permissions.MEDIA_LIBRARY],
    onPermissionDenied,
    expect.any(Function)
  );
});

test(`take picture saving to media library permission denied`, async () => {
  const fileStore: FileStoreInterface = {
    load: jest.fn(),
    list: jest.fn(),
    delete: jest.fn(),
    generatePath: jest.fn(),
    import: jest.fn(),
    unload: jest.fn(),
  };

  const permissionHelper: PermissionHelperInterface = {
    acquire: jest.fn(async (permissions, permissionDenied) => {
      permissions;

      await permissionDenied(showSettingsScreen);
    }),
  };

  const onPermissionDenied = jest.fn();
  const onCancel = jest.fn().mockResolvedValue(undefined);
  const onSuccess = jest.fn();

  const pictureHelper = new PictureHelper(fileStore, permissionHelper);

  await pictureHelper.takePicture(
    true,
    onPermissionDenied,
    onCancel,
    onSuccess
  );

  expect(onPermissionDenied).toHaveBeenCalledTimes(1);
  expect(onPermissionDenied).toHaveBeenCalledWith(showSettingsScreen);
  expect(onCancel).not.toHaveBeenCalled();
  expect(onSuccess).not.toHaveBeenCalled();

  expect(ImagePicker.launchCameraAsync).not.toHaveBeenCalled();
  expect(ImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();
  expect(MediaLibrary.saveToLibraryAsync).not.toHaveBeenCalled();
  expect(fileStore.load).not.toHaveBeenCalled();
  expect(fileStore.list).not.toHaveBeenCalled();
  expect(fileStore.delete).not.toHaveBeenCalled();
  expect(fileStore.generatePath).not.toHaveBeenCalled();
  expect(fileStore.import).not.toHaveBeenCalled();
  expect(fileStore.unload).not.toHaveBeenCalled();
  expect(permissionHelper.acquire).toBeCalledTimes(1);
  expect(permissionHelper.acquire).toBeCalledWith(
    [Permissions.CAMERA, Permissions.MEDIA_LIBRARY],
    onPermissionDenied,
    expect.any(Function)
  );
});

test(`take picture without saving to media library cancelled`, async () => {
  ImagePicker.launchCameraAsync.mockResolvedValue({
    cancelled: true,
  });

  const fileStore: FileStoreInterface = {
    load: jest.fn(),
    list: jest.fn(),
    delete: jest.fn(),
    generatePath: jest.fn(),
    import: jest.fn(),
    unload: jest.fn(),
  };

  const permissionHelper: PermissionHelperInterface = {
    acquire: jest.fn(async (permissions, permissionDenied, onSuccess) => {
      permissions;
      permissionDenied;

      await onSuccess();
    }),
  };

  const onPermissionDenied = jest.fn();
  const onCancel = jest.fn().mockResolvedValue(undefined);
  const onSuccess = jest.fn();

  const pictureHelper = new PictureHelper(fileStore, permissionHelper);

  await pictureHelper.takePicture(
    false,
    onPermissionDenied,
    onCancel,
    onSuccess
  );

  expect(onPermissionDenied).not.toHaveBeenCalled();
  expect(onCancel).toHaveBeenCalledTimes(1);
  expect(onSuccess).not.toHaveBeenCalled();

  expect(ImagePicker.launchCameraAsync).toHaveBeenCalledTimes(1);
  expect(ImagePicker.launchCameraAsync).toBeCalledWith({
    allowsEditing: true,
    quality: 0.7,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    exif: false,
    base64: false,
    presentationStyle: 0,
  });
  expect(ImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();
  expect(MediaLibrary.saveToLibraryAsync).not.toHaveBeenCalled();
  expect(fileStore.load).not.toHaveBeenCalled();
  expect(fileStore.list).not.toHaveBeenCalled();
  expect(fileStore.delete).not.toHaveBeenCalled();
  expect(fileStore.generatePath).not.toHaveBeenCalled();
  expect(fileStore.import).not.toHaveBeenCalled();
  expect(fileStore.unload).not.toHaveBeenCalled();
  expect(permissionHelper.acquire).toBeCalledTimes(1);
  expect(permissionHelper.acquire).toBeCalledWith(
    [Permissions.CAMERA, Permissions.MEDIA_LIBRARY],
    onPermissionDenied,
    expect.any(Function)
  );
});

test(`take picture saving to media library cancelled`, async () => {
  ImagePicker.launchCameraAsync.mockResolvedValue({
    cancelled: true,
  });

  const fileStore: FileStoreInterface = {
    load: jest.fn(),
    list: jest.fn(),
    delete: jest.fn(),
    generatePath: jest.fn(),
    import: jest.fn(),
    unload: jest.fn(),
  };

  const permissionHelper: PermissionHelperInterface = {
    acquire: jest.fn(async (permissions, permissionDenied, onSuccess) => {
      permissions;
      permissionDenied;

      await onSuccess();
    }),
  };

  const onPermissionDenied = jest.fn();
  const onCancel = jest.fn().mockResolvedValue(undefined);
  const onSuccess = jest.fn();

  const pictureHelper = new PictureHelper(fileStore, permissionHelper);

  await pictureHelper.takePicture(
    true,
    onPermissionDenied,
    onCancel,
    onSuccess
  );

  expect(onPermissionDenied).not.toHaveBeenCalled();
  expect(onCancel).toHaveBeenCalledTimes(1);
  expect(onSuccess).not.toHaveBeenCalled();

  expect(ImagePicker.launchCameraAsync).toHaveBeenCalledTimes(1);
  expect(ImagePicker.launchCameraAsync).toBeCalledWith({
    allowsEditing: true,
    quality: 0.7,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    exif: false,
    base64: false,
    presentationStyle: 0,
  });
  expect(ImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();
  expect(MediaLibrary.saveToLibraryAsync).not.toHaveBeenCalled();
  expect(fileStore.load).not.toHaveBeenCalled();
  expect(fileStore.list).not.toHaveBeenCalled();
  expect(fileStore.delete).not.toHaveBeenCalled();
  expect(fileStore.generatePath).not.toHaveBeenCalled();
  expect(fileStore.import).not.toHaveBeenCalled();
  expect(fileStore.unload).not.toHaveBeenCalled();
  expect(permissionHelper.acquire).toBeCalledTimes(1);
  expect(permissionHelper.acquire).toBeCalledWith(
    [Permissions.CAMERA, Permissions.MEDIA_LIBRARY],
    onPermissionDenied,
    expect.any(Function)
  );
});

test(`take picture without saving to media library successful`, async () => {
  ImagePicker.launchCameraAsync.mockResolvedValue({
    cancelled: false,
    uri: `Example File Uri`,
  });

  const fileStore: FileStoreInterface = {
    load: jest.fn(),
    list: jest.fn(),
    delete: jest.fn(),
    generatePath: jest.fn(),
    import: jest.fn().mockResolvedValue(`89adbf86-4de3-42f0-bd85-46736546f3b3`),
    unload: jest.fn(),
  };

  const permissionHelper: PermissionHelperInterface = {
    acquire: jest.fn(async (permissions, permissionDenied, onSuccess) => {
      permissions;
      permissionDenied;

      await onSuccess();
    }),
  };

  const onPermissionDenied = jest.fn();
  const onCancel = jest.fn();
  const onSuccess = jest.fn().mockResolvedValue(undefined);

  const pictureHelper = new PictureHelper(fileStore, permissionHelper);

  await pictureHelper.takePicture(
    false,
    onPermissionDenied,
    onCancel,
    onSuccess
  );

  expect(onPermissionDenied).not.toHaveBeenCalled();
  expect(onCancel).not.toHaveBeenCalled();
  expect(onSuccess).toBeCalledTimes(1);
  expect(onSuccess).toHaveBeenCalledWith(
    `89adbf86-4de3-42f0-bd85-46736546f3b3`
  );

  expect(ImagePicker.launchCameraAsync).toHaveBeenCalledTimes(1);
  expect(ImagePicker.launchCameraAsync).toBeCalledWith({
    allowsEditing: true,
    quality: 0.7,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    exif: false,
    base64: false,
    presentationStyle: 0,
  });
  expect(ImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();
  expect(MediaLibrary.saveToLibraryAsync).not.toHaveBeenCalled();
  expect(fileStore.load).not.toHaveBeenCalled();
  expect(fileStore.list).not.toHaveBeenCalled();
  expect(fileStore.delete).not.toHaveBeenCalled();
  expect(fileStore.generatePath).not.toHaveBeenCalled();
  expect(fileStore.import).toBeCalledTimes(1);
  expect(fileStore.import).toBeCalledWith(`Example File Uri`);
  expect(fileStore.unload).not.toHaveBeenCalled();
  expect(permissionHelper.acquire).toBeCalledTimes(1);
  expect(permissionHelper.acquire).toBeCalledWith(
    [Permissions.CAMERA, Permissions.MEDIA_LIBRARY],
    onPermissionDenied,
    expect.any(Function)
  );
});

test(`take picture saving to media library successful`, async () => {
  const callOrder: string[] = [];

  ImagePicker.launchCameraAsync.mockResolvedValue({
    cancelled: false,
    uri: `Example File Uri`,
  });

  MediaLibrary.saveToLibraryAsync.mockImplementation(async () => {
    callOrder.push(`MediaLibrary.saveToLibraryAsync`);
  });

  const fileStore: FileStoreInterface = {
    load: jest.fn(),
    list: jest.fn(),
    delete: jest.fn(),
    generatePath: jest.fn(),
    import: jest.fn(async () => {
      callOrder.push(`fileStore.import`);
      return `89adbf86-4de3-42f0-bd85-46736546f3b3`;
    }),
    unload: jest.fn(),
  };

  const permissionHelper: PermissionHelperInterface = {
    acquire: jest.fn(async (permissions, permissionDenied, onSuccess) => {
      permissions;
      permissionDenied;

      await onSuccess();
    }),
  };

  const onPermissionDenied = jest.fn();
  const onCancel = jest.fn();
  const onSuccess = jest.fn().mockResolvedValue(undefined);

  const pictureHelper = new PictureHelper(fileStore, permissionHelper);

  await pictureHelper.takePicture(
    true,
    onPermissionDenied,
    onCancel,
    onSuccess
  );

  expect(onPermissionDenied).not.toHaveBeenCalled();
  expect(onCancel).not.toHaveBeenCalled();
  expect(onSuccess).toBeCalledTimes(1);
  expect(onSuccess).toHaveBeenCalledWith(
    `89adbf86-4de3-42f0-bd85-46736546f3b3`
  );

  expect(ImagePicker.launchCameraAsync).toHaveBeenCalledTimes(1);
  expect(ImagePicker.launchCameraAsync).toBeCalledWith({
    allowsEditing: true,
    quality: 0.7,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    exif: false,
    base64: false,
    presentationStyle: 0,
  });
  expect(ImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();
  expect(MediaLibrary.saveToLibraryAsync).toBeCalledTimes(1);
  expect(MediaLibrary.saveToLibraryAsync).toBeCalledWith(`Example File Uri`);
  expect(fileStore.load).not.toHaveBeenCalled();
  expect(fileStore.list).not.toHaveBeenCalled();
  expect(fileStore.delete).not.toHaveBeenCalled();
  expect(fileStore.generatePath).not.toHaveBeenCalled();
  expect(fileStore.import).toBeCalledTimes(1);
  expect(fileStore.import).toBeCalledWith(`Example File Uri`);
  expect(fileStore.unload).not.toHaveBeenCalled();
  expect(permissionHelper.acquire).toBeCalledTimes(1);
  expect(permissionHelper.acquire).toBeCalledWith(
    [Permissions.CAMERA, Permissions.MEDIA_LIBRARY],
    onPermissionDenied,
    expect.any(Function)
  );
  expect(callOrder).toEqual([
    `MediaLibrary.saveToLibraryAsync`,
    `fileStore.import`,
  ]);
});

test(`select one picture from media library permission denied`, async () => {
  const fileStore: FileStoreInterface = {
    load: jest.fn(),
    list: jest.fn(),
    delete: jest.fn(),
    generatePath: jest.fn(),
    import: jest.fn(),
    unload: jest.fn(),
  };

  const permissionHelper: PermissionHelperInterface = {
    acquire: jest.fn(async (permissions, permissionDenied) => {
      permissions;

      await permissionDenied(showSettingsScreen);
    }),
  };

  const onPermissionDenied = jest.fn();
  const onCancel = jest.fn().mockResolvedValue(undefined);
  const onSuccess = jest.fn();

  const pictureHelper = new PictureHelper(fileStore, permissionHelper);

  await pictureHelper.selectOnePictureFromMediaLibrary(
    onPermissionDenied,
    onCancel,
    onSuccess
  );

  expect(onPermissionDenied).toHaveBeenCalledTimes(1);
  expect(onPermissionDenied).toHaveBeenCalledWith(showSettingsScreen);
  expect(onCancel).not.toHaveBeenCalled();
  expect(onSuccess).not.toHaveBeenCalled();

  expect(ImagePicker.launchCameraAsync).not.toHaveBeenCalled();
  expect(ImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();
  expect(MediaLibrary.saveToLibraryAsync).not.toHaveBeenCalled();
  expect(fileStore.load).not.toHaveBeenCalled();
  expect(fileStore.list).not.toHaveBeenCalled();
  expect(fileStore.delete).not.toHaveBeenCalled();
  expect(fileStore.generatePath).not.toHaveBeenCalled();
  expect(fileStore.import).not.toHaveBeenCalled();
  expect(fileStore.unload).not.toHaveBeenCalled();
  expect(permissionHelper.acquire).toBeCalledTimes(1);
  expect(permissionHelper.acquire).toBeCalledWith(
    [Permissions.MEDIA_LIBRARY],
    onPermissionDenied,
    expect.any(Function)
  );
});

test(`select one picture from media library cancelled`, async () => {
  ImagePicker.launchImageLibraryAsync.mockResolvedValue({
    cancelled: true,
  });

  const fileStore: FileStoreInterface = {
    load: jest.fn(),
    list: jest.fn(),
    delete: jest.fn(),
    generatePath: jest.fn(),
    import: jest.fn(),
    unload: jest.fn(),
  };

  const permissionHelper: PermissionHelperInterface = {
    acquire: jest.fn(async (permissions, permissionDenied, onSuccess) => {
      permissions;
      permissionDenied;

      await onSuccess();
    }),
  };

  const onPermissionDenied = jest.fn();
  const onCancel = jest.fn();
  const onSuccess = jest.fn().mockResolvedValue(undefined);

  const pictureHelper = new PictureHelper(fileStore, permissionHelper);

  await pictureHelper.selectOnePictureFromMediaLibrary(
    onPermissionDenied,
    onCancel,
    onSuccess
  );

  expect(onPermissionDenied).not.toHaveBeenCalled();
  expect(onCancel).toBeCalledTimes(1);
  expect(onSuccess).not.toHaveBeenCalled();

  expect(ImagePicker.launchCameraAsync).not.toHaveBeenCalled();
  expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalledTimes(1);
  expect(ImagePicker.launchImageLibraryAsync).toBeCalledWith({
    allowsEditing: true,
    quality: 0.7,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    exif: false,
    base64: false,
    presentationStyle: 0,
    allowsMultipleSelection: false,
  });
  expect(MediaLibrary.saveToLibraryAsync).not.toHaveBeenCalled();
  expect(fileStore.load).not.toHaveBeenCalled();
  expect(fileStore.list).not.toHaveBeenCalled();
  expect(fileStore.delete).not.toHaveBeenCalled();
  expect(fileStore.generatePath).not.toHaveBeenCalled();
  expect(fileStore.import).not.toBeCalled();
  expect(fileStore.unload).not.toHaveBeenCalled();
  expect(permissionHelper.acquire).toBeCalledTimes(1);
  expect(permissionHelper.acquire).toBeCalledWith(
    [Permissions.MEDIA_LIBRARY],
    onPermissionDenied,
    expect.any(Function)
  );
});

test(`select one picture from media library successful`, async () => {
  ImagePicker.launchImageLibraryAsync.mockResolvedValue({
    cancelled: false,
    uri: `Example File Uri`,
  });

  const fileStore: FileStoreInterface = {
    load: jest.fn(),
    list: jest.fn(),
    delete: jest.fn(),
    generatePath: jest.fn(),
    import: jest.fn().mockResolvedValue(`89adbf86-4de3-42f0-bd85-46736546f3b3`),
    unload: jest.fn(),
  };

  const permissionHelper: PermissionHelperInterface = {
    acquire: jest.fn(async (permissions, permissionDenied, onSuccess) => {
      permissions;
      permissionDenied;

      await onSuccess();
    }),
  };

  const onPermissionDenied = jest.fn();
  const onCancel = jest.fn();
  const onSuccess = jest.fn().mockResolvedValue(undefined);

  const pictureHelper = new PictureHelper(fileStore, permissionHelper);

  await pictureHelper.selectOnePictureFromMediaLibrary(
    onPermissionDenied,
    onCancel,
    onSuccess
  );

  expect(onPermissionDenied).not.toHaveBeenCalled();
  expect(onCancel).not.toHaveBeenCalled();
  expect(onSuccess).toBeCalledTimes(1);
  expect(onSuccess).toHaveBeenCalledWith(
    `89adbf86-4de3-42f0-bd85-46736546f3b3`
  );

  expect(ImagePicker.launchCameraAsync).not.toHaveBeenCalled();
  expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalledTimes(1);
  expect(ImagePicker.launchImageLibraryAsync).toBeCalledWith({
    allowsEditing: true,
    quality: 0.7,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    exif: false,
    base64: false,
    presentationStyle: 0,
    allowsMultipleSelection: false,
  });
  expect(MediaLibrary.saveToLibraryAsync).not.toHaveBeenCalled();
  expect(fileStore.load).not.toHaveBeenCalled();
  expect(fileStore.list).not.toHaveBeenCalled();
  expect(fileStore.delete).not.toHaveBeenCalled();
  expect(fileStore.generatePath).not.toHaveBeenCalled();
  expect(fileStore.import).toBeCalledTimes(1);
  expect(fileStore.import).toBeCalledWith(`Example File Uri`);
  expect(fileStore.unload).not.toHaveBeenCalled();
  expect(permissionHelper.acquire).toBeCalledTimes(1);
  expect(permissionHelper.acquire).toBeCalledWith(
    [Permissions.MEDIA_LIBRARY],
    onPermissionDenied,
    expect.any(Function)
  );
});

test(`select multiple pictures from media library permission denied`, async () => {
  const fileStore: FileStoreInterface = {
    load: jest.fn(),
    list: jest.fn(),
    delete: jest.fn(),
    generatePath: jest.fn(),
    import: jest.fn(),
    unload: jest.fn(),
  };

  const permissionHelper: PermissionHelperInterface = {
    acquire: jest.fn(async (permissions, permissionDenied) => {
      permissions;

      await permissionDenied(showSettingsScreen);
    }),
  };

  const onPermissionDenied = jest.fn();
  const onCancel = jest.fn().mockResolvedValue(undefined);
  const onSuccess = jest.fn();

  const pictureHelper = new PictureHelper(fileStore, permissionHelper);

  await pictureHelper.selectMultiplePicturesFromMediaLibrary(
    onPermissionDenied,
    onCancel,
    onSuccess
  );

  expect(onPermissionDenied).toHaveBeenCalledTimes(1);
  expect(onPermissionDenied).toHaveBeenCalledWith(showSettingsScreen);
  expect(onCancel).not.toHaveBeenCalled();
  expect(onSuccess).not.toHaveBeenCalled();

  expect(ImagePicker.launchCameraAsync).not.toHaveBeenCalled();
  expect(ImagePicker.launchImageLibraryAsync).not.toHaveBeenCalled();
  expect(MediaLibrary.saveToLibraryAsync).not.toHaveBeenCalled();
  expect(fileStore.load).not.toHaveBeenCalled();
  expect(fileStore.list).not.toHaveBeenCalled();
  expect(fileStore.delete).not.toHaveBeenCalled();
  expect(fileStore.generatePath).not.toHaveBeenCalled();
  expect(fileStore.import).not.toHaveBeenCalled();
  expect(fileStore.unload).not.toHaveBeenCalled();
  expect(permissionHelper.acquire).toBeCalledTimes(1);
  expect(permissionHelper.acquire).toBeCalledWith(
    [Permissions.MEDIA_LIBRARY],
    onPermissionDenied,
    expect.any(Function)
  );
});

test(`select multiple pictures from media library cancelled`, async () => {
  ImagePicker.launchImageLibraryAsync.mockResolvedValue({
    cancelled: true,
  });

  const fileStore: FileStoreInterface = {
    load: jest.fn(),
    list: jest.fn(),
    delete: jest.fn(),
    generatePath: jest.fn(),
    import: jest.fn(),
    unload: jest.fn(),
  };

  const permissionHelper: PermissionHelperInterface = {
    acquire: jest.fn(async (permissions, permissionDenied, onSuccess) => {
      permissions;
      permissionDenied;

      await onSuccess();
    }),
  };

  const onPermissionDenied = jest.fn();
  const onCancel = jest.fn();
  const onSuccess = jest.fn().mockResolvedValue(undefined);

  const pictureHelper = new PictureHelper(fileStore, permissionHelper);

  await pictureHelper.selectMultiplePicturesFromMediaLibrary(
    onPermissionDenied,
    onCancel,
    onSuccess
  );

  expect(onPermissionDenied).not.toHaveBeenCalled();
  expect(onCancel).toBeCalledTimes(1);
  expect(onSuccess).not.toHaveBeenCalled();

  expect(ImagePicker.launchCameraAsync).not.toHaveBeenCalled();
  expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalledTimes(1);
  expect(ImagePicker.launchImageLibraryAsync).toBeCalledWith({
    allowsEditing: true,
    quality: 0.7,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    exif: false,
    base64: false,
    presentationStyle: 0,
    allowsMultipleSelection: true,
  });
  expect(MediaLibrary.saveToLibraryAsync).not.toHaveBeenCalled();
  expect(fileStore.load).not.toHaveBeenCalled();
  expect(fileStore.list).not.toHaveBeenCalled();
  expect(fileStore.delete).not.toHaveBeenCalled();
  expect(fileStore.generatePath).not.toHaveBeenCalled();
  expect(fileStore.import).not.toBeCalled();
  expect(fileStore.unload).not.toHaveBeenCalled();
  expect(permissionHelper.acquire).toBeCalledTimes(1);
  expect(permissionHelper.acquire).toBeCalledWith(
    [Permissions.MEDIA_LIBRARY],
    onPermissionDenied,
    expect.any(Function)
  );
});

test(`select multiple pictures from media library successful`, async () => {
  ImagePicker.launchImageLibraryAsync.mockResolvedValue({
    cancelled: false,
    selected: [
      {
        uri: `Example File Uri A`,
      },
      {
        uri: `Example File Uri B`,
      },
      {
        uri: `Example File Uri C`,
      },
    ],
  });

  const fileStore: FileStoreInterface = {
    load: jest.fn(),
    list: jest.fn(),
    delete: jest.fn(),
    generatePath: jest.fn(),
    import: jest
      .fn()
      .mockResolvedValueOnce(`89adbf86-4de3-42f0-bd85-46736546f3b3`)
      .mockResolvedValueOnce(`ebda7bb9-c725-4bc9-a4de-9a213b4850a2`)
      .mockResolvedValueOnce(`cb33cfc3-9ef9-42fa-a8f5-56392b93156d`),
    unload: jest.fn(),
  };

  const permissionHelper: PermissionHelperInterface = {
    acquire: jest.fn(async (permissions, permissionDenied, onSuccess) => {
      permissions;
      permissionDenied;

      await onSuccess();
    }),
  };

  const onPermissionDenied = jest.fn();
  const onCancel = jest.fn();
  const onSuccess = jest.fn().mockResolvedValue(undefined);

  const pictureHelper = new PictureHelper(fileStore, permissionHelper);

  await pictureHelper.selectMultiplePicturesFromMediaLibrary(
    onPermissionDenied,
    onCancel,
    onSuccess
  );

  expect(onPermissionDenied).not.toHaveBeenCalled();
  expect(onCancel).not.toHaveBeenCalled();
  expect(onSuccess).toBeCalledTimes(1);
  expect(onSuccess).toHaveBeenCalledWith([
    `89adbf86-4de3-42f0-bd85-46736546f3b3`,
    `ebda7bb9-c725-4bc9-a4de-9a213b4850a2`,
    `cb33cfc3-9ef9-42fa-a8f5-56392b93156d`,
  ]);

  expect(ImagePicker.launchCameraAsync).not.toHaveBeenCalled();
  expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalledTimes(1);
  expect(ImagePicker.launchImageLibraryAsync).toBeCalledWith({
    allowsEditing: true,
    quality: 0.7,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    exif: false,
    base64: false,
    presentationStyle: 0,
    allowsMultipleSelection: true,
  });
  expect(MediaLibrary.saveToLibraryAsync).not.toHaveBeenCalled();
  expect(fileStore.load).not.toHaveBeenCalled();
  expect(fileStore.list).not.toHaveBeenCalled();
  expect(fileStore.delete).not.toHaveBeenCalled();
  expect(fileStore.generatePath).not.toHaveBeenCalled();
  expect(fileStore.import).toBeCalledTimes(3);
  expect(fileStore.import).toBeCalledWith(`Example File Uri A`);
  expect(fileStore.import).toBeCalledWith(`Example File Uri B`);
  expect(fileStore.import).toBeCalledWith(`Example File Uri C`);
  expect(fileStore.unload).not.toHaveBeenCalled();
  expect(permissionHelper.acquire).toBeCalledTimes(1);
  expect(permissionHelper.acquire).toBeCalledWith(
    [Permissions.MEDIA_LIBRARY],
    onPermissionDenied,
    expect.any(Function)
  );
});
