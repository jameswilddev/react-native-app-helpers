# `react-native-app-helpers/FiniteStateMachineRoutingProps`

Props to be given to finite state machine routing components.

## Usage

```tsx
import type { FiniteStateMachineRoutingProps, FiniteStateMachineRouterState } from "react-native-app-helpers";

type RouteAParameters = null;
type RouteBParameters = { readonly value: number };

type RouteParameters = {
  routeAKey: RouteAParameters,
  routeBKey: RouteBParameters,
};

type OtherProps = {
  readonly exampleOtherPropKey: "Example Other Prop Value",
};

const example: FiniteStateMachineRoutingProps = {
  routeState: {
    key: `routeAKey`,
    parameters: null,
  },
  setRouteState(to: FiniteStateMachineRouterState<RouteParameters>): void {
    console.log(to);
  },
};
```
