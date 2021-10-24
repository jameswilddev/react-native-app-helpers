import * as uuid from "uuid";
import { SessionStore } from "../..";

type TestSession = {
  testKey: `Test Value A` | `Test Value B` | `Test Value C` | `Test Value D`;
};

test(`throws an error when getting from an unloaded store`, () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn();
  store.addListener(`set`, onSet);

  expect(() => {
    store.get();
  }).toThrowError(`The session store is not loaded.`);

  expect(onSet).not.toHaveBeenCalled();
});

test(`throws an error when setting a value in an unloaded store`, () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn();
  store.addListener(`set`, onSet);

  expect(() => {
    store.set({ testKey: `Test Value B` });
  }).toThrowError(`The session store is not loaded.`);

  expect(onSet).not.toHaveBeenCalled();
});

test(`throws an error when unloading an unloaded store`, () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn();
  store.addListener(`set`, onSet);

  const promise = store.unload();

  expect(promise).rejects.toEqual(
    new Error(`The session store is not loaded.`)
  );
  expect(onSet).not.toHaveBeenCalled();
});

test(`allows a store to be loaded and read from`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn();
  store.addListener(`set`, onSet);

  await store.load(uuid.v4());
  const output = store.get();

  expect(output).toEqual({ testKey: `Test Value A` });
  expect(onSet).not.toHaveBeenCalled();
});

test(`allows a store to be loaded, written to and read from`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn(() => store.get());
  store.addListener(`set`, onSet);

  await store.load(uuid.v4());
  store.set({ testKey: `Test Value B` });
  const output = store.get();

  expect(output).toEqual({ testKey: `Test Value B` });
  expect(onSet).toBeCalledTimes(1);
  expect(onSet).toHaveReturnedWith({ testKey: `Test Value B` });
});

test(`allows a store to be loaded, unloaded, loaded and read from`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn();
  store.addListener(`set`, onSet);
  const key = uuid.v4();

  await store.load(key);
  await store.unload();
  await store.load(key);
  const output = store.get();

  expect(output).toEqual({ testKey: `Test Value A` });
  expect(onSet).not.toHaveBeenCalled();
});

test(`allows a store to be loaded, written to, unloaded, loaded and read from`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn(() => store.get());
  store.addListener(`set`, onSet);
  const key = uuid.v4();

  await store.load(key);
  store.set({ testKey: `Test Value B` });
  await store.unload();
  await store.load(key);
  const output = store.get();

  expect(output).toEqual({ testKey: `Test Value B` });
  expect(onSet).toBeCalledTimes(1);
  expect(onSet).toHaveReturnedWith({ testKey: `Test Value B` });
});

test(`treats two separate async storage keys as separate stores`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn(() => store.get());
  store.addListener(`set`, onSet);

  await store.load(uuid.v4());
  store.set({ testKey: `Test Value B` });
  await store.unload();
  await store.load(uuid.v4());
  const output = store.get();

  expect(output).toEqual({ testKey: `Test Value A` });
  expect(onSet).toBeCalledTimes(1);
  expect(onSet).toHaveReturnedWith({ testKey: `Test Value B` });
});

test(`treats two separate class instances as having their own state`, async () => {
  const storeA = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSetA = jest.fn(() => storeA.get());
  storeA.addListener(`set`, onSetA);
  const storeB = new SessionStore<TestSession>({ testKey: `Test Value B` });
  const onSetB = jest.fn(() => storeB.get());
  storeB.addListener(`set`, onSetB);

  await Promise.all([storeA.load(uuid.v4()), storeB.load(uuid.v4())]);
  storeA.set({ testKey: `Test Value C` });
  storeB.set({ testKey: `Test Value D` });
  const outputA = storeA.get();
  const outputB = storeB.get();

  expect(outputA).toEqual({ testKey: `Test Value C` });
  expect(onSetA).toBeCalledTimes(1);
  expect(onSetA).toHaveReturnedWith({ testKey: `Test Value C` });
  expect(outputB).toEqual({ testKey: `Test Value D` });
  expect(onSetB).toBeCalledTimes(1);
  expect(onSetB).toHaveReturnedWith({ testKey: `Test Value D` });
});

test(`allows a store to be loaded, written to twice in rapid succession and read from`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn(() => store.get());
  store.addListener(`set`, onSet);
  const key = uuid.v4();

  await store.load(key);
  store.set({ testKey: `Test Value B` });
  store.set({ testKey: `Test Value C` });
  const output = store.get();

  expect(output).toEqual({ testKey: `Test Value C` });
  expect(onSet).toBeCalledTimes(2);
  expect(onSet).toHaveReturnedWith({ testKey: `Test Value B` });
  expect(onSet).toHaveReturnedWith({ testKey: `Test Value C` });
});

test(`allows a store to be loaded, written to twice and unloaded in rapid succession, loaded and read from`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn(() => store.get());
  store.addListener(`set`, onSet);
  const key = uuid.v4();

  await store.load(key);
  store.set({ testKey: `Test Value B` });
  store.set({ testKey: `Test Value C` });
  await store.unload();
  await store.load(key);
  const output = store.get();

  expect(output).toEqual({ testKey: `Test Value C` });
  expect(onSet).toBeCalledTimes(2);
  expect(onSet).toHaveReturnedWith({ testKey: `Test Value B` });
  expect(onSet).toHaveReturnedWith({ testKey: `Test Value C` });
});

test(`works as expected without event listeners`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const key = uuid.v4();

  await store.load(key);
  store.set({ testKey: `Test Value B` });
  await store.unload();
  await store.load(key);
  const output = store.get();

  expect(output).toEqual({ testKey: `Test Value B` });
});

test(`works as expected with multiple event listeners`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSetA = jest.fn(() => store.get());
  store.addListener(`set`, onSetA);
  const onSetB = jest.fn(() => store.get());
  store.addListener(`set`, onSetB);
  const onSetC = jest.fn(() => store.get());
  store.addListener(`set`, onSetC);
  const key = uuid.v4();

  await store.load(key);
  store.set({ testKey: `Test Value B` });
  await store.unload();
  await store.load(key);
  const output = store.get();

  expect(output).toEqual({ testKey: `Test Value B` });
  expect(onSetA).toBeCalledTimes(1);
  expect(onSetA).toHaveReturnedWith({ testKey: `Test Value B` });
  expect(onSetB).toBeCalledTimes(1);
  expect(onSetB).toHaveReturnedWith({ testKey: `Test Value B` });
  expect(onSetC).toBeCalledTimes(1);
  expect(onSetC).toHaveReturnedWith({ testKey: `Test Value B` });
});

test(`allows removal of event listeners`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSetA = jest.fn(() => store.get());
  store.addListener(`set`, onSetA);
  const onSetB = jest.fn(() => store.get());
  store.addListener(`set`, onSetB);
  const onSetC = jest.fn(() => store.get());
  store.addListener(`set`, onSetC);
  store.removeListener(`set`, onSetB);
  const key = uuid.v4();

  await store.load(key);
  store.set({ testKey: `Test Value B` });
  await store.unload();
  await store.load(key);
  const output = store.get();

  expect(output).toEqual({ testKey: `Test Value B` });
  expect(onSetA).toBeCalledTimes(1);
  expect(onSetA).toHaveReturnedWith({ testKey: `Test Value B` });
  expect(onSetB).not.toHaveBeenCalled();
  expect(onSetC).toBeCalledTimes(1);
  expect(onSetC).toHaveReturnedWith({ testKey: `Test Value B` });
});

test(`throws an error when loading a loading store`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn();
  store.addListener(`set`, onSet);

  store.load(uuid.v4());
  const promise = store.load(uuid.v4());

  expect(promise).rejects.toEqual(
    new Error(`The session store is already loading.`)
  );
  expect(onSet).not.toHaveBeenCalled();
});

test(`throws an error when getting from a loading store`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn();
  store.addListener(`set`, onSet);

  store.load(uuid.v4());
  expect(() => {
    store.get();
  }).toThrowError(`The session store is currently loading.`);

  expect(onSet).not.toHaveBeenCalled();
});

test(`throws an error when setting a value in a loading store`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn();
  store.addListener(`set`, onSet);

  store.load(uuid.v4());
  expect(() => {
    store.set({ testKey: `Test Value B` });
  }).toThrowError(`The session store is currently loading.`);

  expect(onSet).not.toHaveBeenCalled();
});

test(`throws an error when unloading a loading store`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn();
  store.addListener(`set`, onSet);

  store.load(uuid.v4());
  const promise = store.unload();

  expect(promise).rejects.toEqual(
    new Error(`The session store is currently loading.`)
  );
  expect(onSet).not.toHaveBeenCalled();
});

test(`throws an error when loading a loaded store`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn();
  store.addListener(`set`, onSet);

  await store.load(uuid.v4());
  const promise = store.load(uuid.v4());

  expect(promise).rejects.toEqual(
    new Error(`The session store is already loaded.`)
  );
  expect(onSet).not.toHaveBeenCalled();
});

test(`throws an error when loading an unloading store`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn(() => store.get());
  store.addListener(`set`, onSet);

  await store.load(uuid.v4());
  store.set({ testKey: `Test Value B` });
  store.unload();
  const promise = store.load(uuid.v4());

  expect(promise).rejects.toEqual(
    new Error(`The session store is currently unloading.`)
  );
  expect(onSet).toBeCalledTimes(1);
  expect(onSet).toHaveReturnedWith({ testKey: `Test Value B` });
});

test(`throws an error when getting from an unloading store`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn(() => store.get());
  store.addListener(`set`, onSet);

  await store.load(uuid.v4());
  store.set({ testKey: `Test Value B` });
  store.unload();
  expect(() => {
    store.get();
  }).toThrowError(`The session store is currently unloading.`);

  expect(onSet).toBeCalledTimes(1);
  expect(onSet).toHaveReturnedWith({ testKey: `Test Value B` });
});

test(`throws an error when setting a value in an unloading store`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn(() => store.get());
  store.addListener(`set`, onSet);

  await store.load(uuid.v4());
  store.set({ testKey: `Test Value B` });
  store.unload();
  expect(() => {
    store.set({ testKey: `Test Value C` });
  }).toThrowError(`The session store is currently unloading.`);

  expect(onSet).toBeCalledTimes(1);
  expect(onSet).toHaveReturnedWith({ testKey: `Test Value B` });
});

test(`throws an error when unloading an unloading store`, async () => {
  const store = new SessionStore<TestSession>({ testKey: `Test Value A` });
  const onSet = jest.fn(() => store.get());
  store.addListener(`set`, onSet);

  await store.load(uuid.v4());
  store.set({ testKey: `Test Value B` });
  store.unload();
  const promise = store.unload();

  expect(promise).rejects.toEqual(
    new Error(`The session store is currently unloading.`)
  );
  expect(onSet).toBeCalledTimes(1);
  expect(onSet).toHaveReturnedWith({ testKey: `Test Value B` });
});