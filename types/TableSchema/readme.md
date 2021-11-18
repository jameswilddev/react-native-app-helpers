# `react-native-app-helpers/TableRow`

Describes the schema of a table.

## Usage

```tsx
import type { TableSchema } from "react-native-app-helpers";

type TableRow = {
  readonly columnA: null | string;
  readonly columnB: null | number;
  readonly columnC: 0 | 1 | 2 | 3;
  readonly columnD: null | boolean;
};

const example: TableSchema<
  `exampleKeyA` | `exampleKeyB`,
  `exampleKeyC` | `exampleKeyD`,
  TableColumn
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
