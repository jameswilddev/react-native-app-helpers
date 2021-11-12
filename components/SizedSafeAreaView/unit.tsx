import * as React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SizedSafeAreaView } from "../..";
import { unwrapRenderedFunctionComponent } from "../../utilities/unwrapRenderedFunctionComponent";

test(`renders as expected when width fills container and height fills container`, () => {
  const rendered = (
    <SizedSafeAreaView
      width="fillsContainer"
      height="fillsContainer"
      edges={[`left`]}
    >
      <Text>Test Content</Text>
    </SizedSafeAreaView>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <SafeAreaView
      edges={[`left`]}
      style={{ width: `100%`, height: `100%` }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </SafeAreaView>
  );
});

test(`renders as expected when width fills container and height fits content`, () => {
  const rendered = (
    <SizedSafeAreaView
      width="fillsContainer"
      height="fitsContent"
      edges={[`left`]}
    >
      <Text>Test Content</Text>
    </SizedSafeAreaView>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <SafeAreaView
      edges={[`left`]}
      style={{ width: `100%` }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </SafeAreaView>
  );
});

test(`renders as expected when width fits content and height fills container`, () => {
  const rendered = (
    <SizedSafeAreaView
      width="fitsContent"
      height="fillsContainer"
      edges={[`left`]}
    >
      <Text>Test Content</Text>
    </SizedSafeAreaView>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <SafeAreaView
      edges={[`left`]}
      style={{ height: `100%` }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </SafeAreaView>
  );
});

test(`renders as expected when width fits content and height fits content`, () => {
  const rendered = (
    <SizedSafeAreaView
      width="fitsContent"
      height="fitsContent"
      edges={[`left`]}
    >
      <Text>Test Content</Text>
    </SizedSafeAreaView>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <SafeAreaView edges={[`left`]} pointerEvents="box-none">
      <Text>Test Content</Text>
    </SafeAreaView>
  );
});
