# `react-native-app-helpers/createImageBackgroundComponent`

Creates a new React component which displays an image background behind its
children.

## Usage

```tsx
import { createImageBackgroundComponent } from "react-native-app-helpers";
import exampleImageSource from "./assets/example.jpg";

const ExampleImageBackground = createImageBackgroundComponent(exampleImageSource);

const ExampleScreen = () => (
  <ExampleImageBackground>
    <Text>
      The entire background of this element is covered by the example image.
    </Text>
  </ExampleImageBackground>
);
```
