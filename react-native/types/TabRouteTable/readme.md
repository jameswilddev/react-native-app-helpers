# `react-native-app-helpers/TabRouteTable`

A table which maps route keys to React components.

## Usage

```tsx
import type { TabRouteTable } from "react-native-app-helpers";

type RouteKey = `routeAKey` | `routeBKey` | `routeCKey`;

type OtherProps = {
  otherPropKey: `Other Prop Value`,
};

const route: TabRouteTable<RouteKey, OtherProps> = {
  routeAKey: ({
    route,
    otherPropKey,
  }) => <React.Fragment>
    {/* Your view goes here. */}
  </React.Fragment>,

  routeBKey: ({
    route,
    otherPropKey,
  }) => <React.Fragment>
    {/* Your view goes here. */}
  </React.Fragment>,

  routeCKey: ({
    route,
    otherPropKey,
  }) => <React.Fragment>
    {/* Your view goes here. */}
  </React.Fragment>,
};
```
