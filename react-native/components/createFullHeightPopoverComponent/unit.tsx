import * as React from 'react'
import { Dimensions, Text, View } from 'react-native'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import * as TestRenderer from 'react-test-renderer'
import {
  type ControlStyle,
  createFullHeightPopoverComponent,
  SimpleModal,
  SizedHorizontallySymmetricalSafeAreaView,
  ContainerFillingKeyboardAvoidingView,
  unwrapRenderedFunctionComponent
} from '../../..'

test('renders as expected when not disabled', () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    })
  )

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('renders as expected with a right icon', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const RightIcon: React.FunctionComponent = () => null

  const Component = createFullHeightPopoverComponent(controlStyle, RightIcon)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true,
        rightIcon: RightIcon
      }
    })
  )

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('renders as expected when disabled', () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: true,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    })
  )

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('renders as expected when not disabled after layout', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 310)
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    })
  )

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('renders as expected when disabled after layout', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 310)
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: true,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    })
  )

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('renders as expected when not disabled after layout after press', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 310)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    }),
    expect.objectContaining({
      nodeType: 'component',
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                height: '100%',
                backgroundColor: '#CABA99',
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: '#646464'
              },
              {
                left: 70,
                width: 220
              }
            ],
            children: expect.objectContaining({
              type: SizedHorizontallySymmetricalSafeAreaView,
              props: {
                top: true,
                bottom: true,
                left: true,
                right: true,
                width: 'fillsContainer',
                height: 'fillsContainer',
                children: expect.objectContaining({
                  type: ContainerFillingKeyboardAvoidingView,
                  props: {
                    children: expect.objectContaining({
                      type: Text,
                      props: {
                        children: 'Example Pop Over Content'
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  ])

  expect(
    (
      (
        renderer.toTree()
          ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('renders as expected when not disabled after press after layout', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 310)
  })

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    }),
    expect.objectContaining({
      nodeType: 'component',
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                height: '100%',
                backgroundColor: '#CABA99',
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: '#646464'
              },
              {
                left: 70,
                width: 220
              }
            ],
            children: expect.objectContaining({
              type: SizedHorizontallySymmetricalSafeAreaView,
              props: {
                top: true,
                bottom: true,
                left: true,
                right: true,
                width: 'fillsContainer',
                height: 'fillsContainer',
                children: expect.objectContaining({
                  type: ContainerFillingKeyboardAvoidingView,
                  props: {
                    children: expect.objectContaining({
                      type: Text,
                      props: {
                        children: 'Example Pop Over Content'
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  ])

  expect(
    (
      (
        renderer.toTree()
          ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('correctly handles layout changes which only move on the X axis', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 310)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  await TestRenderer.act(() => {
    (
      (
        renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onMeasure'](123, 456, 220, 20, 10, 310)
  })

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    }),
    expect.objectContaining({
      nodeType: 'component',
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                height: '100%',
                backgroundColor: '#CABA99',
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: '#646464'
              },
              {
                left: 10,
                width: 220
              }
            ],
            children: expect.objectContaining({
              type: SizedHorizontallySymmetricalSafeAreaView,
              props: {
                top: true,
                bottom: true,
                left: true,
                right: true,
                width: 'fillsContainer',
                height: 'fillsContainer',
                children: expect.objectContaining({
                  type: ContainerFillingKeyboardAvoidingView,
                  props: {
                    children: expect.objectContaining({
                      type: Text,
                      props: {
                        children: 'Example Pop Over Content'
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  ])

  expect(
    (
      (
        renderer.toTree()
          ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('correctly handles layout changes which only change width', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 310)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  await TestRenderer.act(() => {
    (
      (
        renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onMeasure'](123, 456, 190, 20, 70, 310)
  })

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    }),
    expect.objectContaining({
      nodeType: 'component',
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                height: '100%',
                backgroundColor: '#CABA99',
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: '#646464'
              },
              {
                left: 70,
                width: 190
              }
            ],
            children: expect.objectContaining({
              type: SizedHorizontallySymmetricalSafeAreaView,
              props: {
                top: true,
                bottom: true,
                left: true,
                right: true,
                width: 'fillsContainer',
                height: 'fillsContainer',
                children: expect.objectContaining({
                  type: ContainerFillingKeyboardAvoidingView,
                  props: {
                    children: expect.objectContaining({
                      type: Text,
                      props: {
                        children: 'Example Pop Over Content'
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  ])

  expect(
    (
      (
        renderer.toTree()
          ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('correctly handles layout changes which only move on the Y axis', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 310)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  await TestRenderer.act(() => {
    (
      (
        renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onMeasure'](123, 456, 220, 20, 70, 300)
  })

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    }),
    expect.objectContaining({
      nodeType: 'component',
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                height: '100%',
                backgroundColor: '#CABA99',
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: '#646464'
              },
              {
                left: 70,
                width: 220
              }
            ],
            children: expect.objectContaining({
              type: SizedHorizontallySymmetricalSafeAreaView,
              props: {
                top: true,
                bottom: true,
                left: true,
                right: true,
                width: 'fillsContainer',
                height: 'fillsContainer',
                children: expect.objectContaining({
                  type: ContainerFillingKeyboardAvoidingView,
                  props: {
                    children: expect.objectContaining({
                      type: Text,
                      props: {
                        children: 'Example Pop Over Content'
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  ])

  expect(
    (
      (
        renderer.toTree()
          ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('correctly handles layout changes which only change height', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 45, 220, 20, 70, 310)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  await TestRenderer.act(() => {
    (
      (
        renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onMeasure'](123, 456, 220, 15, 70, 310)
  })

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    }),
    expect.objectContaining({
      nodeType: 'component',
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                height: '100%',
                backgroundColor: '#CABA99',
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: '#646464'
              },
              {
                left: 70,
                width: 220
              }
            ],
            children: expect.objectContaining({
              type: SizedHorizontallySymmetricalSafeAreaView,
              props: {
                top: true,
                bottom: true,
                left: true,
                right: true,
                width: 'fillsContainer',
                height: 'fillsContainer',
                children: expect.objectContaining({
                  type: ContainerFillingKeyboardAvoidingView,
                  props: {
                    children: expect.objectContaining({
                      type: Text,
                      props: {
                        children: 'Example Pop Over Content'
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  ])

  expect(
    (
      (
        renderer.toTree()
          ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('correctly handles layout changes which have no effect', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 310)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  await TestRenderer.act(() => {
    (
      (
        renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onMeasure'](123, 456, 220, 20, 70, 310)
  })

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    }),
    expect.objectContaining({
      nodeType: 'component',
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                height: '100%',
                backgroundColor: '#CABA99',
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: '#646464'
              },
              {
                left: 70,
                width: 220
              }
            ],
            children: expect.objectContaining({
              type: SizedHorizontallySymmetricalSafeAreaView,
              props: {
                top: true,
                bottom: true,
                left: true,
                right: true,
                width: 'fillsContainer',
                height: 'fillsContainer',
                children: expect.objectContaining({
                  type: ContainerFillingKeyboardAvoidingView,
                  props: {
                    children: expect.objectContaining({
                      type: Text,
                      props: {
                        children: 'Example Pop Over Content'
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  ])

  expect(
    (
      (
        renderer.toTree()
          ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('can be enabled after being created disabled', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 310)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  await TestRenderer.act(() => {
    Dimensions.set({
      window: {
        width: 640,
        height: 470,
        scale: 2.42,
        fontScale: 3.51
      }
    })
  })

  renderer.update(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    })
  )

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()

  // Some aspect of unmounting seems to be asynchronous in this test, and not
  // waiting seems to mean that window dimension changes in other tests trigger
  // changes here.
  await new Promise((resolve) => setTimeout(resolve, 10))
})

test('closes if disabled while open', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 310)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  renderer.update(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: true,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    })
  )

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('does not re-open if enabled after disabled while open', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 310)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  renderer.update(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  renderer.update(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    })
  )

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('can be re-opened once re-enabled after disabled while open', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#ADAADA'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 310)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  renderer.update(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  renderer.update(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    }),
    expect.objectContaining({
      nodeType: 'component',
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                height: '100%',
                backgroundColor: '#CABA99',
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: '#646464'
              },
              {
                left: 70,
                width: 220
              }
            ],
            children: expect.objectContaining({
              type: SizedHorizontallySymmetricalSafeAreaView,
              props: {
                top: true,
                bottom: true,
                left: true,
                right: true,
                width: 'fillsContainer',
                height: 'fillsContainer',
                children: expect.objectContaining({
                  type: ContainerFillingKeyboardAvoidingView,
                  props: {
                    children: expect.objectContaining({
                      type: Text,
                      props: {
                        children: 'Example Pop Over Content'
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  ])

  expect(
    (
      (
        renderer.toTree()
          ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('closes when the modal is dismissed', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 310)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  await TestRenderer.act(() => {
    (
      (
        renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree[]
      )[1] as TestRenderer.ReactTestRendererTree
    ).props['onClose']()
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    })
  )

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('closes when the close callback is invoked', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)
  const children = jest.fn(() => <Text>Example Pop Over Content</Text>)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {children}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 310)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  await TestRenderer.act(() => {
    expect(children).toHaveBeenCalledTimes(1);
    (children.mock.calls[0] as ReadonlyArray<() => void>)[0]?.()
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    })
  )

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('renders as expected when invalid', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid={false}
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: false
      }
    })
  )

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('renders as expected when invalid when open', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label={null}
        placeholder="Example Placeholder"
        valid={false}
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 320)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: null,
        placeholder: 'Example Placeholder',
        valid: false
      }
    }),
    expect.objectContaining({
      nodeType: 'component',
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                height: '100%',
                backgroundColor: '#32AA88',
                borderLeftWidth: 12,
                borderRightWidth: 12,
                borderColor: '#98ADAA'
              },
              {
                left: 70,
                width: 220
              }
            ],
            children: expect.objectContaining({
              type: SizedHorizontallySymmetricalSafeAreaView,
              props: {
                top: true,
                bottom: true,
                left: true,
                right: true,
                width: 'fillsContainer',
                height: 'fillsContainer',
                children: expect.objectContaining({
                  type: ContainerFillingKeyboardAvoidingView,
                  props: {
                    children: expect.objectContaining({
                      type: Text,
                      props: {
                        children: 'Example Pop Over Content'
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  ])

  expect(
    (
      (
        renderer.toTree()
          ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('renders as expected without borders', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: null,
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: null,
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: null,
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: null,
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: null,
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: null,
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 320)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    }),
    expect.objectContaining({
      nodeType: 'component',
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                height: '100%',
                backgroundColor: '#CABA99'
              },
              {
                left: 70,
                width: 220
              }
            ],
            children: expect.objectContaining({
              type: SizedHorizontallySymmetricalSafeAreaView,
              props: {
                top: true,
                bottom: true,
                left: true,
                right: true,
                width: 'fillsContainer',
                height: 'fillsContainer',
                children: expect.objectContaining({
                  type: ContainerFillingKeyboardAvoidingView,
                  props: {
                    children: expect.objectContaining({
                      type: Text,
                      props: {
                        children: 'Example Pop Over Content'
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  ])

  expect(
    (
      (
        renderer.toTree()
          ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('renders as expected when invalid without borders', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: null,
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: null,
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: null,
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: null,
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: null,
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: null,
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid={false}
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 320)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: false
      }
    }),
    expect.objectContaining({
      nodeType: 'component',
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                height: '100%',
                backgroundColor: '#32AA88'
              },
              {
                left: 70,
                width: 220
              }
            ],
            children: expect.objectContaining({
              type: SizedHorizontallySymmetricalSafeAreaView,
              props: {
                top: true,
                bottom: true,
                left: true,
                right: true,
                width: 'fillsContainer',
                height: 'fillsContainer',
                children: expect.objectContaining({
                  type: ContainerFillingKeyboardAvoidingView,
                  props: {
                    children: expect.objectContaining({
                      type: Text,
                      props: {
                        children: 'Example Pop Over Content'
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  ])

  expect(
    (
      (
        renderer.toTree()
          ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('renders as expected without radius', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 0,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 0,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 0,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 0,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 0,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 0,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 45, 220, 20, 70, 320)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    }),
    expect.objectContaining({
      nodeType: 'component',
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                height: '100%',
                backgroundColor: '#CABA99',
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderColor: '#646464'
              },
              {
                left: 70,
                width: 220
              }
            ],
            children: expect.objectContaining({
              type: SizedHorizontallySymmetricalSafeAreaView,
              props: {
                top: true,
                bottom: true,
                left: true,
                right: true,
                width: 'fillsContainer',
                height: 'fillsContainer',
                children: expect.objectContaining({
                  type: ContainerFillingKeyboardAvoidingView,
                  props: {
                    children: expect.objectContaining({
                      type: Text,
                      props: {
                        children: 'Example Pop Over Content'
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  ])

  expect(
    (
      (
        renderer.toTree()
          ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('renders as expected when invalid without radius', async () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 0,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 0,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 0,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 0,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 0,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 0,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid={false}
        disabled={false}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onMeasure'
    ](123, 456, 220, 20, 70, 320)
  })

  await TestRenderer.act(() => {
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  expect(renderer.toTree()?.rendered).toEqual([
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: false
      }
    }),
    expect.objectContaining({
      nodeType: 'component',
      type: SimpleModal,
      props: expect.objectContaining({
        onClose: expect.any(Function),
        children: expect.objectContaining({
          type: View,
          props: {
            style: [
              {
                height: '100%',
                backgroundColor: '#32AA88',
                borderLeftWidth: 12,
                borderRightWidth: 12,
                borderColor: '#98ADAA'
              },
              {
                left: 70,
                width: 220
              }
            ],
            children: expect.objectContaining({
              type: SizedHorizontallySymmetricalSafeAreaView,
              props: {
                top: true,
                bottom: true,
                left: true,
                right: true,
                width: 'fillsContainer',
                height: 'fillsContainer',
                children: expect.objectContaining({
                  type: ContainerFillingKeyboardAvoidingView,
                  props: {
                    children: expect.objectContaining({
                      type: Text,
                      props: {
                        children: 'Example Pop Over Content'
                      }
                    })
                  }
                })
              }
            })
          }
        })
      })
    })
  ])

  expect(
    (
      (
        renderer.toTree()
          ?.rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})

test('allows introspection when used in a higher-order component', () => {
  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const RightIcon = jest.fn()

  const FullHeightPopoverComponent = createFullHeightPopoverComponent(
    controlStyle,
    RightIcon
  )

  const ParentComponent: React.FunctionComponent = () => (
    <FullHeightPopoverComponent
      label="Example Button Content"
      placeholder="Example Placeholder"
      valid
      disabled={false}
    >
      {() => <Text>Example Pop Over Content</Text>}
    </FullHeightPopoverComponent>
  )

  const rendered = <ParentComponent />

  expect(
    unwrapRenderedFunctionComponent(rendered).type
  ).toBeAFunctionWithTheStaticProperties({
    fullHeightPopover: { controlStyle, rightIcon: RightIcon }
  })
  expect(RightIcon).not.toHaveBeenCalled()
})

test('treats disabled undefined as disabled false', () => {
  Dimensions.set({
    window: {
      width: 640,
      height: 480,
      scale: 2.42,
      fontScale: 3.51
    }
  })

  const controlStyle: ControlStyle = {
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: '#FFEE00',
      placeholderColor: '#E7AA32',
      backgroundColor: '#32AE12',
      radius: 5,
      border: {
        width: 4,
        color: '#FF00FF'
      },
      iconColor: '#43AE21'
    },
    blurredInvalid: {
      textColor: '#99FE88',
      placeholderColor: '#CACA3A',
      backgroundColor: '#259284',
      radius: 10,
      border: {
        width: 6,
        color: '#9A9A8E'
      },
      iconColor: '#985E00'
    },
    focusedValid: {
      textColor: '#55EA13',
      placeholderColor: '#273346',
      backgroundColor: '#CABA99',
      radius: 3,
      border: {
        width: 5,
        color: '#646464'
      },
      iconColor: '#789521'
    },
    focusedInvalid: {
      textColor: '#ABAADE',
      placeholderColor: '#47ADAD',
      backgroundColor: '#32AA88',
      radius: 47,
      border: {
        width: 12,
        color: '#98ADAA'
      },
      iconColor: '#449438'
    },
    disabledValid: {
      textColor: '#AE2195',
      placeholderColor: '#FFAAEE',
      backgroundColor: '#772728',
      radius: 100,
      border: {
        width: 14,
        color: '#5E5E5E'
      },
      iconColor: '#ADAADA'
    },
    disabledInvalid: {
      textColor: '#340297',
      placeholderColor: '#233832',
      backgroundColor: '#938837',
      radius: 2,
      border: {
        width: 19,
        color: '#573829'
      },
      iconColor: '#709709'
    }
  }

  const Component = createFullHeightPopoverComponent(controlStyle, null)

  const renderer = TestRenderer.create(
    <SafeAreaInsetsContext.Provider
      value={{ top: 16, bottom: 60, left: 53, right: 24 }}
    >
      <Component
        label="Example Button Content"
        placeholder="Example Placeholder"
        valid
        disabled={undefined}
      >
        {() => <Text>Example Pop Over Content</Text>}
      </Component>
    </SafeAreaInsetsContext.Provider>
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: {
        onMeasure: expect.any(Function),
        onPress: expect.any(Function),
        disabled: false,
        label: 'Example Button Content',
        placeholder: 'Example Placeholder',
        valid: true
      }
    })
  )

  expect(
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: { controlStyle }
  })

  renderer.unmount()
})
