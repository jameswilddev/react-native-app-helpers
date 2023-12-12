# `react-native-app-helpers/Row`

A React component which fills the container horizontally and applies a flex row
to its children.

## Usage

```tsx
import { Row } from "react-native-app-helpers";

const ExampleScreen = () => (
  <Row
    height="fitsContent"
    horizontalDistribution="left"
    verticalAlignment="top"
  >
    <Text>These example items are aligned to the top left.</Text>
    <Text>
      The container is as short as possible while containing its height.
    </Text>
  </Row>
);
```

```tsx
import { Row } from "react-native-app-helpers";

const ExampleScreen = () => (
  <Row
    height="fillsContainer"
    horizontalDistribution="centered"
    verticalAlignment="centered"
  >
    <Text>These example items are grouped in the center.</Text>
    <Text>The container fills its container vertically.</Text>
  </Row>
);
```

```tsx
import { Row } from "react-native-app-helpers";

const ExampleScreen = () => (
  <Row
    height="fitsContent"
    horizontalDistribution="right"
    verticalAlignment="bottom"
  >
    <Text>These example items are aligned to the bottom right.</Text>
    <Text>
      The container is as short as possible while containing its height.
    </Text>
  </Row>
);
```

```tsx
import { Row } from "react-native-app-helpers";

const ExampleScreen = () => (
  <Row
    height="fitsContent"
    horizontalDistribution="spaced"
    verticalAlignment="stretched"
  >
    <Text>
      These example items are spaced out horizontally, and are stretched to fill
      the container vertically.
    </Text>
    <Text>
      The container is as short as possible while containing its height.
    </Text>
  </Row>
);
```

```tsx
import { Row } from "react-native-app-helpers";

const ExampleScreen = () => (
  <Row
    height="fitsContent"
    horizontalDistribution="spacedTouchingEnds"
    verticalAlignment="stretched"
  >
    <Text>
      These example items are spaced out horizontally to the very edges of the
      container, and are stretched to fill the container vertically.
    </Text>
    <Text>
      The container is as short as possible while containing its height.
    </Text>
  </Row>
);
```
