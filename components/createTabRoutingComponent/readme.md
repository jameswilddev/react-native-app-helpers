# `react-native-app-helpers/createTabRoutingComponent`

Creates a React component which displays a single route at a time (though all
are kept rendered at all times).

## Usage

```tsx
import React from "react";
import { Button, SafeAreaView, Text } from "react-native";
import {
  ContainerFillingScrollView,
  createTabRoutingComponent,
  TabRouteTable,
} from "react-native-app-helpers";

type RouteKey = `routeAKey` | `routeBKey` | `routeCKey`;

type OtherProps = {
  readonly setRoute: (to: RouteKey) => void,
};

const routeTable: TabRouteTable<RouteKey, OtherProps> = {
  routeAKey: ({ setRoute }) => (
    <React.Fragment>
      <Text>This is route A.</Text>
      <Button
        title="Go to route B"
        onPress={() => {
          setRoute(`routeBKey`);
        }}
      />
      <Button
        title="Go to route C"
        onPress={() => {
          setRoute(`routeCKey`);
        }}
      />
    </React.Fragment>
  ),
  routeBKey: ({ setRoute }) => (
    <React.Fragment>
      <Text>This is route B.</Text>
      <Button
        title="Go to route A"
        onPress={() => {
          setRoute(`routeAKey`);
        }}
      />
      <Button
        title="Go to route C"
        onPress={() => {
          setRoute(`routeCKey`);
        }}
      />
    </React.Fragment>
  ),
  routeCKey: ({ setRoute }) => (
    <React.Fragment>
      <ContainerFillingScrollView>
        <Text>This is route C.</Text>
        <Button
          title="Go to route A"
          onPress={() => {
            setRoute(`routeAKey`);
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
          title="Go to route B"
          onPress={() => {
            setRoute(`routeBKey`);
          }}
        />
      </ContainerFillingScrollView>
    </React.Fragment>
  ),
};

const RoutingComponent = createTabRoutingComponent(routeTable);

export default () => {
  const [route, setRout] = React.useState<RouteKey>(`routeAKey`);

  return (
    <SafeAreaView>
      <RoutingComponent
        route={route}
        setRoute={setRoute}
      />
    </SafeAreaView>
  );
};
```
