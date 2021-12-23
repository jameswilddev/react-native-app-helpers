# `react-native-app-helpers/createPaddingComponent`

Creates a new React component which surrounds its children with padding.

## Usage

```tsx
import { createPaddingComponent } from "react-native-app-helpers";

const ExamplePadding = createPaddingComponent(25);

const ExampleScreen = () => (
  <ExamplePadding size="fitsContent">
    <Text>
      This is padded by 25 pixels on the left and right, above and below.
    </Text>
  </ExamplePadding>
);
```

```tsx
import { createPaddingComponent } from "react-native-app-helpers";

const ExamplePadding = createPaddingComponent(25, 50);

const ExampleScreen = () => (
  <ExamplePadding size="fitsContent">
    <Text>
      This is padded by 50 pixels on the left and right,
      and 25 pixels above and below.
    </Text>
  </ExamplePadding>
);
```

```tsx
import { createTexcreatePaddingComponenttComponent } from "react-native-app-helpers";

const ExamplePadding = createPaddingComponent(25, 50, 10, 30);

const ExampleScreen = () => (
  <ExamplePadding size="fitsContent">
    <Text>
      This is padded by:
      - 25 pixels above.
      - 50 pixels to the right.
      - 10 pixels below.
      - 30 pixels to the left.
    </Text>
  </ExamplePadding>
);
```

```tsx
import { createPaddingComponent } from "react-native-app-helpers";

const ExamplePadding = createPaddingComponent(25);

const ExampleScreen = () => (
  <ExamplePadding size="fillsContainer">
    <Text>
      This fills its container and is padded by 25 pixels on the left and right,
      above and below.
    </Text>
  </ExamplePadding>
);
```
