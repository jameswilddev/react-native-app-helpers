import * as React from 'react'
import { type LayoutChangeEvent, View } from 'react-native'
import * as TestRenderer from 'react-test-renderer'
import { useMeasure } from '../../..'

test('does nothing initially', () => {
  const onMeasure = jest.fn()
  const Component: React.FunctionComponent = () => {
    useMeasure(onMeasure)
    return <View />
  }

  const renderer = TestRenderer.create(<Component />)

  expect(onMeasure).not.toHaveBeenCalled()

  renderer.unmount()
})

test('does nothing when the ref is given', () => {
  const onMeasure = jest.fn()
  let ref: React.RefCallback<View>
  const measure = jest.fn()
  const Component: React.FunctionComponent = () => {
    const [_ref] = useMeasure(onMeasure)
    ref = _ref
    return <View />
  }
  const renderer = TestRenderer.create(<Component />)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ref!({ measure } as unknown as View)

  expect(onMeasure).not.toHaveBeenCalled()
  expect(measure).not.toHaveBeenCalled()

  renderer.unmount()
})

test('measures the element once when the ref is given and the layout is computed', () => {
  const onMeasure = jest.fn()
  let ref: React.RefCallback<View>
  const measure = jest.fn()
  let onLayout: (event: LayoutChangeEvent) => void
  const Component: React.FunctionComponent = () => {
    const [_ref, _onLayout] = useMeasure(onMeasure)
    ref = _ref
    onLayout = _onLayout
    return <View />
  }
  const renderer = TestRenderer.create(<Component />)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ref!({ measure } as unknown as View)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  onLayout!({
    nativeEvent: { layout: { x: 300, y: 400, width: 630, height: 15 } }
  } as unknown as LayoutChangeEvent)

  expect(onMeasure).not.toHaveBeenCalled()
  expect(measure).toHaveBeenCalledTimes(1)

  renderer.unmount()
})

test('executes the callback once when the ref is given, the layout is computed and measurement completes', () => {
  const onMeasure = jest.fn()
  let ref: React.RefCallback<View>
  const measure = jest.fn()
  let onLayout: (event: LayoutChangeEvent) => void
  const Component: React.FunctionComponent = () => {
    const [_ref, _onLayout] = useMeasure(onMeasure)
    ref = _ref
    onLayout = _onLayout
    return <View />
  }
  const renderer = TestRenderer.create(<Component />)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ref!({ measure } as unknown as View)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  onLayout!({} as unknown as LayoutChangeEvent)

  measure.mock.calls[0][0](20, 40, 640, 320, 18, 72)

  expect(onMeasure).toHaveBeenCalledTimes(1)
  expect(onMeasure).toHaveBeenCalledWith(20, 40, 640, 320, 18, 72)
  expect(measure).toHaveBeenCalledTimes(1)

  renderer.unmount()
})

test('does nothing when the layout is computed', () => {
  const onMeasure = jest.fn()
  const measure = jest.fn()
  let onLayout: (event: LayoutChangeEvent) => void
  const Component: React.FunctionComponent = () => {
    const [, _onLayout] = useMeasure(onMeasure)
    onLayout = _onLayout
    return <View />
  }
  const renderer = TestRenderer.create(<Component />)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  onLayout!({
    nativeEvent: { layout: { x: 300, y: 400, width: 630, height: 15 } }
  } as unknown as LayoutChangeEvent)

  expect(onMeasure).not.toHaveBeenCalled()
  expect(measure).not.toHaveBeenCalled()

  renderer.unmount()
})

test('measures the element once when the layout is computed and the ref is given', () => {
  const onMeasure = jest.fn()
  let ref: React.RefCallback<View>
  const measure = jest.fn()
  let onLayout: (event: LayoutChangeEvent) => void
  const Component: React.FunctionComponent = () => {
    const [_ref, _onLayout] = useMeasure(onMeasure)
    ref = _ref
    onLayout = _onLayout
    return <View />
  }
  const renderer = TestRenderer.create(<Component />)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  onLayout!({
    nativeEvent: { layout: { x: 300, y: 400, width: 630, height: 15 } }
  } as unknown as LayoutChangeEvent)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ref!({ measure } as unknown as View)

  expect(onMeasure).not.toHaveBeenCalled()
  expect(measure).toHaveBeenCalledTimes(1)

  renderer.unmount()
})

test('executes the callback once when the layout is computed, the ref is given and measurement completes', () => {
  const onMeasure = jest.fn()
  let ref: React.RefCallback<View>
  const measure = jest.fn()
  let onLayout: (event: LayoutChangeEvent) => void
  const Component: React.FunctionComponent = () => {
    const [_ref, _onLayout] = useMeasure(onMeasure)
    ref = _ref
    onLayout = _onLayout
    return <View />
  }
  const renderer = TestRenderer.create(<Component />)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  onLayout!({} as unknown as LayoutChangeEvent)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ref!({ measure } as unknown as View)

  measure.mock.calls[0][0](20, 40, 640, 320, 18, 72)

  expect(onMeasure).toHaveBeenCalledTimes(1)
  expect(onMeasure).toHaveBeenCalledWith(20, 40, 640, 320, 18, 72)
  expect(measure).toHaveBeenCalledTimes(1)

  renderer.unmount()
})

for (const discardedUpdateScenario of [
  {
    name: 'when x is undefined',
    x: undefined,
    y: 40,
    width: 640,
    height: 320,
    pageX: 18,
    pageY: 72
  },
  {
    name: 'when y is undefined',
    x: 20,
    y: undefined,
    width: 640,
    height: 320,
    pageX: 18,
    pageY: 72
  },
  {
    name: 'when width is undefined',
    x: 20,
    y: 40,
    width: undefined,
    height: 320,
    pageX: 18,
    pageY: 72
  },
  {
    name: 'when height is undefined',
    x: 20,
    y: 40,
    width: 640,
    height: undefined,
    pageX: 18,
    pageY: 72
  },
  {
    name: 'when pageX is undefined',
    x: 20,
    y: 40,
    width: 640,
    height: 320,
    pageX: undefined,
    pageY: 72
  },
  {
    name: 'when pageY is undefined',
    x: 20,
    y: 40,
    width: 640,
    height: 320,
    pageX: 18,
    pageY: undefined
  }
]) {
  describe(discardedUpdateScenario.name, () => {
    test('executes the callback once when the ref is given, the layout is computed and measurement completes', () => {
      const onMeasure = jest.fn()
      let ref: React.RefCallback<View>
      const measure = jest.fn()
      let onLayout: (event: LayoutChangeEvent) => void
      const Component: React.FunctionComponent = () => {
        const [_ref, _onLayout] = useMeasure(onMeasure)
        ref = _ref
        onLayout = _onLayout
        return <View />
      }
      const renderer = TestRenderer.create(<Component />)

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref!({ measure } as unknown as View)

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      onLayout!({} as unknown as LayoutChangeEvent)

      measure.mock.calls[0][0](discardedUpdateScenario.x, discardedUpdateScenario.y, discardedUpdateScenario.width, discardedUpdateScenario.height, discardedUpdateScenario.pageX, discardedUpdateScenario.pageY)

      expect(onMeasure).not.toHaveBeenCalled()
      expect(measure).toHaveBeenCalledTimes(1)

      renderer.unmount()
    })

    test('executes the callback once when the layout is computed, the ref is given and measurement completes', () => {
      const onMeasure = jest.fn()
      let ref: React.RefCallback<View>
      const measure = jest.fn()
      let onLayout: (event: LayoutChangeEvent) => void
      const Component: React.FunctionComponent = () => {
        const [_ref, _onLayout] = useMeasure(onMeasure)
        ref = _ref
        onLayout = _onLayout
        return <View />
      }
      const renderer = TestRenderer.create(<Component />)

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      onLayout!({} as unknown as LayoutChangeEvent)

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ref!({ measure } as unknown as View)

      measure.mock.calls[0][0](discardedUpdateScenario.x, discardedUpdateScenario.y, discardedUpdateScenario.width, discardedUpdateScenario.height, discardedUpdateScenario.pageX, discardedUpdateScenario.pageY)

      expect(onMeasure).not.toHaveBeenCalled()
      expect(measure).toHaveBeenCalledTimes(1)

      renderer.unmount()
    })
  })
}
