# `react-native-app-helpers/createFlatColorBackgroundComponent`

Creates a new React component which displays a solid color background behind its
children.

## Usage

```tsx
import { createFlatColorBackgroundComponent } from "react-native-app-helpers";

const ExampleFlatColorBackground = createFlatColorBackgroundComponent(`red`);

const ExampleScreen = () => (
  <ExampleFlatColorBackground>
    <Text>
      A red background is shown behind this text.
    </Text>
  </ExampleFlatColorBackground>
);
```
