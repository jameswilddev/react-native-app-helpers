# `react-native-app-helpers/Column`

A React component which fills the container vertically and applies a flex column to its children.

## Usage

```tsx
import { Column } from "react-native-app-helpers";

const ExampleScreen = () => (
  <Column
    height="fitsContent"
    verticalDistribution="top"
    horizontalAlignment="left"
  >
    <Text>These example items are aligned to the top left.</Text>
    <Text>
      The container is as narrow as possible while containing its width.
    </Text>
  </Column>
);
```

```tsx
import { Column } from "react-native-app-helpers";

const ExampleScreen = () => (
  <Column
    height="fillsContainer"
    verticalDistribution="centered"
    horizontalAlignment="centered"
  >
    <Text>These example items are grouped in the center.</Text>
    <Text>The container fills its container horizontally.</Text>
  </Column>
);
```

```tsx
import { Column } from "react-native-app-helpers";

const ExampleScreen = () => (
  <Column
    height="fitsContent"
    verticalDistribution="bottom"
    horizontalAlignment="right"
  >
    <Text>These example items are aligned to the bottom right.</Text>
    <Text>
      The container is as narrow as possible while containing its width.
    </Text>
  </Column>
);
```

```tsx
import { Column } from "react-native-app-helpers";

const ExampleScreen = () => (
  <Column
    height="fitsContent"
    verticalDistribution="spaced"
    horizontalAlignment="stretched"
  >
    <Text>
      These example items are spaced out vertically, and are stretched to fill
      the container vertically.
    </Text>
    <Text>
      The container is as narrow as possible while containing its width.
    </Text>
  </Column>
);
```

```tsx
import { Column } from "react-native-app-helpers";

const ExampleScreen = () => (
  <Column
    height="fitsContent"
    verticalDistribution="spacedTouchingEnds"
    horizontalAlignment="stretched"
  >
    <Text>
      These example items are spaced out vertically to the very edges of the
      container, and are stretched to fill the container horizontally.
    </Text>
    <Text>
      The container is as narrow as possible while containing its width.
    </Text>
  </Column>
);
```
