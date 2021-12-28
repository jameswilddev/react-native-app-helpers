# `react-native-app-helpers/BottomTab`

Describes the style of a bottom tab bar for segments which are in a particular
state.

## Usage

```tsx
import type { BottomTab } from "react-native-app-helpers";
import ExampleIcon from "./assets/example-icon.svg";

const example: BottomTab<number> = {
  tab: 1234,
  icon: ExampleIcon,
  text: `Example Label`,
};
```
