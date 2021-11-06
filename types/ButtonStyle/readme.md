# `react-native-app-helpers/ButtonStyle`

Describes the style of a button.

## Usage

```tsx
import type { ButtonStyle } from "react-native-app-helpers";

const value: ButtonStyle = {
  fontFamily: `Example Font Family`,
  fontSize: 16,
  horizontalPadding: 10,
  verticalPadding: 2,
  default: {
    backgroundColor: `yellow`,
    color: `blue`,
    radius: 10,
    border: null,
  },
  disabled: {
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
