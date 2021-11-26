import * as React from "react";
import { Text, View } from "react-native";
import {
  createFixedWidthComponent,
  unwrapRenderedFunctionComponent,
} from "../..";

test(`renders as expected when filling its container vertically`, () => {
  const Component = createFixedWidthComponent(243);

  const rendered = (
    <Component height="fillsContainer">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: 243, height: `100%` }}>
      <Text>Example Content</Text>
    </View>
  );
});

test(`renders as expected when fitting its content vertically`, () => {
  const Component = createFixedWidthComponent(243);

  const rendered = (
    <Component height="fitsContent">
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: 243 }}>
      <Text>Example Content</Text>
    </View>
  );
});
