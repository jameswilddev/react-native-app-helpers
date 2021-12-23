# `react-native-app-helpers/useMeasure`

A React hook which executes a callback when an element's dimensions are first
known or change.

## Usage

```tsx
import { useMeasure } from "react-native-app-helpers";

const ExampleScreen = () => {
  const [ref, onLayout] = useMeasure((x, y, width, height, pageX, pageY) => {
    // Called when the element is measured.
  });

  return (
    <Button ref={ref} onLayout={onLayout} />
  );
};
```
