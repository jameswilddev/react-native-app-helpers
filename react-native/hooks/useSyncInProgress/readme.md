# `react-native-app-helpers/useSyncInProgress`

A React hook which determines whether a sync is in progress and triggers a
re-render should that change.

## Usage

```tsx
import { useSyncInProgress } from "react-native-app-helpers";

const ExampleScreen = () => {
  // True or false.
  const syncInProgress = useSyncInProgress(sync);

  return null;
};
```
