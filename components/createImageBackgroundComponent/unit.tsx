import * as React from "react";
import { View, Text, Image } from "react-native";
import { createImageBackgroundComponent } from "../..";
import { unwrapRenderedFunctionComponent } from "../../utilities/unwrapRenderedFunctionComponent";

test(`renders as expected`, () => {
  const Component = createImageBackgroundComponent({ uri: `Example Uri` });

  const rendered = (
    <Component>
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View>
      <Image
        source={{ uri: `Example Uri` }}
        style={{
          position: `absolute`,
          left: 0,
          top: 0,
          width: `100%`,
          height: `100%`,
        }}
        resizeMode="cover"
      />
      <Text>Test Content</Text>
    </View>
  );
});
