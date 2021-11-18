# `react-native-app-helpers/CheckboxStateStyle`

Describes the style of a checkbox in a specific state.

## Usage

```tsx
import type { CheckboxStateStyle } from "react-native-app-helpers";

const withoutBorder: CheckboxStateStyle = {
  backgroundColor: 'blue',
  color: 'yellow',
  boxChild: <Text>This is shown in the box.</Text>,
  radius: 3,
  border: null,
};

const withBorder: CheckboxStateStyle = {
  backgroundColor: 'blue',
  color: 'yellow',
  boxChild: <Text>This is shown in the box.</Text>,
  radius: 3,
  border: {
    width: 5,
    color: `red`,
  },
};
```
