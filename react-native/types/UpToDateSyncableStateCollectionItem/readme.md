# `react-native-app-helpers/UpToDateSyncableStateCollectionItem`

Represents an item of a collection which has been synced.

## Usage

```tsx
import type { UpToDateSyncableStateCollectionItem } from "react-native-app-helpers";

const exampleWithStringVersion: UpToDateSyncableStateCollectionItem<`Example Data`> = {
  status: `upToDate`,
  version: `Example Version`,
  data: `Example Data`,
};

const exampleWithNumberVersion: UpToDateSyncableStateCollectionItem<`Example Data`> = {
  status: `upToDate`,
  version: 1234,
  data: `Example Data`,
};
```
