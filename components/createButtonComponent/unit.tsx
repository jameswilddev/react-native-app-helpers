import * as React from "react";
import { Text, TouchableWithoutFeedback } from "react-native";
import { unwrapRenderedFunctionComponent } from "../..";
import { createButtonComponent } from "../..";

test(`renders when enabled`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders without borders when enabled`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 2,
        justifyContent: `center`,
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders without borders when disabled`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        justifyContent: `center`,
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with identically sized borders`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with identically sized borders`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with a left icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
          paddingLeft: 10,
        }}
      >
        Example Content
      </Text>
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with a left icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
          paddingLeft: 10,
        }}
      >
        Example Content
      </Text>
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with a right icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
      }}
    >
      <Text
        style={{
          color: `blue`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingRight: 10,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`blue`}
        {`)`}
      </Text>
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with a right icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
      }}
    >
      <Text
        style={{
          color: `purple`,
          fontFamily: `Example Font Family`,
          fontSize: 16,
          lineHeight: 22.4,
          paddingRight: 10,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`purple`}
        {`)`}
      </Text>
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled with left and right icons`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
          paddingHorizontal: 10,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`blue`}
        {`)`}
      </Text>
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled with left and right icons`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
          paddingHorizontal: 10,
        }}
      >
        Example Content
      </Text>
      <Text>
        {`Example Right Icon (`}
        {`purple`}
        {`)`}
      </Text>
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled without vertical padding`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 0,
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
    <TouchableWithoutFeedback
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        borderRadius: 25,
        paddingHorizontal: 10,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled without vertical padding`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 0,
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
    <TouchableWithoutFeedback
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        borderRadius: 7,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: `aquamarine`,
        justifyContent: `center`,
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled without horizontal padding`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 0,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled without horizontal padding`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 0,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled without horizontal padding with a left icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 0,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled without horizontal padding with a left icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 0,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled without horizontal padding with a right icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 0,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled without horizontal padding with a right icon`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 0,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled without horizontal padding with left and right icons`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 0,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled without horizontal padding with left and right icons`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 0,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when enabled without radius`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
      disabled={false}
      onPress={onPress}
      style={{
        backgroundColor: `yellow`,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 5,
        borderColor: `aquamarine`,
        justifyContent: `center`,
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});

test(`renders when disabled without radius`, () => {
  const Component = createButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 10,
    verticalPadding: 2,
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
    <TouchableWithoutFeedback
      disabled
      onPress={onPress}
      style={{
        backgroundColor: `orange`,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderWidth: 2,
        borderColor: `aquamarine`,
        justifyContent: `center`,
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
    </TouchableWithoutFeedback>
  );
  expect(onPress).not.toHaveBeenCalled();
});
