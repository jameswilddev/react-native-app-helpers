# `react-native-app-helpers/HeaderIcon`

Describes an icon on the left or right side of a header bar.

## Usage

```tsx
import type { HeaderIcon } from "react-native-app-helpers";
import ExampleIcon from "./assets/example-icon.svg";

const example: HeaderIcon = {
  icon: ExampleIcon,
  onPress() {
    alert(`The button has been pressed.`);
  },
};
```
