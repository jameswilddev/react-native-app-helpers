(global as unknown as { __DEV__: boolean }).__DEV__ = false;

jest.mock(`@react-native-async-storage/async-storage`, () => {
  const asyncStorage = new Map<string, string>();

  return {
    async getItem(key: string): Promise<null | string> {
      return asyncStorage.get(key) ?? null;
    },
    async setItem(key: string, value: string): Promise<void> {
      asyncStorage.set(key, value);
    },
  };
});

jest.mock(`react-native-encrypted-storage`, () => {
  const encryptedStorage = new Map<string, string>();

  return {
    async getItem(key: string): Promise<null | string> {
      return encryptedStorage.get(key) ?? null;
    },
    async setItem(key: string, value: string): Promise<void> {
      encryptedStorage.set(key, value);
    },
  };
});
