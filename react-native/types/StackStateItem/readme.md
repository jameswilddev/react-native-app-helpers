# `react-native-app-helpers/StackStateItem`

Describes an item of stack router state.

## Usage

```tsx
import type { StackStateItem } from "react-native-app-helpers";

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

const item: StackStateItem<RouteParameters> = {
  uuid: `2a14bf24-8c93-4949-961e-55f25dc6b08e`,
  key: `routeBKey`,
  parameters: {
    routeBParameterKey: `Route B Parameter Value`,
  },
};
```
