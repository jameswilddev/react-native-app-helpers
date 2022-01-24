import * as React from "react";
import { Text } from "react-native";
import {
  createRequiredFloatInputComponent,
  ControlStyle,
  unwrapRenderedFunctionComponent,
} from "../../..";

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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  };
  const onChange = jest.fn();
  const Component = createRequiredFloatInputComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    null,
    null,
    null,
    null
  );

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value={124}
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
      multiLine: false,
      autoComplete: `off`,
      keyboardType: `numeric`,
      autoFocus: false,
      keepFocusOnSubmit: false,
    },
  });

  expect(rendered.props).toEqual({
    leftIcon: <Text>Example Left Icon</Text>,
    rightIcon: <Text>Example Right Icon</Text>,
    value: 124,
    onChange,
    disabled: true,
    placeholder: `Example Placeholder`,
    context: null,
    secureTextEntry: false,
    onSubmit: expect.any(Function),
  });

  expect(rendered.type.inputComponent.stringify(0.1234)).toEqual(`0.1234`);
  expect(rendered.type.inputComponent.stringify(12.34)).toEqual(`12.34`);
  expect(rendered.type.inputComponent.stringify(1234)).toEqual(`1234`);
  expect(rendered.type.inputComponent.stringify(-0.1234)).toEqual(`-0.1234`);
  expect(rendered.type.inputComponent.stringify(-12.34)).toEqual(`-12.34`);
  expect(rendered.type.inputComponent.stringify(-1234)).toEqual(`-1234`);

  expect(rendered.type.inputComponent.tryParse(``)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(` \n \r \t `)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`1e1`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-1e1`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`NaN`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-NaN`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`Infinity`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-Infinity`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`.1234`)).toEqual(0.1234);
  expect(rendered.type.inputComponent.tryParse(`+.1234`)).toEqual(0.1234);
  expect(rendered.type.inputComponent.tryParse(`-.1234`)).toEqual(-0.1234);
  expect(rendered.type.inputComponent.tryParse(`12.34`)).toEqual(12.34);
  expect(rendered.type.inputComponent.tryParse(`+12.34`)).toEqual(12.34);
  expect(rendered.type.inputComponent.tryParse(`-12.34`)).toEqual(-12.34);
  expect(rendered.type.inputComponent.tryParse(`1234`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`+1234`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`-1234`)).toEqual(-1234);
  expect(rendered.type.inputComponent.tryParse(`1234.`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`+1234.`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`-1234.`)).toEqual(-1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   .1234 \t   \n \r  `
    )
  ).toEqual(0.1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +.1234 \t   \n \r  `
    )
  ).toEqual(0.1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -.1234 \t   \n \r  `
    )
  ).toEqual(-0.1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   12.34 \t   \n \r  `
    )
  ).toEqual(12.34);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +12.34 \t   \n \r  `
    )
  ).toEqual(12.34);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -12.34 \t   \n \r  `
    )
  ).toEqual(-12.34);
  expect(
    rendered.type.inputComponent.tryParse(`   \n   \r   \t   1234 \t   \n \r  `)
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +1234 \t   \n \r  `
    )
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -1234 \t   \n \r  `
    )
  ).toEqual(-1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   1234. \t   \n \r  `
    )
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +1234. \t   \n \r  `
    )
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -1234. \t   \n \r  `
    )
  ).toEqual(-1234);

  rendered.props.onSubmit();

  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected with an inclusive lower bound`, () => {
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  };
  const onChange = jest.fn();
  const Component = createRequiredFloatInputComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    null,
    -4096.12,
    null,
    null
  );

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value={124}
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
      multiLine: false,
      autoComplete: `off`,
      keyboardType: `numeric`,
      autoFocus: false,
      keepFocusOnSubmit: false,
    },
  });

  expect(rendered.props).toEqual({
    leftIcon: <Text>Example Left Icon</Text>,
    rightIcon: <Text>Example Right Icon</Text>,
    value: 124,
    onChange,
    disabled: true,
    placeholder: `Example Placeholder`,
    context: null,
    secureTextEntry: false,
    onSubmit: expect.any(Function),
  });

  expect(rendered.type.inputComponent.stringify(0.1234)).toEqual(`0.1234`);
  expect(rendered.type.inputComponent.stringify(12.34)).toEqual(`12.34`);
  expect(rendered.type.inputComponent.stringify(1234)).toEqual(`1234`);
  expect(rendered.type.inputComponent.stringify(-0.1234)).toEqual(`-0.1234`);
  expect(rendered.type.inputComponent.stringify(-12.34)).toEqual(`-12.34`);
  expect(rendered.type.inputComponent.stringify(-1234)).toEqual(`-1234`);

  expect(rendered.type.inputComponent.tryParse(``)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(` \n \r \t `)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`1e1`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-1e1`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`NaN`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-NaN`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`Infinity`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-Infinity`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-4096.13`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`.1234`)).toEqual(0.1234);
  expect(rendered.type.inputComponent.tryParse(`+.1234`)).toEqual(0.1234);
  expect(rendered.type.inputComponent.tryParse(`-.1234`)).toEqual(-0.1234);
  expect(rendered.type.inputComponent.tryParse(`12.34`)).toEqual(12.34);
  expect(rendered.type.inputComponent.tryParse(`+12.34`)).toEqual(12.34);
  expect(rendered.type.inputComponent.tryParse(`-12.34`)).toEqual(-12.34);
  expect(rendered.type.inputComponent.tryParse(`1234`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`+1234`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`-1234`)).toEqual(-1234);
  expect(rendered.type.inputComponent.tryParse(`1234.`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`+1234.`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`-1234.`)).toEqual(-1234);
  expect(rendered.type.inputComponent.tryParse(`-4096.12`)).toEqual(-4096.12);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   .1234 \t   \n \r  `
    )
  ).toEqual(0.1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +.1234 \t   \n \r  `
    )
  ).toEqual(0.1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -.1234 \t   \n \r  `
    )
  ).toEqual(-0.1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   12.34 \t   \n \r  `
    )
  ).toEqual(12.34);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +12.34 \t   \n \r  `
    )
  ).toEqual(12.34);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -12.34 \t   \n \r  `
    )
  ).toEqual(-12.34);
  expect(
    rendered.type.inputComponent.tryParse(`   \n   \r   \t   1234 \t   \n \r  `)
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +1234 \t   \n \r  `
    )
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -1234 \t   \n \r  `
    )
  ).toEqual(-1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   1234. \t   \n \r  `
    )
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +1234. \t   \n \r  `
    )
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -1234. \t   \n \r  `
    )
  ).toEqual(-1234);

  rendered.props.onSubmit();

  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected with an exclusive lower bound`, () => {
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  };
  const onChange = jest.fn();
  const Component = createRequiredFloatInputComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    -4096.12,
    null,
    null,
    null
  );

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value={124}
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
      multiLine: false,
      autoComplete: `off`,
      keyboardType: `numeric`,
      autoFocus: false,
      keepFocusOnSubmit: false,
    },
  });

  expect(rendered.props).toEqual({
    leftIcon: <Text>Example Left Icon</Text>,
    rightIcon: <Text>Example Right Icon</Text>,
    value: 124,
    onChange,
    disabled: true,
    placeholder: `Example Placeholder`,
    context: null,
    secureTextEntry: false,
    onSubmit: expect.any(Function),
  });

  expect(rendered.type.inputComponent.stringify(0.1234)).toEqual(`0.1234`);
  expect(rendered.type.inputComponent.stringify(12.34)).toEqual(`12.34`);
  expect(rendered.type.inputComponent.stringify(1234)).toEqual(`1234`);
  expect(rendered.type.inputComponent.stringify(-0.1234)).toEqual(`-0.1234`);
  expect(rendered.type.inputComponent.stringify(-12.34)).toEqual(`-12.34`);
  expect(rendered.type.inputComponent.stringify(-1234)).toEqual(`-1234`);

  expect(rendered.type.inputComponent.tryParse(``)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(` \n \r \t `)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`1e1`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-1e1`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`NaN`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-NaN`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`Infinity`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-Infinity`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-4096.12`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-4096.13`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`.1234`)).toEqual(0.1234);
  expect(rendered.type.inputComponent.tryParse(`+.1234`)).toEqual(0.1234);
  expect(rendered.type.inputComponent.tryParse(`-.1234`)).toEqual(-0.1234);
  expect(rendered.type.inputComponent.tryParse(`12.34`)).toEqual(12.34);
  expect(rendered.type.inputComponent.tryParse(`+12.34`)).toEqual(12.34);
  expect(rendered.type.inputComponent.tryParse(`-12.34`)).toEqual(-12.34);
  expect(rendered.type.inputComponent.tryParse(`1234`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`+1234`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`-1234`)).toEqual(-1234);
  expect(rendered.type.inputComponent.tryParse(`1234.`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`+1234.`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`-1234.`)).toEqual(-1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   .1234 \t   \n \r  `
    )
  ).toEqual(0.1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +.1234 \t   \n \r  `
    )
  ).toEqual(0.1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -.1234 \t   \n \r  `
    )
  ).toEqual(-0.1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   12.34 \t   \n \r  `
    )
  ).toEqual(12.34);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +12.34 \t   \n \r  `
    )
  ).toEqual(12.34);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -12.34 \t   \n \r  `
    )
  ).toEqual(-12.34);
  expect(
    rendered.type.inputComponent.tryParse(`   \n   \r   \t   1234 \t   \n \r  `)
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +1234 \t   \n \r  `
    )
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -1234 \t   \n \r  `
    )
  ).toEqual(-1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   1234. \t   \n \r  `
    )
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +1234. \t   \n \r  `
    )
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -1234. \t   \n \r  `
    )
  ).toEqual(-1234);

  rendered.props.onSubmit();

  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected with an inclusive upper bound`, () => {
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  };
  const onChange = jest.fn();
  const Component = createRequiredFloatInputComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    null,
    null,
    null,
    4096.12
  );

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value={124}
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
      multiLine: false,
      autoComplete: `off`,
      keyboardType: `numeric`,
      autoFocus: false,
      keepFocusOnSubmit: false,
    },
  });

  expect(rendered.props).toEqual({
    leftIcon: <Text>Example Left Icon</Text>,
    rightIcon: <Text>Example Right Icon</Text>,
    value: 124,
    onChange,
    disabled: true,
    placeholder: `Example Placeholder`,
    context: null,
    secureTextEntry: false,
    onSubmit: expect.any(Function),
  });

  expect(rendered.type.inputComponent.stringify(0.1234)).toEqual(`0.1234`);
  expect(rendered.type.inputComponent.stringify(12.34)).toEqual(`12.34`);
  expect(rendered.type.inputComponent.stringify(1234)).toEqual(`1234`);
  expect(rendered.type.inputComponent.stringify(-0.1234)).toEqual(`-0.1234`);
  expect(rendered.type.inputComponent.stringify(-12.34)).toEqual(`-12.34`);
  expect(rendered.type.inputComponent.stringify(-1234)).toEqual(`-1234`);

  expect(rendered.type.inputComponent.tryParse(``)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(` \n \r \t `)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`1e1`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-1e1`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`NaN`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-NaN`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`Infinity`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-Infinity`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`4096.13`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`.1234`)).toEqual(0.1234);
  expect(rendered.type.inputComponent.tryParse(`+.1234`)).toEqual(0.1234);
  expect(rendered.type.inputComponent.tryParse(`-.1234`)).toEqual(-0.1234);
  expect(rendered.type.inputComponent.tryParse(`12.34`)).toEqual(12.34);
  expect(rendered.type.inputComponent.tryParse(`+12.34`)).toEqual(12.34);
  expect(rendered.type.inputComponent.tryParse(`-12.34`)).toEqual(-12.34);
  expect(rendered.type.inputComponent.tryParse(`1234`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`+1234`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`-1234`)).toEqual(-1234);
  expect(rendered.type.inputComponent.tryParse(`1234.`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`+1234.`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`-1234.`)).toEqual(-1234);
  expect(rendered.type.inputComponent.tryParse(`4096.12`)).toEqual(4096.12);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   .1234 \t   \n \r  `
    )
  ).toEqual(0.1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +.1234 \t   \n \r  `
    )
  ).toEqual(0.1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -.1234 \t   \n \r  `
    )
  ).toEqual(-0.1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   12.34 \t   \n \r  `
    )
  ).toEqual(12.34);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +12.34 \t   \n \r  `
    )
  ).toEqual(12.34);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -12.34 \t   \n \r  `
    )
  ).toEqual(-12.34);
  expect(
    rendered.type.inputComponent.tryParse(`   \n   \r   \t   1234 \t   \n \r  `)
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +1234 \t   \n \r  `
    )
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -1234 \t   \n \r  `
    )
  ).toEqual(-1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   1234. \t   \n \r  `
    )
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +1234. \t   \n \r  `
    )
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -1234. \t   \n \r  `
    )
  ).toEqual(-1234);

  rendered.props.onSubmit();

  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected with an exclusive upper bound`, () => {
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  };
  const onChange = jest.fn();
  const Component = createRequiredFloatInputComponent(
    controlStyle,
    <Text>Example Left Icon</Text>,
    <Text>Example Right Icon</Text>,
    null,
    null,
    4096.12,
    null
  );

  const rendered = unwrapRenderedFunctionComponent(
    <Component
      value={124}
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
      multiLine: false,
      autoComplete: `off`,
      keyboardType: `numeric`,
      autoFocus: false,
      keepFocusOnSubmit: false,
    },
  });

  expect(rendered.props).toEqual({
    leftIcon: <Text>Example Left Icon</Text>,
    rightIcon: <Text>Example Right Icon</Text>,
    value: 124,
    onChange,
    disabled: true,
    placeholder: `Example Placeholder`,
    context: null,
    secureTextEntry: false,
    onSubmit: expect.any(Function),
  });

  expect(rendered.type.inputComponent.stringify(0.1234)).toEqual(`0.1234`);
  expect(rendered.type.inputComponent.stringify(12.34)).toEqual(`12.34`);
  expect(rendered.type.inputComponent.stringify(1234)).toEqual(`1234`);
  expect(rendered.type.inputComponent.stringify(-0.1234)).toEqual(`-0.1234`);
  expect(rendered.type.inputComponent.stringify(-12.34)).toEqual(`-12.34`);
  expect(rendered.type.inputComponent.stringify(-1234)).toEqual(`-1234`);

  expect(rendered.type.inputComponent.tryParse(``)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(` \n \r \t `)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`1e1`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-1e1`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`NaN`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-NaN`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`Infinity`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`-Infinity`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`4096.12`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`4096.13`)).toBeUndefined();
  expect(rendered.type.inputComponent.tryParse(`.1234`)).toEqual(0.1234);
  expect(rendered.type.inputComponent.tryParse(`+.1234`)).toEqual(0.1234);
  expect(rendered.type.inputComponent.tryParse(`-.1234`)).toEqual(-0.1234);
  expect(rendered.type.inputComponent.tryParse(`12.34`)).toEqual(12.34);
  expect(rendered.type.inputComponent.tryParse(`+12.34`)).toEqual(12.34);
  expect(rendered.type.inputComponent.tryParse(`-12.34`)).toEqual(-12.34);
  expect(rendered.type.inputComponent.tryParse(`1234`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`+1234`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`-1234`)).toEqual(-1234);
  expect(rendered.type.inputComponent.tryParse(`1234.`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`+1234.`)).toEqual(1234);
  expect(rendered.type.inputComponent.tryParse(`-1234.`)).toEqual(-1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   .1234 \t   \n \r  `
    )
  ).toEqual(0.1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +.1234 \t   \n \r  `
    )
  ).toEqual(0.1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -.1234 \t   \n \r  `
    )
  ).toEqual(-0.1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   12.34 \t   \n \r  `
    )
  ).toEqual(12.34);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +12.34 \t   \n \r  `
    )
  ).toEqual(12.34);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -12.34 \t   \n \r  `
    )
  ).toEqual(-12.34);
  expect(
    rendered.type.inputComponent.tryParse(`   \n   \r   \t   1234 \t   \n \r  `)
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +1234 \t   \n \r  `
    )
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -1234 \t   \n \r  `
    )
  ).toEqual(-1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   1234. \t   \n \r  `
    )
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   +1234. \t   \n \r  `
    )
  ).toEqual(1234);
  expect(
    rendered.type.inputComponent.tryParse(
      `   \n   \r   \t   -1234. \t   \n \r  `
    )
  ).toEqual(-1234);

  rendered.props.onSubmit();

  expect(onChange).not.toHaveBeenCalled();
});
