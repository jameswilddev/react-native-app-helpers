# `react-native-app-helpers/TableColumn`

Describes the schema of a column in a table.

## Usage

```tsx
import type { TableColumn } from "react-native-app-helpers";

type TableRow = {
  readonly columnA: null | string;
  readonly columnB: null | number;
  readonly columnC: 0 | 1 | 2 | 3;
  readonly columnD: null | boolean;
};

const exampleA: TableColumn<
  `exampleKeyA` | `exampleKeyB`,
  `exampleKeyC` | `exampleKeyD`,
  TableRow,
  `Example Context`
> = {
  type: `basic`,
  label: `Example Label B`,
  key: `exampleKeyB`,
  width: 5,
};

const exampleB: TableColumn<
  `exampleKeyA` | `exampleKeyB`,
  `exampleKeyC` | `exampleKeyD`,
  TableRow,
  `Example Context`
> = {
  type: `customElement`,
  label: `Example Label B`,
  width: 5,
  render(tableRow, context) {
    return (
      <Text>{tableRow.exampleKeyA}</Text>
    );
  },
  containsSearchTerm(tableRow, filter, context) {
    const value = tableRow.exampleKeyA;

    return typeof value === `string` && value.includes(filter);
  },
};

const exampleC: TableColumn<
  `exampleKeyA` | `exampleKeyB`,
  `exampleKeyC` | `exampleKeyD`,
  TableRow,
  `Example Context`
> = {
  type: `customText`,
  key: `exampleKeyA`,
  label: `Example Label B`,
  width: 5,
  render(value, context) {
    return `Prefixed ${value}`;
  },
};
```
