# `react-native-app-helpers/createTextComponent`

Creates a new React component which can be used to render text.

## Usage

```tsx
import { createTextComponent } from "react-native-app-helpers";

const ExampleText = createTextComponent("example", "red", 12, "left");

const ExampleScreen = () => (
  <ExampleText>
    Hello World!  (in the "example" font, in red, at size 12, left-aligned)
  </ExampleText>
);
```
