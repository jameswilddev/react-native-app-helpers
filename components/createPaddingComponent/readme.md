# `react-native-app-helpers/createPaddingComponent`

Creates a new React component which surrounds its children with padding.

## Usage

```tsx
import { createTextComponent } from "react-native-app-helpers";

const ExamplePadding = createPaddingComponent(25);

const ExampleScreen = () => (
  <ExamplePadding>
    <Text>
      This is padded by 25 pixels on the left and right, above and below.
    </Text>
  </ExamplePadding>
);
```

```tsx
import { createTextComponent } from "react-native-app-helpers";

const ExamplePadding = createPaddingComponent(25, 50);

const ExampleScreen = () => (
  <ExamplePadding>
    <Text>
      This is padded by 50 pixels on the left and right,
      and 25 pixels above and below.
    </Text>
  </ExamplePadding>
);
```

```tsx
import { createTextComponent } from "react-native-app-helpers";

const ExamplePadding = createPaddingComponent(25, 50, 10, 30);

const ExampleScreen = () => (
  <ExamplePadding>
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