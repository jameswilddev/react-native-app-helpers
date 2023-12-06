# `react-native-app-helpers/TabRoutingProps`

Props to be given to tab routing components.

## Usage

```tsx
import type { TabRoutingProps } from "react-native-app-helpers";

type OtherProps = {
  readonly exampleOtherPropKey: "Example Other Prop Value",
};

const example: TabRoutingProps<"Example Route", OtherProps> = {
  route: "Example Route",
};
```
