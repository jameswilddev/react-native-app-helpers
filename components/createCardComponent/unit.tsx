import * as React from "react";
import { Text, View } from "react-native";
import { createCardComponent, unwrapRenderedFunctionComponent } from "../..";

test(`does not throw at the shadow radius limit`, () => {
  createCardComponent(0, 24);
});

test(`throws below the shadow radius's lower bound`, () => {
  expect(() => {
    createCardComponent(0, -0.1);
  }).toThrowError(`Shadow radius cannot be less than 0.`);
});

test(`throws below the shadow radius's upper bound`, () => {
  expect(() => {
    createCardComponent(0, 24.1);
  }).toThrowError(`Shadow radius cannot be greater than 24.`);
});

test(`without border radius without shadow radius width fits content height fits content`, () => {
  const Component = createCardComponent(0, 0);

  const rendered = (
    <Component width="fitsContent" height="fitsContent">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View>
      <Text>Example Content</Text>
    </View>
  );
});

test(`without border radius without shadow radius width fills container height fits content`, () => {
  const Component = createCardComponent(0, 0);

  const rendered = (
    <Component width="fillsContainer" height="fitsContent">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <Text>Example Content</Text>
    </View>
  );
});

test(`without border radius without shadow radius width fits content height fills container`, () => {
  const Component = createCardComponent(0, 0);

  const rendered = (
    <Component width="fitsContent" height="fillsContainer">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ height: `100%` }}>
      <Text>Example Content</Text>
    </View>
  );
});

test(`without border radius without shadow radius width fills container height fills container`, () => {
  const Component = createCardComponent(0, 0);

  const rendered = (
    <Component width="fillsContainer" height="fillsContainer">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%` }}>
      <Text>Example Content</Text>
    </View>
  );
});

test(`with border radius without shadow radius width fits content height fits content`, () => {
  const Component = createCardComponent(10, 0);

  const rendered = (
    <Component width="fitsContent" height="fitsContent">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ borderRadius: 10, overflow: `hidden` }}>
      <Text>Example Content</Text>
    </View>
  );
});

test(`with border radius without shadow radius width fills container height fits content`, () => {
  const Component = createCardComponent(10, 0);

  const rendered = (
    <Component width="fillsContainer" height="fitsContent">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ borderRadius: 10, overflow: `hidden`, width: `100%` }}>
      <Text>Example Content</Text>
    </View>
  );
});

test(`with border radius without shadow radius width fits content height fills container`, () => {
  const Component = createCardComponent(10, 0);

  const rendered = (
    <Component width="fitsContent" height="fillsContainer">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ borderRadius: 10, overflow: `hidden`, height: `100%` }}>
      <Text>Example Content</Text>
    </View>
  );
});

test(`with border radius without shadow radius width fills container height fills container`, () => {
  const Component = createCardComponent(10, 0);

  const rendered = (
    <Component width="fillsContainer" height="fillsContainer">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        borderRadius: 10,
        overflow: `hidden`,
        width: `100%`,
        height: `100%`,
      }}
    >
      <Text>Example Content</Text>
    </View>
  );
});

test(`without border radius with shadow radius width fits content height fits content`, () => {
  const Component = createCardComponent(0, 16);

  const rendered = (
    <Component width="fitsContent" height="fitsContent">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        elevation: 16,
        shadowColor: `black`,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10.666666666666666,
      }}
    >
      <Text>Example Content</Text>
    </View>
  );
});

test(`without border radius with shadow radius width fills container height fits content`, () => {
  const Component = createCardComponent(0, 16);

  const rendered = (
    <Component width="fillsContainer" height="fitsContent">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        elevation: 16,
        shadowColor: `black`,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10.666666666666666,
        width: `100%`,
      }}
    >
      <Text>Example Content</Text>
    </View>
  );
});

test(`without border radius with shadow radius width fits content height fills container`, () => {
  const Component = createCardComponent(0, 16);

  const rendered = (
    <Component width="fitsContent" height="fillsContainer">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        elevation: 16,
        shadowColor: `black`,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10.666666666666666,
        height: `100%`,
      }}
    >
      <Text>Example Content</Text>
    </View>
  );
});

test(`without border radius with shadow radius width fills container height fills container`, () => {
  const Component = createCardComponent(0, 16);

  const rendered = (
    <Component width="fillsContainer" height="fillsContainer">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        elevation: 16,
        shadowColor: `black`,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10.666666666666666,
        width: `100%`,
        height: `100%`,
      }}
    >
      <Text>Example Content</Text>
    </View>
  );
});

test(`with border radius with shadow radius width fits content height fits content`, () => {
  const Component = createCardComponent(10, 16);

  const rendered = (
    <Component width="fitsContent" height="fitsContent">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        borderRadius: 10,
        elevation: 16,
        shadowColor: `black`,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10.666666666666666,
      }}
    >
      <View style={{ borderRadius: 10, overflow: `hidden` }}>
        <Text>Example Content</Text>
      </View>
    </View>
  );
});

test(`with border radius with shadow radius width fills container height fits content`, () => {
  const Component = createCardComponent(10, 16);

  const rendered = (
    <Component width="fillsContainer" height="fitsContent">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        borderRadius: 10,
        elevation: 16,
        shadowColor: `black`,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10.666666666666666,
        width: `100%`,
      }}
    >
      <View style={{ borderRadius: 10, overflow: `hidden`, width: `100%` }}>
        <Text>Example Content</Text>
      </View>
    </View>
  );
});

test(`with border radius with shadow radius width fits content height fills container`, () => {
  const Component = createCardComponent(10, 16);

  const rendered = (
    <Component width="fitsContent" height="fillsContainer">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        borderRadius: 10,
        elevation: 16,
        shadowColor: `black`,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10.666666666666666,
        height: `100%`,
      }}
    >
      <View style={{ borderRadius: 10, overflow: `hidden`, height: `100%` }}>
        <Text>Example Content</Text>
      </View>
    </View>
  );
});

test(`with border radius with shadow radius width fills container height fills container`, () => {
  const Component = createCardComponent(10, 16);

  const rendered = (
    <Component width="fillsContainer" height="fillsContainer">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        borderRadius: 10,
        elevation: 16,
        shadowColor: `black`,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10.666666666666666,
        width: `100%`,
        height: `100%`,
      }}
    >
      <View
        style={{
          borderRadius: 10,
          overflow: `hidden`,
          width: `100%`,
          height: `100%`,
        }}
      >
        <Text>Example Content</Text>
      </View>
    </View>
  );
});
