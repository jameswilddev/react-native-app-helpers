# `react-native-app-helpers/SyncPullResponse`

The response to a request for an item during sync.

## Usage

```tsx
import type { SyncPullResponse } from "react-native-app-helpers";

const exampleWithNumberVersion: SyncPullResponse<`Example Data`> = {
  version: 1234,
  data: `Example Data`,
};

const exampleWithStringVersion: SyncPullResponse<`Example Data`> = {
  version: `Example Version`,
  data: `Example Data`,
};
```
