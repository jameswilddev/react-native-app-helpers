# `react-native-app-helpers/createHeaderBodyFooterComponent`

Creates a new React component which displays sidebars to the left and right of a
fluid-width body.

## Usage

```tsx
import { createSidebarComponent } from "react-native-app-helpers";

const ExampleLayout = createSidebarComponent(25, 75);

const ExampleScreen = () => (
  <ExampleLayout
    left={
      <Text>
        This is shown on the left.
      </Text>
    }
    body={
      <Text>
        This is shown in a fluid-height section between the header and footer,
        with 25 pixels of margin left and 75 pixels right.
      </Text>
    }
    right={
      <Text>
        This is shown on the right.
      </Text>
    }
  />
);
```
