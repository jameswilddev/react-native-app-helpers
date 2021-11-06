# `react-native-app-helpers/ButtonStateStyle`

Describes the style of the border of a control (such as a text box or
drop-down).

## Usage

```tsx
import type { ButtonStateStyle } from "react-native-app-helpers";

const withoutBorder: ButtonStateStyle = {
  backgroundColor: `yellow`,
  color: `blue`,
  radius: 10,
  border: null,
};

const withBorder: ButtonStateStyle = {
  backgroundColor: `yellow`,
  color: `blue`,
  radius: 10,
  border: {
    width: 5,
    color: `red`,
  },
};
```
