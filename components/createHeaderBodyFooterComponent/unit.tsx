import * as React from "react";
import { View, Text } from "react-native";
import { createHeaderBodyFooterComponent } from "../..";
import { unwrapRenderedFunctionComponent } from "../../utilities/unwrapRenderedFunctionComponent";

test(`renders without spacings without a header body or footer`, () => {
  const Component = createHeaderBodyFooterComponent(0, 0);

  const rendered = <Component />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%` }}></View>
  );
});

test(`renders without spacings with only a header`, () => {
  const Component = createHeaderBodyFooterComponent(0, 0);

  const rendered = <Component header={<Text>Example Header</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View>
        <Text>Example Header</Text>
      </View>
    </View>
  );
});

test(`renders without spacings with only a body`, () => {
  const Component = createHeaderBodyFooterComponent(0, 0);

  const rendered = <Component body={<Text>Example Body</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
    </View>
  );
});

test(`renders without spacings with only a header and body`, () => {
  const Component = createHeaderBodyFooterComponent(0, 0);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      body={<Text>Example Body</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View>
        <Text>Example Header</Text>
      </View>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
    </View>
  );
});

test(`renders without spacings with only a footer`, () => {
  const Component = createHeaderBodyFooterComponent(0, 0);

  const rendered = <Component footer={<Text>Example Footer</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flex: 1,
        justifyContent: `flex-end`,
      }}
    >
      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders without spacings with only a header and footer`, () => {
  const Component = createHeaderBodyFooterComponent(0, 0);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flex: 1,
        justifyContent: `space-between`,
      }}
    >
      <View>
        <Text>Example Header</Text>
      </View>

      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders without spacings with only a body and footer`, () => {
  const Component = createHeaderBodyFooterComponent(0, 0);

  const rendered = (
    <Component
      body={<Text>Example Body</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders without spacings with a header body and footer`, () => {
  const Component = createHeaderBodyFooterComponent(0, 0);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      body={<Text>Example Body</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View>
        <Text>Example Header</Text>
      </View>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with only a positive header-body spacing without a header body or footer`, () => {
  const Component = createHeaderBodyFooterComponent(53, 0);

  const rendered = <Component />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%` }}></View>
  );
});

test(`renders with only a positive header-body spacing with only a header`, () => {
  const Component = createHeaderBodyFooterComponent(53, 0);

  const rendered = <Component header={<Text>Example Header</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View>
        <Text>Example Header</Text>
      </View>
    </View>
  );
});

test(`renders with only a positive header-body spacing with only a body`, () => {
  const Component = createHeaderBodyFooterComponent(53, 0);

  const rendered = <Component body={<Text>Example Body</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
    </View>
  );
});

test(`renders with only a positive header-body spacing with only a header and body`, () => {
  const Component = createHeaderBodyFooterComponent(53, 0);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      body={<Text>Example Body</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ marginBottom: 53 }}>
        <Text>Example Header</Text>
      </View>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
    </View>
  );
});

test(`renders with only a positive header-body spacing with only a footer`, () => {
  const Component = createHeaderBodyFooterComponent(53, 0);

  const rendered = <Component footer={<Text>Example Footer</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flex: 1,
        justifyContent: `flex-end`,
      }}
    >
      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with only a positive header-body spacing with only a header and footer`, () => {
  const Component = createHeaderBodyFooterComponent(53, 0);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flex: 1,
        justifyContent: `space-between`,
      }}
    >
      <View>
        <Text>Example Header</Text>
      </View>

      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with only a positive header-body spacing with only a body and footer`, () => {
  const Component = createHeaderBodyFooterComponent(53, 0);

  const rendered = (
    <Component
      body={<Text>Example Body</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with only a positive header-body spacing with a header body and footer`, () => {
  const Component = createHeaderBodyFooterComponent(53, 0);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      body={<Text>Example Body</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ marginBottom: 53 }}>
        <Text>Example Header</Text>
      </View>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with only a negative header-body spacing without a header body or footer`, () => {
  const Component = createHeaderBodyFooterComponent(-53, 0);

  const rendered = <Component />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%` }}></View>
  );
});

test(`renders with only a negative header-body spacing with only a header`, () => {
  const Component = createHeaderBodyFooterComponent(-53, 0);

  const rendered = <Component header={<Text>Example Header</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View>
        <Text>Example Header</Text>
      </View>
    </View>
  );
});

test(`renders with only a negative header-body spacing with only a body`, () => {
  const Component = createHeaderBodyFooterComponent(-53, 0);

  const rendered = <Component body={<Text>Example Body</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
    </View>
  );
});

test(`renders with only a negative header-body spacing with only a header and body`, () => {
  const Component = createHeaderBodyFooterComponent(-53, 0);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      body={<Text>Example Body</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ marginBottom: -53 }}>
        <Text>Example Header</Text>
      </View>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
    </View>
  );
});

test(`renders with only a negative header-body spacing with only a footer`, () => {
  const Component = createHeaderBodyFooterComponent(-53, 0);

  const rendered = <Component footer={<Text>Example Footer</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flex: 1,
        justifyContent: `flex-end`,
      }}
    >
      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with only a negative header-body spacing with only a header and footer`, () => {
  const Component = createHeaderBodyFooterComponent(-53, 0);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flex: 1,
        justifyContent: `space-between`,
      }}
    >
      <View>
        <Text>Example Header</Text>
      </View>

      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with only a negative header-body spacing with only a body and footer`, () => {
  const Component = createHeaderBodyFooterComponent(-53, 0);

  const rendered = (
    <Component
      body={<Text>Example Body</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with only a negative header-body spacing with a header body and footer`, () => {
  const Component = createHeaderBodyFooterComponent(-53, 0);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      body={<Text>Example Body</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ marginBottom: -53 }}>
        <Text>Example Header</Text>
      </View>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with only a positive body-footer spacing without a header body or footer`, () => {
  const Component = createHeaderBodyFooterComponent(0, 53);

  const rendered = <Component />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%` }}></View>
  );
});

test(`renders with only a positive body-footer spacing with only a header`, () => {
  const Component = createHeaderBodyFooterComponent(0, 53);

  const rendered = <Component header={<Text>Example Header</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View>
        <Text>Example Header</Text>
      </View>
    </View>
  );
});

test(`renders with only a positive body-footer spacing with only a body`, () => {
  const Component = createHeaderBodyFooterComponent(0, 53);

  const rendered = <Component body={<Text>Example Body</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
    </View>
  );
});

test(`renders with only a positive body-footer spacing with only a header and body`, () => {
  const Component = createHeaderBodyFooterComponent(0, 53);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      body={<Text>Example Body</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View>
        <Text>Example Header</Text>
      </View>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
    </View>
  );
});

test(`renders with only a positive body-footer spacing with only a footer`, () => {
  const Component = createHeaderBodyFooterComponent(0, 53);

  const rendered = <Component footer={<Text>Example Footer</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flex: 1,
        justifyContent: `flex-end`,
      }}
    >
      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with only a positive body-footer spacing with only a header and footer`, () => {
  const Component = createHeaderBodyFooterComponent(0, 53);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flex: 1,
        justifyContent: `space-between`,
      }}
    >
      <View>
        <Text>Example Header</Text>
      </View>

      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with only a positive body-footer spacing with only a body and footer`, () => {
  const Component = createHeaderBodyFooterComponent(0, 53);

  const rendered = (
    <Component
      body={<Text>Example Body</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
      <View style={{ marginTop: 53 }}>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with only a positive body-footer spacing with a header body and footer`, () => {
  const Component = createHeaderBodyFooterComponent(0, 53);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      body={<Text>Example Body</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View>
        <Text>Example Header</Text>
      </View>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
      <View style={{ marginTop: 53 }}>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with only a negative body-footer spacing without a header body or footer`, () => {
  const Component = createHeaderBodyFooterComponent(0, -53);

  const rendered = <Component />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%` }}></View>
  );
});

test(`renders with only a negative body-footer spacing with only a header`, () => {
  const Component = createHeaderBodyFooterComponent(0, -53);

  const rendered = <Component header={<Text>Example Header</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View>
        <Text>Example Header</Text>
      </View>
    </View>
  );
});

test(`renders with only a negative body-footer spacing with only a body`, () => {
  const Component = createHeaderBodyFooterComponent(0, -53);

  const rendered = <Component body={<Text>Example Body</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
    </View>
  );
});

test(`renders with only a negative body-footer spacing with only a header and body`, () => {
  const Component = createHeaderBodyFooterComponent(0, -53);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      body={<Text>Example Body</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View>
        <Text>Example Header</Text>
      </View>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
    </View>
  );
});

test(`renders with only a negative body-footer spacing with only a footer`, () => {
  const Component = createHeaderBodyFooterComponent(0, -53);

  const rendered = <Component footer={<Text>Example Footer</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flex: 1,
        justifyContent: `flex-end`,
      }}
    >
      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with only a negative body-footer spacing with only a header and footer`, () => {
  const Component = createHeaderBodyFooterComponent(0, -53);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flex: 1,
        justifyContent: `space-between`,
      }}
    >
      <View>
        <Text>Example Header</Text>
      </View>

      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with only a negative body-footer spacing with only a body and footer`, () => {
  const Component = createHeaderBodyFooterComponent(0, -53);

  const rendered = (
    <Component
      body={<Text>Example Body</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
      <View style={{ marginTop: -53 }}>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with only a negative body-footer spacing with a header body and footer`, () => {
  const Component = createHeaderBodyFooterComponent(0, -53);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      body={<Text>Example Body</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View>
        <Text>Example Header</Text>
      </View>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
      <View style={{ marginTop: -53 }}>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with with both header-body and body-footer spacings without a header body or footer`, () => {
  const Component = createHeaderBodyFooterComponent(27, 53);

  const rendered = <Component />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%` }}></View>
  );
});

test(`renders with with both header-body and body-footer spacings with only a header`, () => {
  const Component = createHeaderBodyFooterComponent(27, 53);

  const rendered = <Component header={<Text>Example Header</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View>
        <Text>Example Header</Text>
      </View>
    </View>
  );
});

test(`renders with with both header-body and body-footer spacings with only a body`, () => {
  const Component = createHeaderBodyFooterComponent(27, 53);

  const rendered = <Component body={<Text>Example Body</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
    </View>
  );
});

test(`renders with with both header-body and body-footer spacings with only a header and body`, () => {
  const Component = createHeaderBodyFooterComponent(27, 53);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      body={<Text>Example Body</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ marginBottom: 27 }}>
        <Text>Example Header</Text>
      </View>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
    </View>
  );
});

test(`renders with with both header-body and body-footer spacings with only a footer`, () => {
  const Component = createHeaderBodyFooterComponent(27, 53);

  const rendered = <Component footer={<Text>Example Footer</Text>} />;

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flex: 1,
        justifyContent: `flex-end`,
      }}
    >
      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with with both header-body and body-footer spacings with only a header and footer`, () => {
  const Component = createHeaderBodyFooterComponent(27, 53);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: `100%`,
        height: `100%`,
        flex: 1,
        justifyContent: `space-between`,
      }}
    >
      <View>
        <Text>Example Header</Text>
      </View>

      <View>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with with both header-body and body-footer spacings with only a body and footer`, () => {
  const Component = createHeaderBodyFooterComponent(27, 53);

  const rendered = (
    <Component
      body={<Text>Example Body</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
      <View style={{ marginTop: 53 }}>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});

test(`renders with with both header-body and body-footer spacings with a header body and footer`, () => {
  const Component = createHeaderBodyFooterComponent(27, 53);

  const rendered = (
    <Component
      header={<Text>Example Header</Text>}
      body={<Text>Example Body</Text>}
      footer={<Text>Example Footer</Text>}
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%`, height: `100%`, flex: 1 }}>
      <View style={{ marginBottom: 27 }}>
        <Text>Example Header</Text>
      </View>
      <View style={{ flexGrow: 1, flexShrink: 1, overflow: `hidden` }}>
        <Text>Example Body</Text>
      </View>
      <View style={{ marginTop: 53 }}>
        <Text>Example Footer</Text>
      </View>
    </View>
  );
});
