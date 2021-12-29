# `react-native-app-helpers/UnderlinedTopTabBarStyle`

The style applied to an underlined top tab bar.

## Usage

```tsx
import type { UnderlinedTopTabBarStyle } from "react-native-app-helpers";

const example: UnderlinedTopTabBarStyle = {
  fontSize: 20,
  verticalPadding: 10,
  inactive: {
    color: `yellow`,
    fontFamily: `Example Inactive Font Family`,
    backgroundColor: `red`,
    underline: null,
  },
  active: {
    color: `green`,
    fontFamily: `Example Active Font Family`,
    backgroundColor: `orange`,
    underline: { width: 6, color: `purple` },
  },
};
```
