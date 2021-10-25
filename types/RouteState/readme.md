# `react-native-app-helpers/Route`

The state which can be persisted for a specific route key and parameter set.

## Usage

```tsx
import type { RouteState } from "react-native-app-helpers";

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

const routeState<RouteParameters> = {
  key: routeBKey,
  parameters: {
    routeBParameterKey: `Route B Parameter Value`,
  },
};
```
