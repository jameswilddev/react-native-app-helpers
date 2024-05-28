import * as React from 'react'
import { Text } from 'react-native'
import {
  createRequiredEmailInputComponent,
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
  const Component = createRequiredEmailInputComponent(
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
      unique={['Example Unique A', 'Example Unique B', 'Example Unique C']}
      autoFocus={false}
    />
  )

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle,
      multiLine: false,
      autoComplete: 'email',
      keyboardType: 'email-address',
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
    context: ['Example Unique A', 'Example Unique B', 'Example Unique C'],
    secureTextEntry: false,
    onSubmit: expect.any(Function),
    autoFocus: false
  })

  expect(
    rendered.type.inputComponent.stringify(
      '  \n   \r  \t  EXAmple@St \t  \r  \n r.ing \n \r \t'
    )
  ).toEqual('example@str.ing')

  expect(
    rendered.type.inputComponent.tryParse('', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse(' \n \r \t ', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      '',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse(' \n \r \t ', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      '',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse(
      '  \n   \r  \t  uniq@U.e \t  \r  \n B \n \r \t',
      [
        ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
      ]
    )
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('Example Non-Email', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('Example@Str.ing', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toEqual('example@str.ing')
  expect(
    rendered.type.inputComponent.tryParse(
      '  \n   \r  \t  Exam@ple \t  \r  \n Str.ing \n \r \t',
      [
        ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
      ]
    )
  ).toEqual('exam@plestr.ing')

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
  const Component = createRequiredEmailInputComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    15,
    null
  )

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value="Example String"
      onChange={onChange}
      disabled
      placeholder="Example Placeholder"
      unique={['Example Unique A', 'Example Unique B', 'Example Unique C']}
      autoFocus={false}
    />
  )

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle,
      multiLine: false,
      autoComplete: 'email',
      keyboardType: 'email-address',
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
    context: ['Example Unique A', 'Example Unique B', 'Example Unique C'],
    secureTextEntry: false,
    onSubmit: expect.any(Function),
    autoFocus: false
  })

  expect(
    rendered.type.inputComponent.stringify(
      '  \n   \r  \t  EXAmple@St \t  \r  \n r.ing \n \r \t'
    )
  ).toEqual('example@str.ing')

  expect(
    rendered.type.inputComponent.tryParse('', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse(' \n \r \t ', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      '',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse(' \n \r \t ', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      '',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse(
      '  \n   \r  \t  uniq@U.e \t  \r  \n B \n \r \t',
      [
        ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
      ]
    )
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('Example Non-Email', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('Example@Str.ing', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toEqual('example@str.ing')
  expect(
    rendered.type.inputComponent.tryParse(
      '  \n   \r  \t  Exam@ple \t  \r  \n Str.ing \n \r \t',
      [
        ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
      ]
    )
  ).toEqual('exam@plestr.ing')
  expect(
    rendered.type.inputComponent.tryParse('Ex-ample@Str.ing', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toEqual('ex-ample@str.ing')
  expect(
    rendered.type.inputComponent.tryParse(
      '  \n   \r  \t  Ex-am@ple \t  \r  \n Str.ing \n \r \t',
      [
        ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
      ]
    )
  ).toEqual('ex-am@plestr.ing')
  expect(
    rendered.type.inputComponent.tryParse('Exampl@Str.ing', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse(
      '  \n   \r  \t  Exa@ple \t  \r  \n Str.ing \n \r \t',
      [
        ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
      ]
    )
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
  const Component = createRequiredEmailInputComponent(
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
      unique={['Example Unique A', 'Example Unique B', 'Example Unique C']}
      autoFocus={false}
    />
  )

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle,
      multiLine: false,
      autoComplete: 'email',
      keyboardType: 'email-address',
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
    context: ['Example Unique A', 'Example Unique B', 'Example Unique C'],
    secureTextEntry: false,
    onSubmit: expect.any(Function),
    autoFocus: false
  })

  expect(
    rendered.type.inputComponent.stringify(
      '  \n   \r  \t  EXAmple@St \t  \r  \n r.ing \n \r \t'
    )
  ).toEqual('example@str.ing')

  expect(
    rendered.type.inputComponent.tryParse('', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse(' \n \r \t ', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      '',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse(' \n \r \t ', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      '',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse(
      '  \n   \r  \t  uniq@U.e \t  \r  \n B \n \r \t',
      [
        ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
      ]
    )
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('Example Non-Email', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('Example@Str.ing', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toEqual('example@str.ing')
  expect(
    rendered.type.inputComponent.tryParse(
      '  \n   \r  \t  Exam@ple \t  \r  \n Str.ing \n \r \t',
      [
        ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
      ]
    )
  ).toEqual('exam@plestr.ing')
  expect(
    rendered.type.inputComponent.tryParse('Ex-ample@Str.ing', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse(
      '  \n   \r  \t  Ex-am@ple \t  \r  \n Str.ing \n \r \t',
      [
        ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
      ]
    )
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('Exampl@Str.ing', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toEqual('exampl@str.ing')
  expect(
    rendered.type.inputComponent.tryParse(
      '  \n   \r  \t  Exa@ple \t  \r  \n Str.ing \n \r \t',
      [
        ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
      ]
    )
  ).toEqual('exa@plestr.ing')

  rendered.props.onSubmit()

  expect(onChange).not.toHaveBeenCalled()
})

test('renders as expected with auto focus', () => {
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
  const Component = createRequiredEmailInputComponent(
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
      unique={['Example Unique A', 'Example Unique B', 'Example Unique C']}
      autoFocus={true}
    />
  )

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle,
      multiLine: false,
      autoComplete: 'email',
      keyboardType: 'email-address',
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
    context: ['Example Unique A', 'Example Unique B', 'Example Unique C'],
    secureTextEntry: false,
    onSubmit: expect.any(Function),
    autoFocus: true
  })

  expect(
    rendered.type.inputComponent.stringify(
      '  \n   \r  \t  EXAmple@St \t  \r  \n r.ing \n \r \t'
    )
  ).toEqual('example@str.ing')

  expect(
    rendered.type.inputComponent.tryParse('', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse(' \n \r \t ', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      '',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse(' \n \r \t ', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      '',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse(
      '  \n   \r  \t  uniq@U.e \t  \r  \n B \n \r \t',
      [
        ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
      ]
    )
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('Example Non-Email', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toBeUndefined()
  expect(
    rendered.type.inputComponent.tryParse('Example@Str.ing', [
      ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
      ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
    ])
  ).toEqual('example@str.ing')
  expect(
    rendered.type.inputComponent.tryParse(
      '  \n   \r  \t  Exam@ple \t  \r  \n Str.ing \n \r \t',
      [
        ' \t \r \n  Uniq@u.e \t \t \n A  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n B  \n \r \t   ',
        ' \t \r \n  Uniq@u.e \t \t \n C  \n \r \t   '
      ]
    )
  ).toEqual('exam@plestr.ing')

  rendered.props.onSubmit()

  expect(onChange).not.toHaveBeenCalled()
})
