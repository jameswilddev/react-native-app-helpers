// This is supposed to be defined but is not for unknown reason.
(global as unknown as { fail: (text: string) => void }).fail = (
  text: string
) => {
  expect(text).toBeNull();
};

(global as unknown as { __DEV__: boolean }).__DEV__ = false;

class AbortSignalMock {
  private readonly callbacks: (() => void)[] = [];

  addEventListener(type: string, listener: () => void): void {
    if (type !== `abort`) {
      throw new Error(`Invalid type "${type}".`);
    } else if (this.callbacks.includes(listener)) {
      throw new Error(`Duplicate event listener.`);
    } else {
      this.callbacks.push(listener);
    }
  }

  removeEventListener(type: string, listener: () => void): void {
    if (type !== `abort`) {
      throw new Error(`Invalid type "${type}".`);
    } else {
      const index = this.callbacks.indexOf(listener);

      if (index === -1) {
        throw new Error(`Missing event listener.`);
      } else {
        this.callbacks.splice(index, 1);
      }
    }
  }

  raise() {
    for (const callback of [...this.callbacks]) {
      callback();
    }
  }
}

(
  global as unknown as { AbortController: unknown }
).AbortController = class AbortController {
  readonly signal = new AbortSignalMock();

  abort() {
    this.signal.raise();
  }
};

(global as unknown as { AbortSignal: unknown }).AbortSignal = AbortSignalMock;

jest.mock(`react-native/Libraries/Utilities/BackHandler`, () =>
  jest.requireActual(`react-native/Libraries/Utilities/__mocks__/BackHandler`)
);

jest.mock(`react-native/Libraries/Linking/Linking`, () => ({
  openURL: jest.fn(),
}));

jest.mock(`expo-permissions`, () => {
  return {
    askAsync: jest.fn(),
  };
});

jest.mock(`expo-intent-launcher`, () => {
  return {
    startActivityAsync: jest.fn(),
    ActivityAction: {
      APPLICATION_DETAILS_SETTINGS: `Example Application Details Settings`,
      APPLICATION_SETTINGS: `Example Application Settings`,
    },
  };
});

jest.mock(`expo-constants`, () => {
  return {};
});

jest.mock(`expo-media-library`, () => {
  return {};
});

jest.mock(`expo-image-picker`, () => {
  return {};
});

jest.mock(`expo-file-system`, () => {
  const uuid = jest.requireActual(`uuid`);
  const fs = jest.requireActual(`fs`);
  const os = jest.requireActual(`os`);
  const path = jest.requireActual(`path`);

  const documentDirectory = path.join(os.tmpdir(), uuid.v4());

  function isError(error: unknown): error is NodeJS.ErrnoException {
    return (
      Object.prototype.hasOwnProperty.call(error, `code`) &&
      typeof (error as { readonly code: unknown }).code === `string`
    );
  }

  return {
    documentDirectory,
    async makeDirectoryAsync(
      fileUri: string,
      options?: {
        intermediates?: boolean;
      }
    ): Promise<void> {
      await fs.promises.mkdir(fileUri, { recursive: !!options?.intermediates });
    },
    async getInfoAsync(
      fileUri: string,
      options?: unknown
    ): Promise<
      | {
          exists: true;
          uri: string;
          size: number;
          isDirectory: boolean;
          modificationTime: number;
          md5?: string;
        }
      | {
          exists: false;
          uri: string;
          size: undefined;
          isDirectory: false;
          modificationTime: undefined;
          md5: undefined;
        }
    > {
      if (options === undefined) {
        try {
          const stats = await fs.promises.stat(fileUri);

          return {
            exists: true,
            uri: fileUri,
            size: stats.size,
            isDirectory: stats.isDirectory(),
            modificationTime: stats.mtimeMs,
          };
        } catch (error) {
          if (isError(error) && error.code === `ENOENT`) {
            return {
              exists: false,
              uri: fileUri,
              size: undefined,
              isDirectory: false,
              modificationTime: undefined,
              md5: undefined,
            };
          } else {
            throw error;
          }
        }
      } else {
        throw new Error(
          `expo-file-system.getInfoAsync's mock does not support options.`
        );
      }
    },
    async writeAsStringAsync(
      fileUri: string,
      contents: string,
      options?: unknown
    ): Promise<void> {
      if (options === undefined) {
        await fs.promises.writeFile(fileUri, contents, `utf8`);
      } else {
        throw new Error(
          `expo-file-system.writeAsFileAsync's mock does not support options.`
        );
      }
    },
    async readAsStringAsync(
      fileUri: string,
      options?: unknown
    ): Promise<string> {
      if (options === undefined) {
        return await fs.promises.readFile(fileUri, `utf8`);
      } else {
        throw new Error(
          `expo-file-system.readAsStringAsync's mock does not support options.`
        );
      }
    },
    createUploadTask: jest.fn(),
    downloadAsync: jest.fn(),
    deleteAsync: jest.fn(),
    FileSystemUploadType: {
      BINARY_CONTENT: `Test Binary Content`,
    },
  };
});

jest.mock(`expo-secure-store`, () => {
  const encryptedStorage = new Map<string, string>();

  return {
    async getItemAsync(key: string, options?: unknown): Promise<null | string> {
      if (options === undefined) {
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        return encryptedStorage.get(key) ?? null;
      } else {
        throw new Error(
          `expo-secure-store.getItemAsync's mock does not support options.`
        );
      }
    },
    async setItemAsync(
      key: string,
      value: string,
      options?: unknown
    ): Promise<void> {
      if (options === undefined) {
        await new Promise<void>((resolve) => setTimeout(resolve, 50));
        encryptedStorage.set(key, value);
      } else {
        throw new Error(
          `expo-secure-store.setItemAsync's mock does not support options.`
        );
      }
    },
  };
});

expect.extend({
  toBeAFunctionWithTheStaticProperties(received, expected) {
    if (
      received instanceof Function &&
      Object.prototype.hasOwnProperty.call(received, `arguments`)
    ) {
      const asObject: Record<string, unknown> = {};

      for (const key in received) {
        asObject[key] = received[key];
      }

      expect(asObject).toMatchObject(expected);

      return {
        pass: true,
        message: () =>
          `Expected ${received} to be a Function with properties ${expected}`,
      };
    } else {
      return {
        pass: false,
        message: () =>
          `Expected ${received} to be a Function with properties ${expected}`,
      };
    }
  },
});

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace jest {
  interface Matchers<R> {
    toBeAFunctionWithTheStaticProperties(
      properties: Record<string, unknown>
    ): R;
  }
}
