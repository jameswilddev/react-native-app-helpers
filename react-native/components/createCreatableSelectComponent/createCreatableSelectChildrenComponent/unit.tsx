import * as React from 'react'
import {
  FlatList,
  type FlatListProps,
  type ListRenderItem,
  Text,
  View
} from 'react-native'
import * as TestRenderer from 'react-test-renderer'
import { createCreatableSelectChildrenComponent } from '.'
import {
  type ControlStyle,
  Hitbox,
  unwrapRenderedFunctionComponent
} from '../../../..'

type TestValue = 10 | 20 | 30 | 40

test('renders as expected with an absent selected value', () => {
  const Component = createCreatableSelectChildrenComponent<TestValue>({
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
  })
  const onChange = jest.fn()
  const onCreate = jest.fn()
  const close = jest.fn()
  const stub = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 40,
          label: 'Example Option D Label'
        },
        {
          value: 30,
          label: 'Example Option C Label'
        },
        {
          value: 10,
          label: 'Example Option A Label'
        }
      ]}
      selectedOption={null}
      placeholder="Example Placeholder"
      onChange={onChange}
      onCreate={onCreate}
      close={close}
      noMatchesText="Example No Matches Text"
      willCreateText="Example Will Create Text"
    />
  )

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: View,
    props: {
      style: { flex: 1 },
      children: [
        expect.objectContaining({
          type: FlatList,
          props: {
            style: { marginBottom: -6 },
            inverted: true,
            data: [
              {
                value: 10,
                label: 'Example Option A Label'
              },
              {
                value: 30,
                label: 'Example Option C Label'
              },
              {
                value: 40,
                label: 'Example Option D Label'
              }
            ],
            keyExtractor: expect.any(Function),
            renderItem: expect.any(Function),
            keyboardShouldPersistTaps: 'handled',
            ListEmptyComponent: expect.objectContaining({
              type: Text,
              props: {
                style: {
                  fontFamily: 'Example Font Family',
                  fontSize: 37,
                  lineHeight: 51.8,
                  color: '#273346',
                  paddingHorizontal: 29,
                  paddingVertical: 12
                },
                children: 'Example No Matches Text'
              }
            })
          }
        }),
        null,
        expect.objectContaining({
          props: {
            leftIcon: null,
            rightIcon: null,
            value: '',
            onChange: expect.any(Function),
            secureTextEntry: false,
            disabled: false,
            placeholder: 'Example Placeholder',
            onSubmit: expect.any(Function),
            context: null
          }
        })
      ]
    }
  })

  const flatListProps: FlatListProps<unknown> = (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props['children'][0].props

  expect(
    (flatListProps.keyExtractor as (item: unknown, index: number) => string)(
      {
        value: 30,
        label: 'Example Label'
      },
      123
    )
  ).toEqual('30')

  const unselectedItem = (flatListProps.renderItem as ListRenderItem<unknown>)({
    item: {
      value: 30,
      label: 'Example Label'
    },
    index: 123,
    separators: {
      highlight: stub,
      unhighlight: stub,
      updateProps: stub
    }
  })

  expect(unselectedItem).toMatchObject({
    type: Hitbox,
    props: {
      disabled: false,
      onPress: expect.any(Function),
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Label',
          style: {
            fontFamily: 'Example Font Family',
            fontSize: 37,
            lineHeight: 51.8,
            color: '#FFEE00',
            paddingHorizontal: 29,
            paddingVertical: 6
          }
        }
      })
    }
  })

  const inputType = (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props['children'][2].type

  expect(inputType).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle: {
        fontFamily: 'Example Font Family',
        fontSize: 37,
        paddingVertical: 12,
        paddingHorizontal: 29,
        blurredValid: {
          textColor: '#FFEE00',
          placeholderColor: '#E7AA32',
          backgroundColor: '#32AE12',
          radius: 0,
          border: null,
          iconColor: '#43AE21'
        },
        blurredInvalid: {
          textColor: '#99FE88',
          placeholderColor: '#CACA3A',
          backgroundColor: '#259284',
          radius: 0,
          border: null,
          iconColor: '#985E00'
        },
        focusedValid: {
          textColor: '#55EA13',
          placeholderColor: '#273346',
          backgroundColor: '#CABA99',
          radius: 0,
          border: null,
          iconColor: '#789521'
        },
        focusedInvalid: {
          textColor: '#ABAADE',
          placeholderColor: '#47ADAD',
          backgroundColor: '#32AA88',
          radius: 0,
          border: null,
          iconColor: '#449438'
        },
        disabledValid: {
          textColor: '#AE2195',
          placeholderColor: '#FFAAEE',
          backgroundColor: '#772728',
          radius: 0,
          border: null,
          iconColor: '#ADAADA'
        },
        disabledInvalid: {
          textColor: '#340297',
          placeholderColor: '#233832',
          backgroundColor: '#938837',
          radius: 0,
          border: null,
          iconColor: '#709709'
        }
      },
      multiLine: false,
      autoComplete: 'off',
      keyboardType: 'default',
      autoFocus: true
    }
  })

  expect(inputType.inputComponent.stringify('Example Text')).toEqual(
    'Example Text'
  )

  expect(inputType.inputComponent.tryParse('')).toEqual('')
  expect(inputType.inputComponent.tryParse('   \n     \r     \t    ')).toEqual(
    ''
  )
  expect(
    inputType.inputComponent.tryParse(
      '   \n     \r     \t     \n  Example Text   \n \r    \t '
    )
  ).toEqual('Example Text')

  renderer.unmount()
  expect(onChange).not.toHaveBeenCalled()
  expect(onCreate).not.toHaveBeenCalled()
  expect(close).not.toHaveBeenCalled()
  expect(stub).not.toHaveBeenCalled()
})

test('renders as expected with a present selected value', () => {
  const Component = createCreatableSelectChildrenComponent<TestValue>({
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
  })
  const onChange = jest.fn()
  const onCreate = jest.fn()
  const close = jest.fn()
  const stub = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 40,
          label: 'Example Option D Label'
        },
        {
          value: 20,
          label: 'Example Option B Label'
        },
        {
          value: 30,
          label: 'Example Option C Label'
        },
        {
          value: 10,
          label: 'Example Option A Label'
        }
      ]}
      selectedOption={{
        value: 20,
        label: 'Example Option B Label'
      }}
      placeholder="Example Placeholder"
      onChange={onChange}
      onCreate={onCreate}
      close={close}
      noMatchesText="Example No Matches Text"
      willCreateText="Example Will Create Text"
    />
  )

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: View,
    props: {
      style: { flex: 1 },
      children: [
        expect.objectContaining({
          type: FlatList,
          props: {
            style: { marginBottom: -6 },
            inverted: true,
            data: [
              {
                value: 10,
                label: 'Example Option A Label'
              },
              {
                value: 20,
                label: 'Example Option B Label'
              },
              {
                value: 30,
                label: 'Example Option C Label'
              },
              {
                value: 40,
                label: 'Example Option D Label'
              }
            ],
            keyExtractor: expect.any(Function),
            renderItem: expect.any(Function),
            keyboardShouldPersistTaps: 'handled',
            ListEmptyComponent: expect.objectContaining({
              type: Text,
              props: {
                style: {
                  fontFamily: 'Example Font Family',
                  fontSize: 37,
                  lineHeight: 51.8,
                  color: '#273346',
                  paddingHorizontal: 29,
                  paddingVertical: 12
                },
                children: 'Example No Matches Text'
              }
            })
          }
        }),
        null,
        expect.objectContaining({
          props: {
            leftIcon: null,
            rightIcon: null,
            value: '',
            onChange: expect.any(Function),
            secureTextEntry: false,
            disabled: false,
            placeholder: 'Example Option B Label',
            onSubmit: expect.any(Function),
            context: null
          }
        })
      ]
    }
  })

  const flatListProps: FlatListProps<unknown> = (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props['children'][0].props

  expect(
    (flatListProps.keyExtractor as (item: unknown, index: number) => string)(
      {
        value: 30,
        label: 'Example Label'
      },
      123
    )
  ).toEqual('30')

  const unselectedItem = (flatListProps.renderItem as ListRenderItem<unknown>)({
    item: {
      value: 30,
      label: 'Example Label'
    },
    index: 123,
    separators: {
      highlight: stub,
      unhighlight: stub,
      updateProps: stub
    }
  })

  expect(unselectedItem).toMatchObject({
    type: Hitbox,
    props: {
      disabled: false,
      onPress: expect.any(Function),
      children: expect.objectContaining({
        type: Text,
        props: {
          children: 'Example Label',
          style: {
            fontFamily: 'Example Font Family',
            fontSize: 37,
            lineHeight: 51.8,
            color: '#FFEE00',
            paddingHorizontal: 29,
            paddingVertical: 6
          }
        }
      })
    }
  })

  const selectedItem = (flatListProps.renderItem as ListRenderItem<unknown>)({
    item: {
      value: 20,
      label: 'Example Label'
    },
    index: 123,
    separators: {
      highlight: stub,
      unhighlight: stub,
      updateProps: stub
    }
  })

  expect(selectedItem).toMatchObject({
    type: Text,
    props: {
      children: 'Example Label',
      style: {
        fontFamily: 'Example Font Family',
        fontSize: 37,
        lineHeight: 51.8,
        color: '#55EA13',
        paddingHorizontal: 29,
        paddingVertical: 6
      }
    }
  })

  const inputType = (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props['children'][2].type

  expect(inputType).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle: {
        fontFamily: 'Example Font Family',
        fontSize: 37,
        paddingVertical: 12,
        paddingHorizontal: 29,
        blurredValid: {
          textColor: '#FFEE00',
          placeholderColor: '#E7AA32',
          backgroundColor: '#32AE12',
          radius: 0,
          border: null,
          iconColor: '#43AE21'
        },
        blurredInvalid: {
          textColor: '#99FE88',
          placeholderColor: '#CACA3A',
          backgroundColor: '#259284',
          radius: 0,
          border: null,
          iconColor: '#985E00'
        },
        focusedValid: {
          textColor: '#55EA13',
          placeholderColor: '#273346',
          backgroundColor: '#CABA99',
          radius: 0,
          border: null,
          iconColor: '#789521'
        },
        focusedInvalid: {
          textColor: '#ABAADE',
          placeholderColor: '#47ADAD',
          backgroundColor: '#32AA88',
          radius: 0,
          border: null,
          iconColor: '#449438'
        },
        disabledValid: {
          textColor: '#AE2195',
          placeholderColor: '#FFAAEE',
          backgroundColor: '#772728',
          radius: 0,
          border: null,
          iconColor: '#ADAADA'
        },
        disabledInvalid: {
          textColor: '#340297',
          placeholderColor: '#233832',
          backgroundColor: '#938837',
          radius: 0,
          border: null,
          iconColor: '#709709'
        }
      },
      multiLine: false,
      autoComplete: 'off',
      keyboardType: 'default',
      autoFocus: true
    }
  })

  expect(inputType.inputComponent.stringify('Example Text')).toEqual(
    'Example Text'
  )

  expect(inputType.inputComponent.tryParse('')).toEqual('')
  expect(inputType.inputComponent.tryParse('   \n     \r     \t    ')).toEqual(
    ''
  )
  expect(
    inputType.inputComponent.tryParse(
      '   \n     \r     \t     \n  Example Text   \n \r    \t '
    )
  ).toEqual('Example Text')

  renderer.unmount()
  expect(onChange).not.toHaveBeenCalled()
  expect(onCreate).not.toHaveBeenCalled()
  expect(close).not.toHaveBeenCalled()
  expect(stub).not.toHaveBeenCalled()
})

test('renders as expected when exact matches are found for user input', async () => {
  const Component = createCreatableSelectChildrenComponent<TestValue>({
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
  })
  const onChange = jest.fn()
  const onCreate = jest.fn()
  const close = jest.fn()
  const stub = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 40,
          label: 'Example RED \n \r \n apple Option D Label'
        },
        {
          value: 20,
          label: 'Example Option B Label'
        },
        {
          value: 30,
          label: 'Example Option red \n \r \n APPLE C Label'
        },
        {
          value: 10,
          label: 'Example Option A Label'
        }
      ]}
      selectedOption={{
        value: 20,
        label: 'Example Option B Label'
      }}
      placeholder="Example Placeholder"
      onChange={onChange}
      onCreate={onCreate}
      close={close}
      noMatchesText="Example No Matches Text"
      willCreateText="Example Will Create Text"
    />
  )

  await TestRenderer.act(() => {
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props['children'][2].props.onChange(
      ' EXamPLE   \n OPTION \n  \t \r  ReD    \n \n \r \t  APPle \t \n \r  C label \n\n \r \t '
    )
  })

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: View,
    props: {
      style: { flex: 1 },
      children: [
        expect.objectContaining({
          type: FlatList,
          props: {
            style: { marginBottom: -6 },
            inverted: true,
            data: [
              {
                value: 30,
                label: 'Example Option red \n \r \n APPLE C Label'
              }
            ],
            keyExtractor: expect.any(Function),
            renderItem: expect.any(Function),
            keyboardShouldPersistTaps: 'handled',
            ListEmptyComponent: expect.objectContaining({
              type: Text,
              props: {
                style: {
                  fontFamily: 'Example Font Family',
                  fontSize: 37,
                  lineHeight: 51.8,
                  color: '#273346',
                  paddingHorizontal: 29,
                  paddingVertical: 12
                },
                children: 'Example No Matches Text'
              }
            })
          }
        }),
        null,
        expect.objectContaining({
          props: {
            leftIcon: null,
            rightIcon: null,
            value: ' EXamPLE   \n OPTION \n  \t \r  ReD    \n \n \r \t  APPle \t \n \r  C label \n\n \r \t ',
            onChange: expect.any(Function),
            secureTextEntry: false,
            disabled: false,
            placeholder: 'Example Option B Label',
            onSubmit: expect.any(Function),
            context: null
          }
        })
      ]
    }
  })

  renderer.unmount()
  expect(onChange).not.toHaveBeenCalled()
  expect(onCreate).not.toHaveBeenCalled()
  expect(close).not.toHaveBeenCalled()
  expect(stub).not.toHaveBeenCalled()
})

test('renders as expected when partial matches are found for user input', async () => {
  const Component = createCreatableSelectChildrenComponent<TestValue>({
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
  })
  const onChange = jest.fn()
  const onCreate = jest.fn()
  const close = jest.fn()
  const stub = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 40,
          label: 'Example RED \n \r \n apple Option D Label'
        },
        {
          value: 20,
          label: 'Example Option B Label'
        },
        {
          value: 30,
          label: 'Example Option red \n \r \n APPLE C Label'
        },
        {
          value: 10,
          label: 'Example Option A Label'
        }
      ]}
      selectedOption={{
        value: 20,
        label: 'Example Option B Label'
      }}
      placeholder="Example Placeholder"
      onChange={onChange}
      onCreate={onCreate}
      close={close}
      noMatchesText="Example No Matches Text"
      willCreateText="Example Will Create Text"
    />
  )

  await TestRenderer.act(() => {
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props['children'][2].props.onChange(
      '  \n  \t \r  ReD    \n \n \r \t  APPle \t \n \r'
    )
  })

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: View,
    props: {
      style: { flex: 1 },
      children: [
        expect.objectContaining({
          type: FlatList,
          props: {
            style: { marginBottom: -6 },
            inverted: true,
            data: [
              {
                value: 30,
                label: 'Example Option red \n \r \n APPLE C Label'
              },
              {
                value: 40,
                label: 'Example RED \n \r \n apple Option D Label'
              }
            ],
            keyExtractor: expect.any(Function),
            renderItem: expect.any(Function),
            keyboardShouldPersistTaps: 'handled',
            ListEmptyComponent: expect.objectContaining({
              type: Text,
              props: {
                style: {
                  fontFamily: 'Example Font Family',
                  fontSize: 37,
                  lineHeight: 51.8,
                  color: '#273346',
                  paddingHorizontal: 29,
                  paddingVertical: 12
                },
                children: 'Example No Matches Text'
              }
            })
          }
        }),
        expect.objectContaining({
          type: Text,
          props: {
            style: {
              color: '#273346',
              fontFamily: 'Example Font Family',
              fontSize: 37,
              lineHeight: 51.8,
              paddingHorizontal: 29,
              paddingTop: 12
            },
            children: 'Example Will Create Text'
          }
        }),
        expect.objectContaining({
          props: {
            leftIcon: null,
            rightIcon: null,
            value: '  \n  \t \r  ReD    \n \n \r \t  APPle \t \n \r',
            onChange: expect.any(Function),
            secureTextEntry: false,
            disabled: false,
            placeholder: 'Example Option B Label',
            onSubmit: expect.any(Function),
            context: null
          }
        })
      ]
    }
  })

  renderer.unmount()
  expect(onChange).not.toHaveBeenCalled()
  expect(onCreate).not.toHaveBeenCalled()
  expect(close).not.toHaveBeenCalled()
  expect(stub).not.toHaveBeenCalled()
})

test('renders as expected when matches are not found for user input', async () => {
  const Component = createCreatableSelectChildrenComponent<TestValue>({
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
  })
  const onChange = jest.fn()
  const onCreate = jest.fn()
  const close = jest.fn()
  const stub = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 40,
          label: 'Example RED \n \r \n apple Option D Label'
        },
        {
          value: 20,
          label: 'Example Option B Label'
        },
        {
          value: 30,
          label: 'Example Option red \n \r \n APPLE C Label'
        },
        {
          value: 10,
          label: 'Example Option A Label'
        }
      ]}
      selectedOption={{
        value: 20,
        label: 'Example Option B Label'
      }}
      placeholder="Example Placeholder"
      onChange={onChange}
      onCreate={onCreate}
      close={close}
      noMatchesText="Example No Matches Text"
      willCreateText="Example Will Create Text"
    />
  )

  await TestRenderer.act(() => {
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props['children'][2].props.onChange(
      '  \n  \t \r  GReeN    \n \n \r \t  APPle \t \n \r'
    )
  })

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: View,
    props: {
      style: { flex: 1 },
      children: [
        expect.objectContaining({
          type: FlatList,
          props: {
            style: { marginBottom: -6 },
            inverted: true,
            data: [],
            keyExtractor: expect.any(Function),
            renderItem: expect.any(Function),
            keyboardShouldPersistTaps: 'handled',
            ListEmptyComponent: expect.objectContaining({
              type: Text,
              props: {
                style: {
                  fontFamily: 'Example Font Family',
                  fontSize: 37,
                  lineHeight: 51.8,
                  color: '#273346',
                  paddingHorizontal: 29,
                  paddingVertical: 12
                },
                children: 'Example No Matches Text'
              }
            })
          }
        }),
        expect.objectContaining({
          type: Text,
          props: {
            style: {
              color: '#273346',
              fontFamily: 'Example Font Family',
              fontSize: 37,
              lineHeight: 51.8,
              paddingHorizontal: 29,
              paddingTop: 12
            },
            children: 'Example Will Create Text'
          }
        }),
        expect.objectContaining({
          props: {
            leftIcon: null,
            rightIcon: null,
            value: '  \n  \t \r  GReeN    \n \n \r \t  APPle \t \n \r',
            onChange: expect.any(Function),
            secureTextEntry: false,
            disabled: false,
            placeholder: 'Example Option B Label',
            onSubmit: expect.any(Function),
            context: null
          }
        })
      ]
    }
  })

  renderer.unmount()
  expect(onChange).not.toHaveBeenCalled()
  expect(onCreate).not.toHaveBeenCalled()
  expect(close).not.toHaveBeenCalled()
  expect(stub).not.toHaveBeenCalled()
})

test('does nothing when user input is invalid', () => {
  const Component = createCreatableSelectChildrenComponent<TestValue>({
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
  })
  const onChange = jest.fn()
  const onCreate = jest.fn()
  const close = jest.fn()
  const stub = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 40,
          label: 'Example RED \n \r \n apple Option D Label'
        },
        {
          value: 20,
          label: 'Example Option B Label'
        },
        {
          value: 30,
          label: 'Example Option red \n \r \n APPLE C Label'
        },
        {
          value: 10,
          label: 'Example Option A Label'
        }
      ]}
      selectedOption={{
        value: 20,
        label: 'Example Option B Label'
      }}
      placeholder="Example Placeholder"
      onChange={onChange}
      onCreate={onCreate}
      close={close}
      noMatchesText="Example No Matches Text"
      willCreateText="Example Will Create Text"
    />
  );

  (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props['children'][2].props.onChange(undefined)

  renderer.unmount()
  expect(onChange).not.toHaveBeenCalled()
  expect(onCreate).not.toHaveBeenCalled()
  expect(close).not.toHaveBeenCalled()
  expect(stub).not.toHaveBeenCalled()
})

test('submits as expected when exact matches are found for user input', () => {
  const Component = createCreatableSelectChildrenComponent<TestValue>({
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
  })
  const onChange = jest.fn()
  const onCreate = jest.fn()
  const close = jest.fn()
  const stub = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 40,
          label: 'Example RED \n \r \n apple Option D Label'
        },
        {
          value: 20,
          label: 'Example Option B Label'
        },
        {
          value: 30,
          label: 'Example Option red \n \r \n APPLE C Label'
        },
        {
          value: 10,
          label: 'Example Option A Label'
        }
      ]}
      selectedOption={{
        value: 20,
        label: 'Example Option B Label'
      }}
      placeholder="Example Placeholder"
      onChange={onChange}
      onCreate={onCreate}
      close={close}
      noMatchesText="Example No Matches Text"
      willCreateText="Example Will Create Text"
    />
  );

  (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props['children'][2].props.onSubmit(
    ' EXamPLE   \n OPTION \n  \t \r  ReD    \n \n \r \t  APPle \t \n \r  C label \n\n \r \t '
  )

  renderer.unmount()
  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(30)
  expect(onCreate).not.toHaveBeenCalled()
  expect(close).toHaveBeenCalledTimes(1)
  expect(stub).not.toHaveBeenCalled()
})

test('submits as expected when partial matches are found for user input', () => {
  const Component = createCreatableSelectChildrenComponent<TestValue>({
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
  })
  const onChange = jest.fn()
  const onCreate = jest.fn()
  const close = jest.fn()
  const stub = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 40,
          label: 'Example RED \n \r \n apple Option D Label'
        },
        {
          value: 20,
          label: 'Example Option B Label'
        },
        {
          value: 30,
          label: 'Example Option red \n \r \n APPLE C Label'
        },
        {
          value: 10,
          label: 'Example Option A Label'
        }
      ]}
      selectedOption={{
        value: 20,
        label: 'Example Option B Label'
      }}
      placeholder="Example Placeholder"
      onChange={onChange}
      onCreate={onCreate}
      close={close}
      noMatchesText="Example No Matches Text"
      willCreateText="Example Will Create Text"
    />
  );

  (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props['children'][2].props.onSubmit(
    '  \n  \t \r  ReD    \n \n \r \t  APPle \t \n \r'
  )

  renderer.unmount()
  expect(onChange).not.toHaveBeenCalled()
  expect(onCreate).toHaveBeenCalledTimes(1)
  expect(onCreate).toHaveBeenCalledWith(
    '  \n  \t \r  ReD    \n \n \r \t  APPle \t \n \r'
  )
  expect(close).toHaveBeenCalledTimes(1)
  expect(stub).not.toHaveBeenCalled()
})

test('submits as expected when matches are not found for user input', () => {
  const Component = createCreatableSelectChildrenComponent<TestValue>({
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
  })
  const onChange = jest.fn()
  const onCreate = jest.fn()
  const close = jest.fn()
  const stub = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 40,
          label: 'Example RED \n \r \n apple Option D Label'
        },
        {
          value: 20,
          label: 'Example Option B Label'
        },
        {
          value: 30,
          label: 'Example Option red \n \r \n APPLE C Label'
        },
        {
          value: 10,
          label: 'Example Option A Label'
        }
      ]}
      selectedOption={{
        value: 20,
        label: 'Example Option B Label'
      }}
      placeholder="Example Placeholder"
      onChange={onChange}
      onCreate={onCreate}
      close={close}
      noMatchesText="Example No Matches Text"
      willCreateText="Example Will Create Text"
    />
  );

  (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props['children'][2].props.onSubmit(
    '  \n  \t \r  GreeN    \n \n \r \t  APPle \t \n \r'
  )

  renderer.unmount()
  expect(onChange).not.toHaveBeenCalled()
  expect(onCreate).toHaveBeenCalledTimes(1)
  expect(onCreate).toHaveBeenCalledWith(
    '  \n  \t \r  GreeN    \n \n \r \t  APPle \t \n \r'
  )
  expect(close).toHaveBeenCalledTimes(1)
  expect(stub).not.toHaveBeenCalled()
})

test('accepts button presses within the flat list', () => {
  const Component = createCreatableSelectChildrenComponent<TestValue>({
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
  })
  const onChange = jest.fn()
  const onCreate = jest.fn()
  const close = jest.fn()
  const stub = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 40,
          label: 'Example Option D Label'
        },
        {
          value: 20,
          label: 'Example Option B Label'
        },
        {
          value: 30,
          label: 'Example Option C Label'
        },
        {
          value: 10,
          label: 'Example Option A Label'
        }
      ]}
      selectedOption={{
        value: 20,
        label: 'Example Option B Label'
      }}
      placeholder="Example Placeholder"
      onChange={onChange}
      onCreate={onCreate}
      close={close}
      noMatchesText="Example No Matches Text"
      willCreateText="Example Will Create Text"
    />
  )

  const flatListProps: FlatListProps<unknown> = (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props['children'][0].props

  const unselectedItem = (flatListProps.renderItem as ListRenderItem<unknown>)({
    item: {
      value: 30,
      label: 'Example Label'
    },
    index: 123,
    separators: {
      highlight: stub,
      unhighlight: stub,
      updateProps: stub
    }
  })

  unselectedItem?.props.onPress()

  renderer.unmount()
  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(30)
  expect(onCreate).not.toHaveBeenCalled()
  expect(close).toHaveBeenCalledTimes(1)
  expect(stub).not.toHaveBeenCalled()
})

test('renders as expected when horizontal padding is not present', async () => {
  const Component = createCreatableSelectChildrenComponent<TestValue>({
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 0,
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
  })
  const onChange = jest.fn()
  const onCreate = jest.fn()
  const close = jest.fn()
  const stub = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 40,
          label: 'Example RED \n \r \n apple Option D Label'
        },
        {
          value: 20,
          label: 'Example Option B Label'
        },
        {
          value: 30,
          label: 'Example Option red \n \r \n APPLE C Label'
        },
        {
          value: 10,
          label: 'Example Option A Label'
        }
      ]}
      selectedOption={{
        value: 20,
        label: 'Example Option B Label'
      }}
      placeholder="Example Placeholder"
      onChange={onChange}
      onCreate={onCreate}
      close={close}
      noMatchesText="Example No Matches Text"
      willCreateText="Example Will Create Text"
    />
  )

  await TestRenderer.act(() => {
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props['children'][2].props.onChange(
      '  \n  \t \r  ReD    \n \n \r \t  APPle \t \n \r'
    )
  })

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: View,
    props: {
      style: { flex: 1 },
      children: [
        expect.objectContaining({
          type: FlatList,
          props: {
            style: { marginBottom: -6 },
            inverted: true,
            data: [
              {
                value: 30,
                label: 'Example Option red \n \r \n APPLE C Label'
              },
              {
                value: 40,
                label: 'Example RED \n \r \n apple Option D Label'
              }
            ],
            keyExtractor: expect.any(Function),
            renderItem: expect.any(Function),
            keyboardShouldPersistTaps: 'handled',
            ListEmptyComponent: expect.objectContaining({
              type: Text,
              props: {
                style: {
                  fontFamily: 'Example Font Family',
                  fontSize: 37,
                  lineHeight: 51.8,
                  color: '#273346',
                  paddingVertical: 12
                },
                children: 'Example No Matches Text'
              }
            })
          }
        }),
        expect.objectContaining({
          type: Text,
          props: {
            style: {
              color: '#273346',
              fontFamily: 'Example Font Family',
              fontSize: 37,
              lineHeight: 51.8,
              paddingTop: 12
            },
            children: 'Example Will Create Text'
          }
        }),
        expect.objectContaining({
          props: {
            leftIcon: null,
            rightIcon: null,
            value: '  \n  \t \r  ReD    \n \n \r \t  APPle \t \n \r',
            onChange: expect.any(Function),
            secureTextEntry: false,
            disabled: false,
            placeholder: 'Example Option B Label',
            onSubmit: expect.any(Function),
            context: null
          }
        })
      ]
    }
  })

  renderer.unmount()
  expect(onChange).not.toHaveBeenCalled()
  expect(onCreate).not.toHaveBeenCalled()
  expect(close).not.toHaveBeenCalled()
  expect(stub).not.toHaveBeenCalled()
})

test('renders as expected when vertical padding is not present', async () => {
  const Component = createCreatableSelectChildrenComponent<TestValue>({
    fontFamily: 'Example Font Family',
    fontSize: 37,
    paddingVertical: 0,
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
  })
  const onChange = jest.fn()
  const onCreate = jest.fn()
  const close = jest.fn()
  const stub = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 40,
          label: 'Example RED \n \r \n apple Option D Label'
        },
        {
          value: 20,
          label: 'Example Option B Label'
        },
        {
          value: 30,
          label: 'Example Option red \n \r \n APPLE C Label'
        },
        {
          value: 10,
          label: 'Example Option A Label'
        }
      ]}
      selectedOption={{
        value: 20,
        label: 'Example Option B Label'
      }}
      placeholder="Example Placeholder"
      onChange={onChange}
      onCreate={onCreate}
      close={close}
      noMatchesText="Example No Matches Text"
      willCreateText="Example Will Create Text"
    />
  )

  await TestRenderer.act(() => {
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props['children'][2].props.onChange(
      '  \n  \t \r  ReD    \n \n \r \t  APPle \t \n \r'
    )
  })

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: View,
    props: {
      style: { flex: 1 },
      children: [
        expect.objectContaining({
          type: FlatList,
          props: {
            inverted: true,
            data: [
              {
                value: 30,
                label: 'Example Option red \n \r \n APPLE C Label'
              },
              {
                value: 40,
                label: 'Example RED \n \r \n apple Option D Label'
              }
            ],
            keyExtractor: expect.any(Function),
            renderItem: expect.any(Function),
            keyboardShouldPersistTaps: 'handled',
            ListEmptyComponent: expect.objectContaining({
              type: Text,
              props: {
                style: {
                  fontFamily: 'Example Font Family',
                  fontSize: 37,
                  lineHeight: 51.8,
                  color: '#273346',
                  paddingHorizontal: 29
                },
                children: 'Example No Matches Text'
              }
            })
          }
        }),
        expect.objectContaining({
          type: Text,
          props: {
            style: {
              color: '#273346',
              fontFamily: 'Example Font Family',
              fontSize: 37,
              lineHeight: 51.8,
              paddingHorizontal: 29
            },
            children: 'Example Will Create Text'
          }
        }),
        expect.objectContaining({
          props: {
            leftIcon: null,
            rightIcon: null,
            value: '  \n  \t \r  ReD    \n \n \r \t  APPle \t \n \r',
            onChange: expect.any(Function),
            secureTextEntry: false,
            disabled: false,
            placeholder: 'Example Option B Label',
            onSubmit: expect.any(Function),
            context: null
          }
        })
      ]
    }
  })

  renderer.unmount()
  expect(onChange).not.toHaveBeenCalled()
  expect(onCreate).not.toHaveBeenCalled()
  expect(close).not.toHaveBeenCalled()
  expect(stub).not.toHaveBeenCalled()
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

  const CreatableSelectChildrenComponent =
    createCreatableSelectChildrenComponent(controlStyle)

  const ParentComponent: React.FunctionComponent = () => (
    <CreatableSelectChildrenComponent
      options={[
        {
          value: 40,
          label: 'Example Option D Label'
        },
        {
          value: 30,
          label: 'Example Option C Label'
        },
        {
          value: 10,
          label: 'Example Option A Label'
        }
      ]}
      selectedOption={null}
      placeholder="Example Placeholder"
      onChange={jest.fn()}
      onCreate={jest.fn()}
      close={jest.fn()}
      noMatchesText="Example No Matches Text"
      willCreateText="Example Will Create Text"
    />
  )

  const rendered = <ParentComponent />

  expect(
    unwrapRenderedFunctionComponent(rendered).type
  ).toBeAFunctionWithTheStaticProperties({
    creatableSelectChildren: { controlStyle }
  })
})
