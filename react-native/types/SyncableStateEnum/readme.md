# `react-native-app-helpers/SyncableStateEnum`

Represents an enum which can be synced.

## Usage

```tsx
import type { SyncableStateEnum } from "react-native-app-helpers";

type ExampleData = {
  readonly exampleDataAKey: boolean;
};

const absentExample: SyncableStateEnum<ExampleData> = {
  type: `absent`,
};

const upToDateExample: SyncableStateEnum<ExampleData> = {
  type: `upToDate`,
  version: `Example Version`,
  items: {
    "5a82bfb8-35ef-4cd6-92d7-efcb532e5fd1": {
        exampleDataAKey: true,
    },
    "459ef49b-59a2-4f1b-a055-3577b8f974dd": {
        exampleDataAKey: false,
    },
  },
};
```
