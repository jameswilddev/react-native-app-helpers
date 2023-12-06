import * as React from 'react'
import { Text, TextInput, View } from 'react-native'
import * as TestRenderer from 'react-test-renderer'
import {
  createInputComponent,
  unwrapRenderedFunctionComponent
} from '../../..'

test('renders as expected with a value', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected without a value', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#259284',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 6,
          borderColor: '#9A9A8E',
          borderRadius: 10,
          margin: -2
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#99FE88',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: '',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#CACA3A',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected when disabled with a value', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#772728',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 14,
          borderColor: '#5E5E5E',
          borderRadius: 100,
          margin: -10
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#AE2195',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: false,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#FFAAEE',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected when disabled without a value', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#938837',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 19,
          borderColor: '#573829',
          borderRadius: 2,
          margin: -15
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#340297',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: '',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: false,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#233832',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('can be focused when valid', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#CABA99',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: '#646464',
          borderRadius: 3,
          margin: -1
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#55EA13',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#273346',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('can be focused when invalid', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AA88',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 12,
          borderColor: '#98ADAA',
          borderRadius: 47,
          margin: -8
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#ABAADE',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: '',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#47ADAD',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('can be blurred', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onBlur']()
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('can be disabled during edit', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onChangeText']('qze')
  })

  renderer.update(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#772728',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 14,
          borderColor: '#5E5E5E',
          borderRadius: 100,
          margin: -10
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#AE2195',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: false,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#FFAAEE',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(undefined, false)
  expect(onSubmit).not.toHaveBeenCalled()
})

test('can be disabled during edit when starting invalid', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onChangeText']('qze')
  })

  renderer.update(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#938837',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 19,
          borderColor: '#573829',
          borderRadius: 2,
          margin: -15
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#340297',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: '',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: false,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#233832',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(undefined, false)
  expect(onSubmit).not.toHaveBeenCalled()
})

test('can be re-enabled following edit', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onChangeText']('GGG')
  })

  renderer.update(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  renderer.update(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(3, false)
  expect(onSubmit).not.toHaveBeenCalled()
})

test('does not lose pending changes on update', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onChangeText']('GGG')
  })

  renderer.update(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Updated Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#CABA99',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: '#646464',
          borderRadius: 3,
          margin: -1
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#55EA13',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Updated Placeholder',
              placeholderTextColor: '#273346',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(3, false)
  expect(onSubmit).not.toHaveBeenCalled()
})

test('resets the value on external changes', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  renderer.update(
    <Component
      value={4}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('ignores external changes to the value when an edit is in progress', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onChangeText']('GGG')
  })

  renderer.update(
    <Component
      value={4}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#CABA99',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: '#646464',
          borderRadius: 3,
          margin: -1
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#55EA13',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#273346',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(3, false)
  expect(onSubmit).not.toHaveBeenCalled()
})

test('allows valid incomplete edits', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onChangeText']('GGG')
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#CABA99',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: '#646464',
          borderRadius: 3,
          margin: -1
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#55EA13',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#273346',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(3, false)
  expect(onSubmit).not.toHaveBeenCalled()
})

test('allows valid incomplete edits', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onEndEditing']({
      nativeEvent: {
        text: 'GGG'
      }
    })
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#CABA99',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: '#646464',
          borderRadius: 3,
          margin: -1
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#55EA13',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#273346',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(3, true)
  expect(onSubmit).not.toHaveBeenCalled()
})

test('allows valid incomplete edits', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onSubmitEditing']({
      nativeEvent: {
        text: 'GGG'
      }
    })
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#CABA99',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: '#646464',
          borderRadius: 3,
          margin: -1
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#55EA13',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#273346',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(onSubmit).toHaveBeenCalledWith(3)
})

test('allows invalid incomplete edits', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onChangeText']('qyz')
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AA88',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 12,
          borderColor: '#98ADAA',
          borderRadius: 47,
          margin: -8
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#ABAADE',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'qyz',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#47ADAD',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(undefined, false)
  expect(onSubmit).not.toHaveBeenCalled()
})

test('allows invalid incomplete edits', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onEndEditing']({
      nativeEvent: {
        text: 'qyz'
      }
    })
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AA88',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 12,
          borderColor: '#98ADAA',
          borderRadius: 47,
          margin: -8
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#ABAADE',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'qyz',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#47ADAD',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(undefined, true)
  expect(onSubmit).not.toHaveBeenCalled()
})

test('allows invalid incomplete edits', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onSubmitEditing']({
      nativeEvent: {
        text: 'qyz'
      }
    })
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AA88',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 12,
          borderColor: '#98ADAA',
          borderRadius: 47,
          margin: -8
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#ABAADE',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'qyz',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#47ADAD',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected when the border width does not change', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
          width: 4,
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#259284',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#9A9A8E',
          borderRadius: 10
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#99FE88',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: '',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#CACA3A',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('passes down secureTextEntry', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: true,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders with a left icon', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={<Text>Left Icon</Text>}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Left Icon'
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingLeft: 29,
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders with a right icon', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={<Text>Right Icon</Text>}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingRight: 29,
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Right Icon'
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders with left and right icons', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={<Text>Left Icon</Text>}
      rightIcon={<Text>Right Icon</Text>}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Left Icon'
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingHorizontal: 29,
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Right Icon'
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected with a left icon without a value', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={<Text>Left Icon</Text>}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#259284',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 6,
          borderColor: '#9A9A8E',
          borderRadius: 10,
          margin: -2
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Left Icon'
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#99FE88',
                paddingVertical: 12,
                paddingLeft: 29,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: '',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#CACA3A',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected with a left icon without a value', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={<Text>Right Icon</Text>}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#259284',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 6,
          borderColor: '#9A9A8E',
          borderRadius: 10,
          margin: -2
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#99FE88',
                paddingVertical: 12,
                paddingRight: 29,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: '',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#CACA3A',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Right Icon'
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected with left and right icons without a value', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={<Text>Left Icon</Text>}
      rightIcon={<Text>Right Icon</Text>}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#259284',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 6,
          borderColor: '#9A9A8E',
          borderRadius: 10,
          margin: -2
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Left Icon'
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#99FE88',
                paddingVertical: 12,
                paddingHorizontal: 29,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: '',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#CACA3A',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Right Icon'
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected with a left icon when focused and valid', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={<Text>Left Icon</Text>}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[1] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#CABA99',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: '#646464',
          borderRadius: 3,
          margin: -1
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Left Icon'
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#55EA13',
                paddingVertical: 12,
                paddingLeft: 29,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#273346',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected with a right icon when focused and valid', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={<Text>Right Icon</Text>}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#CABA99',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: '#646464',
          borderRadius: 3,
          margin: -1
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#55EA13',
                paddingVertical: 12,
                paddingRight: 29,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#273346',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Right Icon'
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected with a right icon when focused and valid', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={<Text>Left Icon</Text>}
      rightIcon={<Text>Right Icon</Text>}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[1] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#CABA99',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 5,
          borderColor: '#646464',
          borderRadius: 3,
          margin: -1
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Left Icon'
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#55EA13',
                paddingVertical: 12,
                paddingHorizontal: 29,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#273346',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Right Icon'
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected with a left icon when focused and invalid', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={<Text>Left Icon</Text>}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[1] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AA88',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 12,
          borderColor: '#98ADAA',
          borderRadius: 47,
          margin: -8
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Left Icon'
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#ABAADE',
                paddingVertical: 12,
                paddingLeft: 29,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: '',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#47ADAD',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected with a right icon when focused and invalid', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={<Text>Right Icon</Text>}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[0] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AA88',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 12,
          borderColor: '#98ADAA',
          borderRadius: 47,
          margin: -8
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#ABAADE',
                paddingVertical: 12,
                paddingRight: 29,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: '',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#47ADAD',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Right Icon'
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected with left and right icons when focused and invalid', async () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={<Text>Left Icon</Text>}
      rightIcon={<Text>Right Icon</Text>}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  void TestRenderer.act(() => {
    (
      (
        (
          (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
            .rendered as TestRenderer.ReactTestRendererTree
        ).rendered as readonly TestRenderer.ReactTestRendererTree[]
      )[1] as TestRenderer.ReactTestRendererTree
    ).props['onFocus']()
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AA88',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 12,
          borderColor: '#98ADAA',
          borderRadius: 47,
          margin: -8
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Left Icon'
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#ABAADE',
                paddingVertical: 12,
                paddingHorizontal: 29,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: '',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#47ADAD',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Right Icon'
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders without horizontal padding', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders with a left icon without horizontal padding', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={<Text>Left Icon</Text>}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Left Icon'
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders with a right icon without horizontal padding', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={<Text>Right Icon</Text>}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Right Icon'
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders with left and right icons without horizontal padding', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={<Text>Left Icon</Text>}
      rightIcon={<Text>Right Icon</Text>}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Left Icon'
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Right Icon'
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected without vertical padding', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected without borders', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected when a state does not alter border thickness', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
          width: 4,
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#259284',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#9A9A8E',
          borderRadius: 10
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#99FE88',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: '',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#CACA3A',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected without a radius', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#FF00FF'
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders when disabled with a left icon', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled
      placeholder="Test Placeholder"
      leftIcon={<Text>Left Icon</Text>}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#772728',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 14,
          borderColor: '#5E5E5E',
          borderRadius: 100,
          margin: -10
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Left Icon'
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#AE2195',
                paddingLeft: 29,
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: false,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#FFAAEE',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders when disabled with a right icon', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={<Text>Right Icon</Text>}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#772728',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 14,
          borderColor: '#5E5E5E',
          borderRadius: 100,
          margin: -10
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#AE2195',
                paddingRight: 29,
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: false,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#FFAAEE',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Right Icon'
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders when disabled with left and right icons', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled
      placeholder="Test Placeholder"
      leftIcon={<Text>Left Icon</Text>}
      rightIcon={<Text>Right Icon</Text>}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#772728',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 14,
          borderColor: '#5E5E5E',
          borderRadius: 100,
          margin: -10
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Left Icon'
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#AE2195',
                paddingHorizontal: 29,
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: false,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#FFAAEE',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Right Icon'
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected when disabled with a left icon without a value', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled
      placeholder="Test Placeholder"
      leftIcon={<Text>Left Icon</Text>}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#938837',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 19,
          borderColor: '#573829',
          borderRadius: 2,
          margin: -15
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Left Icon'
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#340297',
                paddingVertical: 12,
                paddingLeft: 29,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: '',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: false,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#233832',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected when disabled with a right icon without a value', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={<Text>Right Icon</Text>}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#938837',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 19,
          borderColor: '#573829',
          borderRadius: 2,
          margin: -15
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#340297',
                paddingVertical: 12,
                paddingRight: 29,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: '',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: false,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#233832',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Right Icon'
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected when disabled with left and right icons without a value', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled
      placeholder="Test Placeholder"
      leftIcon={<Text>Left Icon</Text>}
      rightIcon={<Text>Right Icon</Text>}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#938837',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 19,
          borderColor: '#573829',
          borderRadius: 2,
          margin: -15
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Left Icon'
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#340297',
                paddingVertical: 12,
                paddingHorizontal: 29,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: '',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: false,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#233832',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          }),
          expect.objectContaining({
            nodeType: 'component',
            type: Text,
            props: {
              children: 'Right Icon'
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('allows introspection when used in a higher-order component', () => {
  const stringify = jest.fn()
  const tryParse = jest.fn()
  const controlStyle = {
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
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const InputComponent = createInputComponent<number, ExampleContext>(
    stringify,
    tryParse,
    controlStyle,
    false,
    'email',
    'numeric',
    'sentences',
    true,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()
  const ParentComponent: React.FunctionComponent = () => (
    <InputComponent
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  const rendered = <ParentComponent />

  expect(
    unwrapRenderedFunctionComponent(rendered).type
  ).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify,
      tryParse,
      controlStyle,
      multiLine: false,
      autoComplete: 'email',
      keyboardType: 'numeric',
      autoCapitalize: 'sentences',
      autoFocus: true,
      keepFocusOnSubmit: false,
      alignment: 'left'
    }
  })
})

test('does nothing when auto-focus is enabled', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    true,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              onLayout: expect.any(Function),
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('focuses the text input on layout when the ref is ready', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    true,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  );

  (
    (
      (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).rendered as readonly TestRenderer.ReactTestRendererTree[]
  )[0]?.props['onLayout']()

  expect(
    (
      (
        (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
          .rendered as TestRenderer.ReactTestRendererTree
      ).rendered as readonly TestRenderer.ReactTestRendererTree[]
    )[0]?.instance.focus
  ).toHaveBeenCalledTimes(1)

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('does not focus the text input a second time', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    true,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  );

  (
    (
      (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).rendered as readonly TestRenderer.ReactTestRendererTree[]
  )[0]?.props['onLayout']();

  (
    (
      (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).rendered as readonly TestRenderer.ReactTestRendererTree[]
  )[0]?.props['onLayout']()

  expect(
    (
      (
        (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree)
          .rendered as TestRenderer.ReactTestRendererTree
      ).rendered as readonly TestRenderer.ReactTestRendererTree[]
    )[0]?.instance.focus
  ).toHaveBeenCalledTimes(1)

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected with a value when focus is to be retained', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    true,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected without a value when focus is to be retained', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    true,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={undefined}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#259284',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 6,
          borderColor: '#9A9A8E',
          borderRadius: 10,
          margin: -2
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#99FE88',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: '',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#CACA3A',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: false,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('treats disabled undefined as disabled false', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'left'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={undefined}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected when middle-aligned', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'middle'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37,
                textAlign: 'center'
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})

test('renders as expected when right-aligned', () => {
  interface ExampleContext {
    readonly character: string
    readonly regex: RegExp
  }
  const Component = createInputComponent<number, ExampleContext>(
    (value, context) => context.character.repeat(value),
    (value, context) =>
      context.regex.test(value) || value === ''
        ? undefined
        : value.split(context.character).length - 1,
    {
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
    },
    false,
    'email',
    'numeric',
    'sentences',
    false,
    false,
    'right'
  )
  const onChange = jest.fn()
  const onSubmit = jest.fn()

  const renderer = TestRenderer.create(
    <Component
      value={6}
      onChange={onChange}
      onSubmit={onSubmit}
      secureTextEntry={false}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={null}
      rightIcon={null}
      context={{
        regex: /[^G]/,
        character: 'G'
      }}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: 'component',
      type: View,
      props: expect.objectContaining({
        style: {
          backgroundColor: '#32AE12',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: '#FF00FF',
          borderRadius: 5
        }
      }),
      rendered: expect.objectContaining({
        rendered: [
          expect.objectContaining({
            nodeType: 'component',
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: '#FFEE00',
                paddingVertical: 12,
                fontFamily: 'Example Font Family',
                fontSize: 37,
                textAlign: 'right'
              },
              value: 'GGGGGG',
              multiline: false,
              scrollEnabled: false,
              autoComplete: 'email',
              secureTextEntry: false,
              keyboardType: 'numeric',
              autoCapitalize: 'sentences',
              editable: true,
              placeholder: 'Test Placeholder',
              placeholderTextColor: '#E7AA32',
              onChangeText: expect.any(Function),
              onEndEditing: expect.any(Function),
              onFocus: expect.any(Function),
              onBlur: expect.any(Function),
              blurOnSubmit: true,
              onSubmitEditing: expect.any(Function)
            }
          })
        ]
      })
    })
  )

  renderer.unmount()

  expect(onChange).not.toHaveBeenCalled()
  expect(onSubmit).not.toHaveBeenCalled()
})
