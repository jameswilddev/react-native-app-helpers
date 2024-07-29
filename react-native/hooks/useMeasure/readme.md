# `react-native-app-helpers/useMeasure`

A React hook which executes a callback when an element's dimensions are first
known or change.

You MUST set collapsable to false on the associated view for this to work
reliably on Android.

## Usage

```tsx
import { useMeasure } from "react-native-app-helpers";

const ExampleScreen = () => {
  const [ref, onLayout] = useMeasure((x, y, width, height, pageX, pageY) => {
    // Called when the element is measured.
  });

  return (
    <View collapsable={false} ref={ref} onLayout={onLayout} />
  );
};
```
