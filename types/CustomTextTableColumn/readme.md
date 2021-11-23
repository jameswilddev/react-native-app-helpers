# `react-native-app-helpers/CustomTextTableColumn`

Describes the schema of a column in a table which has a custom text renderer.

## Usage

```tsx
import type { CustomTextTableColumn } from "react-native-app-helpers";

type TableRow = {
  readonly columnA: null | string;
  readonly columnB: null | number;
  readonly columnC: 0 | 1 | 2 | 3;
  readonly columnD: null | boolean;
};

const example: CustomTextTableColumn<
  `exampleKeyA` | `exampleKeyB`,
  `exampleKeyC` | `exampleKeyD`,
  TableRow
> = {
  type: `customText`,
  key: `exampleKeyA`,
  label: `Example Label B`,
  width: 5,
  render(value) {
    return `Prefixed ${value}`;
  },
};
```
