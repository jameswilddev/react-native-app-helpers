(global as unknown as { __DEV__: boolean }).__DEV__ = false;

jest.mock(`@react-native-async-storage/async-storage`, () =>
  require(`@react-native-async-storage/async-storage/jest/async-storage-mock`)
);

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
