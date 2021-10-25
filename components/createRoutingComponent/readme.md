# `react-native-app-helpers/createRoutingComponent`

Creates a React component which renders a route from state.

## Usage

```tsx
import React from "react";
import { Button, SafeAreaView, Text } from "react-native";
import { createRoutingComponent, RouteState, RouteTable } from "react-native-app-helpers";

type RouteAParameters = null;
type RouteBParameters = { readonly value: number };

type RouteParameters = {
  routeAKey: RouteAParameters,
  routeBKey: RouteBParameters,
};

type OtherProps = {
  setRouteState: (state: RouteState<RouteParameters>) => void,
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
  routeBKey: ({ routeState: { parameters: { value } }, setRouteState }) => (
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

const RoutingComponent = createRoutingComponent(routeTable);

export default () => {
  const [routeState, setRouteState] = React.useState<RouteState<RouteParameters>>({
    key: `routeAKey`,
    parameters: null,
  });

  return (
    <SafeAreaView>
    <RoutingComponent routeState={routeState} setRouteState={setRouteState} />
    </SafeAreaView>
  );
};
```
