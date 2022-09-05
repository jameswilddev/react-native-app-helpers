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

const route: StackRoute<RouteParameters, `routeBKey`, OtherProps> = {
  component: ({
    reset, push, pop, replace, bottom, top,
    parameters,
    otherPropKey,
  }) => <React.Fragment>
    {/* Your view goes here. */}
  </React.Fragment>,
  allowsSwiping: true,
};
```
