# `react-native-app-helpers/useBackButton`

A React hook which executes a given callback when the hardware back button is
pressed.

## Usage

```tsx
import { useBackButton } from "react-native-app-helpers";

const ExampleScreen = () => {
  useBackButton(() => {
    alert(`The back button was pressed.`);
  });

  return null;
};
```
