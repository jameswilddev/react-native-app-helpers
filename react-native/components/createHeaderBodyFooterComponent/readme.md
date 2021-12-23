# `react-native-app-helpers/createHeaderBodyFooterComponent`

Creates a new React component which displays a header above and a footer below a
fluid-height body.

## Usage

```tsx
import { createHeaderBodyFooterComponent } from "react-native-app-helpers";

const ExampleLayout = createPaddingComponent(25, 75);

const ExampleScreen = () => (
  <ExampleLayout
    header={
      <Text>
        This is shown at the top.
      </Text>
    }
    body={
      <Text>
        This is shown in a fluid-height section between the header and footer,
        with 25 pixels of margin above and 75 pixels below.
      </Text>
    }
    footer={
      <Text>
        This is shown at the bottom.
      </Text>
    }
  />
);
```
