# `react-native-app-helpers/StackRouteTable`

A React component which can be used to render a route for a stack router.

## Usage

```tsx
import type { StackRouteTable } from "react-native-app-helpers";

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

const route: StackRouteTable<RouteParameters, OtherProps> = {
  routeAKey: {
    component: ({
      reset, push, pop, replace,
      parameters: { routeAParameterKey },
      otherPropKey,
    }) => <React.Fragment>
      {/* Your view goes here. */}
    </React.Fragment>,
    allowsSwiping: true,
  },

  routeBKey: {
    component: ({
      reset, push, pop, replace,
      parameters: { routeBParameterKey },
      otherPropKey,
    }) => <React.Fragment>
      {/* Your view goes here. */}
    </React.Fragment>,
    allowsSwiping: false,
  },

  routeCKey: {
    component: ({
      reset, push, pop, replace,
      parameters: { routeCParameterKey },
      otherPropKey,
    }) => <React.Fragment>
      {/* Your view goes here. */}
    </React.Fragment>,
    allowsSwiping: true,
  },
};
```
