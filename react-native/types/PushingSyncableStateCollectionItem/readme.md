# `react-native-app-helpers/PushingSyncableStateCollectionItem`

Represents an item of a collection which is in the process of having its local
changes pushed to the server.

## Usage

```tsx
import type { PushingSyncableStateCollectionItem } from "react-native-app-helpers";

const example: PushingSyncableStateCollectionItem<`Example Data`> = {
  status: `pushing`,
  data: `Example Data`,
};
```
