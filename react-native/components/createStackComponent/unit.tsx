import * as React from "react";
import { View, Text } from "react-native";
import {
  createStackComponent,
  unwrapRenderedFunctionComponent,
} from "../../..";

test(`can contain nothing horizontally without spacing`, () => {
  const Component = createStackComponent(0, `horizontal`);

  const rendered = <Component />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ height: `100%`, flexDirection: `row` }}
      pointerEvents="box-none"
    ></View>
  );
});

test(`can contain one item horizontally without spacing`, () => {
  const Component = createStackComponent(0, `horizontal`);

  const rendered = (
    <Component>
      <Text>Test Item A</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ height: `100%`, flexDirection: `row` }}
      pointerEvents="box-none"
    >
      <Text>Test Item A</Text>
    </View>
  );
});

test(`can contain two items horizontally without spacing`, () => {
  const Component = createStackComponent(0, `horizontal`);

  const rendered = (
    <Component>
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ height: `100%`, flexDirection: `row` }}
      pointerEvents="box-none"
    >
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
    </View>
  );
});

test(`can contain three items horizontally without spacing`, () => {
  const Component = createStackComponent(0, `horizontal`);

  const rendered = (
    <Component>
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
      <Text>Test Item C</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ height: `100%`, flexDirection: `row` }}
      pointerEvents="box-none"
    >
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
      <Text>Test Item C</Text>
    </View>
  );
});

test(`can contain four items horizontally without spacing`, () => {
  const Component = createStackComponent(0, `horizontal`);

  const rendered = (
    <Component>
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
      <Text>Test Item C</Text>
      <Text>Test Item D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ height: `100%`, flexDirection: `row` }}
      pointerEvents="box-none"
    >
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
      <Text>Test Item C</Text>
      <Text>Test Item D</Text>
    </View>
  );
});

test(`can contain nothing horizontally with spacing`, () => {
  const Component = createStackComponent(25, `horizontal`);

  const rendered = <Component />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ height: `100%`, flexDirection: `row` }}
      pointerEvents="box-none"
    />
  );
});

test(`can contain one item horizontally with spacing`, () => {
  const Component = createStackComponent(25, `horizontal`);

  const rendered = (
    <Component>
      <Text>Test Item A</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ height: `100%`, flexDirection: `row` }}
      pointerEvents="box-none"
    >
      <Text key="0">Test Item A</Text>
    </View>
  );
});

test(`can contain two items horizontally with spacing`, () => {
  const Component = createStackComponent(25, `horizontal`);

  const rendered = (
    <Component>
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ height: `100%`, flexDirection: `row` }}
      pointerEvents="box-none"
    >
      <Text key="0">Test Item A</Text>
      <View key="separator0" style={{ width: 25 }} pointerEvents="none" />
      <Text key="1">Test Item B</Text>
    </View>
  );
});

test(`can contain three items horizontally with spacing`, () => {
  const Component = createStackComponent(25, `horizontal`);

  const rendered = (
    <Component>
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
      <Text>Test Item C</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ height: `100%`, flexDirection: `row` }}
      pointerEvents="box-none"
    >
      <Text key="0">Test Item A</Text>
      <View key="separator0" style={{ width: 25 }} pointerEvents="none" />
      <Text key="1">Test Item B</Text>
      <View key="separator1" style={{ width: 25 }} pointerEvents="none" />
      <Text key="2">Test Item C</Text>
    </View>
  );
});

test(`can contain four items horizontally with spacing`, () => {
  const Component = createStackComponent(25, `horizontal`);

  const rendered = (
    <Component>
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
      <Text>Test Item C</Text>
      <Text>Test Item D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ height: `100%`, flexDirection: `row` }}
      pointerEvents="box-none"
    >
      <Text key="0">Test Item A</Text>
      <View key="separator0" style={{ width: 25 }} pointerEvents="none" />
      <Text key="1">Test Item B</Text>
      <View key="separator1" style={{ width: 25 }} pointerEvents="none" />
      <Text key="2">Test Item C</Text>
      <View key="separator2" style={{ width: 25 }} pointerEvents="none" />
      <Text key="3">Test Item D</Text>
    </View>
  );
});

test(`can contain nothing vertically without spacing`, () => {
  const Component = createStackComponent(0, `vertical`);

  const rendered = <Component />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }} pointerEvents="box-none" />
  );
});

test(`can contain one item vertically without spacing`, () => {
  const Component = createStackComponent(0, `vertical`);

  const rendered = (
    <Component>
      <Text>Test Item A</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }} pointerEvents="box-none">
      <Text>Test Item A</Text>
    </View>
  );
});

test(`can contain two items vertically without spacing`, () => {
  const Component = createStackComponent(0, `vertical`);

  const rendered = (
    <Component>
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }} pointerEvents="box-none">
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
    </View>
  );
});

test(`can contain three items vertically without spacing`, () => {
  const Component = createStackComponent(0, `vertical`);

  const rendered = (
    <Component>
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
      <Text>Test Item C</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }} pointerEvents="box-none">
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
      <Text>Test Item C</Text>
    </View>
  );
});

test(`can contain four items vertically without spacing`, () => {
  const Component = createStackComponent(0, `vertical`);

  const rendered = (
    <Component>
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
      <Text>Test Item C</Text>
      <Text>Test Item D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }} pointerEvents="box-none">
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
      <Text>Test Item C</Text>
      <Text>Test Item D</Text>
    </View>
  );
});

test(`can contain nothing vertically with spacing`, () => {
  const Component = createStackComponent(25, `vertical`);

  const rendered = <Component />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }} pointerEvents="box-none" />
  );
});

test(`can contain one item vertically with spacing`, () => {
  const Component = createStackComponent(25, `vertical`);

  const rendered = (
    <Component>
      <Text>Test Item A</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }} pointerEvents="box-none">
      <Text key="0">Test Item A</Text>
    </View>
  );
});

test(`can contain two items vertically with spacing`, () => {
  const Component = createStackComponent(25, `vertical`);

  const rendered = (
    <Component>
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }} pointerEvents="box-none">
      <Text key="0">Test Item A</Text>
      <View key="separator0" style={{ height: 25 }} pointerEvents="none" />
      <Text key="1">Test Item B</Text>
    </View>
  );
});

test(`can contain three items vertically with spacing`, () => {
  const Component = createStackComponent(25, `vertical`);

  const rendered = (
    <Component>
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
      <Text>Test Item C</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }} pointerEvents="box-none">
      <Text key="0">Test Item A</Text>
      <View key="separator0" style={{ height: 25 }} pointerEvents="none" />
      <Text key="1">Test Item B</Text>
      <View key="separator1" style={{ height: 25 }} pointerEvents="none" />
      <Text key="2">Test Item C</Text>
    </View>
  );
});

test(`can contain four items vertically with spacing`, () => {
  const Component = createStackComponent(25, `vertical`);

  const rendered = (
    <Component>
      <Text>Test Item A</Text>
      <Text>Test Item B</Text>
      <Text>Test Item C</Text>
      <Text>Test Item D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }} pointerEvents="box-none">
      <Text key="0">Test Item A</Text>
      <View key="separator0" style={{ height: 25 }} pointerEvents="none" />
      <Text key="1">Test Item B</Text>
      <View key="separator1" style={{ height: 25 }} pointerEvents="none" />
      <Text key="2">Test Item C</Text>
      <View key="separator2" style={{ height: 25 }} pointerEvents="none" />
      <Text key="3">Test Item D</Text>
    </View>
  );
});
