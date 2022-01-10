import * as React from "react";
import * as TestRenderer from "react-test-renderer";
import {
  useSyncFileCleanUpBlocker,
  SyncableSchema,
  SyncInterface,
  Json,
} from "../../..";

test(`increments the number of file clean-up blockers on mount`, async () => {
  const sync: SyncInterface<
    SyncableSchema,
    Record<string, unknown>,
    Record<string, Json>
  > = {
    fileCleanUpBlockers: 27,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(),
  };

  const Component = () => {
    useSyncFileCleanUpBlocker(sync);

    return null;
  };

  const renderer = TestRenderer.create(<Component />);

  await new Promise((resolve) => setTimeout(resolve, 10));

  expect(sync.fileCleanUpBlockers).toEqual(28);
  expect(sync.addListener).not.toHaveBeenCalled();
  expect(sync.removeListener).not.toHaveBeenCalled();
  expect(sync.getState).not.toHaveBeenCalled();
  expect(sync.run).not.toHaveBeenCalled();

  renderer.unmount();
});

test(`does not adjust the number of file clean-up blockers on re-render`, async () => {
  const sync: SyncInterface<
    SyncableSchema,
    Record<string, unknown>,
    Record<string, Json>
  > = {
    fileCleanUpBlockers: 27,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(),
  };

  const Component = () => {
    useSyncFileCleanUpBlocker(sync);

    return null;
  };

  const renderer = TestRenderer.create(<Component />);

  await new Promise((resolve) => setTimeout(resolve, 10));

  sync.fileCleanUpBlockers = 104;

  renderer.update(<Component />);

  await new Promise((resolve) => setTimeout(resolve, 10));

  expect(sync.fileCleanUpBlockers).toEqual(104);
  expect(sync.addListener).not.toHaveBeenCalled();
  expect(sync.removeListener).not.toHaveBeenCalled();
  expect(sync.getState).not.toHaveBeenCalled();
  expect(sync.run).not.toHaveBeenCalled();

  renderer.unmount();
});

test(`decrements the number of file clean-up blockers on unmount`, async () => {
  const sync: SyncInterface<
    SyncableSchema,
    Record<string, unknown>,
    Record<string, Json>
  > = {
    fileCleanUpBlockers: 27,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(),
  };

  const Component = () => {
    useSyncFileCleanUpBlocker(sync);

    return null;
  };

  const renderer = TestRenderer.create(<Component />);

  await new Promise((resolve) => setTimeout(resolve, 10));

  sync.fileCleanUpBlockers = 104;

  renderer.unmount();

  await new Promise((resolve) => setTimeout(resolve, 10));

  expect(sync.fileCleanUpBlockers).toEqual(103);
  expect(sync.addListener).not.toHaveBeenCalled();
  expect(sync.removeListener).not.toHaveBeenCalled();
  expect(sync.getState).not.toHaveBeenCalled();
  expect(sync.run).not.toHaveBeenCalled();
});
