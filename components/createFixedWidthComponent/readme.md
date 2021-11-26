# `react-native-app-helpers/createFixedWidthComponent`

Creates a React component which has a fixed width.

## Usage

```tsx
import { createFixedWidthComponent } from "react-native-app-helpers";

const ExampleComponent = createFixedWidthComponent(243);

const ExampleScreen = () => (
  <ExampleComponent height="fillsContainer">
    <Text>This is 243 wide and fills its container vertically.</Text>
  </ExampleComponent>
);
```

```tsx
import { createFixedWidthComponent } from "react-native-app-helpers";

const ExampleComponent = createFixedWidthComponent(243);

const ExampleScreen = () => (
  <ExampleComponent height="fitsContent">
    <Text>This is 243 wide and fits its content vertically.</Text>
  </ExampleComponent>
);
```
