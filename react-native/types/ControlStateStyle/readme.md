# `react-native-app-helpers/ControlStateStyle`

Describes the style of a control (such as a text box or drop-down) in a
particular state (focused/blurred, valid/invalid).

## Usage

```tsx
import type { ControlStateStyle } from "react-native-app-helpers";

const withoutBorder: ControlStateStyle = {
  textColor: `blue`,
  placeholderColor: `green`,
  backgroundColor: `yellow`,
  radius: 10,
  border: null,
  iconColor: `purple`,
};

const withBorder: ControlStateStyle = {
  textColor: `blue`,
  placeholderColor: `green`,
  backgroundColor: `yellow`,
  radius: 10,
  border: {
    width: 5,
    color: `red`,
  },
  iconColor: `purple`,
};
```
