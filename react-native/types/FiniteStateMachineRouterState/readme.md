# `react-native-app-helpers/FiniteStateMachineRouterState`

The state of a finite state machine router.

## Usage

```tsx
import type { FiniteStateMachineRouterState } from "react-native-app-helpers";

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

const routeState: FiniteStateMachineRouterState<RouteParameters> = {
  key: `routeBKey`,
  parameters: {
    routeBParameterKey: `Route B Parameter Value`,
  },
};
```
