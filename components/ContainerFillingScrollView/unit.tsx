import * as React from "react";
import { Text, ScrollView } from "react-native";
import { ContainerFillingScrollView } from "../..";
import { unwrapRenderedFunctionComponent } from "../../utilities/unwrapRenderedFunctionComponent";

test(`renders as expected`, () => {
  const rendered = (
    <ContainerFillingScrollView horizontal decelerationRate="fast">
      <Text>Test Content</Text>
    </ContainerFillingScrollView>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <ScrollView
      horizontal
      decelerationRate="fast"
      style={{ width: "100%", height: "100%" }}
    >
      <Text>Test Content</Text>
    </ScrollView>
  );
});
