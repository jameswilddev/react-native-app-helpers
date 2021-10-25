# `react-native-app-helpers/Route`

A React component which can be used to render a route.

## Usage

```tsx
import type { Route } from "react-native-app-helpers";

type Parameters = {
  parameterKey: `Parameter Value`,
};

type OtherProps = {
  otherPropKey: `Other Prop Value`,
};

const route: Route<Parameters, OtherProps> = ({
  routeState: { key, parameters },
  otherPropKey,
}) => <React.Fragment>
  {/* Your view goes here. */}
</React.Fragment>;
```
