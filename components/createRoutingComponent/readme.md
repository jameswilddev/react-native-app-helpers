# `react-native-app-helpers/createRoutingComponent`

Creates a React component which renders a route from state.

## Usage

```tsx
import { createRoutingComponent, RouteTable } from "react-native-app-helpers";

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
  routeA: ({ setRouteState }) => (
    <React.Fragment>
      <Text>This is route A.</Text>
      <Button
        title="Go to route B with 1"
        onPress={() => {
          setRouteState({
            key: `routeBKey`,
            parameters: 1,
          });
        }}
      />
      <Button
        title="Go to route B with 2"
        onPress={() => {
          setRouteState({
            key: `routeBKey`,
            parameters: 2,
          });
        }}
      />
    </React.Fragment>
  ),
  routeB: ({ routeState: { parameters }, setRouteState }) => (
    <React.Fragment>
      <Text>This is route B.  Your parameter is {parameters}.</Text>
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

const RouteComponent = createRouteComponent(routeTable);

const ExampleApp = () => {
  const [routeState, setRouteState] = React.useState<RouteState<RouteParameters>>({
    key: `routeAKey`,
    parameters: null,
  });

  return (
    <RouteComponent routeState={routeState} setRouteState={setRouteState} />
  );
};
```
