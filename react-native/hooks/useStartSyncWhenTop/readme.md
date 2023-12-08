# `react-native-app-helpers/useStartSyncWhenTop`

A React hook which starts sync when the current card is at the top of the stack.

## Usage

```tsx
import { useStartSyncWhenTop } from "react-native-app-helpers";
import { syncController } from "./your-services";

const ExampleScreen = ({ top }) => {
  useStartSyncWhenTop(syncController, top);

  return null;
};
```
