import * as React from "react";
import { Text, View } from "react-native";
import {
  Route,
  unwrapRenderedFunctionComponent,
  createStackRoutingComponent,
  RouteTable,
  StackRouterState,
} from "../..";

test(`can render one item`, () => {
  type ParametersA = {
    readonly testRouteAParameterKey:
    | `Test Route A Parameter Value A`
    | `Test Route A Parameter Value B`;
  };

  type ParametersB = {
    readonly testRouteBParameterKey: `Test Route B Parameter Value`;
  };

  type ParametersC = {
    readonly testRouteCParameterKey: `Test Route C Parameter Value`;
  };

  type Parameters = {
    testRouteAKey: ParametersA;
    testRouteBKey: ParametersB;
    testRouteCKey: ParametersC;
  };

  type OtherProps = {
    exampleOtherPropKey: `Example Other Prop Value`;
  };

  const RouteA: Route<ParametersA, OtherProps> = ({
    routeState: {
      parameters: { testRouteAParameterKey },
    },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route A with parameter {testRouteAParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

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

  const RouteC: Route<ParametersC, OtherProps> = ({
    routeState: {
      parameters: { testRouteCParameterKey },
    },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route C with parameter {testRouteCParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const routeTable: RouteTable<Parameters, OtherProps> = {
    testRouteAKey: RouteA,
    testRouteBKey: RouteB,
    testRouteCKey: RouteC,
  };

  const routeState: StackRouterState<Parameters> = [
    {
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value`,
      },
    },
  ];

  const Component = createStackRoutingComponent(routeTable);

  const rendered = (
    <Component
      routeState={routeState}
      exampleOtherPropKey="Example Other Prop Value"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <React.Fragment>
      {[
        <View key="0" style={{ width: `100%`, height: `100%` }}>
          <RouteB
            routeState={{
              key: `testRouteBKey`,
              parameters: {
                testRouteBParameterKey: `Test Route B Parameter Value`,
              },
            }}
            exampleOtherPropKey="Example Other Prop Value"
          />
        </View>,
      ]}
    </React.Fragment>
  );
});

test(`can render two items`, () => {
  type ParametersA = {
    readonly testRouteAParameterKey:
    | `Test Route A Parameter Value A`
    | `Test Route A Parameter Value B`;
  };

  type ParametersB = {
    readonly testRouteBParameterKey: `Test Route B Parameter Value`;
  };

  type ParametersC = {
    readonly testRouteCParameterKey: `Test Route C Parameter Value`;
  };

  type Parameters = {
    testRouteAKey: ParametersA;
    testRouteBKey: ParametersB;
    testRouteCKey: ParametersC;
  };

  type OtherProps = {
    exampleOtherPropKey: `Example Other Prop Value`;
  };

  const RouteA: Route<ParametersA, OtherProps> = ({
    routeState: {
      parameters: { testRouteAParameterKey },
    },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route A with parameter {testRouteAParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

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

  const RouteC: Route<ParametersC, OtherProps> = ({
    routeState: {
      parameters: { testRouteCParameterKey },
    },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route C with parameter {testRouteCParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const routeTable: RouteTable<Parameters, OtherProps> = {
    testRouteAKey: RouteA,
    testRouteBKey: RouteB,
    testRouteCKey: RouteC,
  };

  const routeState: StackRouterState<Parameters> = [
    {
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value`,
      },
    },
    {
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value A`,
      },
    },
  ];

  const Component = createStackRoutingComponent(routeTable);

  const rendered = (
    <Component
      routeState={routeState}
      exampleOtherPropKey="Example Other Prop Value"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <React.Fragment>
      <View key="0" style={{ width: `100%`, height: `100%`, display: `none` }}>
        <RouteB
          routeState={{
            key: `testRouteBKey`,
            parameters: {
              testRouteBParameterKey: `Test Route B Parameter Value`,
            },
          }}
          exampleOtherPropKey="Example Other Prop Value"
        />
      </View>
      <View key="1" style={{ width: `100%`, height: `100%` }}>
        <RouteA
          routeState={{
            key: `testRouteAKey`,
            parameters: {
              testRouteAParameterKey: `Test Route A Parameter Value A`,
            },
          }}
          exampleOtherPropKey="Example Other Prop Value"
        />
      </View>
    </React.Fragment>
  );
});

test(`can render three items`, () => {
  type ParametersA = {
    readonly testRouteAParameterKey:
    | `Test Route A Parameter Value A`
    | `Test Route A Parameter Value B`;
  };

  type ParametersB = {
    readonly testRouteBParameterKey: `Test Route B Parameter Value`;
  };

  type ParametersC = {
    readonly testRouteCParameterKey: `Test Route C Parameter Value`;
  };

  type Parameters = {
    testRouteAKey: ParametersA;
    testRouteBKey: ParametersB;
    testRouteCKey: ParametersC;
  };

  type OtherProps = {
    exampleOtherPropKey: `Example Other Prop Value`;
  };

  const RouteA: Route<ParametersA, OtherProps> = ({
    routeState: {
      parameters: { testRouteAParameterKey },
    },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route A with parameter {testRouteAParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

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

  const RouteC: Route<ParametersC, OtherProps> = ({
    routeState: {
      parameters: { testRouteCParameterKey },
    },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route C with parameter {testRouteCParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const routeTable: RouteTable<Parameters, OtherProps> = {
    testRouteAKey: RouteA,
    testRouteBKey: RouteB,
    testRouteCKey: RouteC,
  };

  const routeState: StackRouterState<Parameters> = [
    {
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value`,
      },
    },
    {
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value A`,
      },
    },
    {
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value B`,
      },
    },
  ];

  const Component = createStackRoutingComponent(routeTable);

  const rendered = (
    <Component
      routeState={routeState}
      exampleOtherPropKey="Example Other Prop Value"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <React.Fragment>
      <View key="0" style={{ width: `100%`, height: `100%`, display: `none` }}>
        <RouteB
          routeState={{
            key: `testRouteBKey`,
            parameters: {
              testRouteBParameterKey: `Test Route B Parameter Value`,
            },
          }}
          exampleOtherPropKey="Example Other Prop Value"
        />
      </View>
      <View key="1" style={{ width: `100%`, height: `100%`, display: `none` }}>
        <RouteA
          routeState={{
            key: `testRouteAKey`,
            parameters: {
              testRouteAParameterKey: `Test Route A Parameter Value A`,
            },
          }}
          exampleOtherPropKey="Example Other Prop Value"
        />
      </View>
      <View key="2" style={{ width: `100%`, height: `100%` }}>
        <RouteA
          routeState={{
            key: `testRouteAKey`,
            parameters: {
              testRouteAParameterKey: `Test Route A Parameter Value B`,
            },
          }}
          exampleOtherPropKey="Example Other Prop Value"
        />
      </View>
    </React.Fragment>
  );
});
