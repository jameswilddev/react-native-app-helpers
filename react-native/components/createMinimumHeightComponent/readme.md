# `react-native-app-helpers/createMinimumHeightComponent`

Creates a React component which has a minimum height.

## Usage

```tsx
import { createMinimumHeightComponent } from "react-native-app-helpers";

const ExampleComponent = createMinimumHeightComponent(243);

const ExampleScreen = () => (
  <ExampleComponent width="fillsContainer">
    <Text>This is at least 243 tall and fills its container horizontally.</Text>
  </ExampleComponent>
);
```

```tsx
import { createMinimumHeightComponent } from "react-native-app-helpers";

const ExampleComponent = createMinimumHeightComponent(243);

const ExampleScreen = () => (
  <ExampleComponent width="fitsContent">
    <Text>This is at least 243 tall and fits its content horizontally.</Text>
  </ExampleComponent>
);
```
