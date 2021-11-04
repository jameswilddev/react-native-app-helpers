# `react-native-app-helpers/createStackRoutingComponent`

Creates a React component which displays the top of a stack of routes (though
all items in the stack are continuously rendered).

## Usage

```tsx
import React from "react";
import { Button, SafeAreaView, Text } from "react-native";
import {
  createStackRoutingComponent,
  StackRouterState,
  RouteTable,
} from "react-native-app-helpers";

type RouteAParameters = null;
type RouteBParameters = { readonly value: number };

type RouteParameters = {
  routeAKey: RouteAParameters,
  routeBKey: RouteBParameters,
};

type OtherProps = {
  push: (value: number) => void,
  pop: () => void,
};

const routeTable: RouteTable<RouteParameters, OtherProps> = {
  routeAKey: ({ push }) => (
    <ContainerFillingScrollView>
      <Text>This is route A.</Text>
      <Button
        title="Go to route B with 1"
        onPress={() => {
          push({
            key: `routeBKey`,
            parameters: { value: 1 },
          });
        }}
      />
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Text>This fills the ScrollView.</Text>
      <Button
        title="Go to route B with 2"
        onPress={() => {
          push({
            key: `routeBKey`,
            parameters: { value: 2 },
          });
        }}
      />
    </ContainerFillingScrollView>
  ),
  routeBKey: ({
    routeState: { parameters: { value } },
    pop,
  }) => (
    <React.Fragment>
      <Text>This is route B.  Your parameter is {value}.</Text>
      <Button
        title="Return"
        onPress={() => {
          pop();
        }}
      />
    </React.Fragment>
  ),
};

const RoutingComponent = createStackRoutingComponent(routeTable);

export default () => {
  const [routeState, setRouteState] = React.useState<StackRouterState<RouteParameters>>([{
    key: `routeAKey`,
    parameters: null,
  }]);

  return (
    <SafeAreaView>
      <RoutingComponent
        routeState={routeState}
        push={(value) => {
          setRouteState([
            ...routeState,
            {
              key: `routeBKey`,
              parameters: { value },
            },
          ]);
        }}
        pop={() => {
          setRouteState(routeState.slice(0, 1));
        }}
      />
    </SafeAreaView>
  );
};
```
