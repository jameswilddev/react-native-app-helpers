# `react-native-app-helpers/RequiredIntegerInputProps`

Props to be given to required integer input components.

## Usage

```tsx
import type { RequiredIntegerInputProps } from "react-native-app-helpers";

const example: RequiredIntegerInputProps = {
  value: 1234,
  onChange(value: undefined | number, complete: boolean): void {
    console.log(`Value: ${value}, complete: ${complete ? "Yes" : "No"}`);
  }}
  disabled: false,
  autoFocus: true,
  placeholder: "Shown when no text has been entered",
};
```
