import * as React from 'react'
import { type MeasureOnSuccessCallback, Text } from 'react-native'
import * as TestRenderer from 'react-test-renderer'
import { Hitbox } from '../../..'

test('hitboxes are enabled by default', () => {
  expect(Hitbox.enabled).toBeTruthy()
})

test('renders as expected when enabled', () => {
  const onPress = jest.fn()
  const onMeasure = jest.fn()

  const renderer = TestRenderer.create(
    <Hitbox
      disabled={false}
      style={{ backgroundColor: 'red' }}
      onPress={onPress}
      onMeasure={onMeasure}
    >
      <Text>Test Children</Text>
    </Hitbox>
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      props: expect.objectContaining({
        disabled: false,
        style: { backgroundColor: 'red' },
        hostRef: expect.any(Function),
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        children: expect.objectContaining({
          type: Text,
          props: {
            children: 'Test Children'
          }
        })
      })
    })
  )
  expect(
    (
      (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
        .type as unknown as () => void
    ).name
  ).toEqual('TouchableOpacity')

  expect(onPress).not.toHaveBeenCalled()
  expect(onMeasure).not.toHaveBeenCalled()

  renderer.unmount()
})

test('renders as expected when enabled', () => {
  const onPress = jest.fn()
  const onMeasure = jest.fn()

  const renderer = TestRenderer.create(
    <Hitbox
      style={{ backgroundColor: 'red' }}
      onPress={onPress}
      onMeasure={onMeasure}
      disabled={false}
    >
      <Text>Test Children</Text>
    </Hitbox>
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      props: expect.objectContaining({
        disabled: false,
        style: { backgroundColor: 'red' },
        hostRef: expect.any(Function),
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        children: expect.objectContaining({
          type: Text,
          props: {
            children: 'Test Children'
          }
        })
      })
    })
  )
  expect(
    (
      (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
        .type as unknown as () => void
    ).name
  ).toEqual('TouchableOpacity')

  expect(onPress).not.toHaveBeenCalled()
  expect(onMeasure).not.toHaveBeenCalled()

  renderer.unmount()
})

test('renders as expected when disabled', () => {
  const onPress = jest.fn()
  const onMeasure = jest.fn()

  const renderer = TestRenderer.create(
    <Hitbox
      disabled
      style={{ backgroundColor: 'red' }}
      onPress={onPress}
      onMeasure={onMeasure}
    >
      <Text>Test Children</Text>
    </Hitbox>
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      props: expect.objectContaining({
        disabled: true,
        style: { backgroundColor: 'red' },
        hostRef: expect.any(Function),
        onLayout: expect.any(Function),
        onPress: expect.any(Function),
        children: expect.objectContaining({
          type: Text,
          props: {
            children: 'Test Children'
          }
        })
      })
    })
  )
  expect(
    (
      (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
        .type as unknown as () => void
    ).name
  ).toEqual('TouchableOpacity')

  expect(onPress).not.toHaveBeenCalled()
  expect(onMeasure).not.toHaveBeenCalled()

  renderer.unmount()
})

test('calls through to useMeasure when a callback is given', () => {
  const onPress = jest.fn()
  const onMeasure = jest.fn()

  const renderer = TestRenderer.create(
    <Hitbox
      disabled={false}
      style={{ backgroundColor: 'red' }}
      onPress={onPress}
      onMeasure={onMeasure}
    >
      <Text>Test Children</Text>
    </Hitbox>
  );

  (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props['hostRef']({
    measure (measureOnSuccessCallback: MeasureOnSuccessCallback) {
      measureOnSuccessCallback(123, 403, 29, 583, 37, 96)
    }
  });

  (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props['onLayout']()

  expect(onPress).not.toHaveBeenCalled()
  expect(onMeasure).toBeCalledTimes(1)
  expect(onMeasure).toHaveBeenCalledWith(123, 403, 29, 583, 37, 96)

  renderer.unmount()
})

test('does not call through to useMeasure when no callback is given', () => {
  const onPress = jest.fn()

  const renderer = TestRenderer.create(
    <Hitbox
      disabled={false}
      style={{ backgroundColor: 'red' }}
      onPress={onPress}
    >
      <Text>Test Children</Text>
    </Hitbox>
  )

  expect(onPress).not.toHaveBeenCalled()

  renderer.unmount()
})

test('does not call through to useMeasure when an undefined callback is given', () => {
  const onPress = jest.fn()

  const renderer = TestRenderer.create(
    <Hitbox
      disabled={false}
      style={{ backgroundColor: 'red' }}
      onPress={onPress}
      onMeasure={undefined}
    >
      <Text>Test Children</Text>
    </Hitbox>
  )

  expect(onPress).not.toHaveBeenCalled()

  renderer.unmount()
})

test('executes the press callback once when hitboxes are enabled', () => {
  const onPress = jest.fn()
  const onMeasure = jest.fn()

  const renderer = TestRenderer.create(
    <Hitbox
      disabled={false}
      style={{ backgroundColor: 'red' }}
      onPress={onPress}
      onMeasure={onMeasure}
    >
      <Text>Test Children</Text>
    </Hitbox>
  )

  const hitboxesPreviouslyEnabled = Hitbox.enabled

  try {
    Hitbox.enabled = true;
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props['onPress']()
  } finally {
    Hitbox.enabled = hitboxesPreviouslyEnabled
  }

  expect(onPress).toBeCalledTimes(1)
  expect(onMeasure).not.toHaveBeenCalled()

  renderer.unmount()
})

test('does not execute the press callback when hitboxes are disabled', () => {
  const onPress = jest.fn()
  const onMeasure = jest.fn()

  const renderer = TestRenderer.create(
    <Hitbox
      disabled={false}
      style={{ backgroundColor: 'red' }}
      onPress={onPress}
      onMeasure={onMeasure}
    >
      <Text>Test Children</Text>
    </Hitbox>
  )

  const hitboxesPreviouslyEnabled = Hitbox.enabled

  try {
    Hitbox.enabled = false;
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props['onPress']()
  } finally {
    Hitbox.enabled = hitboxesPreviouslyEnabled
  }

  expect(onPress).not.toHaveBeenCalled()
  expect(onMeasure).not.toHaveBeenCalled()

  renderer.unmount()
})
