# `react-native-app-helpers/CardProps`

Props to be given to offline table components.

## Usage

```tsx
import type { OfflineTableProps, SortDirection } from "react-native-app-helpers";

type ExampleTableRow = {
  readonly columnA: null | string;
  readonly columnB: null | number;
  readonly columnC: 0 | 1 | 2 | 3;
  readonly columnD: null | boolean;
};

const example: OfflineTableProps<
  "columnA" | "columnB",
  "columnD",
  ExampleTableRow,
  "Example Context",
> = {
  data: {
    rows: [
      {
        columnA: "Example Column A Value C",
        columnB: 934893,
        columnC: 3,
        columnD: true,
      },
      {
        columnA: null,
        columnB: 63636,
        columnC: 1,
        columnD: false,
      },
      {
        columnA: "Example Column A Value A",
        columnB: null,
        columnC: 0,
        columnD: true,
      },
      {
        columnA: "Example Column A Value B",
        columnB: 43532,
        columnC: 2,
        columnD: null,
      },
    ],
  },
  sortBy: "columnB",
  sortDirection: "ascending",
  onSortChange(by: "columnA" | "columnB" | "columnD", direction: SortDirection): void {
    console.log(`Sorting by ${by}, ${direction}.`)
  },
  filter: "Column A Value B",
  whenEmpty: "No matching rows found.",
  context: "Example Context",
  onPressRow(row: ExampleTableRow): void {
    console.log(row);
  },
};
```
