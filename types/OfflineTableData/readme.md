# `react-native-app-helpers/OfflineTableData`

Offline data to be passed to a table.

## Usage

```tsx
import type { OfflineTableData } from "react-native-app-helpers";

const example: OfflineTableData<
  `exampleKeyA` | `exampleKeyB`,
  `exampleKeyC` | `exampleKeyD`
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
