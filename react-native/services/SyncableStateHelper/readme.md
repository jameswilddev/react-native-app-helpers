# `react-native-app-helpers/SyncableStateHelper`

Provides helpers for working with states which can be synced.

## Usage

```tsx
import { SyncableStateHelper } from "react-native-app-helpers";

const syncableStateHelper = new SyncableStateHelper(syncConfiguration);

syncableStateHelper.upsertCollection(
  state,
  `exampleCollectionKey`,
  `76a7d202-7971-45d4-8fb6-586403a312b0`,
  `Example Data`,
  setState,
);
```
