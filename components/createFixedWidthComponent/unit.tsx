import * as React from "react";
import { Text, View } from "react-native";
import {
  createFixedWidthComponent,
  unwrapRenderedFunctionComponent,
} from "../..";

test(`renders as expected`, () => {
  const Component = createFixedWidthComponent(243);

  const rendered = (
    <Component>
      <Text>Example Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: 243, height: `100%` }}>
      <Text>Example Content</Text>
    </View>
  );
});
