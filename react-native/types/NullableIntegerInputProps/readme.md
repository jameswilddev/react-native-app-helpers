# `react-native-app-helpers/NullableIntegerInputProps`

Props to be given to nullable integer input components.

## Usage

```tsx
import type { NullableIntegerInputProps } from "react-native-app-helpers";

const example: NullableIntegerInputProps = {
  value: 1234,
  onChange(value: undefined | number, complete: boolean): void {
    console.log(`Value: ${value}, complete: ${complete ? "Yes" : "No"}`);
  }}
  disabled: false,
  placeholder: "Shown when no text has been entered",
};
```
