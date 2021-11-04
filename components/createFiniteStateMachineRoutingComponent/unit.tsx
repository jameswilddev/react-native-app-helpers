import * as React from "react";
import { Text } from "react-native";
import {
  Route,
  unwrapRenderedFunctionComponent,
  createFiniteStateMachineRoutingComponent,
  FiniteStateMachineRouterState,
  RouteTable,
} from "../..";

test(`passes through to the appropriate route`, () => {
  type ParametersB = {
    readonly testRouteBParameterKey: `Test Route B Parameter Value`;
  };

  type Parameters = {
    testRouteAKey: {
      readonly testRouteAParameterKey: `Test Route A Parameter Value`;
    };
    testRouteBKey: ParametersB;
    testRouteCKey: {
      readonly testRouteCParameterKey: `Test Route C Parameter Value`;
    };
  };

  type OtherProps = {
    exampleOtherPropKey: `Example Other Prop Value`;
  };

  const RouteB: Route<ParametersB, OtherProps> = ({
    routeState: {
      parameters: { testRouteBParameterKey },
    },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route B with parameter {testRouteBParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const routeTable: RouteTable<Parameters, OtherProps> = {
    testRouteAKey: ({
      routeState: {
        parameters: { testRouteAParameterKey },
      },
      exampleOtherPropKey,
    }) => (
      <Text>
        Example Route A with parameter {testRouteAParameterKey}{" "}
        {exampleOtherPropKey}
      </Text>
    ),
    testRouteBKey: RouteB,
    testRouteCKey: ({
      routeState: {
        parameters: { testRouteCParameterKey },
      },
      exampleOtherPropKey,
    }) => (
      <Text>
        Example Route C with parameter {testRouteCParameterKey}{" "}
        {exampleOtherPropKey}
      </Text>
    ),
  };

  const routeState: FiniteStateMachineRouterState<Parameters> = {
    key: `testRouteBKey`,
    parameters: {
      testRouteBParameterKey: `Test Route B Parameter Value`,
    },
  };

  const Component = createFiniteStateMachineRoutingComponent(routeTable);

  const rendered = (
    <Component
      routeState={routeState}
      exampleOtherPropKey="Example Other Prop Value"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <RouteB
      routeState={routeState}
      exampleOtherPropKey="Example Other Prop Value"
    />
  );
});
