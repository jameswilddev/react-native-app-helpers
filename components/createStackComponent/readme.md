# `react-native-app-helpers/createStackComponent`

Creates a new React component which surrounds its children with padding.

## Usage

```tsx
import { createStackComponent } from "react-native-app-helpers";

const ExampleStack = createStackComponent(25, `horizontal`);

const ExampleScreen = () => (
  <ExampleStack>
    <Text>These example items are spaced 25 pixels apart.</Text>
    <Text>The line starts at the left edge of the container.</Text>
    <Text>It runs to the right.</Text>
  </ExampleStack>
);
```

```tsx
import { createStackComponent } from "react-native-app-helpers";

const ExampleStack = createStackComponent(25, `vertical`);

const ExampleScreen = () => (
  <ExampleStack>
    <Text>These example items are spaced 25 pixels apart.</Text>
    <Text>The line starts at the top edge of the container.</Text>
    <Text>It runs to the bottom.</Text>
  </ExampleStack>
);
```
