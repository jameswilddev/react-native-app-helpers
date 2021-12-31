# `react-native-app-helpers/SyncableStateCollection`

Represents a collection which can be synced.

## Usage

```tsx
import type { SyncableStateCollection } from "react-native-app-helpers";

type ExampleSchema = {
  exampleDataAKey: boolean;
};

const example: SyncableStateCollection<ExampleData> = {
  "5a82bfb8-35ef-4cd6-92d7-efcb532e5fd1": {
    exampleDataAKey: true,
  },
  "459ef49b-59a2-4f1b-a055-3577b8f974dd: {
    exampleDataAKey: false,
  },
};
```
