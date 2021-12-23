# `react-native-app-helpers/TableRow`

A row of data within a table.

## Usage

```tsx
import type { TableRow } from "react-native-app-helpers";

const example: TableRow<
  `exampleKeyA` | `exampleKeyB`,
  `exampleKeyC` | `exampleKeyD`
> = {
  exampleKeyA: 123,
  exampleKeyB: `Example`,
  exampleKeyC: false,
  exampleKeyD: true,
};
```
