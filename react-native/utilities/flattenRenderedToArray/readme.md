# `react-native-app-helpers/unwrapRenderedFunctionComponent`

Flattens a rendered JSX element (which could be empty, a fragment, a component,
a hierarchy of arrays, etc.) into an array.

## Usage

```tsx
import { flattenRenderedToArray } from "react-native-app-helpers";

const a = flattenRenderedToArray(
  <React.Fragment>
    <Text>A</Text>
    <Text>B</Text>
    <Text>C</Text>
  </React.Fragment>
);

const b = [
  <Text key="0">A</Text>
  <Text key="1">B</Text>
  <Text key="2">C</Text>
];

// a and b are equivalent here.
```
