import * as React from "react";
import { Text } from "react-native";
import {
  SizedHorizontallySymmetricalSafeAreaView,
  HorizontallySymmetricalSafeAreaView,
} from "../../..";
import { unwrapRenderedFunctionComponent } from "../../utilities/unwrapRenderedFunctionComponent";

test(`renders as expected when width fills container and height fills container`, () => {
  const rendered = (
    <SizedHorizontallySymmetricalSafeAreaView
      width="fillsContainer"
      height="fillsContainer"
      left
    >
      <Text>Test Content</Text>
    </SizedHorizontallySymmetricalSafeAreaView>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      left
      style={{ width: `100%`, height: `100%` }}
    >
      <Text>Test Content</Text>
    </HorizontallySymmetricalSafeAreaView>
  );
});

test(`renders as expected when width fills container and height fits content`, () => {
  const rendered = (
    <SizedHorizontallySymmetricalSafeAreaView
      width="fillsContainer"
      height="fitsContent"
      left
    >
      <Text>Test Content</Text>
    </SizedHorizontallySymmetricalSafeAreaView>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView left style={{ width: `100%` }}>
      <Text>Test Content</Text>
    </HorizontallySymmetricalSafeAreaView>
  );
});

test(`renders as expected when width fits content and height fills container`, () => {
  const rendered = (
    <SizedHorizontallySymmetricalSafeAreaView
      width="fitsContent"
      height="fillsContainer"
      left
    >
      <Text>Test Content</Text>
    </SizedHorizontallySymmetricalSafeAreaView>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView left style={{ height: `100%` }}>
      <Text>Test Content</Text>
    </HorizontallySymmetricalSafeAreaView>
  );
});

test(`renders as expected when width fits content and height fits content`, () => {
  const rendered = (
    <SizedHorizontallySymmetricalSafeAreaView
      width="fitsContent"
      height="fitsContent"
      left
    >
      <Text>Test Content</Text>
    </SizedHorizontallySymmetricalSafeAreaView>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView left>
      <Text>Test Content</Text>
    </HorizontallySymmetricalSafeAreaView>
  );
});
