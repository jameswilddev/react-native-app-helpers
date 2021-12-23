# `react-native-app-helpers/TableStyle`

Describes the styling applied to a table.

## Usage

```tsx
import type { TableStyle } from "react-native-app-helpers";

const example: TableStyle = {
  header: {
    fontFamily: `Example Font Family`,
    fontSize: 16,
    background: `red`,
    color: `green`,
    verticalPadding: 5,
  },

  // Nullable.
  headerFirstRowSeparator: {
    width: 3,
    color: `yellow`,
  },

  body: {
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 3,
    verticalPadding: 5,
    odd: {
      color: `purple`,
      background: `orange`,
    },
    even: {
      color: `gray`,
      background: `blue`,
    },
    primitiveElements: {
      null: <Text>Example Null</Text>,
      false: <Text>Example False</Text>,
      true: <Text>Example True</Text>,
    },
  },

  // Nullable.
  rowSeparator: {
    width: 3,
    color: `yellow`,
  },

  empty: {
    fontFamily: `Example Font Family`,
    fontSize: 16,
    horizontalPadding: 5,
    verticalPadding: 3,
    background: `purple`,
    color: `orange`,
  };
};
```
