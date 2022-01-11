# `react-native-app-helpers/useSyncFileCleanUpBlocker`

A React hook which blocks sync file clean-up; this should be added to screens
which may import images to the file store before references to them are
committed to the state store.

## Usage

```tsx
import { useSyncFileCleanUpBlock } from "react-native-app-helpers";

const ExampleScreen = () => {
  useSyncFileCleanUpBlocker(sync);

  return null;
};
```
