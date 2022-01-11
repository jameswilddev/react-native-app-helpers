# `react-native-app-helpers/createTiledComponent`

Creates a new React component which shows a grid of equally sized tiles, flowing
from left to right then wrapping onto a new line.

## Usage

```tsx
import { createTiledComponent } from "react-native-app-helpers";

const ExampleTiledComponent = createTiledComponent(
  20, // Column spacing.
  50, // Row spacing.
  150, // Minimum tile size.
);

const ExampleScreen = () => (
  <ExampleTiledComponent>
    <Text key="A">Example Tile A</Text>
    <Text key="B">Example Tile B</Text>
    <Text key="C">Example Tile C</Text>
    <Text key="D">Example Tile D</Text>
    <Text key="E">Example Tile E</Text>
  </ExampleTiledComponent>
);
```
