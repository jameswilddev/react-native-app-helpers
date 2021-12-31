# `react-native-app-helpers/AwaitingPushSyncableStateCollectionItem`

Represents an item of a collection which needs to have its changes pushed to the
server on the next sync.

## Usage

```tsx
import type { AwaitingPushSyncableStateCollectionItem } from "react-native-app-helpers";

const example: AwaitingPushSyncableStateCollectionItem<`Example Data`> = {
  status: `awaitingPush`,
  data: `Example Data`,
};
```
