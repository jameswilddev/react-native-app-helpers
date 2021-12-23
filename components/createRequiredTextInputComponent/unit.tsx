import * as React from "react";
import { Text } from "react-native";
import {
  createRequiredTextInputComponent,
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
  const Component = createRequiredTextInputComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    null,
    null,
    `sentences`
  );

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value="Example String"
      onChange={onChange}
      disabled
      placeholder="Example Placeholder"
      unique={[`Example Unique A`, `Example Unique B`, `Example Unique C`]}
    />
  );

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle,
      multiLine: false,
      autoComplete: `off`,
      keyboardType: `default`,
      autoFocus: false,
      keepFocusOnSubmit: false,
      autoCapitalize: `sentences`,
    },
  });

  expect(rendered.props).toEqual({
    leftIcon: <Text>Example Left Icon</Text>,
    rightIcon: <Text>Example Right Icon</Text>,
    value: `Example String`,
    onChange,
    disabled: true,
    placeholder: `Example Placeholder`,
    context: [`Example Unique A`, `Example Unique B`, `Example Unique C`],
    secureTextEntry: false,
    onSubmit: expect.any(Function),
  });

  expect(
    rendered.type.inputComponent.stringify(
      `  \n   \r  \t  Example \t  \r  \n String \n \r \t`
    )
  ).toEqual(`Example String`);

  expect(
    rendered.type.inputComponent.tryParse(``, [
      ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
    ])
  ).toBeUndefined();
  expect(
    rendered.type.inputComponent.tryParse(` \n \r \t `, [
      ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
    ])
  ).toBeUndefined();
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Unique \t  \r  \n B \n \r \t`,
      [
        ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
      ]
    )
  ).toBeUndefined();
  expect(
    rendered.type.inputComponent.tryParse(`Example String`, [
      ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
    ])
  ).toEqual(`Example String`);
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Example \t  \r  \n String \n \r \t`,
      [
        ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
      ]
    )
  ).toEqual(`Example String`);

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
  const Component = createRequiredTextInputComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    14,
    null,
    `sentences`
  );

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value="Example String"
      onChange={onChange}
      disabled
      placeholder="Example Placeholder"
      unique={[`Example Unique A`, `Example Unique B`, `Example Unique C`]}
    />
  );

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle,
      multiLine: false,
      autoComplete: `off`,
      keyboardType: `default`,
      autoFocus: false,
      keepFocusOnSubmit: false,
      autoCapitalize: `sentences`,
    },
  });

  expect(rendered.props).toEqual({
    leftIcon: <Text>Example Left Icon</Text>,
    rightIcon: <Text>Example Right Icon</Text>,
    value: `Example String`,
    onChange,
    disabled: true,
    placeholder: `Example Placeholder`,
    context: [`Example Unique A`, `Example Unique B`, `Example Unique C`],
    secureTextEntry: false,
    onSubmit: expect.any(Function),
  });

  expect(
    rendered.type.inputComponent.stringify(
      `  \n   \r  \t  Example \t  \r  \n String \n \r \t`
    )
  ).toEqual(`Example String`);

  expect(
    rendered.type.inputComponent.tryParse(``, [
      ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
    ])
  ).toBeUndefined();
  expect(
    rendered.type.inputComponent.tryParse(` \n \r \t `, [
      ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
    ])
  ).toBeUndefined();
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Example \n \r \t Unique \t  \r  \n B \n \r \t`,
      [
        ` \t \r \n  Example \n \r \t Unique \t \t \n A  \n \r \t   `,
        ` \t \r \n  Example \n \r \t Unique \t \t \n B  \n \r \t   `,
        ` \t \r \n  Example \n \r \t Unique \t \t \n C  \n \r \t   `,
      ]
    )
  ).toBeUndefined();
  expect(
    rendered.type.inputComponent.tryParse(`ExampleString`, [
      ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
    ])
  ).toBeUndefined();
  expect(
    rendered.type.inputComponent.tryParse(`Example String`, [
      ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
    ])
  ).toEqual(`Example String`);
  expect(
    rendered.type.inputComponent.tryParse(`Exemplar String`, [
      ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
    ])
  ).toEqual(`Exemplar String`);
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  ExampleString \n \r \t`,
      [
        ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
      ]
    )
  ).toBeUndefined();
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Example \t  \r  \n String \n \r \t`,
      [
        ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
      ]
    )
  ).toEqual(`Example String`);
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Exemplar \t  \r  \n String \n \r \t`,
      [
        ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
      ]
    )
  ).toEqual(`Exemplar String`);

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
  const Component = createRequiredTextInputComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    null,
    14,
    `sentences`
  );

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value="Example String"
      onChange={onChange}
      disabled
      placeholder="Example Placeholder"
      unique={[`Example Unique A`, `Example Unique B`, `Example Unique C`]}
    />
  );

  expect(rendered.type).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle,
      multiLine: false,
      autoComplete: `off`,
      keyboardType: `default`,
      autoFocus: false,
      keepFocusOnSubmit: false,
      autoCapitalize: `sentences`,
    },
  });

  expect(rendered.props).toEqual({
    leftIcon: <Text>Example Left Icon</Text>,
    rightIcon: <Text>Example Right Icon</Text>,
    value: `Example String`,
    onChange,
    disabled: true,
    placeholder: `Example Placeholder`,
    context: [`Example Unique A`, `Example Unique B`, `Example Unique C`],
    secureTextEntry: false,
    onSubmit: expect.any(Function),
  });

  expect(
    rendered.type.inputComponent.stringify(
      `  \n   \r  \t  Example \t  \r  \n String \n \r \t`
    )
  ).toEqual(`Example String`);

  expect(
    rendered.type.inputComponent.tryParse(``, [
      ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
    ])
  ).toBeUndefined();
  expect(
    rendered.type.inputComponent.tryParse(` \n \r \t `, [
      ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
    ])
  ).toBeUndefined();
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Unique \t  \r  \n B \n \r \t`,
      [
        ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
      ]
    )
  ).toBeUndefined();
  expect(
    rendered.type.inputComponent.tryParse(`ExampleString`, [
      ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
    ])
  ).toEqual(`ExampleString`);
  expect(
    rendered.type.inputComponent.tryParse(`Example String`, [
      ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
    ])
  ).toEqual(`Example String`);
  expect(
    rendered.type.inputComponent.tryParse(`Exemplar String`, [
      ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
      ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
    ])
  ).toBeUndefined();
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  ExampleString \n \r \t`,
      [
        ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
      ]
    )
  ).toEqual(`ExampleString`);
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Example \t  \r  \n String \n \r \t`,
      [
        ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
      ]
    )
  ).toEqual(`Example String`);
  expect(
    rendered.type.inputComponent.tryParse(
      `  \n   \r  \t  Exemplar \t  \r  \n String \n \r \t`,
      [
        ` \t \r \n  Unique \t \t \n A  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n B  \n \r \t   `,
        ` \t \r \n  Unique \t \t \n C  \n \r \t   `,
      ]
    )
  ).toBeUndefined();

  rendered.props.onSubmit();

  expect(onChange).not.toHaveBeenCalled();
});

test(`passes down an empty array when unique is undefined`, () => {
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
  const Component = createRequiredTextInputComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    null,
    null,
    `sentences`
  );

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value="Example String"
      onChange={onChange}
      disabled
      placeholder="Example Placeholder"
      unique={undefined}
    />
  );

  expect(rendered.props).toEqual({
    leftIcon: <Text>Example Left Icon</Text>,
    rightIcon: <Text>Example Right Icon</Text>,
    value: `Example String`,
    onChange,
    disabled: true,
    placeholder: `Example Placeholder`,
    context: [],
    secureTextEntry: false,
    onSubmit: expect.any(Function),
  });

  expect(onChange).not.toHaveBeenCalled();
});

test(`passes down an empty array when unique is not given`, () => {
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
  const Component = createRequiredTextInputComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    null,
    null,
    `sentences`
  );

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value="Example String"
      onChange={onChange}
      disabled
      placeholder="Example Placeholder"
    />
  );

  expect(rendered.props).toEqual({
    leftIcon: <Text>Example Left Icon</Text>,
    rightIcon: <Text>Example Right Icon</Text>,
    value: `Example String`,
    onChange,
    disabled: true,
    placeholder: `Example Placeholder`,
    context: [],
    secureTextEntry: false,
    onSubmit: expect.any(Function),
  });

  expect(onChange).not.toHaveBeenCalled();
});
