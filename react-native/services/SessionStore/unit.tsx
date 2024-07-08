import { randomUUID } from 'crypto'
import { SessionStore } from '../../..'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TestSession = {
  testKey: 'Test Value A' | 'Test Value B' | 'Test Value C' | 'Test Value D'
}

test('throws an error when getting from an unloaded store', () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn()
  store.addListener('set', onSet)

  expect(() => {
    store.get()
  }).toThrowError('The session store is not loaded.')

  expect(onSet).not.toHaveBeenCalled()
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('throws an error when setting a value in an unloaded store', () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn()
  store.addListener('set', onSet)

  expect(() => {
    store.set({ testKey: 'Test Value B' })
  }).toThrowError('The session store is not loaded.')

  expect(onSet).not.toHaveBeenCalled()
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('throws an error when unloading an unloaded store', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn()
  store.addListener('set', onSet)

  const promise = store.unload()

  await expect(promise).rejects.toEqual(
    new Error('The session store is not loaded.')
  )
  expect(onSet).not.toHaveBeenCalled()
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('allows a store to be loaded and read from', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn()
  store.addListener('set', onSet)

  await store.load()
  const output = store.get()

  expect(output).toEqual({ testKey: 'Test Value A' })
  expect(onSet).not.toHaveBeenCalled()
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('allows a store to be loaded, written to and read from', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn(() => store.get())
  store.addListener('set', onSet)

  await store.load()
  store.set({ testKey: 'Test Value B' })
  const output = store.get()

  expect(output).toEqual({ testKey: 'Test Value B' })
  expect(onSet).toBeCalledTimes(1)
  expect(onSet).toHaveReturnedWith({ testKey: 'Test Value B' })
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('allows a store to be loaded, unloaded, loaded and read from', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn()
  store.addListener('set', onSet)

  await store.load()
  await store.unload()
  await store.load()
  const output = store.get()

  expect(output).toEqual({ testKey: 'Test Value A' })
  expect(onSet).not.toHaveBeenCalled()
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('allows a store to be loaded, written to, unloaded, loaded and read from', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn(() => store.get())
  store.addListener('set', onSet)

  await store.load()
  store.set({ testKey: 'Test Value B' })
  await store.unload()
  await store.load()
  const output = store.get()

  expect(output).toEqual({ testKey: 'Test Value B' })
  expect(onSet).toBeCalledTimes(1)
  expect(onSet).toHaveReturnedWith({ testKey: 'Test Value B' })
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('treats two separate class instances as having their own state', async () => {
  const errorReporterReport = jest.fn()
  const storeA = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSetA = jest.fn(() => storeA.get())
  storeA.addListener('set', onSetA)
  const storeB = new SessionStore<TestSession>(
    { testKey: 'Test Value B' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSetB = jest.fn(() => storeB.get())
  storeB.addListener('set', onSetB)

  await Promise.all([storeA.load(), storeB.load()])
  storeA.set({ testKey: 'Test Value C' })
  storeB.set({ testKey: 'Test Value D' })
  const outputA = storeA.get()
  const outputB = storeB.get()

  expect(outputA).toEqual({ testKey: 'Test Value C' })
  expect(onSetA).toBeCalledTimes(1)
  expect(onSetA).toHaveReturnedWith({ testKey: 'Test Value C' })
  expect(outputB).toEqual({ testKey: 'Test Value D' })
  expect(onSetB).toBeCalledTimes(1)
  expect(onSetB).toHaveReturnedWith({ testKey: 'Test Value D' })
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('allows a store to be loaded, written to twice in rapid succession and read from', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn(() => store.get())
  store.addListener('set', onSet)

  await store.load()
  store.set({ testKey: 'Test Value B' })
  store.set({ testKey: 'Test Value C' })
  const output = store.get()

  expect(output).toEqual({ testKey: 'Test Value C' })
  expect(onSet).toBeCalledTimes(2)
  expect(onSet).toHaveReturnedWith({ testKey: 'Test Value B' })
  expect(onSet).toHaveReturnedWith({ testKey: 'Test Value C' })
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('allows a store to be loaded, written to twice and unloaded in rapid succession, loaded and read from', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn(() => store.get())
  store.addListener('set', onSet)

  await store.load()
  store.set({ testKey: 'Test Value B' })
  store.set({ testKey: 'Test Value C' })
  await store.unload()
  await store.load()
  const output = store.get()

  expect(output).toEqual({ testKey: 'Test Value C' })
  expect(onSet).toBeCalledTimes(2)
  expect(onSet).toHaveReturnedWith({ testKey: 'Test Value B' })
  expect(onSet).toHaveReturnedWith({ testKey: 'Test Value C' })
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('works as expected without event listeners', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )

  await store.load()
  store.set({ testKey: 'Test Value B' })
  await store.unload()
  await store.load()
  const output = store.get()

  expect(output).toEqual({ testKey: 'Test Value B' })
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('works as expected with multiple event listeners', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSetA = jest.fn(() => store.get())
  store.addListener('set', onSetA)
  const onSetB = jest.fn(() => store.get())
  store.addListener('set', onSetB)
  const onSetC = jest.fn(() => store.get())
  store.addListener('set', onSetC)

  await store.load()
  store.set({ testKey: 'Test Value B' })
  await store.unload()
  await store.load()
  const output = store.get()

  expect(output).toEqual({ testKey: 'Test Value B' })
  expect(onSetA).toBeCalledTimes(1)
  expect(onSetA).toHaveReturnedWith({ testKey: 'Test Value B' })
  expect(onSetB).toBeCalledTimes(1)
  expect(onSetB).toHaveReturnedWith({ testKey: 'Test Value B' })
  expect(onSetC).toBeCalledTimes(1)
  expect(onSetC).toHaveReturnedWith({ testKey: 'Test Value B' })
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('allows removal of event listeners', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSetA = jest.fn(() => store.get())
  store.addListener('set', onSetA)
  const onSetB = jest.fn(() => store.get())
  store.addListener('set', onSetB)
  const onSetC = jest.fn(() => store.get())
  store.addListener('set', onSetC)
  store.removeListener('set', onSetB)

  await store.load()
  store.set({ testKey: 'Test Value B' })
  await store.unload()
  await store.load()
  const output = store.get()

  expect(output).toEqual({ testKey: 'Test Value B' })
  expect(onSetA).toBeCalledTimes(1)
  expect(onSetA).toHaveReturnedWith({ testKey: 'Test Value B' })
  expect(onSetB).not.toHaveBeenCalled()
  expect(onSetC).toBeCalledTimes(1)
  expect(onSetC).toHaveReturnedWith({ testKey: 'Test Value B' })
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('throws an error when loading a loading store', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn()
  store.addListener('set', onSet)

  void store.load()
  const promise = store.load()

  await expect(promise).rejects.toEqual(
    new Error('The session store is already loading.')
  )
  expect(onSet).not.toHaveBeenCalled()
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('throws an error when getting from a loading store', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn()
  store.addListener('set', onSet)

  void store.load()
  expect(() => {
    store.get()
  }).toThrowError('The session store is currently loading.')

  expect(onSet).not.toHaveBeenCalled()
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('throws an error when setting a value in a loading store', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn()
  store.addListener('set', onSet)

  void store.load()
  expect(() => {
    store.set({ testKey: 'Test Value B' })
  }).toThrowError('The session store is currently loading.')

  expect(onSet).not.toHaveBeenCalled()
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('throws an error when unloading a loading store', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn()
  store.addListener('set', onSet)

  void store.load()
  const promise = store.unload()

  await expect(promise).rejects.toEqual(
    new Error('The session store is currently loading.')
  )
  expect(onSet).not.toHaveBeenCalled()
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('throws an error when loading a loaded store', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn()
  store.addListener('set', onSet)

  await store.load()
  const promise = store.load()

  await expect(promise).rejects.toEqual(
    new Error('The session store is already loaded.')
  )
  expect(onSet).not.toHaveBeenCalled()
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('throws an error when loading an unloading store', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn(() => store.get())
  store.addListener('set', onSet)

  await store.load()
  store.set({ testKey: 'Test Value B' })
  void store.unload()
  const promise = store.load()

  await expect(promise).rejects.toEqual(
    new Error('The session store is currently unloading.')
  )
  expect(onSet).toBeCalledTimes(1)
  expect(onSet).toHaveReturnedWith({ testKey: 'Test Value B' })
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('throws an error when getting from an unloading store', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn(() => store.get())
  store.addListener('set', onSet)

  await store.load()
  store.set({ testKey: 'Test Value B' })
  void store.unload()
  expect(() => {
    store.get()
  }).toThrowError('The session store is currently unloading.')

  expect(onSet).toBeCalledTimes(1)
  expect(onSet).toHaveReturnedWith({ testKey: 'Test Value B' })
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('throws an error when setting a value in an unloading store', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn(() => store.get())
  store.addListener('set', onSet)

  await store.load()
  store.set({ testKey: 'Test Value B' })
  void store.unload()
  expect(() => {
    store.set({ testKey: 'Test Value C' })
  }).toThrowError('The session store is currently unloading.')

  expect(onSet).toBeCalledTimes(1)
  expect(onSet).toHaveReturnedWith({ testKey: 'Test Value B' })
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('throws an error when unloading an unloading store', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    randomUUID().toLowerCase(),
    { report: errorReporterReport }
  )
  const onSet = jest.fn(() => store.get())
  store.addListener('set', onSet)

  await store.load()
  store.set({ testKey: 'Test Value B' })
  void store.unload()
  const promise = store.unload()

  await expect(promise).rejects.toEqual(
    new Error('The session store is already unloading.')
  )
  expect(onSet).toBeCalledTimes(1)
  expect(onSet).toHaveReturnedWith({ testKey: 'Test Value B' })
  expect(errorReporterReport).not.toHaveBeenCalled()
})

test('allows a corrupted store to be loaded and read from', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    'Test Error-Throwing Key',
    { report: errorReporterReport }
  )
  const onSet = jest.fn()
  store.addListener('set', onSet)

  await store.load()
  const output = store.get()

  expect(output).toEqual({ testKey: 'Test Value A' })
  expect(onSet).not.toHaveBeenCalled()
  expect(errorReporterReport).toHaveBeenCalledWith(new Error('Test Error'))
  expect(errorReporterReport).toHaveBeenCalledTimes(1)
})

test('allows a corrupted store to be loaded, written to and read from', async () => {
  const errorReporterReport = jest.fn()
  const store = new SessionStore<TestSession>(
    { testKey: 'Test Value A' },
    'Test Error-Throwing Key',
    { report: errorReporterReport }
  )
  const onSet = jest.fn(() => store.get())
  store.addListener('set', onSet)

  await store.load()
  store.set({ testKey: 'Test Value B' })
  const output = store.get()

  expect(output).toEqual({ testKey: 'Test Value B' })
  expect(onSet).toBeCalledTimes(1)
  expect(onSet).toHaveReturnedWith({ testKey: 'Test Value B' })
  expect(errorReporterReport).toHaveBeenCalledWith(new Error('Test Error'))
  expect(errorReporterReport).toHaveBeenCalledTimes(1)
})
