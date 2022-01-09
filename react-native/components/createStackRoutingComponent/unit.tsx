import * as React from "react";
import { Text, View } from "react-native";
import {
  unwrapRenderedFunctionComponent,
  createStackRoutingComponent,
  StackRouterState,
  StackRouteTable,
  StackRoute,
} from "../../..";

test(`can render one item width`, () => {
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

  const RouteA: StackRoute<Parameters, `testRouteAKey`, OtherProps> = ({
    parameters: { testRouteAParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route A with parameter {testRouteAParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const RouteB: StackRoute<Parameters, `testRouteBKey`, OtherProps> = ({
    parameters: { testRouteBParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route B with parameter {testRouteBParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const RouteC: StackRoute<Parameters, `testRouteCKey`, OtherProps> = ({
    parameters: { testRouteCParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route C with parameter {testRouteCParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const routeTable: StackRouteTable<Parameters, OtherProps> = {
    testRouteAKey: RouteA,
    testRouteBKey: RouteB,
    testRouteCKey: RouteC,
  };

  const routeState: StackRouterState<Parameters> = [
    {
      uuid: `ec055b0f-0659-4e9a-a889-06a7586bb61a`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value`,
      },
    },
  ];

  const setRouteState = jest.fn();

  const Component = createStackRoutingComponent(routeTable);

  const rendered = (
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <React.Fragment>
      {[
        <View
          key="ec055b0f-0659-4e9a-a889-06a7586bb61a"
          style={{ position: `absolute`, width: `100%`, height: `100%` }}
        >
          <RouteB
            push={expect.any(Function)}
            pop={expect.any(Function)}
            replace={expect.any(Function)}
            reset={expect.any(Function)}
            parameters={{
              testRouteBParameterKey: `Test Route B Parameter Value`,
            }}
            routeState={routeState}
            setRouteState={setRouteState}
            exampleOtherPropKey="Example Other Prop Value"
          />
        </View>,
      ]}
    </React.Fragment>
  );

  expect(setRouteState).not.toHaveBeenCalled();
});

test(`can render two items width`, () => {
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

  const RouteA: StackRoute<Parameters, `testRouteAKey`, OtherProps> = ({
    parameters: { testRouteAParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route A with parameter {testRouteAParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const RouteB: StackRoute<Parameters, `testRouteBKey`, OtherProps> = ({
    parameters: { testRouteBParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route B with parameter {testRouteBParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const RouteC: StackRoute<Parameters, `testRouteCKey`, OtherProps> = ({
    parameters: { testRouteCParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route C with parameter {testRouteCParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const routeTable: StackRouteTable<Parameters, OtherProps> = {
    testRouteAKey: RouteA,
    testRouteBKey: RouteB,
    testRouteCKey: RouteC,
  };

  const routeState: StackRouterState<Parameters> = [
    {
      uuid: `ec055b0f-0659-4e9a-a889-06a7586bb61a`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value`,
      },
    },
    {
      uuid: `f36ce5e7-d37e-443a-8635-718118c27128`,
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value A`,
      },
    },
  ];

  const setRouteState = jest.fn();

  const Component = createStackRoutingComponent(routeTable);

  const rendered = (
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <React.Fragment>
      <View
        key="ec055b0f-0659-4e9a-a889-06a7586bb61a"
        style={{
          position: `absolute`,
          width: `100%`,
          height: `100%`,
          display: `none`,
        }}
      >
        <RouteB
          push={expect.any(Function)}
          pop={expect.any(Function)}
          replace={expect.any(Function)}
          reset={expect.any(Function)}
          parameters={{
            testRouteBParameterKey: `Test Route B Parameter Value`,
          }}
          routeState={routeState}
          setRouteState={setRouteState}
          exampleOtherPropKey="Example Other Prop Value"
        />
      </View>
      <View
        key="f36ce5e7-d37e-443a-8635-718118c27128"
        style={{ width: `100%`, height: `100%`, position: `absolute` }}
      >
        <RouteA
          push={expect.any(Function)}
          pop={expect.any(Function)}
          replace={expect.any(Function)}
          reset={expect.any(Function)}
          parameters={{
            testRouteAParameterKey: `Test Route A Parameter Value A`,
          }}
          routeState={routeState}
          setRouteState={setRouteState}
          exampleOtherPropKey="Example Other Prop Value"
        />
      </View>
    </React.Fragment>
  );

  expect(setRouteState).not.toHaveBeenCalled();
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

  const RouteA: StackRoute<Parameters, `testRouteAKey`, OtherProps> = ({
    parameters: { testRouteAParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route A with parameter {testRouteAParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const RouteB: StackRoute<Parameters, `testRouteBKey`, OtherProps> = ({
    parameters: { testRouteBParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route B with parameter {testRouteBParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const RouteC: StackRoute<Parameters, `testRouteCKey`, OtherProps> = ({
    parameters: { testRouteCParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route C with parameter {testRouteCParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const routeTable: StackRouteTable<Parameters, OtherProps> = {
    testRouteAKey: RouteA,
    testRouteBKey: RouteB,
    testRouteCKey: RouteC,
  };

  const routeState: StackRouterState<Parameters> = [
    {
      uuid: `ec055b0f-0659-4e9a-a889-06a7586bb61a`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value`,
      },
    },
    {
      uuid: `f36ce5e7-d37e-443a-8635-718118c27128`,
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value A`,
      },
    },
    {
      uuid: `345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c`,
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value B`,
      },
    },
  ];

  const setRouteState = jest.fn();

  const Component = createStackRoutingComponent(routeTable);

  const rendered = (
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <React.Fragment>
      <View
        key="ec055b0f-0659-4e9a-a889-06a7586bb61a"
        style={{
          width: `100%`,
          height: `100%`,
          display: `none`,
          position: `absolute`,
        }}
      >
        <RouteB
          push={expect.any(Function)}
          pop={expect.any(Function)}
          replace={expect.any(Function)}
          reset={expect.any(Function)}
          parameters={{
            testRouteBParameterKey: `Test Route B Parameter Value`,
          }}
          routeState={routeState}
          setRouteState={setRouteState}
          exampleOtherPropKey="Example Other Prop Value"
        />
      </View>
      <View
        key="f36ce5e7-d37e-443a-8635-718118c27128"
        style={{
          width: `100%`,
          height: `100%`,
          display: `none`,
          position: `absolute`,
        }}
      >
        <RouteA
          push={expect.any(Function)}
          pop={expect.any(Function)}
          replace={expect.any(Function)}
          reset={expect.any(Function)}
          parameters={{
            testRouteAParameterKey: `Test Route A Parameter Value A`,
          }}
          routeState={routeState}
          setRouteState={setRouteState}
          exampleOtherPropKey="Example Other Prop Value"
        />
      </View>
      <View
        key="345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c"
        style={{ width: `100%`, height: `100%`, position: `absolute` }}
      >
        <RouteA
          push={expect.any(Function)}
          pop={expect.any(Function)}
          replace={expect.any(Function)}
          reset={expect.any(Function)}
          parameters={{
            testRouteAParameterKey: `Test Route A Parameter Value B`,
          }}
          routeState={routeState}
          setRouteState={setRouteState}
          exampleOtherPropKey="Example Other Prop Value"
        />
      </View>
    </React.Fragment>
  );

  expect(setRouteState).not.toHaveBeenCalled();
});

describe(`push`, () => {
  type ParametersA = {
    readonly testRouteAParameterKey:
      | `Test Route A Parameter Value A`
      | `Test Route A Parameter Value B`;
  };

  type ParametersB = {
    readonly testRouteBParameterKey:
      | `Test Route B Parameter Value A`
      | `Test Route B Parameter Value B`;
  };

  type ParametersC = {
    readonly testRouteCParameterKey:
      | `Test Route C Parameter Value A`
      | `Test Route C Parameter Value B`;
  };

  type Parameters = {
    testRouteAKey: ParametersA;
    testRouteBKey: ParametersB;
    testRouteCKey: ParametersC;
  };

  type OtherProps = {
    exampleOtherPropKey: `Example Other Prop Value`;
  };

  const RouteA: StackRoute<Parameters, `testRouteAKey`, OtherProps> = ({
    parameters: { testRouteAParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route A with parameter {testRouteAParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const RouteB: StackRoute<Parameters, `testRouteBKey`, OtherProps> = ({
    parameters: { testRouteBParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route B with parameter {testRouteBParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const RouteC: StackRoute<Parameters, `testRouteCKey`, OtherProps> = ({
    parameters: { testRouteCParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route C with parameter {testRouteCParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const routeTable: StackRouteTable<Parameters, OtherProps> = {
    testRouteAKey: RouteA,
    testRouteBKey: RouteB,
    testRouteCKey: RouteC,
  };

  const routeState: StackRouterState<Parameters> = [
    {
      uuid: `ec055b0f-0659-4e9a-a889-06a7586bb61a`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value A`,
      },
    },
    {
      uuid: `f36ce5e7-d37e-443a-8635-718118c27128`,
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value A`,
      },
    },
    {
      uuid: "345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c",
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value B`,
      },
    },
  ];

  const setRouteState = jest.fn();

  const Component = createStackRoutingComponent(routeTable);

  const rendered = (
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
    />
  );

  unwrapRenderedFunctionComponent(rendered).props[
    `children`
  ][1].props.children.props.push(
    {
      uuid: `441aff37-ab3c-4d4f-a623-46aa36a42c14`,
      key: `testRouteCKey`,
      parameters: {
        testRouteBParameterKey: `Test Route C Parameter Value B`,
      },
    },
    {
      uuid: `4380d918-310d-4515-8fb6-fb14b380239c`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value B`,
      },
    }
  );

  expect(setRouteState).toBeCalledTimes(1);
  expect(setRouteState).toHaveBeenCalledWith([
    {
      uuid: `ec055b0f-0659-4e9a-a889-06a7586bb61a`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value A`,
      },
    },
    {
      uuid: `f36ce5e7-d37e-443a-8635-718118c27128`,
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value A`,
      },
    },
    {
      uuid: "345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c",
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value B`,
      },
    },
    {
      uuid: `441aff37-ab3c-4d4f-a623-46aa36a42c14`,
      key: `testRouteCKey`,
      parameters: {
        testRouteBParameterKey: `Test Route C Parameter Value B`,
      },
    },
    {
      uuid: `4380d918-310d-4515-8fb6-fb14b380239c`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value B`,
      },
    },
  ]);
});

describe(`pop`, () => {
  type ParametersA = {
    readonly testRouteAParameterKey:
      | `Test Route A Parameter Value A`
      | `Test Route A Parameter Value B`;
  };

  type ParametersB = {
    readonly testRouteBParameterKey:
      | `Test Route B Parameter Value A`
      | `Test Route B Parameter Value B`;
  };

  type ParametersC = {
    readonly testRouteCParameterKey:
      | `Test Route C Parameter Value A`
      | `Test Route C Parameter Value B`;
  };

  type Parameters = {
    testRouteAKey: ParametersA;
    testRouteBKey: ParametersB;
    testRouteCKey: ParametersC;
  };

  type OtherProps = {
    exampleOtherPropKey: `Example Other Prop Value`;
  };

  const RouteA: StackRoute<Parameters, `testRouteAKey`, OtherProps> = ({
    parameters: { testRouteAParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route A with parameter {testRouteAParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const RouteB: StackRoute<Parameters, `testRouteBKey`, OtherProps> = ({
    parameters: { testRouteBParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route B with parameter {testRouteBParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const RouteC: StackRoute<Parameters, `testRouteCKey`, OtherProps> = ({
    parameters: { testRouteCParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route C with parameter {testRouteCParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const routeTable: StackRouteTable<Parameters, OtherProps> = {
    testRouteAKey: RouteA,
    testRouteBKey: RouteB,
    testRouteCKey: RouteC,
  };

  const routeState: StackRouterState<Parameters> = [
    {
      uuid: `ec055b0f-0659-4e9a-a889-06a7586bb61a`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value A`,
      },
    },
    {
      uuid: `f36ce5e7-d37e-443a-8635-718118c27128`,
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value A`,
      },
    },
    {
      uuid: "345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c",
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value B`,
      },
    },
  ];

  const setRouteState = jest.fn();

  const Component = createStackRoutingComponent(routeTable);

  const rendered = (
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
    />
  );

  unwrapRenderedFunctionComponent(rendered).props[
    `children`
  ][1].props.children.props.pop(2);

  expect(setRouteState).toBeCalledTimes(1);
  expect(setRouteState).toHaveBeenCalledWith([
    {
      uuid: `ec055b0f-0659-4e9a-a889-06a7586bb61a`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value A`,
      },
    },
  ]);
});

describe(`pop default`, () => {
  type ParametersA = {
    readonly testRouteAParameterKey:
      | `Test Route A Parameter Value A`
      | `Test Route A Parameter Value B`;
  };

  type ParametersB = {
    readonly testRouteBParameterKey:
      | `Test Route B Parameter Value A`
      | `Test Route B Parameter Value B`;
  };

  type ParametersC = {
    readonly testRouteCParameterKey:
      | `Test Route C Parameter Value A`
      | `Test Route C Parameter Value B`;
  };

  type Parameters = {
    testRouteAKey: ParametersA;
    testRouteBKey: ParametersB;
    testRouteCKey: ParametersC;
  };

  type OtherProps = {
    exampleOtherPropKey: `Example Other Prop Value`;
  };

  const RouteA: StackRoute<Parameters, `testRouteAKey`, OtherProps> = ({
    parameters: { testRouteAParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route A with parameter {testRouteAParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const RouteB: StackRoute<Parameters, `testRouteBKey`, OtherProps> = ({
    parameters: { testRouteBParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route B with parameter {testRouteBParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const RouteC: StackRoute<Parameters, `testRouteCKey`, OtherProps> = ({
    parameters: { testRouteCParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route C with parameter {testRouteCParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const routeTable: StackRouteTable<Parameters, OtherProps> = {
    testRouteAKey: RouteA,
    testRouteBKey: RouteB,
    testRouteCKey: RouteC,
  };

  const routeState: StackRouterState<Parameters> = [
    {
      uuid: `ec055b0f-0659-4e9a-a889-06a7586bb61a`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value A`,
      },
    },
    {
      uuid: `f36ce5e7-d37e-443a-8635-718118c27128`,
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value A`,
      },
    },
    {
      uuid: "345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c",
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value B`,
      },
    },
  ];

  const setRouteState = jest.fn();

  const Component = createStackRoutingComponent(routeTable);

  const rendered = (
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
    />
  );

  unwrapRenderedFunctionComponent(rendered).props[
    `children`
  ][1].props.children.props.pop();

  expect(setRouteState).toBeCalledTimes(1);
  expect(setRouteState).toHaveBeenCalledWith([
    {
      uuid: `ec055b0f-0659-4e9a-a889-06a7586bb61a`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value A`,
      },
    },
    {
      uuid: `f36ce5e7-d37e-443a-8635-718118c27128`,
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value A`,
      },
    },
  ]);
});

describe(`replace`, () => {
  type ParametersA = {
    readonly testRouteAParameterKey:
      | `Test Route A Parameter Value A`
      | `Test Route A Parameter Value B`;
  };

  type ParametersB = {
    readonly testRouteBParameterKey:
      | `Test Route B Parameter Value A`
      | `Test Route B Parameter Value B`;
  };

  type ParametersC = {
    readonly testRouteCParameterKey:
      | `Test Route C Parameter Value A`
      | `Test Route C Parameter Value B`;
  };

  type Parameters = {
    testRouteAKey: ParametersA;
    testRouteBKey: ParametersB;
    testRouteCKey: ParametersC;
  };

  type OtherProps = {
    exampleOtherPropKey: `Example Other Prop Value`;
  };

  const RouteA: StackRoute<Parameters, `testRouteAKey`, OtherProps> = ({
    parameters: { testRouteAParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route A with parameter {testRouteAParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const RouteB: StackRoute<Parameters, `testRouteBKey`, OtherProps> = ({
    parameters: { testRouteBParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route B with parameter {testRouteBParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const RouteC: StackRoute<Parameters, `testRouteCKey`, OtherProps> = ({
    parameters: { testRouteCParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route C with parameter {testRouteCParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const routeTable: StackRouteTable<Parameters, OtherProps> = {
    testRouteAKey: RouteA,
    testRouteBKey: RouteB,
    testRouteCKey: RouteC,
  };

  const routeState: StackRouterState<Parameters> = [
    {
      uuid: `ec055b0f-0659-4e9a-a889-06a7586bb61a`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value A`,
      },
    },
    {
      uuid: `f36ce5e7-d37e-443a-8635-718118c27128`,
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value A`,
      },
    },
    {
      uuid: "345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c",
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value B`,
      },
    },
  ];

  const setRouteState = jest.fn();

  const Component = createStackRoutingComponent(routeTable);

  const rendered = (
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
    />
  );

  unwrapRenderedFunctionComponent(rendered).props[
    `children`
  ][1].props.children.props.replace(
    2,
    {
      uuid: `e54ad406-9fcd-4ff5-a61c-d323946b92e6`,
      key: `testRouteCKey`,
      parameters: {
        testRouteBParameterKey: `Test Route C Parameter Value B`,
      },
    },
    {
      uuid: `4380d918-310d-4515-8fb6-fb14b380239c`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value B`,
      },
    },
    {
      uuid: `441aff37-ab3c-4d4f-a623-46aa36a42c14`,
      key: `testRouteCKey`,
      parameters: {
        testRouteBParameterKey: `Test Route C Parameter Value A`,
      },
    }
  );

  expect(setRouteState).toBeCalledTimes(1);
  expect(setRouteState).toHaveBeenCalledWith([
    {
      uuid: `ec055b0f-0659-4e9a-a889-06a7586bb61a`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value A`,
      },
    },
    {
      uuid: `e54ad406-9fcd-4ff5-a61c-d323946b92e6`,
      key: `testRouteCKey`,
      parameters: {
        testRouteBParameterKey: `Test Route C Parameter Value B`,
      },
    },
    {
      uuid: `4380d918-310d-4515-8fb6-fb14b380239c`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value B`,
      },
    },
    {
      uuid: `441aff37-ab3c-4d4f-a623-46aa36a42c14`,
      key: `testRouteCKey`,
      parameters: {
        testRouteBParameterKey: `Test Route C Parameter Value A`,
      },
    },
  ]);
});

describe(`reset`, () => {
  type ParametersA = {
    readonly testRouteAParameterKey:
      | `Test Route A Parameter Value A`
      | `Test Route A Parameter Value B`;
  };

  type ParametersB = {
    readonly testRouteBParameterKey:
      | `Test Route B Parameter Value A`
      | `Test Route B Parameter Value B`;
  };

  type ParametersC = {
    readonly testRouteCParameterKey:
      | `Test Route C Parameter Value A`
      | `Test Route C Parameter Value B`;
  };

  type Parameters = {
    testRouteAKey: ParametersA;
    testRouteBKey: ParametersB;
    testRouteCKey: ParametersC;
  };

  type OtherProps = {
    exampleOtherPropKey: `Example Other Prop Value`;
  };

  const RouteA: StackRoute<Parameters, `testRouteAKey`, OtherProps> = ({
    parameters: { testRouteAParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route A with parameter {testRouteAParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const RouteB: StackRoute<Parameters, `testRouteBKey`, OtherProps> = ({
    parameters: { testRouteBParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route B with parameter {testRouteBParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const RouteC: StackRoute<Parameters, `testRouteCKey`, OtherProps> = ({
    parameters: { testRouteCParameterKey },
    exampleOtherPropKey,
  }) => (
    <Text>
      Example Route C with parameter {testRouteCParameterKey}{" "}
      {exampleOtherPropKey}
    </Text>
  );

  const routeTable: StackRouteTable<Parameters, OtherProps> = {
    testRouteAKey: RouteA,
    testRouteBKey: RouteB,
    testRouteCKey: RouteC,
  };

  const routeState: StackRouterState<Parameters> = [
    {
      uuid: `ec055b0f-0659-4e9a-a889-06a7586bb61a`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value A`,
      },
    },
    {
      uuid: `f36ce5e7-d37e-443a-8635-718118c27128`,
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value A`,
      },
    },
    {
      uuid: "345d1eff-3d1d-4d93-8136-e0c3ff0f7f7c",
      key: `testRouteAKey`,
      parameters: {
        testRouteAParameterKey: `Test Route A Parameter Value B`,
      },
    },
  ];

  const setRouteState = jest.fn();

  const Component = createStackRoutingComponent(routeTable);

  const rendered = (
    <Component
      routeState={routeState}
      setRouteState={setRouteState}
      exampleOtherPropKey="Example Other Prop Value"
    />
  );

  unwrapRenderedFunctionComponent(rendered).props[
    `children`
  ][1].props.children.props.reset(
    {
      uuid: `441aff37-ab3c-4d4f-a623-46aa36a42c14`,
      key: `testRouteCKey`,
      parameters: {
        testRouteBParameterKey: `Test Route C Parameter Value B`,
      },
    },
    {
      uuid: `4380d918-310d-4515-8fb6-fb14b380239c`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value B`,
      },
    }
  );

  expect(setRouteState).toBeCalledTimes(1);
  expect(setRouteState).toHaveBeenCalledWith([
    {
      uuid: `441aff37-ab3c-4d4f-a623-46aa36a42c14`,
      key: `testRouteCKey`,
      parameters: {
        testRouteBParameterKey: `Test Route C Parameter Value B`,
      },
    },
    {
      uuid: `4380d918-310d-4515-8fb6-fb14b380239c`,
      key: `testRouteBKey`,
      parameters: {
        testRouteBParameterKey: `Test Route B Parameter Value B`,
      },
    },
  ]);
});
