import * as React from "react";
import { View, Text, Image } from "react-native";
import { createImageBackgroundComponent } from "../../..";
import { unwrapRenderedFunctionComponent } from "../../utilities/unwrapRenderedFunctionComponent";

test(`renders as expected when fitting the content`, () => {
  const Component = createImageBackgroundComponent({ uri: `Example Uri` });

  const rendered = (
    <Component size="fitsContent">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View pointerEvents="box-none">
      <View
        pointerEvents="none"
        style={{
          position: `absolute`,
          left: 0,
          top: 0,
          width: `100%`,
          height: `100%`,
        }}
      >
        <Image
          source={{ uri: `Example Uri` }}
          style={{ width: `100%`, height: `100%` }}
          resizeMode="cover"
        />
      </View>
      <Text>Test Content</Text>
    </View>
  );
});

test(`renders as expected when filling the container`, () => {
  const Component = createImageBackgroundComponent({ uri: `Example Uri` });

  const rendered = (
    <Component size="fillsContainer">
      <Text>Test Content</Text>
    </Component>
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ flexGrow: 1 }} pointerEvents="box-none">
      <View
        style={{
          position: `absolute`,
          left: 0,
          top: 0,
          width: `100%`,
          height: `100%`,
        }}
        pointerEvents="none"
      >
        <Image
          source={{ uri: `Example Uri` }}
          style={{
            width: `100%`,
            height: `100%`,
          }}
          resizeMode="cover"
        />
      </View>
      <Text>Test Content</Text>
    </View>
  );
});
