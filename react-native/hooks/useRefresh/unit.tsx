import * as React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import * as TestRenderer from 'react-test-renderer'
import { useRefresh } from '../../..'

test('does not refresh the component before the returned function is invoked', () => {
  const Component: React.FunctionComponent = () => {
    const invocations = React.useRef(0)
    invocations.current++

    const refresh = useRefresh()

    return (
      <TouchableOpacity onPress={refresh}>
        <Text>{`${invocations.current} Invocation(s)`}</Text>
      </TouchableOpacity>
    )
  }

  const renderer = TestRenderer.create(<Component />)

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: expect.objectContaining({
          props: expect.objectContaining({
            children: '1 Invocation(s)'
          })
        })
      })
    })
  )

  renderer.unmount()
})

test('refreshes the component the first time that the returned function is invoked', async () => {
  const Component: React.FunctionComponent = () => {
    const invocations = React.useRef(0)
    invocations.current++

    const refresh = useRefresh()

    return (
      <TouchableOpacity onPress={refresh}>
        <Text>{`${invocations.current} Invocation(s)`}</Text>
      </TouchableOpacity>
    )
  }

  const renderer = TestRenderer.create(<Component />)

  void TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: expect.objectContaining({
          props: expect.objectContaining({
            children: '2 Invocation(s)'
          })
        })
      })
    })
  )

  renderer.unmount()
})

test('refreshes the component the second time that the returned function is invoked', async () => {
  const Component: React.FunctionComponent = () => {
    const invocations = React.useRef(0)
    invocations.current++

    const refresh = useRefresh()

    return (
      <TouchableOpacity onPress={refresh}>
        <Text>{`${invocations.current} Invocation(s)`}</Text>
      </TouchableOpacity>
    )
  }

  const renderer = TestRenderer.create(<Component />)

  void TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  void TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: expect.objectContaining({
          props: expect.objectContaining({
            children: '3 Invocation(s)'
          })
        })
      })
    })
  )

  renderer.unmount()
})
