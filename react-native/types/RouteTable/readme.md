# `react-native-app-helpers/Route`

A React component which can be used to render a route.

## Usage

```tsx
import type { RouteTable } from "react-native-app-helpers";

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

const route: RouteTable<RouteParameters, OtherProps> = {
  routeAKey: ({
    routeState: { key, parameters: { routeAParameterKey } },
    otherPropKey,
  }) => <React.Fragment>
    {/* Your view goes here. */}
  </React.Fragment>,

  routeBKey: ({
    routeState: { key, parameters: { routeBParameterKey } },
    otherPropKey,
  }) => <React.Fragment>
    {/* Your view goes here. */}
  </React.Fragment>,

  routeCKey: ({
    routeState: { key, parameters: { routeCParameterKey } },
    otherPropKey,
  }) => <React.Fragment>
    {/* Your view goes here. */}
  </React.Fragment>,
};
```
