import * as React from "react";
import { Text } from "react-native";
import { createTextComponent } from "../../index";
import { unwrapRenderedFunctionComponent } from "../../utilities/unwrapRenderedFunctionComponent";

test(`renders single-line`, () => {
  const Component = createTextComponent(
    `Test Font Family`,
    37,
    `#34AE17`,
    `left`,
    false
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
        width: "100%",
      }}
      numberOfLines={1}
    >
      Test Content
    </Text>
  );
});

test(`renders multi-line`, () => {
  const Component = createTextComponent(
    `Test Font Family`,
    37,
    `#34AE17`,
    `left`,
    true
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
        width: "100%",
      }}
      numberOfLines={0}
    >
      Test Content
    </Text>
  );
});
