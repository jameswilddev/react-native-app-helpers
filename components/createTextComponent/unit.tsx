import * as React from "react";
import { Text } from "react-native";
import { createTextComponent } from "../../index";
import { unwrapRenderedFunctionComponent } from "../../utilities/unwrapRenderedFunctionComponent";

test(`renders as expected`, () => {
  const Component = createTextComponent(
    `Test Font Family`,
    37,
    `#34AE17`,
    `left`
  );

  const rendered = <Component>Test Content</Component>;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Text
      style={{
        fontFamily: `Test Font Family`,
        fontSize: 37,
        lineHeight: 51.8,
        color: `#34AE17`,
        textAlign: `left`,
      }}
    >
      Test Content
    </Text>
  );
});
