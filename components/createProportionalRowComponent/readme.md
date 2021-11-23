# `react-native-app-helpers/createProportionalRowComponent`

Creates a new React component which fills its container horizontally and
presents a fixed set of columns with proportional width and optional spacing.

## Usage

```tsx
import { createProportionalRowComponent } from "react-native-app-helpers";

const ExampleComponent = createProportionalRowComponent(23, [27, 18, 33, 44]);

const ExampleScreen = () => (
  <ExampleComponent height="fitsContent" verticalAlignment="top">
    <Text>
      This is 27/122 of the width.
    </Text>
    <Text>
      This is 18/122 of the width.
    </Text>
    <Text>
      This is 33/122 of the width.
    </Text>
    <Text>
      This is 44/122 of the width.
    </Text>
  </ExampleComponent>
);
```

```tsx
import { createProportionalRowComponent } from "react-native-app-helpers";

const ExampleComponent = createProportionalRowComponent(23, [27, 18, 33, 44]);

const ExampleScreen = () => (
  <ExampleComponent height="fillsContainer" verticalAlignment="centered">
    <Text>
      This is 27/122 of the width.
    </Text>
    <Text>
      This is 18/122 of the width.
    </Text>
    <Text>
      This is 33/122 of the width.
    </Text>
    <Text>
      This is 44/122 of the width.
    </Text>
  </ExampleComponent>
);
```

```tsx
import { createProportionalRowComponent } from "react-native-app-helpers";

const ExampleComponent = createProportionalRowComponent(23, [27, 18, 33, 44]);

const ExampleScreen = () => (
  <ExampleComponent height="fillsContainer" verticalAlignment="bottom">
    <Text>
      This is 27/122 of the width.
    </Text>
    <Text>
      This is 18/122 of the width.
    </Text>
    <Text>
      This is 33/122 of the width.
    </Text>
    <Text>
      This is 44/122 of the width.
    </Text>
  </ExampleComponent>
);
```

```tsx
import { createProportionalRowComponent } from "react-native-app-helpers";

const ExampleComponent = createProportionalRowComponent(23, [27, 18, 33, 44]);

const ExampleScreen = () => (
  <ExampleComponent height="fillsContainer" verticalAlignment="stretched">
    <Text>
      This is 27/122 of the width.
    </Text>
    <Text>
      This is 18/122 of the width.
    </Text>
    <Text>
      This is 33/122 of the width.
    </Text>
    <Text>
      This is 44/122 of the width.
    </Text>
  </ExampleComponent>
);
```
