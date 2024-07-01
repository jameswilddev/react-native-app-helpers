# `react-native-app-helpers/createLimitedHeightComponent`

Creates a React component which has a maximum height.

## Usage

```tsx
import { createLimitedHeightComponent } from "react-native-app-helpers";

const ExampleComponent = createLimitedHeightComponent(243);

const ExampleScreen = () => (
  <ExampleComponent width="fillsContainer">
    <Text>This is up to 243 tall and fills its container horizontally.</Text>
  </ExampleComponent>
);
```

```tsx
import { createLimitedHeightComponent } from "react-native-app-helpers";

const ExampleComponent = createLimitedHeightComponent(243);

const ExampleScreen = () => (
  <ExampleComponent width="fitsContent">
    <Text>This is up to 243 tall and fits its content horizontally.</Text>
  </ExampleComponent>
);
```
