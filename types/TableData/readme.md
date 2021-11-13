# `react-native-app-helpers/TableData`

Data to be passed to a table.

## Usage

```tsx
import type { TableData } from "react-native-app-helpers";

const example: TableData<
  `exampleKeyA` | `exampleKeyB`,
  `exampleKeyC` | `exampleKeyD`
> = {
  rows: [
    {
      exampleKeyA: 123,
      exampleKeyB: `Example`,
      exampleKeyC: false,
      exampleKeyD: true,
    },
  ],
};
```
