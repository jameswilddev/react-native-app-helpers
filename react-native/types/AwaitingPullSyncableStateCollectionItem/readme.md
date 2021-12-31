# `react-native-app-helpers/UpToDateSyncableStateCollectionItem`

Represents an item of a collection which has pushed its changes to the server
and now needs to pull a refreshed copy.

## Usage

```tsx
import type { AwaitingPullSyncableStateCollectionItem } from "react-native-app-helpers";

const example: AwaitingPullSyncableStateCollectionItem<`Example Data`> = {
  status: `awaitingPull`,
  data: `Example Data`,
};
```
