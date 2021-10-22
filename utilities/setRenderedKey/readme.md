# `react-native-app-helpers/intercalateRendered`

Sets the key of a rendered React element.

## Usage

```tsx
import { setRenderedKey } from "react-native-app-helpers";

const a = setRenderedKey(
  <Text key="Example Key">A</Text>,
  `A`
);

const b = [
  <Text key="Example Key">A</Text>
];

// a and b are equivalent here.
```
