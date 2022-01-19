# `react-native-app-helpers/createLimitedWidthComponent`

Creates a React component which has a maximum width.

## Usage

```tsx
import { createLimitedWidthComponent } from "react-native-app-helpers";

const ExampleComponent = createLimitedWidthComponent(243);

const ExampleScreen = () => (
  <ExampleComponent height="fillsContainer">
    <Text>This is up to 243 wide and fills its container vertically.</Text>
  </ExampleComponent>
);
```

```tsx
import { createLimitedWidthComponent } from "react-native-app-helpers";

const ExampleComponent = createLimitedWidthComponent(243);

const ExampleScreen = () => (
  <ExampleComponent height="fitsContent">
    <Text>This is up to 243 wide and fits its content vertically.</Text>
  </ExampleComponent>
);
```
