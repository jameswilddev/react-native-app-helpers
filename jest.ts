(global as unknown as { __DEV__: boolean }).__DEV__ = false;

jest.mock("@react-native-async-storage/async-storage", () =>
  require(`@react-native-async-storage/async-storage/jest/async-storage-mock`)
);
