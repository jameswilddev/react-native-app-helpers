# `react-native-app-helpers/SplitButtonTypeStyle`

Describes the style of a type of a split button.

## Usage

```tsx
import type { SplitButtonTypeStyle } from "react-native-app-helpers";

const value: SplitButtonTypeStyle = {
  inactiveEnabled: {
    backgroundColor: `yellow`,
    color: `blue`,
    radius: 10,
    border: null,
  },
  activeEnabled: {
    backgroundColor: `orange`,
    color: `purple`,
    radius: 7,
    border: {
      width: 5,
      color: `aquamarine`,
    },
  },
  inactiveDisabled: {
    backgroundColor: `yellow`,
    color: `blue`,
    radius: 10,
    border: null,
  },
  activeDisabled: {
    backgroundColor: `orange`,
    color: `purple`,
    radius: 7,
    border: {
      width: 5,
      color: `aquamarine`,
    },
  },
};
```
