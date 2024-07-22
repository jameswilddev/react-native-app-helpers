# `react-native-app-helpers/createProportionalColumnComponent`

Creates a new React component which fills its container vertically and presents
a fixed set of rows with proportional width and optional spacing.

## Usage

```tsx
import { createProportionalColumnComponent } from "react-native-app-helpers";

const ExampleComponent = createProportionalColumnComponent(23, [27, 18, 33, 44]);

const ExampleScreen = () => (
  <ExampleComponent width="fitsContent" horizontalAlignment="top">
    <Text>
      This is 27/122 of the height.
    </Text>
    <Text>
      This is 18/122 of the height.
    </Text>
    <Text>
      This is 33/122 of the height.
    </Text>
    <Text>
      This is 44/122 of the height.
    </Text>
  </ExampleComponent>
);
```

```tsx
import { createProportionalColumnComponent } from "react-native-app-helpers";

const ExampleComponent = createProportionalColumnComponent(23, [27, 18, 33, 44]);

const ExampleScreen = () => (
  <ExampleComponent width="fillsContainer" horizontalAlignment="centered">
    <Text>
      This is 27/122 of the height.
    </Text>
    <Text>
      This is 18/122 of the height.
    </Text>
    <Text>
      This is 33/122 of the height.
    </Text>
    <Text>
      This is 44/122 of the height.
    </Text>
  </ExampleComponent>
);
```

```tsx
import { createProportionalColumnComponent } from "react-native-app-helpers";

const ExampleComponent = createProportionalColumnComponent(23, [27, 18, 33, 44]);

const ExampleScreen = () => (
  <ExampleComponent width="fillsContainer" horizontalAlignment="bottom">
    <Text>
      This is 27/122 of the height.
    </Text>
    <Text>
      This is 18/122 of the height.
    </Text>
    <Text>
      This is 33/122 of the height.
    </Text>
    <Text>
      This is 44/122 of the height.
    </Text>
  </ExampleComponent>
);
```

```tsx
import { createProportionalColumnComponent } from "react-native-app-helpers";

const ExampleComponent = createProportionalColumnComponent(23, [27, 18, 33, 44]);

const ExampleScreen = () => (
  <ExampleComponent width="fillsContainer" horizontalAlignment="stretched">
    <Text>
      This is 27/122 of the height.
    </Text>
    <Text>
      This is 18/122 of the height.
    </Text>
    <Text>
      This is 33/122 of the height.
    </Text>
    <Text>
      This is 44/122 of the height.
    </Text>
  </ExampleComponent>
);
```
