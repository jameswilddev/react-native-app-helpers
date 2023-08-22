# `react-native-app-helpers/CheckboxProps`

Props to be given to checkbox components.

## Usage

```tsx
import type { CheckboxProps } from "react-native-app-helpers";

const example: CheckboxProps = {
  value: true,
  onChange(to: boolean): void {
    console.log(to);
  },
  disabled: false,
};
```
