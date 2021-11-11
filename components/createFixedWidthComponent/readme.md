# `react-native-app-helpers/createFixedWidthComponent`

Creates a React component which has a fixed width (and fills its container
vertically).

## Usage

```tsx
import { createFixedWidthComponent } from "react-native-app-helpers";

const ExampleComponent = createFixedWidthComponent(243);

const ExampleScreen = () => (
  <ExampleComponent>
    <Text>This is 243 wide and fills its container.</Text>
  </ExampleComponent>
);
```
