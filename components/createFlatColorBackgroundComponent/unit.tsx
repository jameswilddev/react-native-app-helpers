import * as React from "react";
import { View, Text } from "react-native";
import { createFlatColorBackgroundComponent } from "../..";
import { unwrapRenderedFunctionComponent } from "../../utilities/unwrapRenderedFunctionComponent";

test(`renders as expected`, () => {
  const Component = createFlatColorBackgroundComponent(`red`);

  const rendered = (
    <Component>
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ backgroundColor: `red` }}>
      <Text>Test Content</Text>
    </View>
  );
});
