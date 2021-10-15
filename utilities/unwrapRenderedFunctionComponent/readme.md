# `react-native-app-helpers/unwrapRenderedFunctionComponent`

Unwraps a rendered JSX element which itself renders to a JSX element.

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
