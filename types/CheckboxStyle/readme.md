# `react-native-app-helpers/CheckboxStyle`

Describes the style of a checkbox.

## Usage

```tsx
import type { CheckboxStyle } from "react-native-app-helpers";

const example: CheckboxStyle = {
  fontFamily: `Example Font Family`,
  fontSize: 16,
  boxSize: 14,
  boxLabelSpacing: 5,
  disabledFalse: {
    backgroundColor: 'blue',
    color: 'yellow',
    boxChild: <Text>This is shown in the box.</Text>,
    radius: 3,
    border: {
      width: 5,
      color: `red`,
    },
  },
  disabledTrue: {
    backgroundColor: 'blue',
    color: 'yellow',
    boxChild: <Text>This is shown in the box.</Text>,
    radius: 3,
    border: {
      width: 5,
      color: `red`,
    },
  },
  enabledFalse: {
    backgroundColor: 'blue',
    color: 'yellow',
    boxChild: <Text>This is shown in the box.</Text>,
    radius: 3,
    border: {
      width: 5,
      color: `red`,
    },
  },
  enabledTrue: {
    backgroundColor: 'blue',
    color: 'yellow',
    boxChild: <Text>This is shown in the box.</Text>,
    radius: 3,
    border: {
      width: 5,
      color: `red`,
    },
  },
};
```
