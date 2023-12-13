# `react-native-app-helpers/StackRoute`

A React component which can be used to render a route within a stack router,
and some metadata for doing so.

## Usage

```tsx
import type { StackRoute } from "react-native-app-helpers";

type RouteParameters = {
  routeAKey: {
    routeAParameterKey: `Route A Parameter Value`,
  },
  routeBKey: {
    routeBParameterKey: `Route B Parameter Value`,
  },
  routeCKey: {
    routeCParameterKey: `Route C Parameter Value`,
  },
};

type OtherProps = {
  otherPropKey: `Other Prop Value`,
};

const stackRouteProps: StackRoute<RouteParameters, `routeBKey`> = {
  push(...itemsToAdd: ReadonlyArray<StackStateItem<RouteParameters>>): void,
  pop(numberOfItemsToRemove?: number): void,
  replace(numberOfItemsToRemove: number, ...itemsToAdd: ReadonlyArray<StackStateItem<RouteParameters>>): void {},
  reset(...replacementItems: ReadonlyArray<StackStateItem<RouteParameters>>): void {},
  setParameters(parameters: RouteParameters[`routeBKey`]): void {},
  parameters: {
    routeBParameterKey: `Route B Parameter Value`,
  },
  routeState: [{
    uuid: `68496389-b2ac-435c-8458-1eee80319e10`,
    key: `routeBKey`,
    parameters: {
      routeBParameterKey: `Route B Parameter Value`,
    },
  }],
  setRouteState(to: StackRouterState<RouteParameters>): void {},
  onBack(pop: () => void, cancel: () => void): void,
  top: true,
  bottom: false,
};
```
