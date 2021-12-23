# `react-native-app-helpers/createFiniteStateMachineRoutingComponent`

Creates a React component which renders a single route from state.

## Usage

```tsx
import React from "react";
import { Button, SafeAreaView, Text } from "react-native";
import {
  createFiniteStateMachineRoutingComponent,
  FiniteStateMachineRouterState,
  RouteTable,
} from "react-native-app-helpers";

type RouteAParameters = null;
type RouteBParameters = { readonly value: number };

type RouteParameters = {
  routeAKey: RouteAParameters,
  routeBKey: RouteBParameters,
};

type OtherProps = {
  setRouteState: (to: FiniteStateMachineRouterState<RouteParameters>) => void,
};

const routeTable: RouteTable<RouteParameters, OtherProps> = {
  routeAKey: ({ setRouteState }) => (
    <React.Fragment>
      <Text>This is route A.</Text>
      <Button
        title="Go to route B with 1"
        onPress={() => {
          setRouteState({
            key: `routeBKey`,
            parameters: { value: 1 },
          });
        }}
      />
      <Button
        title="Go to route B with 2"
        onPress={() => {
          setRouteState({
            key: `routeBKey`,
            parameters: { value: 2 },
          });
        }}
      />
    </React.Fragment>
  ),
  routeBKey: ({
    routeState: { parameters: { value } },
    setRouteState,
  }) => (
    <React.Fragment>
      <Text>This is route B.  Your parameter is {value}.</Text>
      <Button
        title="Return to route A"
        onPress={() => {
          setRouteState({
            key: `routeAKey`,
            parameters: null,
          });
        }}
      />
    </React.Fragment>
  ),
};

const RoutingComponent = createFiniteStateMachineRoutingComponent(routeTable);

export default () => {
  const [routeState, setRouteState] = React.useState<FiniteStateMachineRouterState<RouteParameters>>({
    key: `routeAKey`,
    parameters: null,
  });

  return (
    <SafeAreaView>
      <RoutingComponent
        routeState={routeState}
        setRouteState={setRouteState}
      />
    </SafeAreaView>
  );
};
```
