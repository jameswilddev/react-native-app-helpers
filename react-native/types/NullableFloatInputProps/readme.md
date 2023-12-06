# `react-native-app-helpers/NullableFloatInputProps`

Props to be given to nullable float input components.

## Usage

```tsx
import type { NullableFloatInputProps } from "react-native-app-helpers";

const example: NullableFloatInputProps = {
  value: 12.34,
  onChange(value: undefined | number, complete: boolean): void {
    console.log(`Value: ${value}, complete: ${complete ? "Yes" : "No"}`);
  }}
  disabled: false,
  placeholder: "Shown when no text has been entered",
};
```
