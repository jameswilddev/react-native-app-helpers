# `react-native-app-helpers/intercalateRendered`

Inserts instances of a React component between the contents of a rendered JSX
element.

## Usage

```tsx
import { intercalateRendered } from "react-native-app-helpers";

const a = flattenRenderedToArray(
  () => (
    <Text>Separator</Text>
  ),
  <React.Fragment>
    <Text>A</Text>
    <Text>B</Text>
    <Text>C</Text>
  </React.Fragment>
);

const b = [
  <Text key="0">A</Text>
  <Text key="separator0">Separator</Text>
  <Text key="1">B</Text>
  <Text key="separator1">Separator</Text>
  <Text key="2">C</Text>
];

// a and b are equivalent here.
```
