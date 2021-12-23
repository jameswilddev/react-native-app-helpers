# `react-native-app-helpers/createImageBackgroundComponent`

Creates a new React component which displays an image background behind its
children.

## Usage

```tsx
import { createImageBackgroundComponent } from "react-native-app-helpers";
import exampleImageSourceA from "./assets/example-a.jpg";
import exampleImageSourceB from "./assets/example-b.jpg";

const ExampleImageBackgroundA = createImageBackgroundComponent(exampleImageSourceA);

const ExampleImageBackgroundB = createImageBackgroundComponent(exampleImageSourceB);

const ExampleScreen = () => (
  <ExampleImageBackgroundA size="fillsContainer">
    <ExampleImageBackgroundB size="fitsContent">
      <Text>
        The entire background of this element is covered by the example image.
      </Text>
    </ExampleImageBackgroundB>
  </ExampleImageBackgroundA>
);
```
