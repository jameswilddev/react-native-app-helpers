test(`creates a directory on load`, async () => {
  const makeDirectoryAsync = jest.fn().mockReturnValue(
    new Promise<void>(() => {
      // Empty.
    })
  );
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();

  const promise = fileStore.load(`Example Subdirectory Name`);

  let resolved = false;
  let rejected = false;
  promise.then(
    () => {
      resolved = true;
    },
    () => {
      rejected = true;
    }
  );
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100);
  });
  expect(resolved).toBeFalsy();
  expect(rejected).toBeFalsy();
  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`resolves load when creating the directory succeeds`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();

  await fileStore.load(`Example Subdirectory Name`);

  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when loading while loading`, async () => {
  const makeDirectoryAsync = jest.fn().mockReturnValue(
    new Promise<void>(() => {
      // Empty.
    })
  );
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  const firstPromise = fileStore.load(`Example First Subdirectory Name`);

  const secondPromise = fileStore.load(`Example Second Subdirectory Name`);

  await expect(secondPromise).rejects.toEqual(
    new Error(`The file store is already loading.`)
  );
  let resolved = false;
  let rejected = false;
  firstPromise.then(
    () => {
      resolved = true;
    },
    () => {
      rejected = true;
    }
  );
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100);
  });
  expect(resolved).toBeFalsy();
  expect(rejected).toBeFalsy();
  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example First Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when loading while loaded`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example First Subdirectory Name`);

  const promise = fileStore.load(`Example Second Subdirectory Name`);

  await expect(promise).rejects.toEqual(
    new Error(`The file store is already loaded.`)
  );
  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example First Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when generating a path when not loaded`, () => {
  const makeDirectoryAsync = jest.fn();
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();

  expect(() => {
    fileStore.generatePath(`5d515bcf-f201-463f-923f-7c6ab54e8ebf`);
  }).toThrowError(`The file store is not loaded.`);

  expect(makeDirectoryAsync).not.toBeCalled();
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when generating a path while loading`, () => {
  const makeDirectoryAsync = jest.fn().mockReturnValue(
    new Promise<void>(() => {
      // Empty.
    })
  );
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  fileStore.load(`Example Subdirectory Name`);

  expect(() => {
    fileStore.generatePath(`5d515bcf-f201-463f-923f-7c6ab54e8ebf`);
  }).toThrowError(`The file store is currently loading.`);

  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when generating a path once unloaded`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);
  fileStore.unload();

  expect(() => {
    fileStore.generatePath(`5d515bcf-f201-463f-923f-7c6ab54e8ebf`);
  }).toThrowError(`The file store is not loaded.`);

  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`can generate paths`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);

  const actual = fileStore.generatePath(`5d515bcf-f201-463f-923f-7c6ab54e8ebf`);

  expect(actual).toEqual(
    `Example Document Directory/Example Subdirectory Name/5d515bcf-f201-463f-923f-7c6ab54e8ebf`
  );
  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when listing when not loaded`, async () => {
  const makeDirectoryAsync = jest.fn();
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();

  const promise = fileStore.list();

  await expect(promise).rejects.toEqual(
    new Error(`The file store is not loaded.`)
  );
  expect(makeDirectoryAsync).not.toBeCalled();
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when listing while loading`, async () => {
  const makeDirectoryAsync = jest.fn().mockReturnValue(
    new Promise<void>(() => {
      // Empty.
    })
  );
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  fileStore.load(`Example Subdirectory Name`);

  const promise = fileStore.list();

  await expect(promise).rejects.toEqual(
    new Error(`The file store is currently loading.`)
  );
  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when listing once unloaded`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);
  fileStore.unload();

  const promise = fileStore.list();

  await expect(promise).rejects.toEqual(
    new Error(`The file store is not loaded.`)
  );
  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`can list files`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest
    .fn()
    .mockResolvedValue([
      `a84f5f9e-4350-49ee-8871-c034f0038556`,
      `ac998c2c-7dc0-43b5-af07-8bf11e658baa`,
      `5e64ed2a-aa72-46e9-867c-8dd45ae867cc`,
    ]);
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);

  const files = await fileStore.list();

  expect(files).toEqual([
    `a84f5f9e-4350-49ee-8871-c034f0038556`,
    `ac998c2c-7dc0-43b5-af07-8bf11e658baa`,
    `5e64ed2a-aa72-46e9-867c-8dd45ae867cc`,
  ]);
  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).toBeCalledTimes(1);
  expect(readDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`
  );
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when deleting when not loaded`, async () => {
  const makeDirectoryAsync = jest.fn();
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();

  const promise = fileStore.delete(`1527b17e-08e7-49b5-9bff-09a1945f25f2`);

  await expect(promise).rejects.toEqual(
    new Error(`The file store is not loaded.`)
  );
  expect(makeDirectoryAsync).not.toBeCalled();
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when deleting while loading`, async () => {
  const makeDirectoryAsync = jest.fn().mockReturnValue(
    new Promise<void>(() => {
      // Empty.
    })
  );
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  fileStore.load(`Example Subdirectory Name`);

  const promise = fileStore.delete(`1527b17e-08e7-49b5-9bff-09a1945f25f2`);

  await expect(promise).rejects.toEqual(
    new Error(`The file store is currently loading.`)
  );
  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when deleting once unloaded`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);
  fileStore.unload();

  const promise = fileStore.delete(`1527b17e-08e7-49b5-9bff-09a1945f25f2`);

  await expect(promise).rejects.toEqual(
    new Error(`The file store is not loaded.`)
  );
  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`does not resolve the promise returned by deleting until deletion succeeds`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn().mockReturnValue(
    new Promise<void>(() => {
      // Empty.
    })
  );
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);

  const promise = fileStore.delete(`1527b17e-08e7-49b5-9bff-09a1945f25f2`);

  let resolved = false;
  let rejected = false;
  promise.then(
    () => {
      resolved = true;
    },
    () => {
      rejected = true;
    }
  );
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100);
  });
  expect(resolved).toBeFalsy();
  expect(rejected).toBeFalsy();
  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).toBeCalledTimes(1);
  expect(deleteAsync).toHaveBeenCalledWith(
    `Example Document Directory/Example Subdirectory Name/1527b17e-08e7-49b5-9bff-09a1945f25f2`
  );
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`can delete files`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn(async () => {
    // Empty.
  });
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);

  await fileStore.delete(`1527b17e-08e7-49b5-9bff-09a1945f25f2`);

  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).toBeCalledTimes(1);
  expect(deleteAsync).toHaveBeenCalledWith(
    `Example Document Directory/Example Subdirectory Name/1527b17e-08e7-49b5-9bff-09a1945f25f2`
  );
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when importing when not loaded`, async () => {
  const makeDirectoryAsync = jest.fn();
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();

  const promise = fileStore.import(`Example File Uri`);

  await expect(promise).rejects.toEqual(
    new Error(`The file store is not loaded.`)
  );
  expect(makeDirectoryAsync).not.toBeCalled();
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when importing while loading`, async () => {
  const makeDirectoryAsync = jest.fn().mockReturnValue(
    new Promise<void>(() => {
      // Empty.
    })
  );
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  fileStore.load(`Example Subdirectory Name`);

  const promise = fileStore.import(`Example File Uri`);

  await expect(promise).rejects.toEqual(
    new Error(`The file store is currently loading.`)
  );
  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when importing once unloaded`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);
  fileStore.unload();

  const promise = fileStore.import(`Example File Uri`);

  await expect(promise).rejects.toEqual(
    new Error(`The file store is not loaded.`)
  );
  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`does not resolve the promise returned by importing until moving succeeds`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn().mockReturnValue(
    new Promise<void>(() => {
      // Empty.
    })
  );
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);

  const promise = fileStore.import(`Example File Uri`);

  let resolved = false;
  let rejected = false;
  promise.then(
    () => {
      resolved = true;
    },
    () => {
      rejected = true;
    }
  );
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100);
  });
  expect(resolved).toBeFalsy();
  expect(rejected).toBeFalsy();
  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).toBeCalledTimes(1);
  expect(moveAsync).toHaveBeenCalledWith({
    from: `Example File Uri`,
    to: expect.stringMatching(
      /^Example Document Directory\/Example Subdirectory Name\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    ),
  });
});

test(`can import files`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn(async () => {
    // Empty.
  });
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);

  const uuid = await fileStore.import(`Example File Uri`);

  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).toBeCalledTimes(1);
  expect(moveAsync).toHaveBeenCalledWith({
    from: `Example File Uri`,
    to: `Example Document Directory/Example Subdirectory Name/${uuid}`,
  });
});

test(`throws when unloading when not loaded`, () => {
  const makeDirectoryAsync = jest.fn();
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();

  expect(() => {
    fileStore.unload();
  }).toThrowError(`The file store is not loaded.`);

  expect(makeDirectoryAsync).not.toBeCalled();
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when unloading while loading`, () => {
  const makeDirectoryAsync = jest.fn().mockReturnValue(
    new Promise<void>(() => {
      // Empty.
    })
  );
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  fileStore.load(`Example Subdirectory Name`);

  expect(() => {
    fileStore.unload();
  }).toThrowError(`The file store is currently loading.`);

  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when unloading once unloaded`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);
  fileStore.unload();

  expect(() => {
    fileStore.unload();
  }).toThrowError(`The file store is not loaded.`);

  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when unloading while listing files`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn().mockReturnValue(
    new Promise<void>(() => {
      // Empty.
    })
  );
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);
  fileStore.list();

  expect(() => {
    fileStore.unload();
  }).toThrowError(
    `One or more file store operations are currently in progress.`
  );

  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).toBeCalledTimes(1);
  expect(readDirectoryAsync).toHaveBeenCalledWith(
    `Example Document Directory/Example Subdirectory Name`
  );
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when unloading while deleting files`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn().mockReturnValue(
    new Promise<void>(() => {
      // Empty.
    })
  );
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);
  fileStore.delete(`1527b17e-08e7-49b5-9bff-09a1945f25f2`);

  expect(() => {
    fileStore.unload();
  }).toThrowError(
    `One or more file store operations are currently in progress.`
  );

  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).toBeCalledTimes(1);
  expect(deleteAsync).toHaveBeenCalledWith(
    `Example Document Directory/Example Subdirectory Name/1527b17e-08e7-49b5-9bff-09a1945f25f2`
  );
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`throws when unloading while importing files`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn().mockReturnValue(
    new Promise<void>(() => {
      // Empty.
    })
  );
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);
  fileStore.import(`Example File Uri`);

  expect(() => {
    fileStore.unload();
  }).toThrowError(
    `One or more file store operations are currently in progress.`
  );

  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).toBeCalledTimes(1);
  expect(moveAsync).toHaveBeenCalledWith({
    from: `Example File Uri`,
    to: expect.stringMatching(
      /^Example Document Directory\/Example Subdirectory Name\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    ),
  });
});

test(`can unload before any file store operations occur`, async () => {
  const makeDirectoryAsync = jest.fn();
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn(async () => {
    // Empty.
  });
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);

  fileStore.unload();

  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`can unload once listing files completes`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest
    .fn()
    .mockResolvedValue([
      `a84f5f9e-4350-49ee-8871-c034f0038556`,
      `ac998c2c-7dc0-43b5-af07-8bf11e658baa`,
      `5e64ed2a-aa72-46e9-867c-8dd45ae867cc`,
    ]);
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);
  await fileStore.list();

  fileStore.unload();

  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).toBeCalledTimes(1);
  expect(readDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`
  );
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`can unload once deleting files completes`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn(async () => {
    // Empty.
  });
  const moveAsync = jest.fn();
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);
  await fileStore.delete(`1527b17e-08e7-49b5-9bff-09a1945f25f2`);

  fileStore.unload();

  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).toBeCalledTimes(1);
  expect(deleteAsync).toHaveBeenCalledWith(
    `Example Document Directory/Example Subdirectory Name/1527b17e-08e7-49b5-9bff-09a1945f25f2`
  );
  expect(moveAsync).not.toHaveBeenCalled();
});

test(`can unload once importing files completes`, async () => {
  const makeDirectoryAsync = jest.fn(async () => {
    // Empty.
  });
  const readDirectoryAsync = jest.fn();
  const deleteAsync = jest.fn();
  const moveAsync = jest.fn(async () => {
    // Empty.
  });
  jest.resetModules();
  jest.setMock(`expo-file-system`, {
    documentDirectory: `Example Document Directory`,
    makeDirectoryAsync,
    readDirectoryAsync,
    deleteAsync,
    moveAsync,
  });
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { FileStore } = require(`../../..`);
  const fileStore = new FileStore();
  await fileStore.load(`Example Subdirectory Name`);
  const uuid = await fileStore.import(`Example File Uri`);

  fileStore.unload();

  expect(makeDirectoryAsync).toBeCalledTimes(1);
  expect(makeDirectoryAsync).toBeCalledWith(
    `Example Document Directory/Example Subdirectory Name`,
    { intermediates: true }
  );
  expect(readDirectoryAsync).not.toHaveBeenCalled();
  expect(deleteAsync).not.toHaveBeenCalled();
  expect(moveAsync).toBeCalledTimes(1);
  expect(moveAsync).toHaveBeenCalledWith({
    from: `Example File Uri`,
    to: `Example Document Directory/Example Subdirectory Name/${uuid}`,
  });
});
