# `react-native-app-helpers/SplitButtonStateStyle`

Describes the style of a type of a split button in a particular state.

## Usage

```tsx
import type { SplitButtonStateStyle } from "react-native-app-helpers";

const withoutBorder: SplitButtonStateStyle = {
  backgroundColor: `yellow`,
  color: `blue`,
  radius: 10,
  border: null,
};

const withBorder: SplitButtonStateStyle = {
  backgroundColor: `yellow`,
  color: `blue`,
  radius: 10,
  border: {
    width: 5,
    color: `red`,
  },
};
```
