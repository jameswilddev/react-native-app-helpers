# `react-native-app-helpers/SyncableStateCollectionItem`

Represents an item of a collection which can be synced.

## Usage

```tsx
import type { SyncableStateCollectionItem } from "react-native-app-helpers";

const upToDateWithStringVersion: SyncableStateCollectionItem<`Example Data`> = {
  status: `upToDate`,
  version: `Example Version`,
  data: `Example Data`,
};

const upToDateWithNumberVersion: SyncableStateCollectionItem<`Example Data`> = {
  status: `upToDate`,
  version: 1234,
  data: `Example Data`,
};

const awaitingPush: SyncableStateCollectionItem<`Example Data`> = {
  status: `awaitingPush`,
  data: `Example Data`,
};

const pushing: SyncableStateCollectionItem<`Example Data`> = {
  status: `pushing`,
  data: `Example Data`,
};

const awaitingPull: SyncableStateCollectionItem<`Example Data`> = {
  status: `awaitingPull`,
  data: `Example Data`,
};
```
