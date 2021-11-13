# `react-native-app-helpers/TableColumn`

Describes the schema of a column in a table.

## Usage

```tsx
import type { TableColumn } from "react-native-app-helpers";

const example: TableColumn<
  `exampleKeyA` | `exampleKeyB`,
  `exampleKeyC` | `exampleKeyD`
> = {
  label: `Example Label B`,
  key: `exampleKeyB`,
  width: 5,
};
```
