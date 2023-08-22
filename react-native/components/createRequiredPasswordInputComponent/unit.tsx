import * as React from 'react'
import { Text } from 'react-native'
import {
  createRequiredPasswordInputComponent,
  type ControlStyle,
  unwrapRenderedFunctionComponent
} from '../../..'

test('renders as expected without bounds', () => {
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
  const onChange = jest.fn()
  const Component = createRequiredPasswordInputComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    null,
    null
  )

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value="Example String"
      onChange={onChange}
      disabled
      placeholder="Example Placeholder"
      match="Example Match"
    />
  )

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle,
      multiLine: false,
      autoComplete: 'off',
      keyboardType: 'default',
      autoFocus: false,
      keepFocusOnSubmit: false
    }
  })

  expect(rendered.props).toEqual({
    leftIcon: <Text>Example Left Icon</Text>,
    rightIcon: <Text>Example Right Icon</Text>,
    value: 'Example String',
    onChange,
    disabled: true,
    placeholder: 'Example Placeholder',
    context: 'Example Match',
    secureTextEntry: true,
    onSubmit: expect.any(Function)
  })

  expect(rendered.type.inputComponent.stringify('Example String')).toEqual(
    'Example String'
  )

  expect(rendered.type.inputComponent.tryParse('', null)).toBeUndefined()
  expect(rendered.type.inputComponent.tryParse('Example String', null)).toEqual(
    'Example String'
  )
  expect(
    rendered.type.inputComponent.tryParse('', 'Example Match')
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('Example Match', 'Example Match')
  ).toEqual('Example Match')
  expect(
    rendered.type.inputComponent.tryParse('Example Non-Match', 'Example Match')
  ).toBeUndefined()

  rendered.props.onSubmit()

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with a minimum length', () => {
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
  const onChange = jest.fn()
  const Component = createRequiredPasswordInputComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    3,
    null
  )

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value="Example String"
      onChange={onChange}
      disabled
      placeholder="Example Placeholder"
      match="Example Match"
    />
  )

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle,
      multiLine: false,
      autoComplete: 'off',
      keyboardType: 'default',
      autoFocus: false,
      keepFocusOnSubmit: false
    }
  })

  expect(rendered.props).toEqual({
    leftIcon: <Text>Example Left Icon</Text>,
    rightIcon: <Text>Example Right Icon</Text>,
    value: 'Example String',
    onChange,
    disabled: true,
    placeholder: 'Example Placeholder',
    context: 'Example Match',
    secureTextEntry: true,
    onSubmit: expect.any(Function)
  })

  expect(rendered.type.inputComponent.stringify('Example String')).toEqual(
    'Example String'
  )

  expect(rendered.type.inputComponent.tryParse('', null)).toBeUndefined()
  expect(rendered.type.inputComponent.tryParse('Example String', null)).toEqual(
    'Example String'
  )
  expect(rendered.type.inputComponent.tryParse('Sh', null)).toBeUndefined()
  expect(rendered.type.inputComponent.tryParse('Sht', null)).toEqual('Sht')
  expect(
    rendered.type.inputComponent.tryParse('', 'Example Match')
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('Example Match', 'Example Match')
  ).toEqual('Example Match')
  expect(
    rendered.type.inputComponent.tryParse('Example Non-Match', 'Example Match')
  ).toBeUndefined()

  rendered.props.onSubmit()

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with a maximum length', () => {
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
  const onChange = jest.fn()
  const Component = createRequiredPasswordInputComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    null,
    15
  )

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value="Example String"
      onChange={onChange}
      disabled
      placeholder="Example Placeholder"
      match="Example Match"
    />
  )

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle,
      multiLine: false,
      autoComplete: 'off',
      keyboardType: 'default',
      autoFocus: false,
      keepFocusOnSubmit: false
    }
  })

  expect(rendered.props).toEqual({
    leftIcon: <Text>Example Left Icon</Text>,
    rightIcon: <Text>Example Right Icon</Text>,
    value: 'Example String',
    onChange,
    disabled: true,
    placeholder: 'Example Placeholder',
    context: 'Example Match',
    secureTextEntry: true,
    onSubmit: expect.any(Function)
  })

  expect(rendered.type.inputComponent.stringify('Example String')).toEqual(
    'Example String'
  )

  expect(rendered.type.inputComponent.tryParse('', null)).toBeUndefined()
  expect(rendered.type.inputComponent.tryParse('Example String', null)).toEqual(
    'Example String'
  )
  expect(
    rendered.type.inputComponent.tryParse('Example   String', null)
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('Example  String', null)
  ).toEqual('Example  String')
  expect(
    rendered.type.inputComponent.tryParse('', 'Example Match')
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('Example Match', 'Example Match')
  ).toEqual('Example Match')
  expect(
    rendered.type.inputComponent.tryParse('Example Non-Match', 'Example Match')
  ).toBeUndefined()

  rendered.props.onSubmit()

  expect(onChange).not.toHaveBeenCalled()
})
