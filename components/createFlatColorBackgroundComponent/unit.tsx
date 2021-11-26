import * as React from "react";
import { View, Text } from "react-native";
import { createFlatColorBackgroundComponent } from "../..";
import { unwrapRenderedFunctionComponent } from "../../utilities/unwrapRenderedFunctionComponent";

test(`renders as expected when fitting the content`, () => {
  const Component = createFlatColorBackgroundComponent(`red`);

  const rendered = (
    <Component size="fitsContent">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ backgroundColor: `red` }} pointerEvents="box-none">
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when filling the container`, () => {
  const Component = createFlatColorBackgroundComponent(`red`);

  const rendered = (
    <Component size="fillsContainer">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ backgroundColor: `red`, flexGrow: 1 }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  );
});
