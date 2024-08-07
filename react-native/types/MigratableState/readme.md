# `react-native-app-helpers/MigratableState`

Represents data which can have migrations ran against it.

## Usage

```tsx
import type { MigratableState } from "react-native-app-helpers";

type ExampleData = {
  readonly exampleKey: 'exampleValue';
};

const example: MigratableState<ExampleData> = {
  exampleKey: 'exampleValue',
  executedMigrationUuids: [],
};
```
