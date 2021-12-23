import * as React from "react";
import { Text, View } from "react-native";
import {
  Hitbox,
  createButtonComponent,
  unwrapRenderedFunctionComponent,
} from "../../..";

test(`renders when enabled`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        alignItems: `center`,
      }}
    >
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled by not disabling`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component leftIcon={() => null} rightIcon={() => null} onPress={onPress}>
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        alignItems: `center`,
      }}
    >
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled by disabled being undefined`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      onPress={onPress}
      disabled={undefined}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        alignItems: `center`,
      }}
    >
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      onPress={onPress}
      disabled
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        alignItems: `center`,
        margin: 3,
      }}
    >
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders without borders when enabled`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: null,
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: null,
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignItems: `center`,
      }}
    >
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders without borders when disabled`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: null,
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: null,
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      onPress={onPress}
      disabled
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignItems: `center`,
      }}
    >
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with identically sized borders`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        alignItems: `center`,
      }}
    >
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with identically sized borders`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      onPress={onPress}
      disabled
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        alignItems: `center`,
      }}
    >
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with a left icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={() => null}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`blue`}
        {`)`}
      </Text>
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingLeft: 7,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with a left icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={() => null}
      onPress={onPress}
      disabled
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: 3,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`purple`}
        {`)`}
      </Text>
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingLeft: 7,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with a right icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingRight: 7,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`blue`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with a right icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      onPress={onPress}
      disabled
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: 3,
        flexDirection: `row`,
      }}
    >
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingRight: 7,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`purple`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with left and right icons`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`blue`}
        {`)`}
      </Text>
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingHorizontal: 7,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`blue`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with left and right icons`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      onPress={onPress}
      disabled
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: 3,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`purple`}
        {`)`}
      </Text>
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingHorizontal: 7,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`purple`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled without vertical padding`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 0,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        borderWidth: 5,
        borderColor: `aquamarine`,
        alignItems: `center`,
      }}
    >
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled without vertical padding`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 0,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      onPress={onPress}
      disabled
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: `aquamarine`,
        alignItems: `center`,
        margin: 3,
      }}
    >
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled without horizontal padding`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 0,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        alignItems: `center`,
      }}
    >
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled without horizontal padding`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 0,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      onPress={onPress}
      disabled
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        alignItems: `center`,
        margin: 3,
      }}
    >
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled without horizontal padding with a left icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 0,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={() => null}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`blue`}
        {`)`}
      </Text>
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingLeft: 7,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled without horizontal padding with a left icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 0,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={() => null}
      onPress={onPress}
      disabled
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: 3,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`purple`}
        {`)`}
      </Text>
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingLeft: 7,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled without horizontal padding with a right icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 0,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingRight: 7,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`blue`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled without horizontal padding with a right icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 0,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      onPress={onPress}
      disabled
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        alignItems: `center`,
        margin: 3,
        flexDirection: `row`,
        justifyContent: `center`,
      }}
    >
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingRight: 7,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`purple`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled without horizontal padding with left and right icons`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 0,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`blue`}
        {`)`}
      </Text>
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingHorizontal: 7,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`blue`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled without horizontal padding with left and right icons`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 0,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      onPress={onPress}
      disabled
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: 3,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`purple`}
        {`)`}
      </Text>
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingHorizontal: 7,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`purple`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled without radius`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 0,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        alignItems: `center`,
      }}
    >
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled without radius`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 0,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      onPress={onPress}
      disabled
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        alignItems: `center`,
        margin: 3,
      }}
    >
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled without icon spacing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 0,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        alignItems: `center`,
      }}
    >
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled without icon spacing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 70,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      onPress={onPress}
      disabled
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        alignItems: `center`,
        margin: 3,
      }}
    >
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with a left icon without icon spacing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 0,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={() => null}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`blue`}
        {`)`}
      </Text>
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with a left icon without icon spacing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 0,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={() => null}
      onPress={onPress}
      disabled
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: 3,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`purple`}
        {`)`}
      </Text>
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with a right icon without icon spacing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 0,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`blue`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with a right icon without icon spacing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 0,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      onPress={onPress}
      disabled
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: 3,
        flexDirection: `row`,
      }}
    >
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`purple`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with left and right icons without icon spacing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 0,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`blue`}
        {`)`}
      </Text>
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`blue`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with left and right icons without icon spacing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 0,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      onPress={onPress}
      disabled
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: 3,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`purple`}
        {`)`}
      </Text>
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`purple`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with a custom element`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      children={(color) => <Text>Example Children ({color})</Text>}
      onPress={onPress}
      disabled={false}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        alignItems: `center`,
      }}
    >
      <Text>
        {`Example Children (`}
        {`blue`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with a custom element`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      children={(color) => <Text>Example Children ({color})</Text>}
      onPress={onPress}
      disabled
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        alignItems: `center`,
        margin: 3,
      }}
    >
      <Text>
        {`Example Children (`}
        {`purple`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with a custom element with a left icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={() => null}
      children={(color) => <Text>Example Children ({color})</Text>}
      onPress={onPress}
      disabled={false}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`blue`}
        {`)`}
      </Text>
      <View style={{ paddingLeft: 7 }}>
        <Text>
          {`Example Children (`}
          {`blue`}
          {`)`}
        </Text>
      </View>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with a custom element with a left icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={() => null}
      children={(color) => <Text>Example Children ({color})</Text>}
      onPress={onPress}
      disabled
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: 3,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`purple`}
        {`)`}
      </Text>
      <View style={{ paddingLeft: 7 }}>
        <Text>
          {`Example Children (`}
          {`purple`}
          {`)`}
        </Text>
      </View>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with a custom element with a right icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      children={(color) => <Text>Example Children ({color})</Text>}
      onPress={onPress}
      disabled={false}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <View style={{ paddingRight: 7 }}>
        <Text>
          {`Example Children (`}
          {`blue`}
          {`)`}
        </Text>
      </View>
      <Text>
        {`Example Right Icon (`}
        {`blue`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with a custom element with a right icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      children={(color) => <Text>Example Children ({color})</Text>}
      onPress={onPress}
      disabled
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: 3,
        flexDirection: `row`,
      }}
    >
      <View style={{ paddingRight: 7 }}>
        <Text>
          {`Example Children (`}
          {`purple`}
          {`)`}
        </Text>
      </View>
      <Text>
        {`Example Right Icon (`}
        {`purple`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with a custom element with left and right icons`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      children={(color) => <Text>Example Children ({color})</Text>}
      onPress={onPress}
      disabled={false}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`blue`}
        {`)`}
      </Text>
      <View style={{ paddingHorizontal: 7 }}>
        <Text>
          {`Example Children (`}
          {`blue`}
          {`)`}
        </Text>
      </View>
      <Text>
        {`Example Right Icon (`}
        {`blue`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with a custom element with left and right icons`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      children={(color) => <Text>Example Children ({color})</Text>}
      onPress={onPress}
      disabled
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: 3,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`purple`}
        {`)`}
      </Text>
      <View style={{ paddingHorizontal: 7 }}>
        <Text>
          {`Example Children (`}
          {`purple`}
          {`)`}
        </Text>
      </View>
      <Text>
        {`Example Right Icon (`}
        {`purple`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with a custom element without icon spacing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 0,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      children={(color) => <Text>Example Children ({color})</Text>}
      onPress={onPress}
      disabled={false}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        alignItems: `center`,
      }}
    >
      <Text>
        {`Example Children (`}
        {`blue`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with a custom element without icon spacing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 70,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={() => null}
      children={(color) => <Text>Example Children ({color})</Text>}
      onPress={onPress}
      disabled
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        alignItems: `center`,
        margin: 3,
      }}
    >
      <Text>
        {`Example Children (`}
        {`purple`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with a custom element with a left icon without icon spacing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 0,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={() => null}
      children={(color) => <Text>Example Children ({color})</Text>}
      onPress={onPress}
      disabled={false}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`blue`}
        {`)`}
      </Text>
      <Text>
        {`Example Children (`}
        {`blue`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with a custom element with a left icon without icon spacing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 0,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={() => null}
      children={(color) => <Text>Example Children ({color})</Text>}
      onPress={onPress}
      disabled
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: 3,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`purple`}
        {`)`}
      </Text>
      <Text>
        {`Example Children (`}
        {`purple`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with a custom element with a right icon without icon spacing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 0,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      children={(color) => <Text>Example Children ({color})</Text>}
      onPress={onPress}
      disabled={false}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Children (`}
        {`blue`}
        {`)`}
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`blue`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with a custom element with a right icon without icon spacing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 0,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={() => null}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      children={(color) => <Text>Example Children ({color})</Text>}
      onPress={onPress}
      disabled
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: 3,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Children (`}
        {`purple`}
        {`)`}
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`purple`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with a custom element with left and right icons without icon spacing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 0,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      children={(color) => <Text>Example Children ({color})</Text>}
      onPress={onPress}
      disabled={false}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`blue`}
        {`)`}
      </Text>
      <Text>
        {`Example Children (`}
        {`blue`}
        {`)`}
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`blue`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with a custom element with left and right icons without icon spacing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 0,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      children={(color) => <Text>Example Children ({color})</Text>}
      onPress={onPress}
      disabled
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: 3,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`purple`}
        {`)`}
      </Text>
      <Text>
        {`Example Children (`}
        {`purple`}
        {`)`}
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`purple`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders with a left icon when the right icon is missing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`blue`}
        {`)`}
      </Text>
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingLeft: 7,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders with a left icon when the right icon is undefined`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={(color) => <Text>Example Left Icon ({color})</Text>}
      rightIcon={undefined}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text>
        {`Example Left Icon (`}
        {`blue`}
        {`)`}
      </Text>
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingLeft: 7,
        }}
      >
        Example Content
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders with a right icon when the left icon is missing`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingRight: 7,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`blue`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders with a right icon when the left icon is undefined`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
    iconSpacing: 7,
    default: {
      backgroundColor: `yellow`,
      color: `blue`,
      radius: 25,
      border: {
        width: 5,
        color: `aquamarine`,
      },
    },
    disabled: {
      backgroundColor: `orange`,
      color: `purple`,
      radius: 7,
      border: {
        width: 2,
        color: `aquamarine`,
      },
    },
  });
  const onPress = jest.fn();

  const rendered = (
    <Component
      leftIcon={undefined}
      rightIcon={(color) => <Text>Example Right Icon ({color})</Text>}
      onPress={onPress}
      disabled={false}
    >
      Example Content
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Hitbox
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
        alignItems: `center`,
        flexDirection: `row`,
      }}
    >
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingRight: 7,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`blue`}
        {`)`}
      </Text>
    </Hitbox>
  );
  expect(onPress).not.toHaveBeenCalled();
});
