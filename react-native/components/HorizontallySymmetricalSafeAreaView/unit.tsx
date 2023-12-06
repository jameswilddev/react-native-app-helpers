import * as React from 'react'
import { type RegisteredStyle, Text, View, type ViewStyle } from 'react-native'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import { HorizontallySymmetricalSafeAreaView } from '../../..'
import * as TestRenderer from 'react-test-renderer'

test('selects left inset when largest', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        left
        right
        testID="Example"
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: {
        paddingTop: 16,
        paddingBottom: 60,
        paddingHorizontal: 53
      },
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('selects right inset when largest', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 24, right: 53 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        left
        right
        testID="Example"
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: {
        paddingTop: 16,
        paddingBottom: 60,
        paddingHorizontal: 53
      },
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('allows disabling of top inset through omission', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView bottom left right testID="Example">
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: {
        paddingBottom: 60,
        paddingHorizontal: 53
      },
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('allows disabling of bottom inset through omission', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView top left right testID="Example">
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: {
        paddingTop: 16,
        paddingHorizontal: 53
      },
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('allows disabling of left inset through omission', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView top bottom right testID="Example">
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: {
        paddingTop: 16,
        paddingBottom: 60,
        paddingRight: 53
      },
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('allows disabling of right inset through omission', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView top bottom left testID="Example">
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: {
        paddingTop: 16,
        paddingBottom: 60,
        paddingLeft: 53
      },
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('allows disabling of top inset through false', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView
        bottom
        left
        right
        top={false}
        testID="Example"
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: {
        paddingBottom: 60,
        paddingHorizontal: 53
      },
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('allows disabling of bottom inset through false', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        left
        right
        bottom={false}
        testID="Example"
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: {
        paddingTop: 16,
        paddingHorizontal: 53
      },
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('allows disabling of left inset through false', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        right
        left={false}
        testID="Example"
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: {
        paddingTop: 16,
        paddingBottom: 60,
        paddingRight: 53
      },
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('allows disabling of right inset through false', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        left
        right={false}
        testID="Example"
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: {
        paddingTop: 16,
        paddingBottom: 60,
        paddingLeft: 53
      },
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('adds to existing style when does not include paddings', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        left
        right
        testID="Example"
        style={{ backgroundColor: 'red' }}
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: [
        { backgroundColor: 'red' },
        {
          paddingTop: 16,
          paddingBottom: 60,
          paddingHorizontal: 53
        }
      ],
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('rejects non-numeric paddings', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        left
        right
        testID="Example"
        style={{ backgroundColor: 'red', padding: '12%' }}
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )
  expect(() => {
    TestRenderer.create(<Component />)
  }).toThrowError('Only numbers, null or undefined are currently supported for a HorizontallySymmetricalSafeAreaView\'s "padding" style.')
})

test('adds to existing style when includes number paddings', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        left
        right
        testID="Example"
        style={{ backgroundColor: 'red', padding: 12 }}
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: [
        { backgroundColor: 'red', padding: 12 },
        {
          paddingTop: 28,
          paddingBottom: 72,
          paddingHorizontal: 65
        }
      ],
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('rejects non-numeric string axis paddings', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        left
        right
        testID="Example"
        style={{ backgroundColor: 'red', paddingVertical: '12%' }}
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )
  expect(() => {
    TestRenderer.create(<Component />)
  }).toThrowError('Only numbers, null or undefined are currently supported for a HorizontallySymmetricalSafeAreaView\'s "paddingVertical" style.')
})

test('adds to existing style when includes number axis paddings', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        left
        right
        testID="Example"
        style={{ backgroundColor: 'red', paddingVertical: 12 }}
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: [
        { backgroundColor: 'red', paddingVertical: 12 },
        {
          paddingTop: 28,
          paddingBottom: 72,
          paddingHorizontal: 53
        }
      ],
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('rejects non-numeric string direction paddings', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        left
        right
        testID="Example"
        style={{ backgroundColor: 'red', paddingLeft: '12%' }}
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  expect(() => {
    TestRenderer.create(<Component />)
  }).toThrowError('Only numbers, null or undefined are currently supported for a HorizontallySymmetricalSafeAreaView\'s "paddingLeft" style.')
})

test('adds to existing style when includes number direction paddings', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        left
        right
        testID="Example"
        style={{ backgroundColor: 'red', paddingLeft: 12 }}
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: [
        { backgroundColor: 'red', paddingLeft: 12 },
        {
          paddingTop: 16,
          paddingBottom: 60,
          paddingLeft: 65,
          paddingRight: 53
        }
      ],
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('rejects non-numeric string layered paddings', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        left
        right
        testID="Example"
        style={[
          [{ borderLeftColor: 'yellow', padding: '9%' }, { paddingLeft: '12%' }],
          { backgroundColor: 'red', paddingHorizontal: '18%' }
        ]}
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  expect(() => {
    TestRenderer.create(<Component />)
  }).toThrowError('Only numbers, null or undefined are currently supported for a HorizontallySymmetricalSafeAreaView\'s "padding" style.')
})

test('adds to existing style when includes number layered paddings', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        left
        right
        testID="Example"
        style={[
          [{ borderLeftColor: 'yellow', padding: 9 }, { paddingLeft: 12 }],
          { backgroundColor: 'red', paddingHorizontal: 18 }
        ]}
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: [
        [
          [{ borderLeftColor: 'yellow', padding: 9 }, { paddingLeft: 12 }],
          { backgroundColor: 'red', paddingHorizontal: 18 }
        ],
        {
          paddingTop: 25,
          paddingBottom: 69,
          paddingLeft: 65,
          paddingRight: 71
        }
      ],
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('does not include its own style when it would have no effect', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 0, bottom: 0, left: 0, right: 0 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        left
        right
        testID="Example"
        style={[
          [{ borderLeftColor: 'yellow', padding: 9 }, { paddingTop: 12 }],
          { backgroundColor: 'red', paddingHorizontal: 18 }
        ]}
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: [
        [{ borderLeftColor: 'yellow', padding: 9 }, { paddingTop: 12 }],
        { backgroundColor: 'red', paddingHorizontal: 18 }
      ],
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('can simplify down to a basic padding', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 25, bottom: 25, left: 25, right: 21 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        left
        right
        testID="Example"
        style={{ borderLeftColor: 'yellow', padding: 9 }}
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: [
        { borderLeftColor: 'yellow', padding: 9 },
        {
          padding: 34
        }
      ],
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('can simplify down to a vertical padding', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 25, bottom: 25, left: 7, right: 3 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        left
        right
        testID="Example"
        style={{
          borderLeftColor: 'yellow',
          paddingVertical: 9,
          paddingLeft: 1
        }}
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  const renderer = TestRenderer.create(<Component />)

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).rendered
  ).toMatchObject({
    nodeType: 'component',
    type: View,
    props: {
      style: [
        { borderLeftColor: 'yellow', paddingVertical: 9, paddingLeft: 1 },
        {
          paddingVertical: 34,
          paddingLeft: 8,
          paddingRight: 7
        }
      ],
      pointerEvents: 'box-none',
      testID: 'Example',
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Child'
        }
      })
    }
  })

  renderer.unmount()
})

test('throws an error when a registered style is used', () => {
  const Component: React.FunctionComponent = () => (
    <SafeAreaInsetsContext.Provider
      value={{ top: 25, bottom: 25, left: 7, right: 3 }}
    >
      <HorizontallySymmetricalSafeAreaView
        top
        bottom
        left
        right
        testID="Example"
        style={[
          { paddingVertical: 9 },
          1234 as unknown as RegisteredStyle<ViewStyle>,
          {
            borderLeftColor: 'yellow',
            paddingLeft: 1
          }
        ]}
      >
        <Text>Example Child</Text>
      </HorizontallySymmetricalSafeAreaView>
    </SafeAreaInsetsContext.Provider>
  )

  expect(() => {
    TestRenderer.create(<Component />)
  }).toThrowError(
    'Registered styles cannot be used with HorizontallySymmetricalSafeAreaView.'
  )
})
