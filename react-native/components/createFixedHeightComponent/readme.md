# `react-native-app-helpers/createFixedHeightComponent`

Creates a React component which has a fixed height.

## Usage

```tsx
import { createFixedHeightComponent } from "react-native-app-helpers";

const ExampleComponent = createFixedHeightComponent(243);

const ExampleScreen = () => (
  <ExampleComponent width="fillsContainer">
    <Text>This is 243 wide and fills its container horizontally.</Text>
  </ExampleComponent>
);
```

```tsx
import { createFixedHeightComponent } from "react-native-app-helpers";

const ExampleComponent = createFixedHeightComponent(243);

const ExampleScreen = () => (
  <ExampleComponent width="fitsContent">
    <Text>This is 243 wide and fits its content horizontally.</Text>
  </ExampleComponent>
);
```
