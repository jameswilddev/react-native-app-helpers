# `react-native-app-helpers/StackRoutingProps`

Props to be given to stack routing components.

## Usage

```tsx
import type { StackRoutingProps, StackRouterState } from "react-native-app-helpers";

type RouteAParameters = null;
type RouteBParameters = { readonly value: number };

type RouteParameters = {
  routeAKey: RouteAParameters,
  routeBKey: RouteBParameters,
};

type OtherProps = {
  readonly exampleOtherPropKey: "Example Other Prop Value",
};

const example: StackRoutingProps = {
  routeState: [{
    key: `routeAKey`,
    parameters: null,
  }],
  setRouteState(to: StackRouterState<RouteParameters>): void {
    console.log(to);
  },
  onBack(pop: () => void, cancel: () => void): void {
    pop();
  },
};
```
