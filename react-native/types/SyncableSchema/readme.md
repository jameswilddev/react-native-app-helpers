# `react-native-app-helpers/SyncableSchema`

The schema of information which can be synced.

## Usage

```tsx
import type { SyncableSchema } from "react-native-app-helpers";

const example: SyncableSchema = {
  readonly singletons: {
    readonly exampleSingletonAKey: {
      readonly exampleDataAKey: boolean;
    };
    readonly exampleSingletonBKey: {
      readonly exampleDataBKey: number;
    };
  };
  collections: {
    exampleCollectionAKey: {
      exampleDataKey: `Example Data Value`,
    },
    exampleCollectionBKey: {
      exampleDataKey: `Example Data Value`,
    },
    exampleCollectionCKey: {
      exampleDataKey: `Example Data Value`,
    },
  },
};
```
