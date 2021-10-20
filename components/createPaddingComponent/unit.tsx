import * as React from "react";
import { View, Text } from "react-native";
import { createPaddingComponent } from "../../index";
import { unwrapRenderedFunctionComponent } from "../../utilities/unwrapRenderedFunctionComponent";

test(`renders with one zero`, () => {
  const Component = createPaddingComponent(0);

  const rendered = (
    <Component>
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View>
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders with one non-zero`, () => {
  const Component = createPaddingComponent(30);

  const rendered = (
    <Component>
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ padding: 30 }}>
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders with two zeroes`, () => {
  const Component = createPaddingComponent(0, 0);

  const rendered = (
    <Component>
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View>
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders with one non-zero and one zero`, () => {
  const Component = createPaddingComponent(30, 0);

  const rendered = (
    <Component>
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ paddingVertical: 30 }}>
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders with one zero and one non-zero`, () => {
  const Component = createPaddingComponent(0, 30);

  const rendered = (
    <Component>
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ paddingHorizontal: 30 }}>
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders with two non-zeroes`, () => {
  const Component = createPaddingComponent(30, 50);

  const rendered = (
    <Component>
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ paddingVertical: 30, paddingHorizontal: 50 }}>
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders with four zeroes`, () => {
  const Component = createPaddingComponent(0, 0, 0, 0);

  const rendered = (
    <Component>
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View>
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders with non-zero top`, () => {
  const Component = createPaddingComponent(30, 0, 0, 0);

  const rendered = (
    <Component>
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ paddingTop: 30 }}>
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders with non-zero right`, () => {
  const Component = createPaddingComponent(0, 30, 0, 0);

  const rendered = (
    <Component>
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ paddingRight: 30 }}>
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders with non-zero bottom`, () => {
  const Component = createPaddingComponent(0, 0, 30, 0);

  const rendered = (
    <Component>
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ paddingBottom: 30 }}>
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders with non-zero left`, () => {
  const Component = createPaddingComponent(0, 0, 0, 30);

  const rendered = (
    <Component>
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ paddingLeft: 30 }}>
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders with four non-zeroes`, () => {
  const Component = createPaddingComponent(30, 50, 27, 60);

  const rendered = (
    <Component>
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        paddingTop: 30,
        paddingRight: 50,
        paddingBottom: 27,
        paddingLeft: 60,
      }}
    >
      <Text>Test Content</Text>
    </View>
  );
});
