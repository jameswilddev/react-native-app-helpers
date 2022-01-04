# `react-native-app-helpers/SyncableStateCollection`

Represents a collection which can be synced.

## Usage

```tsx
import type { SyncableStateCollection } from "react-native-app-helpers";

type ExampleSchema = {
  readonly exampleDataAKey: boolean;
};

const example: SyncableStateCollection<ExampleData> = {
  "5a82bfb8-35ef-4cd6-92d7-efcb532e5fd1": {
    type: `upToDate`,
    version: 1234,
    data: {
      exampleDataAKey: true,
    },
  },
  "459ef49b-59a2-4f1b-a055-3577b8f974dd": {
    type: `upToDate`,
    version: `Example Version`,
    data: {
      exampleDataAKey: false,
    },
  },
  "052627d9-bd33-4475-ab19-880585a7cd71": {
    type: `awaitingPush`,
    data: {
      exampleDataAKey: true,
    }
  },
  "d6d37ba5-b5b8-4c4b-892b-27643b45aed6": {
    type: `awaitingPush`,
    data: {
      exampleDataAKey: true,
    }
  },
  "b41d82d5-1735-4906-bdc0-4dfca6d15375": {
    type: `awaitingPull`,
    data: {
      exampleDataAKey: true,
    }
  },
};
```
