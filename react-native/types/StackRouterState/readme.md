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
  uuid: `68496389-b2ac-435c-8458-1eee80319e10`,
  key: `routeBKey`,
  parameters: {
    routeBParameterKey: `Route B Parameter Value`,
  },
}, {
  uuid: `23b93e71-daab-4683-86eb-cf3491bed8d0`,
  key: `routeAKey`,
  parameters: {
    routeAParameterKey: `Route A Parameter Value A`,
  },
}, {
  uuid: `074127de-13e7-467d-bfbc-199c49bb4041`,
  key: `routeAKey`,
  parameters: {
    routeAParameterKey: `Route A Parameter Value B`,
  },
}, {
  uuid: `bfe8a4c5-e5dc-4770-9b0f-77524641a3f2`,
  key: `routeCKey`,
  parameters: {
    routeAParameterKey: `Route C Parameter Value`,
  },
}];
```
