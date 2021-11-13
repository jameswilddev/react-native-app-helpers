# `react-native-app-helpers/TableRow`

Describes the schema of a table.

## Usage

```tsx
import type { TableSchema } from "react-native-app-helpers";

const example: TableSchema<
  `exampleKeyA` | `exampleKeyB`,
  `exampleKeyC` | `exampleKeyD`
> = {
  key: `exampleKeyA`,
  columns: [
    {
      label: `Example Label`,
      key: `exampleKeyC`,
      width: 5,
    },
  ],
};
```
