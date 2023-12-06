import * as React from 'react'
import * as TestRenderer from 'react-test-renderer'
import { useBackButton } from '../../..'

test('does nothing before the back button is pressed', async () => {
  const callback = jest.fn()
  const Component: React.FunctionComponent = () => {
    useBackButton(callback)

    return null
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(callback).not.toHaveBeenCalled()
  expect(
    jest.requireMock('react-native/Libraries/Utilities/BackHandler').exitApp
  ).not.toHaveBeenCalled()
})

test('executes the callback once when the back button is pressed once returning undefined', async () => {
  const callback = jest.fn().mockReturnValue(undefined)
  const Component: React.FunctionComponent = () => {
    useBackButton(callback)

    return null
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  jest
    .requireMock('react-native/Libraries/Utilities/BackHandler')
    .mockPressBack()

  await new Promise((resolve) => setTimeout(resolve, 10))

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(callback).toHaveBeenCalledTimes(1)
  expect(
    jest.requireMock('react-native/Libraries/Utilities/BackHandler').exitApp
  ).toHaveBeenCalledTimes(1)
})

test('executes the callback once when the back button is pressed once returning null', async () => {
  const callback = jest.fn().mockReturnValue(null)
  const Component: React.FunctionComponent = () => {
    useBackButton(callback)

    return null
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  jest
    .requireMock('react-native/Libraries/Utilities/BackHandler')
    .mockPressBack()

  await new Promise((resolve) => setTimeout(resolve, 10))

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(callback).toHaveBeenCalledTimes(1)
  expect(
    jest.requireMock('react-native/Libraries/Utilities/BackHandler').exitApp
  ).toHaveBeenCalledTimes(1)
})

test('executes the callback once when the back button is pressed once returning false', async () => {
  const callback = jest.fn().mockReturnValue(false)
  const Component: React.FunctionComponent = () => {
    useBackButton(callback)

    return null
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  jest
    .requireMock('react-native/Libraries/Utilities/BackHandler')
    .mockPressBack()

  await new Promise((resolve) => setTimeout(resolve, 10))

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(callback).toHaveBeenCalledTimes(1)
  expect(
    jest.requireMock('react-native/Libraries/Utilities/BackHandler').exitApp
  ).toHaveBeenCalledTimes(1)
})

test('executes the callback once when the back button is pressed once returning true', async () => {
  const callback = jest.fn().mockReturnValue(true)
  const Component: React.FunctionComponent = () => {
    useBackButton(callback)

    return null
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  jest
    .requireMock('react-native/Libraries/Utilities/BackHandler')
    .mockPressBack()

  await new Promise((resolve) => setTimeout(resolve, 10))

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(callback).toHaveBeenCalledTimes(1)
  expect(
    jest.requireMock('react-native/Libraries/Utilities/BackHandler').exitApp
  ).not.toHaveBeenCalled()
})

test('executes the callback once when the back button is pressed twice', async () => {
  const callback = jest.fn().mockReturnValue(true)
  const Component: React.FunctionComponent = () => {
    useBackButton(callback)

    return null
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  jest
    .requireMock('react-native/Libraries/Utilities/BackHandler')
    .mockPressBack()

  jest
    .requireMock('react-native/Libraries/Utilities/BackHandler')
    .mockPressBack()

  await new Promise((resolve) => setTimeout(resolve, 10))

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(callback).toHaveBeenCalledTimes(2)
  expect(
    jest.requireMock('react-native/Libraries/Utilities/BackHandler').exitApp
  ).not.toHaveBeenCalled()
})

test('does nothing when the callback changes without pressing the back button', async () => {
  const firstCallback = jest.fn()
  const secondCallback = jest.fn()
  const Component: React.FunctionComponent<{
    callback: () => undefined
  }> = ({ callback }) => {
    useBackButton(callback)

    return null
  }

  const renderer = TestRenderer.create(<Component callback={firstCallback} />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  renderer.update(<Component callback={secondCallback} />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(firstCallback).not.toHaveBeenCalled()
  expect(secondCallback).not.toHaveBeenCalled()
  expect(
    jest.requireMock('react-native/Libraries/Utilities/BackHandler').exitApp
  ).not.toHaveBeenCalled()
})

test('executes the callback once when the back button is pressed once after the callback changes', async () => {
  const firstCallback = jest.fn()
  const secondCallback = jest.fn().mockReturnValue(true)
  const Component: React.FunctionComponent<{
    callback: () => undefined
  }> = ({ callback }) => {
    useBackButton(callback)

    return null
  }

  const renderer = TestRenderer.create(<Component callback={firstCallback} />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  renderer.update(<Component callback={secondCallback} />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  jest
    .requireMock('react-native/Libraries/Utilities/BackHandler')
    .mockPressBack()

  await new Promise((resolve) => setTimeout(resolve, 10))

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(firstCallback).not.toHaveBeenCalled()
  expect(secondCallback).toBeCalledTimes(1)
  expect(
    jest.requireMock('react-native/Libraries/Utilities/BackHandler').exitApp
  ).not.toHaveBeenCalled()
})

test('stops listening for back button presses when the hook unmounts', async () => {
  const callback = jest.fn()
  const Component: React.FunctionComponent = () => {
    useBackButton(callback)

    return null
  }

  const renderer = TestRenderer.create(<Component />)

  await new Promise((resolve) => setTimeout(resolve, 10))

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 10))

  jest
    .requireMock('react-native/Libraries/Utilities/BackHandler')
    .mockPressBack()

  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(callback).not.toHaveBeenCalled()
  expect(
    jest.requireMock('react-native/Libraries/Utilities/BackHandler').exitApp
  ).toBeCalledTimes(1)
})
