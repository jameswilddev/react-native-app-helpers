import * as React from "react";
import { Text, View } from "react-native";
import {
  createCheckboxComponent,
  unwrapRenderedFunctionComponent,
  Hitbox,
} from "../..";

test(`renders as expected when enabled and false`, () => {
  const Component = createCheckboxComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    boxSize: 14,
    boxLabelSpacing: 5,
    disabledFalse: {
      backgroundColor: `blue`,
      color: `yellow`,
      boxChild: <Text>Example Disabled False Box Child</Text>,
      radius: 3,
      border: {
        width: 9,
        color: `red`,
      },
    },
    disabledTrue: {
      backgroundColor: `purple`,
      color: `green`,
      boxChild: <Text>Example Disabled True Box Child</Text>,
      radius: 9,
      border: {
        width: 12,
        color: `cyan`,
      },
    },
    enabledFalse: {
      backgroundColor: `orange`,
      color: `black`,
      boxChild: <Text>Example Enabled False Box Child</Text>,
      radius: 4,
      border: {
        width: 24,
        color: `magenta`,
      },
    },
    enabledTrue: {
      backgroundColor: `white`,
      color: `brown`,
      boxChild: <Text>Example Enabled True Box Child</Text>,
      radius: 19,
      border: {
        width: 27,
        color: `gray`,
      },
    },
  });
  const onChange = jest.fn();

  const rendered = (
    <Component value={false} disabled={false} onChange={onChange}>
      Example Label
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={expect.any(Function)}
      style={{ width: `100%`, flexDirection: `row` }}
    >
      <View
        style={{
          width: 14,
          height: 14,
          backgroundColor: `orange`,
          justifyContent: `center`,
          alignItems: `center`,
          borderWidth: 24,
          borderColor: `magenta`,
          borderRadius: 4,
        }}
      >
        <Text>Example Enabled False Box Child</Text>
      </View>
      <Text
        style={{
          paddingLeft: 5,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          color: `black`,
        }}
      >
        Example Label
      </Text>
    </Hitbox>
  );

  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected when enabled and true`, () => {
  const Component = createCheckboxComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    boxSize: 14,
    boxLabelSpacing: 5,
    disabledFalse: {
      backgroundColor: `blue`,
      color: `yellow`,
      boxChild: <Text>Example Disabled False Box Child</Text>,
      radius: 3,
      border: {
        width: 9,
        color: `red`,
      },
    },
    disabledTrue: {
      backgroundColor: `purple`,
      color: `green`,
      boxChild: <Text>Example Disabled True Box Child</Text>,
      radius: 9,
      border: {
        width: 12,
        color: `cyan`,
      },
    },
    enabledFalse: {
      backgroundColor: `orange`,
      color: `black`,
      boxChild: <Text>Example Enabled False Box Child</Text>,
      radius: 4,
      border: {
        width: 24,
        color: `magenta`,
      },
    },
    enabledTrue: {
      backgroundColor: `white`,
      color: `brown`,
      boxChild: <Text>Example Enabled True Box Child</Text>,
      radius: 19,
      border: {
        width: 27,
        color: `gray`,
      },
    },
  });
  const onChange = jest.fn();

  const rendered = (
    <Component value disabled={false} onChange={onChange}>
      Example Label
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={expect.any(Function)}
      style={{ width: `100%`, flexDirection: `row` }}
    >
      <View
        style={{
          width: 14,
          height: 14,
          backgroundColor: `white`,
          justifyContent: `center`,
          alignItems: `center`,
          borderWidth: 27,
          borderColor: `gray`,
          borderRadius: 19,
          margin: -3,
        }}
      >
        <Text>Example Enabled True Box Child</Text>
      </View>
      <Text
        style={{
          paddingLeft: 5,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          color: `brown`,
        }}
      >
        Example Label
      </Text>
    </Hitbox>
  );

  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected when disabled and false`, () => {
  const Component = createCheckboxComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    boxSize: 14,
    boxLabelSpacing: 5,
    disabledFalse: {
      backgroundColor: `blue`,
      color: `yellow`,
      boxChild: <Text>Example Disabled False Box Child</Text>,
      radius: 3,
      border: {
        width: 9,
        color: `red`,
      },
    },
    disabledTrue: {
      backgroundColor: `purple`,
      color: `green`,
      boxChild: <Text>Example Disabled True Box Child</Text>,
      radius: 9,
      border: {
        width: 12,
        color: `cyan`,
      },
    },
    enabledFalse: {
      backgroundColor: `orange`,
      color: `black`,
      boxChild: <Text>Example Enabled False Box Child</Text>,
      radius: 4,
      border: {
        width: 24,
        color: `magenta`,
      },
    },
    enabledTrue: {
      backgroundColor: `white`,
      color: `brown`,
      boxChild: <Text>Example Enabled True Box Child</Text>,
      radius: 19,
      border: {
        width: 27,
        color: `gray`,
      },
    },
  });
  const onChange = jest.fn();

  const rendered = (
    <Component value={false} disabled onChange={onChange}>
      Example Label
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={expect.any(Function)}
      style={{ width: `100%`, flexDirection: `row` }}
    >
      <View
        style={{
          width: 14,
          height: 14,
          backgroundColor: `blue`,
          justifyContent: `center`,
          alignItems: `center`,
          borderWidth: 9,
          borderColor: `red`,
          borderRadius: 3,
          margin: 15,
        }}
      >
        <Text>Example Disabled False Box Child</Text>
      </View>
      <Text
        style={{
          paddingLeft: 5,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          color: `yellow`,
        }}
      >
        Example Label
      </Text>
    </Hitbox>
  );

  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected when disabled and true`, () => {
  const Component = createCheckboxComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    boxSize: 14,
    boxLabelSpacing: 5,
    disabledFalse: {
      backgroundColor: `blue`,
      color: `yellow`,
      boxChild: <Text>Example Disabled False Box Child</Text>,
      radius: 3,
      border: {
        width: 9,
        color: `red`,
      },
    },
    disabledTrue: {
      backgroundColor: `purple`,
      color: `green`,
      boxChild: <Text>Example Disabled True Box Child</Text>,
      radius: 9,
      border: {
        width: 12,
        color: `cyan`,
      },
    },
    enabledFalse: {
      backgroundColor: `orange`,
      color: `black`,
      boxChild: <Text>Example Enabled False Box Child</Text>,
      radius: 4,
      border: {
        width: 24,
        color: `magenta`,
      },
    },
    enabledTrue: {
      backgroundColor: `white`,
      color: `brown`,
      boxChild: <Text>Example Enabled True Box Child</Text>,
      radius: 19,
      border: {
        width: 27,
        color: `gray`,
      },
    },
  });
  const onChange = jest.fn();

  const rendered = (
    <Component value disabled onChange={onChange}>
      Example Label
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={expect.any(Function)}
      style={{ width: `100%`, flexDirection: `row` }}
    >
      <View
        style={{
          width: 14,
          height: 14,
          backgroundColor: `purple`,
          justifyContent: `center`,
          alignItems: `center`,
          borderWidth: 12,
          borderColor: `cyan`,
          borderRadius: 9,
          margin: 12,
        }}
      >
        <Text>Example Disabled True Box Child</Text>
      </View>
      <Text
        style={{
          paddingLeft: 5,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          color: `green`,
        }}
      >
        Example Label
      </Text>
    </Hitbox>
  );

  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected when without borders`, () => {
  const Component = createCheckboxComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    boxSize: 14,
    boxLabelSpacing: 5,
    disabledFalse: {
      backgroundColor: `blue`,
      color: `yellow`,
      boxChild: <Text>Example Disabled False Box Child</Text>,
      radius: 3,
      border: null,
    },
    disabledTrue: {
      backgroundColor: `purple`,
      color: `green`,
      boxChild: <Text>Example Disabled True Box Child</Text>,
      radius: 9,
      border: null,
    },
    enabledFalse: {
      backgroundColor: `orange`,
      color: `black`,
      boxChild: <Text>Example Enabled False Box Child</Text>,
      radius: 4,
      border: null,
    },
    enabledTrue: {
      backgroundColor: `white`,
      color: `brown`,
      boxChild: <Text>Example Enabled True Box Child</Text>,
      radius: 19,
      border: null,
    },
  });
  const onChange = jest.fn();

  const rendered = (
    <Component value={false} disabled={false} onChange={onChange}>
      Example Label
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={expect.any(Function)}
      style={{ width: `100%`, flexDirection: `row` }}
    >
      <View
        style={{
          width: 14,
          height: 14,
          backgroundColor: `orange`,
          justifyContent: `center`,
          alignItems: `center`,
          borderRadius: 4,
        }}
      >
        <Text>Example Enabled False Box Child</Text>
      </View>
      <Text
        style={{
          paddingLeft: 5,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          color: `black`,
        }}
      >
        Example Label
      </Text>
    </Hitbox>
  );

  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected when without spacing`, () => {
  const Component = createCheckboxComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    boxSize: 14,
    boxLabelSpacing: 0,
    disabledFalse: {
      backgroundColor: `blue`,
      color: `yellow`,
      boxChild: <Text>Example Disabled False Box Child</Text>,
      radius: 3,
      border: {
        width: 9,
        color: `red`,
      },
    },
    disabledTrue: {
      backgroundColor: `purple`,
      color: `green`,
      boxChild: <Text>Example Disabled True Box Child</Text>,
      radius: 9,
      border: {
        width: 12,
        color: `cyan`,
      },
    },
    enabledFalse: {
      backgroundColor: `orange`,
      color: `black`,
      boxChild: <Text>Example Enabled False Box Child</Text>,
      radius: 4,
      border: {
        width: 24,
        color: `magenta`,
      },
    },
    enabledTrue: {
      backgroundColor: `white`,
      color: `brown`,
      boxChild: <Text>Example Enabled True Box Child</Text>,
      radius: 19,
      border: {
        width: 27,
        color: `gray`,
      },
    },
  });
  const onChange = jest.fn();

  const rendered = (
    <Component value={false} disabled={false} onChange={onChange}>
      Example Label
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={expect.any(Function)}
      style={{ width: `100%`, flexDirection: `row` }}
    >
      <View
        style={{
          width: 14,
          height: 14,
          backgroundColor: `orange`,
          justifyContent: `center`,
          alignItems: `center`,
          borderWidth: 24,
          borderColor: `magenta`,
          borderRadius: 4,
        }}
      >
        <Text>Example Enabled False Box Child</Text>
      </View>
      <Text
        style={{
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          color: `black`,
        }}
      >
        Example Label
      </Text>
    </Hitbox>
  );

  expect(onChange).not.toHaveBeenCalled();
});

test(`renders as expected when without radius`, () => {
  const Component = createCheckboxComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    boxSize: 14,
    boxLabelSpacing: 5,
    disabledFalse: {
      backgroundColor: `blue`,
      color: `yellow`,
      boxChild: <Text>Example Disabled False Box Child</Text>,
      radius: 0,
      border: {
        width: 9,
        color: `red`,
      },
    },
    disabledTrue: {
      backgroundColor: `purple`,
      color: `green`,
      boxChild: <Text>Example Disabled True Box Child</Text>,
      radius: 0,
      border: {
        width: 12,
        color: `cyan`,
      },
    },
    enabledFalse: {
      backgroundColor: `orange`,
      color: `black`,
      boxChild: <Text>Example Enabled False Box Child</Text>,
      radius: 0,
      border: {
        width: 24,
        color: `magenta`,
      },
    },
    enabledTrue: {
      backgroundColor: `white`,
      color: `brown`,
      boxChild: <Text>Example Enabled True Box Child</Text>,
      radius: 0,
      border: {
        width: 27,
        color: `gray`,
      },
    },
  });
  const onChange = jest.fn();

  const rendered = (
    <Component value={false} disabled={false} onChange={onChange}>
      Example Label
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={expect.any(Function)}
      style={{ width: `100%`, flexDirection: `row` }}
    >
      <View
        style={{
          width: 14,
          height: 14,
          backgroundColor: `orange`,
          justifyContent: `center`,
          alignItems: `center`,
          borderWidth: 24,
          borderColor: `magenta`,
        }}
      >
        <Text>Example Enabled False Box Child</Text>
      </View>
      <Text
        style={{
          paddingLeft: 5,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          color: `black`,
        }}
      >
        Example Label
      </Text>
    </Hitbox>
  );

  expect(onChange).not.toHaveBeenCalled();
});

test(`raises the expected event when pressed when false`, () => {
  const Component = createCheckboxComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    boxSize: 14,
    boxLabelSpacing: 5,
    disabledFalse: {
      backgroundColor: `blue`,
      color: `yellow`,
      boxChild: <Text>Example Disabled False Box Child</Text>,
      radius: 3,
      border: {
        width: 9,
        color: `red`,
      },
    },
    disabledTrue: {
      backgroundColor: `purple`,
      color: `green`,
      boxChild: <Text>Example Disabled True Box Child</Text>,
      radius: 9,
      border: {
        width: 12,
        color: `cyan`,
      },
    },
    enabledFalse: {
      backgroundColor: `orange`,
      color: `black`,
      boxChild: <Text>Example Enabled False Box Child</Text>,
      radius: 4,
      border: {
        width: 24,
        color: `magenta`,
      },
    },
    enabledTrue: {
      backgroundColor: `white`,
      color: `brown`,
      boxChild: <Text>Example Enabled True Box Child</Text>,
      radius: 19,
      border: {
        width: 27,
        color: `gray`,
      },
    },
  });
  const onChange = jest.fn();

  const rendered = (
    <Component value={false} disabled={false} onChange={onChange}>
      Example Label
    </Component>
  );

  unwrapRenderedFunctionComponent(rendered).props[`onPress`]();

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(true);
});

test(`raises the expected event when pressed when true`, () => {
  const Component = createCheckboxComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    boxSize: 14,
    boxLabelSpacing: 5,
    disabledFalse: {
      backgroundColor: `blue`,
      color: `yellow`,
      boxChild: <Text>Example Disabled False Box Child</Text>,
      radius: 3,
      border: {
        width: 9,
        color: `red`,
      },
    },
    disabledTrue: {
      backgroundColor: `purple`,
      color: `green`,
      boxChild: <Text>Example Disabled True Box Child</Text>,
      radius: 9,
      border: {
        width: 12,
        color: `cyan`,
      },
    },
    enabledFalse: {
      backgroundColor: `orange`,
      color: `black`,
      boxChild: <Text>Example Enabled False Box Child</Text>,
      radius: 4,
      border: {
        width: 24,
        color: `magenta`,
      },
    },
    enabledTrue: {
      backgroundColor: `white`,
      color: `brown`,
      boxChild: <Text>Example Enabled True Box Child</Text>,
      radius: 19,
      border: {
        width: 27,
        color: `gray`,
      },
    },
  });
  const onChange = jest.fn();

  const rendered = (
    <Component value disabled={false} onChange={onChange}>
      Example Label
    </Component>
  );

  unwrapRenderedFunctionComponent(rendered).props[`onPress`]();

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(false);
});
