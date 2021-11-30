import * as React from "react";
import { Text } from "react-native";
import {
  createNullableTextAreaComponent,
  ControlStyle,
  unwrapRenderedFunctionComponent,
} from "../..";

test(`renders as expected without bounds`, () => {
  const controlStyle: ControlStyle = {
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 5,
      border: {
        width: 4,
        color: `#FF00FF`,
      },
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 6,
        color: `#9A9A8E`,
      },
    },
    focusedValid: {
      textColor: `#55EA13`,
      placeholderColor: `#273346`,
      backgroundColor: `#CABA99`,
      radius: 3,
      border: {
        width: 5,
        color: `#646464`,
      },
    },
    focusedInvalid: {
      textColor: `#ABAADE`,
      placeholderColor: `#47ADAD`,
      backgroundColor: `#32AA88`,
      radius: 47,
      border: {
        width: 12,
        color: `#98ADAA`,
      },
    },
    disabledValid: {
      textColor: `#AE2195`,
      placeholderColor: `#FFAAEE`,
      backgroundColor: `#772728`,
      radius: 100,
      border: {
        width: 14,
        color: `#5E5E5E`,
      },
    },
    disabledInvalid: {
      textColor: `#340297`,
      placeholderColor: `#233832`,
      backgroundColor: `#938837`,
      radius: 2,
      border: {
        width: 19,
        color: `#573829`,
      },
    },
  };
  const onChange = jest.fn();
  const Component = createNullableTextAreaComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    null,
    null
  );

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value="Example String"
      onChange={onChange}
      disabled
      placeholder="Example Placeholder"
    />
  );

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle,
      multiLine: true,
      autoComplete: `off`,
      keyboardType: `default`,
      autoFocus: false,
      keepFocusOnSubmit: true,
    },
  });

  expect(rendered.props).toEqual({
    leftIcon: <Text>Example Left Icon</Text>,
    rightIcon: <Text>Example Right Icon</Text>,
    value: `Example String`,
    onChange,
    disabled: true,
    placeholder: `Example Placeholder`,
    context: null,
    secureTextEntry: false,
    onSubmit: expect.any(Function),
  });

  expect(rendered.type.inputComponent.stringify(null)).toEqual(``);
  expect(
    rendered.type.inputComponent.stringify(
      `  \n   \r  \t  Example \t  \r  \n String \n \r \t`
    )
  ).toEqual(`Example\n\nString`);

  expect(
    rendered.type.inputComponent.stringify(
      `  \n   \r  \t  Example \t \t \t   \t String \n \r \t`
    )
  ).toEqual(`Example \t \t \t   \t String`);

  expect(
    rendered.type.inputComponent.stringify(
      `  \n   \r  \t  Example \r\n String \n \r \t`
    )
  ).toEqual(`Example\nString`);

  expect(
    rendered.type.inputComponent.stringify(
      `  \n   \r  \t  Example \r \n String \n \r \t`
    )
  ).toEqual(`Example\n\nString`);

  expect(
    rendered.type.inputComponent.stringify(
      `  \n   \r  \t  Example \n\n String \n \r \t`
    )
  ).toEqual(`Example\n\nString`);

  expect(
    rendered.type.inputComponent.stringify(
      `  \n   \r  \t  Example \n\n\n String \n \r \t`
    )
  ).toEqual(`Example\n\nString`);

  expect(
    rendered.type.inputComponent.stringify(
      `  \n   \r  \t  Example \n \n \n String \n \r \t`
    )
  ).toEqual(`Example\n\nString`);

  expect(rendered.type.inputComponent.tryParse(``, null)).toBeNull();
  expect(rendered.type.inputComponent.tryParse(` \n \r \t `, null)).toBeNull();
  expect(rendered.type.inputComponent.tryParse(``, null)).toBeNull();
  expect(rendered.type.inputComponent.tryParse(` \n \r \t `, null)).toBeNull();
  expect(rendered.type.inputComponent.tryParse(`Example String`, null)).toEqual(
    `Example String`
  );
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Example \t  \r  \n String \n \r \t`,
      null
    )
  ).toEqual(`Example\n\nString`);
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Example \t \t \t   \t String \n \r \t`,
      null
    )
  ).toEqual(`Example \t \t \t   \t String`);
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Example \r\n String \n \r \t`,
      null
    )
  ).toEqual(`Example\nString`);
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Example \r \n String \n \r \t`,
      null
    )
  ).toEqual(`Example\n\nString`);
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Example \n\n String \n \r \t`,
      null
    )
  ).toEqual(`Example\n\nString`);
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Example \n\n\n String \n \r \t`,
      null
    )
  ).toEqual(`Example\n\nString`);
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Example \n \n \n String \n \r \t`,
      null
    )
  ).toEqual(`Example\n\nString`);

  rendered.props.onSubmit();

  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected with a minimum length`, () => {
  const controlStyle: ControlStyle = {
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 5,
      border: {
        width: 4,
        color: `#FF00FF`,
      },
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 6,
        color: `#9A9A8E`,
      },
    },
    focusedValid: {
      textColor: `#55EA13`,
      placeholderColor: `#273346`,
      backgroundColor: `#CABA99`,
      radius: 3,
      border: {
        width: 5,
        color: `#646464`,
      },
    },
    focusedInvalid: {
      textColor: `#ABAADE`,
      placeholderColor: `#47ADAD`,
      backgroundColor: `#32AA88`,
      radius: 47,
      border: {
        width: 12,
        color: `#98ADAA`,
      },
    },
    disabledValid: {
      textColor: `#AE2195`,
      placeholderColor: `#FFAAEE`,
      backgroundColor: `#772728`,
      radius: 100,
      border: {
        width: 14,
        color: `#5E5E5E`,
      },
    },
    disabledInvalid: {
      textColor: `#340297`,
      placeholderColor: `#233832`,
      backgroundColor: `#938837`,
      radius: 2,
      border: {
        width: 19,
        color: `#573829`,
      },
    },
  };
  const onChange = jest.fn();
  const Component = createNullableTextAreaComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    14,
    null
  );

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value="Example String"
      onChange={onChange}
      disabled
      placeholder="Example Placeholder"
    />
  );

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle,
      multiLine: true,
      autoComplete: `off`,
      keyboardType: `default`,
      autoFocus: false,
      keepFocusOnSubmit: true,
    },
  });

  expect(rendered.props).toEqual({
    leftIcon: <Text>Example Left Icon</Text>,
    rightIcon: <Text>Example Right Icon</Text>,
    value: `Example String`,
    onChange,
    disabled: true,
    placeholder: `Example Placeholder`,
    context: null,
    secureTextEntry: false,
    onSubmit: expect.any(Function),
  });

  expect(rendered.type.inputComponent.stringify(null)).toEqual(``);
  expect(
    rendered.type.inputComponent.stringify(
      `  \n   \r  \t  Example \t    \n String \n \r \t`
    )
  ).toEqual(`Example\nString`);

  expect(rendered.type.inputComponent.tryParse(``, null)).toBeNull();
  expect(rendered.type.inputComponent.tryParse(` \n \r \t `, null)).toBeNull();
  expect(rendered.type.inputComponent.tryParse(``, null)).toBeNull();
  expect(rendered.type.inputComponent.tryParse(` \n \r \t `, null)).toBeNull();
  expect(
    rendered.type.inputComponent.tryParse(`ExampleString`, null)
  ).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`Example String`, null)).toEqual(
    `Example String`
  );
  expect(
    rendered.type.inputComponent.tryParse(`Exemplar String`, null)
  ).toEqual(`Exemplar String`);
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  ExampleString \n \r \t`,
      null
    )
  ).toBeUndefined();
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Example \t    \n String \n \r \t`,
      null
    )
  ).toEqual(`Example\nString`);
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Exemplar \t    \n String \n \r \t`,
      null
    )
  ).toEqual(`Exemplar\nString`);

  rendered.props.onSubmit();

  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected with a maximum length`, () => {
  const controlStyle: ControlStyle = {
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 5,
      border: {
        width: 4,
        color: `#FF00FF`,
      },
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 6,
        color: `#9A9A8E`,
      },
    },
    focusedValid: {
      textColor: `#55EA13`,
      placeholderColor: `#273346`,
      backgroundColor: `#CABA99`,
      radius: 3,
      border: {
        width: 5,
        color: `#646464`,
      },
    },
    focusedInvalid: {
      textColor: `#ABAADE`,
      placeholderColor: `#47ADAD`,
      backgroundColor: `#32AA88`,
      radius: 47,
      border: {
        width: 12,
        color: `#98ADAA`,
      },
    },
    disabledValid: {
      textColor: `#AE2195`,
      placeholderColor: `#FFAAEE`,
      backgroundColor: `#772728`,
      radius: 100,
      border: {
        width: 14,
        color: `#5E5E5E`,
      },
    },
    disabledInvalid: {
      textColor: `#340297`,
      placeholderColor: `#233832`,
      backgroundColor: `#938837`,
      radius: 2,
      border: {
        width: 19,
        color: `#573829`,
      },
    },
  };
  const onChange = jest.fn();
  const Component = createNullableTextAreaComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    null,
    14
  );

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value="Example String"
      onChange={onChange}
      disabled
      placeholder="Example Placeholder"
    />
  );

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle,
      multiLine: true,
      autoComplete: `off`,
      keyboardType: `default`,
      autoFocus: false,
      keepFocusOnSubmit: true,
    },
  });

  expect(rendered.props).toEqual({
    leftIcon: <Text>Example Left Icon</Text>,
    rightIcon: <Text>Example Right Icon</Text>,
    value: `Example String`,
    onChange,
    disabled: true,
    placeholder: `Example Placeholder`,
    context: null,
    secureTextEntry: false,
    onSubmit: expect.any(Function),
  });

  expect(rendered.type.inputComponent.stringify(null)).toEqual(``);
  expect(
    rendered.type.inputComponent.stringify(
      `  \n   \r  \t  Example \t  \n String \n \r \t`
    )
  ).toEqual(`Example\nString`);

  expect(rendered.type.inputComponent.tryParse(``, null)).toBeNull();
  expect(rendered.type.inputComponent.tryParse(` \n \r \t `, null)).toBeNull();
  expect(rendered.type.inputComponent.tryParse(``, null)).toBeNull();
  expect(rendered.type.inputComponent.tryParse(` \n \r \t `, null)).toBeNull();
  expect(rendered.type.inputComponent.tryParse(`ExampleString`, null)).toEqual(
    `ExampleString`
  );
  expect(rendered.type.inputComponent.tryParse(`Example String`, null)).toEqual(
    `Example String`
  );
  expect(
    rendered.type.inputComponent.tryParse(`Exemplar String`, null)
  ).toBeUndefined();
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  ExampleString \n \r \t`,
      null
    )
  ).toEqual(`ExampleString`);
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Example \t  \n String \n \r \t`,
      null
    )
  ).toEqual(`Example\nString`);
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Exemplar \t    \n String \n \r \t`,
      null
    )
  ).toBeUndefined();

  rendered.props.onSubmit();

  expect(onChange).not.toHaveBeenCalled();
});
