# `react-native-app-helpers/createFlatColorBackgroundComponent`

Creates a new React component which displays a solid color background behind its
children.

## Usage

```tsx
import { createFlatColorBackgroundComponent } from "react-native-app-helpers";

const RedBackground = createFlatColorBackgroundComponent(`red`);
const YellowBackground = createFlatColorBackgroundComponent(`yellow`);

const ExampleScreen = () => (
  <RedBackground size="fillsContainer">
    <Text>
      A red background is shown behind this text.
    </Text>
    <YellowBackground size="fitsContent">
      <Text>
        A yellow background is shown behind this text.
      </Text>
    </YellowBackground>
    <Text>
      A red background is shown behind this text.
    </Text>
  </RedBackground>
);
```
