# `react-native-app-helpers/TabRoute`

A React component which represents the content of a tab.

## Usage

```tsx
import type { TabRoute } from "react-native-app-helpers";

type OtherProps = {
  otherPropKey: `Other Prop Value`,
};

const route: TabRoute<OtherProps> = ({
  route,
  otherPropKey,
}) => <React.Fragment>
  {/* Your view goes here. */}
</React.Fragment>;
```
