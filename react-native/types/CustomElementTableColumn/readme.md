# `react-native-app-helpers/CustomElementTableColumn`

Describes the schema of a column in a table which has a custom renderer.

## Usage

```tsx
import type { CustomElementTableColumn } from "react-native-app-helpers";

type TableRow = {
  readonly columnA: null | string;
  readonly columnB: null | number;
  readonly columnC: 0 | 1 | 2 | 3;
  readonly columnD: null | boolean;
};

const example: CustomElementTableColumn<
  `exampleKeyA` | `exampleKeyB` | `exampleKeyC` | `exampleKeyD`,
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
```
