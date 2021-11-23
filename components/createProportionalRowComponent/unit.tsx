import * as React from "react";
import { Text, View } from "react-native";
import { createProportionalRowComponent } from ".";
import { unwrapRenderedFunctionComponent } from "../..";

test(`renders as expected without spacing when fitting content vertically and aligning to the top`, () => {
  const Component = createProportionalRowComponent(0, [27, 18, 33, 44]);

  const rendered = (
    <Component height="fitsContent" verticalAlignment="top">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `flex-start`,
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  );
});

test(`renders as expected with spacing when fitting content vertically and aligning to the top`, () => {
  const Component = createProportionalRowComponent(23, [27, 18, 33, 44]);

  const rendered = (
    <Component height="fitsContent" verticalAlignment="top">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `flex-start`,
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View key="separator0" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View key="separator1" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View key="separator2" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  );
});

test(`renders as expected without spacing when fitting content vertically and aligning to the center`, () => {
  const Component = createProportionalRowComponent(0, [27, 18, 33, 44]);

  const rendered = (
    <Component height="fitsContent" verticalAlignment="centered">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `center`,
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  );
});

test(`renders as expected with spacing when fitting content vertically and aligning to the center`, () => {
  const Component = createProportionalRowComponent(23, [27, 18, 33, 44]);

  const rendered = (
    <Component height="fitsContent" verticalAlignment="centered">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `center`,
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View key="separator0" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View key="separator1" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View key="separator2" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  );
});

test(`renders as expected without spacing when fitting content vertically and aligning to the bottom`, () => {
  const Component = createProportionalRowComponent(0, [27, 18, 33, 44]);

  const rendered = (
    <Component height="fitsContent" verticalAlignment="bottom">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `flex-end`,
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  );
});

test(`renders as expected with spacing when fitting content vertically and aligning to the bottom`, () => {
  const Component = createProportionalRowComponent(23, [27, 18, 33, 44]);

  const rendered = (
    <Component height="fitsContent" verticalAlignment="bottom">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `flex-end`,
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View key="separator0" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View key="separator1" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View key="separator2" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  );
});

test(`renders as expected without spacing when fitting content vertically and stretching to fit`, () => {
  const Component = createProportionalRowComponent(0, [27, 18, 33, 44]);

  const rendered = (
    <Component height="fitsContent" verticalAlignment="stretched">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `stretch`,
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  );
});

test(`renders as expected with spacing when fitting content vertically and stretching to fit`, () => {
  const Component = createProportionalRowComponent(23, [27, 18, 33, 44]);

  const rendered = (
    <Component height="fitsContent" verticalAlignment="stretched">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        flexDirection: `row`,
        alignItems: `stretch`,
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View key="separator0" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View key="separator1" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View key="separator2" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  );
});

test(`renders as expected without spacing when filling the container vertically and aligning to the top`, () => {
  const Component = createProportionalRowComponent(0, [27, 18, 33, 44]);

  const rendered = (
    <Component height="fillsContainer" verticalAlignment="top">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `flex-start`,
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  );
});

test(`renders as expected with spacing when filling the container vertically and aligning to the top`, () => {
  const Component = createProportionalRowComponent(23, [27, 18, 33, 44]);

  const rendered = (
    <Component height="fillsContainer" verticalAlignment="top">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `flex-start`,
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View key="separator0" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View key="separator1" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View key="separator2" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  );
});

test(`renders as expected without spacing when filling the container vertically and aligning to the center`, () => {
  const Component = createProportionalRowComponent(0, [27, 18, 33, 44]);

  const rendered = (
    <Component height="fillsContainer" verticalAlignment="centered">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `center`,
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  );
});

test(`renders as expected with spacing when filling the container vertically and aligning to the center`, () => {
  const Component = createProportionalRowComponent(23, [27, 18, 33, 44]);

  const rendered = (
    <Component height="fillsContainer" verticalAlignment="centered">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `center`,
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View key="separator0" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View key="separator1" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View key="separator2" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  );
});

test(`renders as expected without spacing when filling the container vertically and aligning to the bottom`, () => {
  const Component = createProportionalRowComponent(0, [27, 18, 33, 44]);

  const rendered = (
    <Component height="fillsContainer" verticalAlignment="bottom">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `flex-end`,
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  );
});

test(`renders as expected with spacing when filling the container vertically and aligning to the bottom`, () => {
  const Component = createProportionalRowComponent(23, [27, 18, 33, 44]);

  const rendered = (
    <Component height="fillsContainer" verticalAlignment="bottom">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `flex-end`,
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View key="separator0" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View key="separator1" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View key="separator2" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  );
});

test(`renders as expected without spacing when filling the container vertically and stretching to fit`, () => {
  const Component = createProportionalRowComponent(0, [27, 18, 33, 44]);

  const rendered = (
    <Component height="fillsContainer" verticalAlignment="stretched">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `stretch`,
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  );
});

test(`renders as expected with spacing when filling the container vertically and stretching to fit`, () => {
  const Component = createProportionalRowComponent(23, [27, 18, 33, 44]);

  const rendered = (
    <Component height="fillsContainer" verticalAlignment="stretched">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flexDirection: `row`,
        alignItems: `stretch`,
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View key="separator0" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View key="separator1" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View key="separator2" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  );
});
