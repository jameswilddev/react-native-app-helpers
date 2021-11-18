# `react-native-app-helpers/CustomerTableColumn`

Describes the schema of a column in a table which has a custom renderer.

## Usage

```tsx
import type { CustomTableColumn } from "react-native-app-helpers";

type TableRow = {
  readonly columnA: null | string;
  readonly columnB: null | number;
  readonly columnC: 0 | 1 | 2 | 3;
  readonly columnD: null | boolean;
};

const example: CustomTableColumn<
  `exampleKeyA` | `exampleKeyB`,
  `exampleKeyC` | `exampleKeyD`,
  TableRow
> = {
  type: `custom`,
  label: `Example Label B`,
  width: 5,
  render(tableRow) {
    return (
      <Text>{tableRow.exampleKeyA}</Text>
    );
  },
  containsSearchTerm(tableRow, filter) {
    const value = tableRow.exampleKeyA;

    return typeof value === `string` && value.includes(filter);
  },
};
```
