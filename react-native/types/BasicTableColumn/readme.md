# `react-native-app-helpers/TableColumn`

Describes the schema of a column in a table which does not have a custom
renderer.

## Usage

```tsx
import type { BasicTableColumn } from "react-native-app-helpers";

const example: BasicTableColumn<
  `exampleKeyA` | `exampleKeyB`,
  `exampleKeyC` | `exampleKeyD`
> = {
  type: `basic`,
  label: `Example Label B`,
  key: `exampleKeyB`,
  width: 5,
};
```
