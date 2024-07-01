# `react-native-app-helpers/createMinimumWidthComponent`

Creates a React component which has a minimum width.

## Usage

```tsx
import { createMinimumWidthComponent } from "react-native-app-helpers";

const ExampleComponent = createMinimumWidthComponent(243);

const ExampleScreen = () => (
  <ExampleComponent height="fillsContainer">
    <Text>This is up to 243 wide and fills its container vertically.</Text>
  </ExampleComponent>
);
```

```tsx
import { createMinimumWidthComponent } from "react-native-app-helpers";

const ExampleComponent = createMinimumWidthComponent(243);

const ExampleScreen = () => (
  <ExampleComponent height="fitsContent">
    <Text>This is up to 243 wide and fits its content vertically.</Text>
  </ExampleComponent>
);
```
