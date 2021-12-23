# `react-native-app-helpers/SplitButtonStyle`

Describes the style of a button.

## Usage

```tsx
import type { SplitButtonStyle } from "react-native-app-helpers";

const value: SplitButtonStyle<`typeA` | `typeB`> = {
  fontFamily: `Example Font Family`,
  fontSize: 16,
  horizontalPadding: 10,
  verticalPadding: 2,
  neutralBorderWidth: 7,
  types: {
    typeA: {
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
    },
    typeB: {
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
    },
  },
};
```
