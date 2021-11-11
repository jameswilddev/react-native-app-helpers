# `react-native-app-helpers/createCardComponent`

Creates a new React component which wraps other elements with optional rounded
corners and shadows.

Shadow styles are generated in a similar manner to
[react-native-shadow-generated](https://github.com/rajeshd50/react-native-shadow-generator).

## Usage

```tsx
import { createCardComponent } from "react-native-app-helpers";

const ExampleCard = createCardComponent({
  10, // Border radius.
  12, // Shadow radius.
});

const ExampleScreen = () => (
  <ExampleCard width="fitsContent" height="fitsContent">
    <Text>This is shown in the card.</Text>
  </ExampleCard>
);
```

```tsx
import { createCardComponent } from "react-native-app-helpers";

const ExampleCard = createCardComponent({
  10, // Border radius.
  12, // Shadow radius.
});

const ExampleScreen = () => (
  <ExampleCard width="fillsContainer" height="fitsContent">
    <Text>This is shown in the card.</Text>
  </ExampleCard>
);
```

```tsx
import { createCardComponent } from "react-native-app-helpers";

const ExampleCard = createCardComponent({
  10, // Border radius.
  12, // Shadow radius.
});

const ExampleScreen = () => (
  <ExampleCard width="fitsContent" height="fillsContent">
    <Text>This is shown in the card.</Text>
  </ExampleCard>
);
```
