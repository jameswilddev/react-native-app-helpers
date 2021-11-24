import * as React from "react";
import { View, Text } from "react-native";
import { createPaddingComponent } from "../..";
import { unwrapRenderedFunctionComponent } from "../../utilities/unwrapRenderedFunctionComponent";

test(`renders content-fitting with one zero`, () => {
  const Component = createPaddingComponent(0);

  const rendered = (
    <Component size="fitsContent">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View pointerEvents="box-none">
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders content-fitting with one non-zero`, () => {
  const Component = createPaddingComponent(30);

  const rendered = (
    <Component size="fitsContent">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ padding: 30 }} pointerEvents="box-none">
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders content-fitting with two zeroes`, () => {
  const Component = createPaddingComponent(0, 0);

  const rendered = (
    <Component size="fitsContent">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View pointerEvents="box-none">
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders content-fitting with one non-zero and one zero`, () => {
  const Component = createPaddingComponent(30, 0);

  const rendered = (
    <Component size="fitsContent">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ paddingVertical: 30 }} pointerEvents="box-none">
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders content-fitting with one zero and one non-zero`, () => {
  const Component = createPaddingComponent(0, 30);

  const rendered = (
    <Component size="fitsContent">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ paddingHorizontal: 30 }} pointerEvents="box-none">
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders content-fitting with two non-zeroes`, () => {
  const Component = createPaddingComponent(30, 50);

  const rendered = (
    <Component size="fitsContent">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ paddingVertical: 30, paddingHorizontal: 50 }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders content-fitting with four zeroes`, () => {
  const Component = createPaddingComponent(0, 0, 0, 0);

  const rendered = (
    <Component size="fitsContent">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View pointerEvents="box-none">
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders content-fitting with non-zero top`, () => {
  const Component = createPaddingComponent(30, 0, 0, 0);

  const rendered = (
    <Component size="fitsContent">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ paddingTop: 30 }} pointerEvents="box-none">
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders content-fitting with non-zero right`, () => {
  const Component = createPaddingComponent(0, 30, 0, 0);

  const rendered = (
    <Component size="fitsContent">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ paddingRight: 30 }} pointerEvents="box-none">
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders content-fitting with non-zero bottom`, () => {
  const Component = createPaddingComponent(0, 0, 30, 0);

  const rendered = (
    <Component size="fitsContent">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ paddingBottom: 30 }} pointerEvents="box-none">
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders content-fitting with non-zero left`, () => {
  const Component = createPaddingComponent(0, 0, 0, 30);

  const rendered = (
    <Component size="fitsContent">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ paddingLeft: 30 }} pointerEvents="box-none">
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders content-fitting with four non-zeroes`, () => {
  const Component = createPaddingComponent(30, 50, 27, 60);

  const rendered = (
    <Component size="fitsContent">
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
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders container-filling with one zero`, () => {
  const Component = createPaddingComponent(0);

  const rendered = (
    <Component size="fillsContainer">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: `100%`, height: `100%`, flex: 1 }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders container-filling with one non-zero`, () => {
  const Component = createPaddingComponent(30);

  const rendered = (
    <Component size="fillsContainer">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: `100%`, height: `100%`, flex: 1, padding: 30 }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders container-filling with two zeroes`, () => {
  const Component = createPaddingComponent(0, 0);

  const rendered = (
    <Component size="fillsContainer">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: `100%`, height: `100%`, flex: 1 }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders container-filling with one non-zero and one zero`, () => {
  const Component = createPaddingComponent(30, 0);

  const rendered = (
    <Component size="fillsContainer">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: `100%`, height: `100%`, flex: 1, paddingVertical: 30 }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders container-filling with one zero and one non-zero`, () => {
  const Component = createPaddingComponent(0, 30);

  const rendered = (
    <Component size="fillsContainer">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: `100%`, height: `100%`, flex: 1, paddingHorizontal: 30 }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders container-filling with two non-zeroes`, () => {
  const Component = createPaddingComponent(30, 50);

  const rendered = (
    <Component size="fillsContainer">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 50,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders container-filling with four zeroes`, () => {
  const Component = createPaddingComponent(0, 0, 0, 0);

  const rendered = (
    <Component size="fillsContainer">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: `100%`, height: `100%`, flex: 1 }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders container-filling with non-zero top`, () => {
  const Component = createPaddingComponent(30, 0, 0, 0);

  const rendered = (
    <Component size="fillsContainer">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: `100%`, height: `100%`, flex: 1, paddingTop: 30 }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders container-filling with non-zero right`, () => {
  const Component = createPaddingComponent(0, 30, 0, 0);

  const rendered = (
    <Component size="fillsContainer">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: `100%`, height: `100%`, flex: 1, paddingRight: 30 }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders container-filling with non-zero bottom`, () => {
  const Component = createPaddingComponent(0, 0, 30, 0);

  const rendered = (
    <Component size="fillsContainer">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: `100%`, height: `100%`, flex: 1, paddingBottom: 30 }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders container-filling with non-zero left`, () => {
  const Component = createPaddingComponent(0, 0, 0, 30);

  const rendered = (
    <Component size="fillsContainer">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: `100%`, height: `100%`, flex: 1, paddingLeft: 30 }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders container-filling with four non-zeroes`, () => {
  const Component = createPaddingComponent(30, 50, 27, 60);

  const rendered = (
    <Component size="fillsContainer">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flex: 1,
        paddingTop: 30,
        paddingRight: 50,
        paddingBottom: 27,
        paddingLeft: 60,
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});
