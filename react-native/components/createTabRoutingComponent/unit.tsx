import * as React from "react";
import { Text, View } from "react-native";
import {
  createTabRoutingComponent,
  unwrapRenderedFunctionComponent,
  TabRoute,
  TabRouteTable,
} from "../../..";

test(`renders the appropriate routes`, () => {
  type RouteKey = `testRouteAKey` | `testRouteBKey` | `testRouteCKey`;

  type OtherProps = {
    exampleOtherPropKey: `Example Other Prop Value`;
  };

  const RouteA: TabRoute<OtherProps> = ({ exampleOtherPropKey }) => (
    <Text>Example Route A {exampleOtherPropKey}</Text>
  );

  const RouteB: TabRoute<OtherProps> = ({ exampleOtherPropKey }) => (
    <Text>Example Route B {exampleOtherPropKey}</Text>
  );

  const RouteC: TabRoute<OtherProps> = ({ exampleOtherPropKey }) => (
    <Text>Example Route C {exampleOtherPropKey}</Text>
  );

  const routeTable: TabRouteTable<RouteKey, OtherProps> = {
    testRouteAKey: RouteA,
    testRouteBKey: RouteB,
    testRouteCKey: RouteC,
  };

  const Component = createTabRoutingComponent(routeTable);

  const rendered = (
    <Component
      route="testRouteBKey"
      exampleOtherPropKey="Example Other Prop Value"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <React.Fragment>
      <View
        key="testRouteAKey"
        style={{ width: `100%`, height: `100%`, display: `none` }}
      >
        <RouteA
          route="testRouteBKey"
          exampleOtherPropKey="Example Other Prop Value"
        />
      </View>
      <View key="testRouteBKey" style={{ width: `100%`, height: `100%` }}>
        <RouteB
          route="testRouteBKey"
          exampleOtherPropKey="Example Other Prop Value"
        />
      </View>
      <View
        key="testRouteCKey"
        style={{ width: `100%`, height: `100%`, display: `none` }}
      >
        <RouteC
          route="testRouteBKey"
          exampleOtherPropKey="Example Other Prop Value"
        />
      </View>
    </React.Fragment>
  );
});
