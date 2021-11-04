# `react-native-app-helpers/StackRouterState`

The state which can be persisted for a specific route key and parameter set.

## Usage

```tsx
import type { StackRouterState } from "react-native-app-helpers";

type RouteParameters = {
  routeAKey: {
    routeAParameterKey: `Route A Parameter Value A` | `Route A Parameter Value B`,
  },
  routeBKey: {
    routeBParameterKey: `Route B Parameter Value`,
  },
  routeCKey: {
    routeCParameterKey: `Route C Parameter Value`,
  },
};

const routeState: StackRouterState<RouteParameters> = [{
  key: `routeBKey`,
  parameters: {
    routeBParameterKey: `Route B Parameter Value`,
  },
}, {
  key: `routeAKey`,
  parameters: {
    routeAParameterKey: `Route A Parameter Value A`,
  },
}, {
  key: `routeAKey`,
  parameters: {
    routeAParameterKey: `Route A Parameter Value B`,
  },
}, {
  key: `routeCKey`,
  parameters: {
    routeAParameterKey: `Route C Parameter Value`,
  },
}];
```
