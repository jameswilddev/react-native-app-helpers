import * as React from "react";
import { Text } from "react-native";
import { unwrapRenderedFunctionComponent } from "../../..";
import { StatusPillStyle, createStatusPillComponent } from "../../..";

test(`renders as expected`, () => {
  type Status = `exampleStatusA` | `exampleStatusB` | `exampleStatusC`;
  const statusPillStyle: StatusPillStyle<Status> = {
    fontFamily: `Example Font Family`,
    fontSize: 12,
    padding: 2,
    statuses: {
      exampleStatusA: {
        label: `Example Status A`,
        color: `red`,
        background: `purple`,
      },
      exampleStatusB: {
        label: `Example Status B`,
        color: `yellow`,
        background: `orange`,
      },
      exampleStatusC: {
        label: `Example Status C`,
        color: `green`,
        background: `cyan`,
      },
    },
  };
  const Component = createStatusPillComponent(statusPillStyle);

  const rendered = <Component status="exampleStatusB" />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Text
      numberOfLines={1}
      style={{
        fontFamily: `Example Font Family`,
        fontSize: 12,
        lineHeight: 16.799999999999997,
        color: `yellow`,
        backgroundColor: `orange`,
        paddingVertical: 2,
        paddingHorizontal: 10.399999999999999,
        borderRadius: 10.399999999999999,
        textAlign: `center`,
        overflow: `hidden`,
      }}
    >
      Example Status B
    </Text>
  );
});

test(`renders as expected without padding`, () => {
  type Status = `exampleStatusA` | `exampleStatusB` | `exampleStatusC`;
  const statusPillStyle: StatusPillStyle<Status> = {
    fontFamily: `Example Font Family`,
    fontSize: 12,
    padding: 0,
    statuses: {
      exampleStatusA: {
        label: `Example Status A`,
        color: `red`,
        background: `purple`,
      },
      exampleStatusB: {
        label: `Example Status B`,
        color: `yellow`,
        background: `orange`,
      },
      exampleStatusC: {
        label: `Example Status C`,
        color: `green`,
        background: `cyan`,
      },
    },
  };
  const Component = createStatusPillComponent(statusPillStyle);

  const rendered = <Component status="exampleStatusB" />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Text
      numberOfLines={1}
      style={{
        fontFamily: `Example Font Family`,
        fontSize: 12,
        lineHeight: 16.799999999999997,
        color: `yellow`,
        backgroundColor: `orange`,
        paddingHorizontal: 8.399999999999999,
        borderRadius: 8.399999999999999,
        textAlign: `center`,
        overflow: `hidden`,
      }}
    >
      Example Status B
    </Text>
  );
});
