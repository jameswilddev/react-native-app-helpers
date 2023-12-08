import * as React from 'react'
import * as TestRenderer from 'react-test-renderer'
import {
  useStartSyncWhenTop,
  type SyncControllerInterface
} from '../../..'

test('starts sync when mounting on top', async () => {
  const syncController: SyncControllerInterface = {
    resume: jest.fn(),
    requestCancel: jest.fn(),
    run: jest.fn().mockReturnValue(new Promise(() => {})),
    pause: jest.fn()
  }

  const Component: React.FunctionComponent = () => {
    useStartSyncWhenTop(syncController, true)

    return null
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(syncController.resume).toHaveBeenCalledTimes(1)
  expect(syncController.requestCancel).not.toHaveBeenCalled()
  expect(syncController.run).toHaveBeenCalledTimes(1)
  expect(syncController.pause).not.toHaveBeenCalled()
  expect((syncController.resume as jest.Mock).mock.invocationCallOrder[0]).toBeLessThan((syncController.run as jest.Mock).mock.invocationCallOrder[0] as number)

  renderer.unmount()
})

test('does nothing when run succeeds without changes', async () => {
  const syncController: SyncControllerInterface = {
    resume: jest.fn(),
    requestCancel: jest.fn(),
    run: jest.fn().mockResolvedValue('noChangesMade'),
    pause: jest.fn()
  }

  const Component: React.FunctionComponent = () => {
    useStartSyncWhenTop(syncController, true)

    return null
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(syncController.resume).toHaveBeenCalledTimes(1)
  expect(syncController.requestCancel).not.toHaveBeenCalled()
  expect(syncController.run).toHaveBeenCalledTimes(1)
  expect(syncController.pause).not.toHaveBeenCalled()
  expect((syncController.resume as jest.Mock).mock.invocationCallOrder[0]).toBeLessThan((syncController.run as jest.Mock).mock.invocationCallOrder[0] as number)

  renderer.unmount()
})

test('does nothing when run succeeds with changes', async () => {
  const syncController: SyncControllerInterface = {
    resume: jest.fn(),
    requestCancel: jest.fn(),
    run: jest.fn().mockResolvedValue('atLeastOneChangeMade'),
    pause: jest.fn()
  }

  const Component: React.FunctionComponent = () => {
    useStartSyncWhenTop(syncController, true)

    return null
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(syncController.resume).toHaveBeenCalledTimes(1)
  expect(syncController.requestCancel).not.toHaveBeenCalled()
  expect(syncController.run).toHaveBeenCalledTimes(1)
  expect(syncController.pause).not.toHaveBeenCalled()
  expect((syncController.resume as jest.Mock).mock.invocationCallOrder[0]).toBeLessThan((syncController.run as jest.Mock).mock.invocationCallOrder[0] as number)

  renderer.unmount()
})

test('does nothing when run fails with changes', async () => {
  const syncController: SyncControllerInterface = {
    resume: jest.fn(),
    requestCancel: jest.fn(),
    run: jest.fn().mockResolvedValue('failed'),
    pause: jest.fn()
  }

  const Component: React.FunctionComponent = () => {
    useStartSyncWhenTop(syncController, true)

    return null
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(syncController.resume).toHaveBeenCalledTimes(1)
  expect(syncController.requestCancel).not.toHaveBeenCalled()
  expect(syncController.run).toHaveBeenCalledTimes(1)
  expect(syncController.pause).not.toHaveBeenCalled()
  expect((syncController.resume as jest.Mock).mock.invocationCallOrder[0]).toBeLessThan((syncController.run as jest.Mock).mock.invocationCallOrder[0] as number)

  renderer.unmount()
})

test('does nothing when mounting below top', async () => {
  const syncController: SyncControllerInterface = {
    resume: jest.fn(),
    requestCancel: jest.fn(),
    run: jest.fn(),
    pause: jest.fn()
  }

  const Component: React.FunctionComponent = () => {
    useStartSyncWhenTop(syncController, false)

    return null
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(syncController.resume).not.toHaveBeenCalled()
  expect(syncController.requestCancel).not.toHaveBeenCalled()
  expect(syncController.run).not.toHaveBeenCalled()
  expect(syncController.pause).not.toHaveBeenCalled()

  renderer.unmount()
})

test('does nothing when re-rendering on top', async () => {
  const syncController: SyncControllerInterface = {
    resume: jest.fn(),
    requestCancel: jest.fn(),
    run: jest.fn().mockResolvedValue('noChangesMade'),
    pause: jest.fn()
  }

  const Component: React.FunctionComponent = () => {
    useStartSyncWhenTop(syncController, true)

    return null
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10));

  (syncController.run as jest.Mock).mockClear();
  (syncController.resume as jest.Mock).mockClear()

  renderer.update(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(syncController.resume).not.toHaveBeenCalled()
  expect(syncController.requestCancel).not.toHaveBeenCalled()
  expect(syncController.run).not.toHaveBeenCalled()
  expect(syncController.pause).not.toHaveBeenCalled()

  renderer.unmount()
})

test('does nothing when re-rendering below top', async () => {
  const syncController: SyncControllerInterface = {
    resume: jest.fn(),
    requestCancel: jest.fn(),
    run: jest.fn(),
    pause: jest.fn()
  }

  const Component: React.FunctionComponent = () => {
    useStartSyncWhenTop(syncController, false)

    return null
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  renderer.update(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(syncController.resume).not.toHaveBeenCalled()
  expect(syncController.requestCancel).not.toHaveBeenCalled()
  expect(syncController.run).not.toHaveBeenCalled()
  expect(syncController.pause).not.toHaveBeenCalled()

  renderer.unmount()
})

test('does nothing when re-rendering from top to below', async () => {
  const syncController: SyncControllerInterface = {
    resume: jest.fn(),
    requestCancel: jest.fn(),
    run: jest.fn().mockResolvedValue('noChangesMade'),
    pause: jest.fn()
  }

  const Component: React.FunctionComponent<{ readonly top: boolean }> = ({ top }) => {
    useStartSyncWhenTop(syncController, top)

    return null
  }

  const renderer = TestRenderer.create(<Component top={true} />)

  await new Promise((resolve) => setTimeout(resolve, 10));

  (syncController.run as jest.Mock).mockClear();
  (syncController.resume as jest.Mock).mockClear()

  renderer.update(<Component top={false} />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(syncController.resume).not.toHaveBeenCalled()
  expect(syncController.requestCancel).not.toHaveBeenCalled()
  expect(syncController.run).not.toHaveBeenCalled()
  expect(syncController.pause).not.toHaveBeenCalled()

  renderer.unmount()
})

test('starts sync when re-rendering from below to top', async () => {
  const syncController: SyncControllerInterface = {
    resume: jest.fn(),
    requestCancel: jest.fn(),
    run: jest.fn().mockResolvedValue('noChangesMade'),
    pause: jest.fn()
  }

  const Component: React.FunctionComponent<{ readonly top: boolean }> = ({ top }) => {
    useStartSyncWhenTop(syncController, top)

    return null
  }

  const renderer = TestRenderer.create(<Component top={false} />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  renderer.update(<Component top={true} />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(syncController.resume).toHaveBeenCalledTimes(1)
  expect(syncController.requestCancel).not.toHaveBeenCalled()
  expect(syncController.run).toHaveBeenCalledTimes(1)
  expect(syncController.pause).not.toHaveBeenCalled()
  expect((syncController.resume as jest.Mock).mock.invocationCallOrder[0]).toBeLessThan((syncController.run as jest.Mock).mock.invocationCallOrder[0] as number)

  renderer.unmount()
})

test('does nothing when unmounting from top', async () => {
  const syncController: SyncControllerInterface = {
    resume: jest.fn(),
    requestCancel: jest.fn(),
    run: jest.fn().mockResolvedValue('noChangesMade'),
    pause: jest.fn()
  }

  const Component: React.FunctionComponent = () => {
    useStartSyncWhenTop(syncController, true)

    return null
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10));

  (syncController.run as jest.Mock).mockClear();
  (syncController.resume as jest.Mock).mockClear()

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(syncController.resume).not.toHaveBeenCalled()
  expect(syncController.requestCancel).not.toHaveBeenCalled()
  expect(syncController.run).not.toHaveBeenCalled()
  expect(syncController.pause).not.toHaveBeenCalled()
})

test('does nothing when unmounting from below top', async () => {
  const syncController: SyncControllerInterface = {
    resume: jest.fn(),
    requestCancel: jest.fn(),
    run: jest.fn(),
    pause: jest.fn()
  }

  const Component: React.FunctionComponent = () => {
    useStartSyncWhenTop(syncController, false)

    return null
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(syncController.resume).not.toHaveBeenCalled()
  expect(syncController.requestCancel).not.toHaveBeenCalled()
  expect(syncController.run).not.toHaveBeenCalled()
  expect(syncController.pause).not.toHaveBeenCalled()
})
