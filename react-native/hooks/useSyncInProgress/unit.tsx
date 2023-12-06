import { EventEmitter } from 'events'
import * as React from 'react'
import { Text } from 'react-native'
import * as TestRenderer from 'react-test-renderer'
import {
  type Json,
  type SyncableSchema,
  type SyncInterface,
  type SyncState,
  useSyncInProgress
} from '../../..'

test('returns true when a sync is in progress', async () => {
  const eventEmitter = new EventEmitter()
  const state: SyncState<
  SyncableSchema,
  Record<string, unknown>,
  Record<string, Json>
  > = { type: 'checkingForChangesToPull' }
  const sync: SyncInterface<
  SyncableSchema,
  Record<string, unknown>,
  Record<string, Json>
  > = {
    fileCleanUpBlockers: 47,
    addListener: (eventType, listener) =>
      eventEmitter.addListener(eventType, listener),
    removeListener: (eventType, listener) =>
      eventEmitter.removeListener(eventType, listener),
    getState: () => state,
    run: jest.fn()
  }

  const Component: React.FunctionComponent = () => {
    const inProgress = useSyncInProgress(sync)

    return <Text>{inProgress ? 'In Progress' : 'Idle'}</Text>
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 10)
  })

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      props: {
        children: 'In Progress'
      }
    })
  })

  renderer.unmount()

  expect(sync.run).not.toHaveBeenCalled()
})

test('returns false when a sync is not in progress', async () => {
  const eventEmitter = new EventEmitter()
  const state: SyncState<
  SyncableSchema,
  Record<string, unknown>,
  Record<string, Json>
  > = { type: 'notRunning' }
  const sync: SyncInterface<
  SyncableSchema,
  Record<string, unknown>,
  Record<string, Json>
  > = {
    fileCleanUpBlockers: 47,
    addListener: (eventType, listener) =>
      eventEmitter.addListener(eventType, listener),
    removeListener: (eventType, listener) =>
      eventEmitter.removeListener(eventType, listener),
    getState: () => state,
    run: jest.fn()
  }

  const Component: React.FunctionComponent = () => {
    const inProgress = useSyncInProgress(sync)

    return <Text>{inProgress ? 'In Progress' : 'Idle'}</Text>
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 10)
  })

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      props: {
        children: 'Idle'
      }
    })
  })

  renderer.unmount()

  expect(sync.run).not.toHaveBeenCalled()
})

test('re-renders returning true when a sync starts', async () => {
  const eventEmitter = new EventEmitter()
  let state: SyncState<
  SyncableSchema,
  Record<string, unknown>,
  Record<string, Json>
  > = { type: 'notRunning' }
  const sync: SyncInterface<
  SyncableSchema,
  Record<string, unknown>,
  Record<string, Json>
  > = {
    fileCleanUpBlockers: 47,
    addListener: (eventType, listener) =>
      eventEmitter.addListener(eventType, listener),
    removeListener: (eventType, listener) =>
      eventEmitter.removeListener(eventType, listener),
    getState: () => state,
    run: jest.fn()
  }

  const Component: React.FunctionComponent = () => {
    const inProgress = useSyncInProgress(sync)

    return <Text>{inProgress ? 'In Progress' : 'Idle'}</Text>
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 10)
  })

  state = { type: 'checkingForChangesToPull' }
  eventEmitter.emit('stateChange')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 10)
  })

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      props: {
        children: 'In Progress'
      }
    })
  })

  renderer.unmount()

  expect(sync.run).not.toHaveBeenCalled()
})

test('re-renders returning false when a sync ends', async () => {
  const eventEmitter = new EventEmitter()
  let state: SyncState<
  SyncableSchema,
  Record<string, unknown>,
  Record<string, Json>
  > = { type: 'checkingForChangesToPull' }
  const sync: SyncInterface<
  SyncableSchema,
  Record<string, unknown>,
  Record<string, Json>
  > = {
    fileCleanUpBlockers: 47,
    addListener: (eventType, listener) =>
      eventEmitter.addListener(eventType, listener),
    removeListener: (eventType, listener) =>
      eventEmitter.removeListener(eventType, listener),
    getState: () => state,
    run: jest.fn()
  }

  const Component: React.FunctionComponent = () => {
    const inProgress = useSyncInProgress(sync)

    return <Text>{inProgress ? 'In Progress' : 'Idle'}</Text>
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 10)
  })

  state = { type: 'notRunning' }
  eventEmitter.emit('stateChange')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 10)
  })

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      props: {
        children: 'Idle'
      }
    })
  })

  renderer.unmount()

  expect(sync.run).not.toHaveBeenCalled()
})

test('continues to return false when sync does not start', async () => {
  const eventEmitter = new EventEmitter()
  let state: SyncState<
  SyncableSchema,
  Record<string, unknown>,
  Record<string, Json>
  > = { type: 'notRunning' }
  const sync: SyncInterface<
  SyncableSchema,
  Record<string, unknown>,
  Record<string, Json>
  > = {
    fileCleanUpBlockers: 47,
    addListener: (eventType, listener) =>
      eventEmitter.addListener(eventType, listener),
    removeListener: (eventType, listener) =>
      eventEmitter.removeListener(eventType, listener),
    getState: () => state,
    run: jest.fn()
  }

  const Component: React.FunctionComponent = () => {
    const inProgress = useSyncInProgress(sync)

    return <Text>{inProgress ? 'In Progress' : 'Idle'}</Text>
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 10)
  })

  state = { type: 'notRunning' }
  eventEmitter.emit('stateChange')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 10)
  })

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      props: {
        children: 'Idle'
      }
    })
  })

  renderer.unmount()

  expect(sync.run).not.toHaveBeenCalled()
})

test('continues to return true when sync does not end', async () => {
  const eventEmitter = new EventEmitter()
  let state: SyncState<
  SyncableSchema,
  Record<string, unknown>,
  Record<string, Json>
  > = { type: 'checkingForChangesToPull' }
  const sync: SyncInterface<
  SyncableSchema,
  Record<string, unknown>,
  Record<string, Json>
  > = {
    fileCleanUpBlockers: 47,
    addListener: (eventType, listener) =>
      eventEmitter.addListener(eventType, listener),
    removeListener: (eventType, listener) =>
      eventEmitter.removeListener(eventType, listener),
    getState: () => state,
    run: jest.fn()
  }

  const Component: React.FunctionComponent = () => {
    const inProgress = useSyncInProgress(sync)

    return <Text>{inProgress ? 'In Progress' : 'Idle'}</Text>
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 10)
  })

  state = { type: 'checkingForChangesToPush' }
  eventEmitter.emit('stateChange')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 10)
  })

  expect(renderer.toTree()).toMatchObject({
    rendered: expect.objectContaining({
      props: {
        children: 'In Progress'
      }
    })
  })

  renderer.unmount()

  expect(sync.run).not.toHaveBeenCalled()
})
