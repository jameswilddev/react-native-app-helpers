import * as React from 'react'
import * as TestRenderer from 'react-test-renderer'
import { Text, View } from 'react-native'
import {
  createStackRoutingComponent,
  type StackRouterState,
  type StackRouteTable,
  type StackRoute
} from '../../..'
import { Card } from './Card'

test('can render one item', async () => {
  interface ParametersA {
    readonly testRouteAParameterKey:
    | 'Test Route A Parameter Value A'
    | 'Test Route A Parameter Value B'
  }

  interface ParametersB {
    readonly testRouteBParameterKey: 'Test Route B Parameter Value'
  }

  interface ParametersC {
    readonly testRouteCParameterKey: 'Test Route C Parameter Value'
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type Parameters = {
    testRouteAKey: ParametersA
    testRouteBKey: ParametersB
    testRouteCKey: ParametersC
  }

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type OtherProps = {
      exampleOtherPropKey: 'Example Other Prop Value'
    }

    const RouteA: StackRoute<Parameters, 'testRouteAKey', OtherProps> = {
      component: ({
        parameters: { testRouteAParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteB: StackRoute<Parameters, 'testRouteBKey', OtherProps> = {
      component: ({
        parameters: { testRouteBParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route B with parameter {testRouteBParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteC: StackRoute<Parameters, 'testRouteCKey', OtherProps> = {
      component: ({
        parameters: { testRouteCParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const routeTable: StackRouteTable<Parameters, OtherProps> = {
      testRouteAKey: RouteA,
      testRouteBKey: RouteB,
      testRouteCKey: RouteC
    }

    const routeState: StackRouterState<Parameters> = [
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value'
        }
      }
    ]

    const setRouteState = jest.fn()
    const onBack = jest.fn()

    const Component = createStackRoutingComponent(routeTable)

    const renderer = TestRenderer.create(
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
      onBack={onBack}
    />
    )

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    })

    expect(renderer.toTree()?.rendered).toMatchObject({
      type: View,
      props: {
        style: {
          position: 'absolute',
          width: '100%',
          height: '100%'
        },
        pointerEvents: 'auto',
        children: expect.objectContaining({
          type: Card,
          props: {
            pop: expect.any(Function),
            onBack,
            allowsSwiping: false,
            children: expect.objectContaining({
              type: RouteB.component,
              props: {
                push: expect.any(Function),
                pop: expect.any(Function),
                replace: expect.any(Function),
                reset: expect.any(Function),
                setParameters: expect.any(Function),
                bottom: true,
                top: true,
                parameters: {
                  testRouteBParameterKey: 'Test Route B Parameter Value'
                },
                routeState,
                setRouteState,
                exampleOtherPropKey: 'Example Other Prop Value',
                onBack
              }
            })
          }
        })
      }
    })

    expect(setRouteState).not.toHaveBeenCalled()
    expect(onBack).not.toHaveBeenCalled()

    renderer.unmount()
})

test('does not hook the back button for a single item', async () => {
  interface ParametersA {
    readonly testRouteAParameterKey:
    | 'Test Route A Parameter Value A'
    | 'Test Route A Parameter Value B'
  }

  interface ParametersB {
    readonly testRouteBParameterKey: 'Test Route B Parameter Value'
  }

  interface ParametersC {
    readonly testRouteCParameterKey: 'Test Route C Parameter Value'
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type Parameters = {
    testRouteAKey: ParametersA
    testRouteBKey: ParametersB
    testRouteCKey: ParametersC
  }

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type OtherProps = {
      exampleOtherPropKey: 'Example Other Prop Value'
    }

    const RouteA: StackRoute<Parameters, 'testRouteAKey', OtherProps> = {
      component: ({
        parameters: { testRouteAParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteB: StackRoute<Parameters, 'testRouteBKey', OtherProps> = {
      component: ({
        parameters: { testRouteBParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route B with parameter {testRouteBParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteC: StackRoute<Parameters, 'testRouteCKey', OtherProps> = {
      component: ({
        parameters: { testRouteCParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const routeTable: StackRouteTable<Parameters, OtherProps> = {
      testRouteAKey: RouteA,
      testRouteBKey: RouteB,
      testRouteCKey: RouteC
    }

    const routeState: StackRouterState<Parameters> = [
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value'
        }
      }
    ]

    const setRouteState = jest.fn()
    const onBack = jest.fn()

    const Component = createStackRoutingComponent(routeTable)

    const renderer = TestRenderer.create(
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
      onBack={onBack}
    />
    )

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    })

    jest
      .requireMock('react-native/Libraries/Utilities/BackHandler')
      .mockPressBack()

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    })

    expect(setRouteState).not.toHaveBeenCalled()
    expect(onBack).not.toHaveBeenCalled()
    expect(
      jest.requireMock('react-native/Libraries/Utilities/BackHandler').exitApp
    ).toHaveBeenCalledTimes(1)

    renderer.unmount()
})

test('can render two items', async () => {
  interface ParametersA {
    readonly testRouteAParameterKey:
    | 'Test Route A Parameter Value A'
    | 'Test Route A Parameter Value B'
  }

  interface ParametersB {
    readonly testRouteBParameterKey: 'Test Route B Parameter Value'
  }

  interface ParametersC {
    readonly testRouteCParameterKey: 'Test Route C Parameter Value'
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type Parameters = {
    testRouteAKey: ParametersA
    testRouteBKey: ParametersB
    testRouteCKey: ParametersC
  }

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type OtherProps = {
      exampleOtherPropKey: 'Example Other Prop Value'
    }

    const RouteA: StackRoute<Parameters, 'testRouteAKey', OtherProps> = {
      component: ({
        parameters: { testRouteAParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteB: StackRoute<Parameters, 'testRouteBKey', OtherProps> = {
      component: ({
        parameters: { testRouteBParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route B with parameter {testRouteBParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteC: StackRoute<Parameters, 'testRouteCKey', OtherProps> = {
      component: ({
        parameters: { testRouteCParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const routeTable: StackRouteTable<Parameters, OtherProps> = {
      testRouteAKey: RouteA,
      testRouteBKey: RouteB,
      testRouteCKey: RouteC
    }

    const routeState: StackRouterState<Parameters> = [
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value'
        }
      },
      {
        uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value A'
        }
      }
    ]

    const setRouteState = jest.fn()
    const onBack = jest.fn()

    const Component = createStackRoutingComponent(routeTable)

    const renderer = TestRenderer.create(
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
      onBack={onBack}
    />
    )

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    })

    expect(renderer.toTree()?.rendered).toEqual([
      expect.objectContaining({
        type: View,
        props: expect.objectContaining({
          style: {
            position: 'absolute',
            width: '100%',
            height: '100%'
          },
          pointerEvents: 'none',
          children: expect.objectContaining({
            type: Card,
            props: {
              pop: expect.any(Function),
              onBack,
              allowsSwiping: false,
              children: expect.objectContaining({
                type: RouteB.component,
                props: {
                  push: expect.any(Function),
                  pop: expect.any(Function),
                  replace: expect.any(Function),
                  reset: expect.any(Function),
                  setParameters: expect.any(Function),
                  bottom: true,
                  top: false,
                  parameters: {
                    testRouteBParameterKey: 'Test Route B Parameter Value'
                  },
                  routeState,
                  setRouteState,
                  exampleOtherPropKey: 'Example Other Prop Value',
                  onBack
                }
              })
            }
          })
        })
      }),
      expect.objectContaining({
        type: View,
        props: {
          style: {
            position: 'absolute',
            width: '100%',
            height: '100%'
          },
          pointerEvents: 'auto',
          children: expect.objectContaining({
            type: Card,
            props: {
              pop: expect.any(Function),
              onBack,
              allowsSwiping: true,
              children: expect.objectContaining({
                type: RouteA.component,
                props: {
                  push: expect.any(Function),
                  pop: expect.any(Function),
                  replace: expect.any(Function),
                  reset: expect.any(Function),
                  setParameters: expect.any(Function),
                  bottom: false,
                  top: true,
                  parameters: {
                    testRouteAParameterKey: 'Test Route A Parameter Value A'
                  },
                  routeState,
                  setRouteState,
                  exampleOtherPropKey: 'Example Other Prop Value',
                  onBack
                }
              })
            }
          })
        }
      })
    ])

    expect(setRouteState).not.toHaveBeenCalled()
    expect(onBack).not.toHaveBeenCalled()

    renderer.unmount()
})

test('hooks the back button for two items', async () => {
  interface ParametersA {
    readonly testRouteAParameterKey:
    | 'Test Route A Parameter Value A'
    | 'Test Route A Parameter Value B'
  }

  interface ParametersB {
    readonly testRouteBParameterKey: 'Test Route B Parameter Value'
  }

  interface ParametersC {
    readonly testRouteCParameterKey: 'Test Route C Parameter Value'
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type Parameters = {
    testRouteAKey: ParametersA
    testRouteBKey: ParametersB
    testRouteCKey: ParametersC
  }

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type OtherProps = {
      exampleOtherPropKey: 'Example Other Prop Value'
    }

    const RouteA: StackRoute<Parameters, 'testRouteAKey', OtherProps> = {
      component: ({
        parameters: { testRouteAParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteB: StackRoute<Parameters, 'testRouteBKey', OtherProps> = {
      component: ({
        parameters: { testRouteBParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route B with parameter {testRouteBParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteC: StackRoute<Parameters, 'testRouteCKey', OtherProps> = {
      component: ({
        parameters: { testRouteCParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const routeTable: StackRouteTable<Parameters, OtherProps> = {
      testRouteAKey: RouteA,
      testRouteBKey: RouteB,
      testRouteCKey: RouteC
    }

    const routeState: StackRouterState<Parameters> = [
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value'
        }
      },
      {
        uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value A'
        }
      }
    ]

    const setRouteState = jest.fn()
    const onBack = jest.fn()

    const Component = createStackRoutingComponent(routeTable)

    const renderer = TestRenderer.create(
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
      onBack={onBack}
    />
    )

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    })

    jest
      .requireMock('react-native/Libraries/Utilities/BackHandler')
      .mockPressBack()

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    })

    expect(setRouteState).not.toHaveBeenCalled()
    expect(onBack).toBeCalledTimes(1)
    expect(onBack).toBeCalledWith(expect.any(Function), expect.any(Function))
    expect(
      jest.requireMock('react-native/Libraries/Utilities/BackHandler').exitApp
    ).not.toBeCalled()

    renderer.unmount()
})

test('can render three items', async () => {
  interface ParametersA {
    readonly testRouteAParameterKey:
    | 'Test Route A Parameter Value A'
    | 'Test Route A Parameter Value B'
  }

  interface ParametersB {
    readonly testRouteBParameterKey: 'Test Route B Parameter Value'
  }

  interface ParametersC {
    readonly testRouteCParameterKey: 'Test Route C Parameter Value'
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type Parameters = {
    testRouteAKey: ParametersA
    testRouteBKey: ParametersB
    testRouteCKey: ParametersC
  }

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type OtherProps = {
      exampleOtherPropKey: 'Example Other Prop Value'
    }

    const RouteA: StackRoute<Parameters, 'testRouteAKey', OtherProps> = {
      component: ({
        parameters: { testRouteAParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteB: StackRoute<Parameters, 'testRouteBKey', OtherProps> = {
      component: ({
        parameters: { testRouteBParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route B with parameter {testRouteBParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteC: StackRoute<Parameters, 'testRouteCKey', OtherProps> = {
      component: ({
        parameters: { testRouteCParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const routeTable: StackRouteTable<Parameters, OtherProps> = {
      testRouteAKey: RouteA,
      testRouteBKey: RouteB,
      testRouteCKey: RouteC
    }

    const routeState: StackRouterState<Parameters> = [
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value'
        }
      },
      {
        uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value A'
        }
      },
      {
        uuid: '345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value B'
        }
      }
    ]

    const setRouteState = jest.fn()
    const onBack = jest.fn()

    const Component = createStackRoutingComponent(routeTable)

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    })

    const renderer = TestRenderer.create(
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
      onBack={onBack}
    />
    )

    expect(renderer.toTree()?.rendered).toEqual([
      expect.objectContaining({
        type: View,
        props: expect.objectContaining({
          style: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'none'
          },
          pointerEvents: 'none',
          children: expect.objectContaining({
            type: Card,
            props: {
              pop: expect.any(Function),
              onBack,
              allowsSwiping: false,
              children: expect.objectContaining({
                type: RouteB.component,
                props: {
                  push: expect.any(Function),
                  pop: expect.any(Function),
                  replace: expect.any(Function),
                  reset: expect.any(Function),
                  setParameters: expect.any(Function),
                  bottom: true,
                  top: false,
                  parameters: {
                    testRouteBParameterKey: 'Test Route B Parameter Value'
                  },
                  routeState,
                  setRouteState,
                  exampleOtherPropKey: 'Example Other Prop Value',
                  onBack
                }
              })
            }
          })
        })
      }),
      expect.objectContaining({
        type: View,
        props: {
          style: {
            position: 'absolute',
            width: '100%',
            height: '100%'
          },
          pointerEvents: 'none',
          children: expect.objectContaining({
            type: Card,
            props: {
              pop: expect.any(Function),
              onBack,
              allowsSwiping: false,
              children: expect.objectContaining({
                type: RouteA.component,
                props: {
                  push: expect.any(Function),
                  pop: expect.any(Function),
                  replace: expect.any(Function),
                  reset: expect.any(Function),
                  setParameters: expect.any(Function),
                  bottom: false,
                  top: false,
                  parameters: {
                    testRouteAParameterKey: 'Test Route A Parameter Value A'
                  },
                  routeState,
                  setRouteState,
                  exampleOtherPropKey: 'Example Other Prop Value',
                  onBack
                }
              })
            }
          })
        }
      }),
      expect.objectContaining({
        type: View,
        props: {
          style: {
            position: 'absolute',
            width: '100%',
            height: '100%'
          },
          pointerEvents: 'auto',
          children: expect.objectContaining({
            type: Card,
            props: {
              pop: expect.any(Function),
              onBack,
              allowsSwiping: true,
              children: expect.objectContaining({
                type: RouteA.component,
                props: {
                  push: expect.any(Function),
                  pop: expect.any(Function),
                  replace: expect.any(Function),
                  reset: expect.any(Function),
                  setParameters: expect.any(Function),
                  bottom: false,
                  top: true,
                  parameters: {
                    testRouteAParameterKey: 'Test Route A Parameter Value B'
                  },
                  routeState,
                  setRouteState,
                  exampleOtherPropKey: 'Example Other Prop Value',
                  onBack
                }
              })
            }
          })
        }
      })
    ])

    expect(setRouteState).not.toHaveBeenCalled()
    expect(onBack).not.toHaveBeenCalled()

    renderer.unmount()
})

test('hooks the back button for three items', async () => {
  interface ParametersA {
    readonly testRouteAParameterKey:
    | 'Test Route A Parameter Value A'
    | 'Test Route A Parameter Value B'
  }

  interface ParametersB {
    readonly testRouteBParameterKey: 'Test Route B Parameter Value'
  }

  interface ParametersC {
    readonly testRouteCParameterKey: 'Test Route C Parameter Value'
  }

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type Parameters = {
  testRouteAKey: ParametersA
  testRouteBKey: ParametersB
  testRouteCKey: ParametersC
}

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type OtherProps = {
      exampleOtherPropKey: 'Example Other Prop Value'
    }

    const RouteA: StackRoute<Parameters, 'testRouteAKey', OtherProps> = {
      component: ({
        parameters: { testRouteAParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteB: StackRoute<Parameters, 'testRouteBKey', OtherProps> = {
      component: ({
        parameters: { testRouteBParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route B with parameter {testRouteBParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteC: StackRoute<Parameters, 'testRouteCKey', OtherProps> = {
      component: ({
        parameters: { testRouteCParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const routeTable: StackRouteTable<Parameters, OtherProps> = {
      testRouteAKey: RouteA,
      testRouteBKey: RouteB,
      testRouteCKey: RouteC
    }

    const routeState: StackRouterState<Parameters> = [
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value'
        }
      },
      {
        uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value A'
        }
      },
      {
        uuid: '345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value B'
        }
      }
    ]

    const setRouteState = jest.fn()
    const onBack = jest.fn()

    const Component = createStackRoutingComponent(routeTable)

    const renderer = TestRenderer.create(
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
      onBack={onBack}
    />
    )

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    })

    jest
      .requireMock('react-native/Libraries/Utilities/BackHandler')
      .mockPressBack()

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    })

    expect(setRouteState).not.toHaveBeenCalled()
    expect(onBack).toBeCalledTimes(1)
    expect(onBack).toBeCalledWith(expect.any(Function), expect.any(Function))
    expect(
      jest.requireMock('react-native/Libraries/Utilities/BackHandler').exitApp
    ).not.toBeCalled()

    renderer.unmount()
})

test('can disable swiping to go back', async () => {
  interface ParametersA {
    readonly testRouteAParameterKey:
    | 'Test Route A Parameter Value A'
    | 'Test Route A Parameter Value B'
  }

  interface ParametersB {
    readonly testRouteBParameterKey: 'Test Route B Parameter Value'
  }

  interface ParametersC {
    readonly testRouteCParameterKey: 'Test Route C Parameter Value'
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type Parameters = {
    testRouteAKey: ParametersA
    testRouteBKey: ParametersB
    testRouteCKey: ParametersC
  }

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type OtherProps = {
      exampleOtherPropKey: 'Example Other Prop Value'
    }

    const RouteA: StackRoute<Parameters, 'testRouteAKey', OtherProps> = {
      component: ({
        parameters: { testRouteAParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: false
    }

    const RouteB: StackRoute<Parameters, 'testRouteBKey', OtherProps> = {
      component: ({
        parameters: { testRouteBParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route B with parameter {testRouteBParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteC: StackRoute<Parameters, 'testRouteCKey', OtherProps> = {
      component: ({
        parameters: { testRouteCParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const routeTable: StackRouteTable<Parameters, OtherProps> = {
      testRouteAKey: RouteA,
      testRouteBKey: RouteB,
      testRouteCKey: RouteC
    }

    const routeState: StackRouterState<Parameters> = [
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value'
        }
      },
      {
        uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value A'
        }
      },
      {
        uuid: '345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value B'
        }
      }
    ]

    const setRouteState = jest.fn()
    const onBack = jest.fn()

    const Component = createStackRoutingComponent(routeTable)

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    })

    const renderer = TestRenderer.create(
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
      onBack={onBack}
    />
    )

    expect(renderer.toTree()?.rendered).toEqual([
      expect.objectContaining({
        type: View,
        props: expect.objectContaining({
          style: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'none'
          },
          pointerEvents: 'none',
          children: expect.objectContaining({
            type: Card,
            props: {
              pop: expect.any(Function),
              onBack,
              allowsSwiping: false,
              children: expect.objectContaining({
                type: RouteB.component,
                props: {
                  push: expect.any(Function),
                  pop: expect.any(Function),
                  replace: expect.any(Function),
                  reset: expect.any(Function),
                  setParameters: expect.any(Function),
                  bottom: true,
                  top: false,
                  parameters: {
                    testRouteBParameterKey: 'Test Route B Parameter Value'
                  },
                  routeState,
                  setRouteState,
                  exampleOtherPropKey: 'Example Other Prop Value',
                  onBack
                }
              })
            }
          })
        })
      }),
      expect.objectContaining({
        type: View,
        props: {
          style: {
            position: 'absolute',
            width: '100%',
            height: '100%'
          },
          pointerEvents: 'none',
          children: expect.objectContaining({
            type: Card,
            props: {
              pop: expect.any(Function),
              onBack,
              allowsSwiping: false,
              children: expect.objectContaining({
                type: RouteA.component,
                props: {
                  push: expect.any(Function),
                  pop: expect.any(Function),
                  replace: expect.any(Function),
                  reset: expect.any(Function),
                  setParameters: expect.any(Function),
                  bottom: false,
                  top: false,
                  parameters: {
                    testRouteAParameterKey: 'Test Route A Parameter Value A'
                  },
                  routeState,
                  setRouteState,
                  exampleOtherPropKey: 'Example Other Prop Value',
                  onBack
                }
              })
            }
          })
        }
      }),
      expect.objectContaining({
        type: View,
        props: {
          style: {
            position: 'absolute',
            width: '100%',
            height: '100%'
          },
          pointerEvents: 'auto',
          children: expect.objectContaining({
            type: Card,
            props: {
              pop: expect.any(Function),
              onBack,
              allowsSwiping: false,
              children: expect.objectContaining({
                type: RouteA.component,
                props: {
                  push: expect.any(Function),
                  pop: expect.any(Function),
                  replace: expect.any(Function),
                  reset: expect.any(Function),
                  setParameters: expect.any(Function),
                  bottom: false,
                  top: true,
                  parameters: {
                    testRouteAParameterKey: 'Test Route A Parameter Value B'
                  },
                  routeState,
                  setRouteState,
                  exampleOtherPropKey: 'Example Other Prop Value',
                  onBack
                }
              })
            }
          })
        }
      })
    ])

    expect(setRouteState).not.toHaveBeenCalled()
    expect(onBack).not.toHaveBeenCalled()

    renderer.unmount()
})

test('pops one card on confirming after pressing the back button', async () => {
  interface ParametersA {
    readonly testRouteAParameterKey:
    | 'Test Route A Parameter Value A'
    | 'Test Route A Parameter Value B'
  }

  interface ParametersB {
    readonly testRouteBParameterKey: 'Test Route B Parameter Value'
  }

  interface ParametersC {
    readonly testRouteCParameterKey: 'Test Route C Parameter Value'
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type Parameters = {
    testRouteAKey: ParametersA
    testRouteBKey: ParametersB
    testRouteCKey: ParametersC
  }

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type OtherProps = {
      exampleOtherPropKey: 'Example Other Prop Value'
    }

    const RouteA: StackRoute<Parameters, 'testRouteAKey', OtherProps> = {
      component: ({
        parameters: { testRouteAParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteB: StackRoute<Parameters, 'testRouteBKey', OtherProps> = {
      component: ({
        parameters: { testRouteBParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route B with parameter {testRouteBParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteC: StackRoute<Parameters, 'testRouteCKey', OtherProps> = {
      component: ({
        parameters: { testRouteCParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const routeTable: StackRouteTable<Parameters, OtherProps> = {
      testRouteAKey: RouteA,
      testRouteBKey: RouteB,
      testRouteCKey: RouteC
    }

    const routeState: StackRouterState<Parameters> = [
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value'
        }
      },
      {
        uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value A'
        }
      },
      {
        uuid: '345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value B'
        }
      }
    ]

    const setRouteState = jest.fn()
    const onBack = jest.fn()

    const Component = createStackRoutingComponent(routeTable)

    const renderer = TestRenderer.create(
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
      onBack={onBack}
    />
    )

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    })

    jest
      .requireMock('react-native/Libraries/Utilities/BackHandler')
      .mockPressBack()

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    })

    onBack.mock.calls[0][0]()

    expect(setRouteState).toBeCalledTimes(1)
    expect(setRouteState).toBeCalledWith([
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value'
        }
      },
      {
        uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value A'
        }
      }
    ])
    expect(onBack).toBeCalledTimes(1)
    expect(onBack).toBeCalledWith(expect.any(Function), expect.any(Function))
    expect(
      jest.requireMock('react-native/Libraries/Utilities/BackHandler').exitApp
    ).not.toBeCalled()

    renderer.unmount()
})

test('does nothing on cancelling after pressing the back button', async () => {
  interface ParametersA {
    readonly testRouteAParameterKey:
    | 'Test Route A Parameter Value A'
    | 'Test Route A Parameter Value B'
  }

  interface ParametersB {
    readonly testRouteBParameterKey: 'Test Route B Parameter Value'
  }

  interface ParametersC {
    readonly testRouteCParameterKey: 'Test Route C Parameter Value'
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type Parameters = {
    testRouteAKey: ParametersA
    testRouteBKey: ParametersB
    testRouteCKey: ParametersC
  }

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type OtherProps = {
      exampleOtherPropKey: 'Example Other Prop Value'
    }

    const RouteA: StackRoute<Parameters, 'testRouteAKey', OtherProps> = {
      component: ({
        parameters: { testRouteAParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteB: StackRoute<Parameters, 'testRouteBKey', OtherProps> = {
      component: ({
        parameters: { testRouteBParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route B with parameter {testRouteBParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteC: StackRoute<Parameters, 'testRouteCKey', OtherProps> = {
      component: ({
        parameters: { testRouteCParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const routeTable: StackRouteTable<Parameters, OtherProps> = {
      testRouteAKey: RouteA,
      testRouteBKey: RouteB,
      testRouteCKey: RouteC
    }

    const routeState: StackRouterState<Parameters> = [
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value'
        }
      },
      {
        uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value A'
        }
      },
      {
        uuid: '345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value B'
        }
      }
    ]

    const setRouteState = jest.fn()
    const onBack = jest.fn()

    const Component = createStackRoutingComponent(routeTable)

    const renderer = TestRenderer.create(
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
      onBack={onBack}
    />
    )

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    })

    jest
      .requireMock('react-native/Libraries/Utilities/BackHandler')
      .mockPressBack()

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    })

    onBack.mock.calls[0][1]()

    expect(setRouteState).not.toHaveBeenCalled()
    expect(onBack).toBeCalledTimes(1)
    expect(onBack).toBeCalledWith(expect.any(Function), expect.any(Function))
    expect(
      jest.requireMock('react-native/Libraries/Utilities/BackHandler').exitApp
    ).not.toBeCalled()

    renderer.unmount()
})

test('push', async () => {
  interface ParametersA {
    readonly testRouteAParameterKey:
    | 'Test Route A Parameter Value A'
    | 'Test Route A Parameter Value B'
  }

  interface ParametersB {
    readonly testRouteBParameterKey:
    | 'Test Route B Parameter Value A'
    | 'Test Route B Parameter Value B'
  }

  interface ParametersC {
    readonly testRouteCParameterKey:
    | 'Test Route C Parameter Value A'
    | 'Test Route C Parameter Value B'
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type Parameters = {
    testRouteAKey: ParametersA
    testRouteBKey: ParametersB
    testRouteCKey: ParametersC
  }

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type OtherProps = {
      exampleOtherPropKey: 'Example Other Prop Value'
    }

    const RouteA: StackRoute<Parameters, 'testRouteAKey', OtherProps> = {
      component: ({
        parameters: { testRouteAParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteB: StackRoute<Parameters, 'testRouteBKey', OtherProps> = {
      component: ({
        parameters: { testRouteBParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route B with parameter {testRouteBParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteC: StackRoute<Parameters, 'testRouteCKey', OtherProps> = {
      component: ({
        parameters: { testRouteCParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const routeTable: StackRouteTable<Parameters, OtherProps> = {
      testRouteAKey: RouteA,
      testRouteBKey: RouteB,
      testRouteCKey: RouteC
    }

    const routeState: StackRouterState<Parameters> = [
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value A'
        }
      },
      {
        uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value A'
        }
      },
      {
        uuid: '345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value B'
        }
      }
    ]

    const setRouteState = jest.fn()
    const onBack = jest.fn()

    const Component = createStackRoutingComponent(routeTable)

    const renderer = TestRenderer.create(
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
      onBack={onBack}
    />
    )

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    });

    (
      renderer.toTree()
        ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
    )[1]?.props['children'].props.children.props.push(
      {
        uuid: '441aff37-ab3c-4d4f-a623-46aa36a42c14',
        key: 'testRouteCKey',
        parameters: {
          testRouteBParameterKey: 'Test Route C Parameter Value B'
        }
      },
      {
        uuid: '4380d918-310d-4515-8fb6-fb14b380239c',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value B'
        }
      }
    )

    expect(setRouteState).toBeCalledTimes(1)
    expect(setRouteState).toHaveBeenCalledWith([
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value A'
        }
      },
      {
        uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value A'
        }
      },
      {
        uuid: '345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value B'
        }
      },
      {
        uuid: '441aff37-ab3c-4d4f-a623-46aa36a42c14',
        key: 'testRouteCKey',
        parameters: {
          testRouteBParameterKey: 'Test Route C Parameter Value B'
        }
      },
      {
        uuid: '4380d918-310d-4515-8fb6-fb14b380239c',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value B'
        }
      }
    ])

    expect(onBack).not.toHaveBeenCalled()

    renderer.unmount()
})

test('pop', async () => {
  interface ParametersA {
    readonly testRouteAParameterKey:
    | 'Test Route A Parameter Value A'
    | 'Test Route A Parameter Value B'
  }

  interface ParametersB {
    readonly testRouteBParameterKey:
    | 'Test Route B Parameter Value A'
    | 'Test Route B Parameter Value B'
  }

  interface ParametersC {
    readonly testRouteCParameterKey:
    | 'Test Route C Parameter Value A'
    | 'Test Route C Parameter Value B'
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type Parameters = {
    testRouteAKey: ParametersA
    testRouteBKey: ParametersB
    testRouteCKey: ParametersC
  }

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type OtherProps = {
      exampleOtherPropKey: 'Example Other Prop Value'
    }

    const RouteA: StackRoute<Parameters, 'testRouteAKey', OtherProps> = {
      component: ({
        parameters: { testRouteAParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteB: StackRoute<Parameters, 'testRouteBKey', OtherProps> = {
      component: ({
        parameters: { testRouteBParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route B with parameter {testRouteBParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteC: StackRoute<Parameters, 'testRouteCKey', OtherProps> = {
      component: ({
        parameters: { testRouteCParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const routeTable: StackRouteTable<Parameters, OtherProps> = {
      testRouteAKey: RouteA,
      testRouteBKey: RouteB,
      testRouteCKey: RouteC
    }

    const routeState: StackRouterState<Parameters> = [
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value A'
        }
      },
      {
        uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value A'
        }
      },
      {
        uuid: '345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value B'
        }
      }
    ]

    const setRouteState = jest.fn()
    const onBack = jest.fn()

    const Component = createStackRoutingComponent(routeTable)

    const renderer = TestRenderer.create(
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
      onBack={onBack}
    />
    )

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    });

    (
      renderer.toTree()
        ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
    )[1]?.props['children'].props.children.props.pop(2)

    expect(setRouteState).toBeCalledTimes(1)
    expect(setRouteState).toHaveBeenCalledWith([
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value A'
        }
      }
    ])

    expect(onBack).not.toHaveBeenCalled()

    renderer.unmount()
})

test('pop default', async () => {
  interface ParametersA {
    readonly testRouteAParameterKey:
    | 'Test Route A Parameter Value A'
    | 'Test Route A Parameter Value B'
  }

  interface ParametersB {
    readonly testRouteBParameterKey:
    | 'Test Route B Parameter Value A'
    | 'Test Route B Parameter Value B'
  }

  interface ParametersC {
    readonly testRouteCParameterKey:
    | 'Test Route C Parameter Value A'
    | 'Test Route C Parameter Value B'
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type Parameters = {
    testRouteAKey: ParametersA
    testRouteBKey: ParametersB
    testRouteCKey: ParametersC
  }

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type OtherProps = {
      exampleOtherPropKey: 'Example Other Prop Value'
    }

    const RouteA: StackRoute<Parameters, 'testRouteAKey', OtherProps> = {
      component: ({
        parameters: { testRouteAParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteB: StackRoute<Parameters, 'testRouteBKey', OtherProps> = {
      component: ({
        parameters: { testRouteBParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route B with parameter {testRouteBParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteC: StackRoute<Parameters, 'testRouteCKey', OtherProps> = {
      component: ({
        parameters: { testRouteCParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const routeTable: StackRouteTable<Parameters, OtherProps> = {
      testRouteAKey: RouteA,
      testRouteBKey: RouteB,
      testRouteCKey: RouteC
    }

    const routeState: StackRouterState<Parameters> = [
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value A'
        }
      },
      {
        uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value A'
        }
      },
      {
        uuid: '345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value B'
        }
      }
    ]

    const setRouteState = jest.fn()
    const onBack = jest.fn()

    const Component = createStackRoutingComponent(routeTable)

    const renderer = TestRenderer.create(
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
      onBack={onBack}
    />
    )

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    });

    (
      renderer.toTree()
        ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
    )[1]?.props['children'].props.children.props.pop()

    expect(setRouteState).toBeCalledTimes(1)
    expect(setRouteState).toHaveBeenCalledWith([
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value A'
        }
      },
      {
        uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value A'
        }
      }
    ])

    expect(onBack).not.toHaveBeenCalled()

    renderer.unmount()
})

test('card pop', async () => {
  interface ParametersA {
    readonly testRouteAParameterKey:
    | 'Test Route A Parameter Value A'
    | 'Test Route A Parameter Value B'
  }

  interface ParametersB {
    readonly testRouteBParameterKey:
    | 'Test Route B Parameter Value A'
    | 'Test Route B Parameter Value B'
  }

  interface ParametersC {
    readonly testRouteCParameterKey:
    | 'Test Route C Parameter Value A'
    | 'Test Route C Parameter Value B'
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type Parameters = {
    testRouteAKey: ParametersA
    testRouteBKey: ParametersB
    testRouteCKey: ParametersC
  }

    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    type OtherProps = {
      exampleOtherPropKey: 'Example Other Prop Value'
    }

    const RouteA: StackRoute<Parameters, 'testRouteAKey', OtherProps> = {
      component: ({
        parameters: { testRouteAParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteB: StackRoute<Parameters, 'testRouteBKey', OtherProps> = {
      component: ({
        parameters: { testRouteBParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route B with parameter {testRouteBParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const RouteC: StackRoute<Parameters, 'testRouteCKey', OtherProps> = {
      component: ({
        parameters: { testRouteCParameterKey },
        exampleOtherPropKey
      }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
      ),
      allowsSwiping: true
    }

    const routeTable: StackRouteTable<Parameters, OtherProps> = {
      testRouteAKey: RouteA,
      testRouteBKey: RouteB,
      testRouteCKey: RouteC
    }

    const routeState: StackRouterState<Parameters> = [
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value A'
        }
      },
      {
        uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value A'
        }
      },
      {
        uuid: '345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value B'
        }
      }
    ]

    const setRouteState = jest.fn()
    const onBack = jest.fn()

    const Component = createStackRoutingComponent(routeTable)

    const renderer = TestRenderer.create(
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
      onBack={onBack}
    />
    )

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 100)
    });

    (
      renderer.toTree()
        ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
    )[1]?.props['children'].props.pop()

    expect(setRouteState).toBeCalledTimes(1)
    expect(setRouteState).toHaveBeenCalledWith([
      {
        uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
        key: 'testRouteBKey',
        parameters: {
          testRouteBParameterKey: 'Test Route B Parameter Value A'
        }
      },
      {
        uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
        key: 'testRouteAKey',
        parameters: {
          testRouteAParameterKey: 'Test Route A Parameter Value A'
        }
      }
    ])

    expect(onBack).not.toHaveBeenCalled()

    renderer.unmount()
})

test('replace', async () => {
  interface ParametersA {
    readonly testRouteAParameterKey:
    | 'Test Route A Parameter Value A'
    | 'Test Route A Parameter Value B'
  }

  interface ParametersB {
    readonly testRouteBParameterKey:
    | 'Test Route B Parameter Value A'
    | 'Test Route B Parameter Value B'
  }

  interface ParametersC {
    readonly testRouteCParameterKey:
    | 'Test Route C Parameter Value A'
    | 'Test Route C Parameter Value B'
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type Parameters = {
    testRouteAKey: ParametersA
    testRouteBKey: ParametersB
    testRouteCKey: ParametersC
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type OtherProps = {
    exampleOtherPropKey: 'Example Other Prop Value'
  }

  const RouteA: StackRoute<Parameters, 'testRouteAKey', OtherProps> = {
    component: ({
      parameters: { testRouteAParameterKey },
      exampleOtherPropKey
    }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
    ),
    allowsSwiping: true
  }

  const RouteB: StackRoute<Parameters, 'testRouteBKey', OtherProps> = {
    component: ({
      parameters: { testRouteBParameterKey },
      exampleOtherPropKey
    }) => (
      <Text>
        Example Route B with parameter {testRouteBParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
    ),
    allowsSwiping: true
  }

  const RouteC: StackRoute<Parameters, 'testRouteCKey', OtherProps> = {
    component: ({
      parameters: { testRouteCParameterKey },
      exampleOtherPropKey
    }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
    ),
    allowsSwiping: true
  }

  const routeTable: StackRouteTable<Parameters, OtherProps> = {
    testRouteAKey: RouteA,
    testRouteBKey: RouteB,
    testRouteCKey: RouteC
  }

  const routeState: StackRouterState<Parameters> = [
    {
      uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
      key: 'testRouteBKey',
      parameters: {
        testRouteBParameterKey: 'Test Route B Parameter Value A'
      }
    },
    {
      uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
      key: 'testRouteAKey',
      parameters: {
        testRouteAParameterKey: 'Test Route A Parameter Value A'
      }
    },
    {
      uuid: '345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c',
      key: 'testRouteAKey',
      parameters: {
        testRouteAParameterKey: 'Test Route A Parameter Value B'
      }
    }
  ]

  const setRouteState = jest.fn()
  const onBack = jest.fn()

  const Component = createStackRoutingComponent(routeTable)

  const renderer = TestRenderer.create(
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
      onBack={onBack}
    />
  )

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  });

  (
    renderer.toTree()
      ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
  )[1]?.props['children'].props.children.props.replace(
    2,
    {
      uuid: 'e54ad406-9fcd-4ff5-a61c-d323946b92e6',
      key: 'testRouteCKey',
      parameters: {
        testRouteBParameterKey: 'Test Route C Parameter Value B'
      }
    },
    {
      uuid: '4380d918-310d-4515-8fb6-fb14b380239c',
      key: 'testRouteBKey',
      parameters: {
        testRouteBParameterKey: 'Test Route B Parameter Value B'
      }
    },
    {
      uuid: '441aff37-ab3c-4d4f-a623-46aa36a42c14',
      key: 'testRouteCKey',
      parameters: {
        testRouteBParameterKey: 'Test Route C Parameter Value A'
      }
    }
  )

  expect(setRouteState).toBeCalledTimes(1)
  expect(setRouteState).toHaveBeenCalledWith([
    {
      uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
      key: 'testRouteBKey',
      parameters: {
        testRouteBParameterKey: 'Test Route B Parameter Value A'
      }
    },
    {
      uuid: 'e54ad406-9fcd-4ff5-a61c-d323946b92e6',
      key: 'testRouteCKey',
      parameters: {
        testRouteBParameterKey: 'Test Route C Parameter Value B'
      }
    },
    {
      uuid: '4380d918-310d-4515-8fb6-fb14b380239c',
      key: 'testRouteBKey',
      parameters: {
        testRouteBParameterKey: 'Test Route B Parameter Value B'
      }
    },
    {
      uuid: '441aff37-ab3c-4d4f-a623-46aa36a42c14',
      key: 'testRouteCKey',
      parameters: {
        testRouteBParameterKey: 'Test Route C Parameter Value A'
      }
    }
  ])

  expect(onBack).not.toHaveBeenCalled()

  renderer.unmount()
})

test('reset', async () => {
  interface ParametersA {
    readonly testRouteAParameterKey:
    | 'Test Route A Parameter Value A'
    | 'Test Route A Parameter Value B'
  }

  interface ParametersB {
    readonly testRouteBParameterKey:
    | 'Test Route B Parameter Value A'
    | 'Test Route B Parameter Value B'
  }

  interface ParametersC {
    readonly testRouteCParameterKey:
    | 'Test Route C Parameter Value A'
    | 'Test Route C Parameter Value B'
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type Parameters = {
    testRouteAKey: ParametersA
    testRouteBKey: ParametersB
    testRouteCKey: ParametersC
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type OtherProps = {
    exampleOtherPropKey: 'Example Other Prop Value'
  }

  const RouteA: StackRoute<Parameters, 'testRouteAKey', OtherProps> = {
    component: ({
      parameters: { testRouteAParameterKey },
      exampleOtherPropKey
    }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
    ),
    allowsSwiping: true
  }

  const RouteB: StackRoute<Parameters, 'testRouteBKey', OtherProps> = {
    component: ({
      parameters: { testRouteBParameterKey },
      exampleOtherPropKey
    }) => (
      <Text>
        Example Route B with parameter {testRouteBParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
    ),
    allowsSwiping: true
  }

  const RouteC: StackRoute<Parameters, 'testRouteCKey', OtherProps> = {
    component: ({
      parameters: { testRouteCParameterKey },
      exampleOtherPropKey
    }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
    ),
    allowsSwiping: true
  }

  const routeTable: StackRouteTable<Parameters, OtherProps> = {
    testRouteAKey: RouteA,
    testRouteBKey: RouteB,
    testRouteCKey: RouteC
  }

  const routeState: StackRouterState<Parameters> = [
    {
      uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
      key: 'testRouteBKey',
      parameters: {
        testRouteBParameterKey: 'Test Route B Parameter Value A'
      }
    },
    {
      uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
      key: 'testRouteAKey',
      parameters: {
        testRouteAParameterKey: 'Test Route A Parameter Value A'
      }
    },
    {
      uuid: '345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c',
      key: 'testRouteAKey',
      parameters: {
        testRouteAParameterKey: 'Test Route A Parameter Value B'
      }
    }
  ]

  const setRouteState = jest.fn()
  const onBack = jest.fn()

  const Component = createStackRoutingComponent(routeTable)

  const renderer = TestRenderer.create(
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
      onBack={onBack}
    />
  )

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  });

  (
    renderer.toTree()
      ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
  )[1]?.props['children'].props.children.props.reset(
    {
      uuid: '441aff37-ab3c-4d4f-a623-46aa36a42c14',
      key: 'testRouteCKey',
      parameters: {
        testRouteBParameterKey: 'Test Route C Parameter Value B'
      }
    },
    {
      uuid: '4380d918-310d-4515-8fb6-fb14b380239c',
      key: 'testRouteBKey',
      parameters: {
        testRouteBParameterKey: 'Test Route B Parameter Value B'
      }
    }
  )

  expect(setRouteState).toBeCalledTimes(1)
  expect(setRouteState).toHaveBeenCalledWith([
    {
      uuid: '441aff37-ab3c-4d4f-a623-46aa36a42c14',
      key: 'testRouteCKey',
      parameters: {
        testRouteBParameterKey: 'Test Route C Parameter Value B'
      }
    },
    {
      uuid: '4380d918-310d-4515-8fb6-fb14b380239c',
      key: 'testRouteBKey',
      parameters: {
        testRouteBParameterKey: 'Test Route B Parameter Value B'
      }
    }
  ])

  expect(onBack).not.toHaveBeenCalled()

  renderer.unmount()
})

test('setParameters', async () => {
  interface ParametersA {
    readonly testRouteAParameterKey:
    | 'Test Route A Parameter Value A'
    | 'Test Route A Parameter Value B'
    | 'Test Route A Parameter Value C'
  }

  interface ParametersB {
    readonly testRouteBParameterKey:
    | 'Test Route B Parameter Value A'
    | 'Test Route B Parameter Value B'
  }

  interface ParametersC {
    readonly testRouteCParameterKey:
    | 'Test Route C Parameter Value A'
    | 'Test Route C Parameter Value B'
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type Parameters = {
    testRouteAKey: ParametersA
    testRouteBKey: ParametersB
    testRouteCKey: ParametersC
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type OtherProps = {
    exampleOtherPropKey: 'Example Other Prop Value'
  }

  const RouteA: StackRoute<Parameters, 'testRouteAKey', OtherProps> = {
    component: ({
      parameters: { testRouteAParameterKey },
      exampleOtherPropKey
    }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
    ),
    allowsSwiping: true
  }

  const RouteB: StackRoute<Parameters, 'testRouteBKey', OtherProps> = {
    component: ({
      parameters: { testRouteBParameterKey },
      exampleOtherPropKey
    }) => (
      <Text>
        Example Route B with parameter {testRouteBParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
    ),
    allowsSwiping: true
  }

  const RouteC: StackRoute<Parameters, 'testRouteCKey', OtherProps> = {
    component: ({
      parameters: { testRouteCParameterKey },
      exampleOtherPropKey
    }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{' '}
        {exampleOtherPropKey}
      </Text>
    ),
    allowsSwiping: true
  }

  const routeTable: StackRouteTable<Parameters, OtherProps> = {
    testRouteAKey: RouteA,
    testRouteBKey: RouteB,
    testRouteCKey: RouteC
  }

  const routeState: StackRouterState<Parameters> = [
    {
      uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
      key: 'testRouteBKey',
      parameters: {
        testRouteBParameterKey: 'Test Route B Parameter Value A'
      }
    },
    {
      uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
      key: 'testRouteAKey',
      parameters: {
        testRouteAParameterKey: 'Test Route A Parameter Value A'
      }
    },
    {
      uuid: '345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c',
      key: 'testRouteAKey',
      parameters: {
        testRouteAParameterKey: 'Test Route A Parameter Value B'
      }
    }
  ]

  const setRouteState = jest.fn()
  const onBack = jest.fn()

  const Component = createStackRoutingComponent(routeTable)

  const renderer = TestRenderer.create(
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
      onBack={onBack}
    />
  )

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  });

  (
    renderer.toTree()
      ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
  )[1]?.props['children'].props.children.props.setParameters({
    testRouteAParameterKey: 'Test Route A Parameter Value C'
  })

  expect(setRouteState).toBeCalledTimes(1)
  expect(setRouteState).toHaveBeenCalledWith([
    {
      uuid: 'ec055b0f-0659-4e9a-a889-06a7586bb61a',
      key: 'testRouteBKey',
      parameters: {
        testRouteBParameterKey: 'Test Route B Parameter Value A'
      }
    },
    {
      uuid: 'f36ce5e7-d37e-443a-8635-718118c27128',
      key: 'testRouteAKey',
      parameters: {
        testRouteAParameterKey: 'Test Route A Parameter Value C'
      }
    },
    {
      uuid: '345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c',
      key: 'testRouteAKey',
      parameters: {
        testRouteAParameterKey: 'Test Route A Parameter Value B'
      }
    }
  ])

  expect(onBack).not.toHaveBeenCalled()

  renderer.unmount()
})
