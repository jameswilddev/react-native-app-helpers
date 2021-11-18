# `react-native-app-helpers/OfflineTableData`

Offline data to be passed to a table.

## Usage

```tsx
import type { OfflineTableData } from "react-native-app-helpers";

type TableRow = {
  readonly columnA: null | string;
  readonly columnB: null | number;
  readonly columnC: 0 | 1 | 2 | 3;
  readonly columnD: null | boolean;
};

const example: OfflineTableData<
  `exampleKeyA` | `exampleKeyB`,
  `exampleKeyC` | `exampleKeyD`,
  TableRow
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
