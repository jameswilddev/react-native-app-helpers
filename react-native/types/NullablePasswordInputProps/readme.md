# `react-native-app-helpers/NullablePasswordInputProps`

Props to be given to nullable password input components.

## Usage

```tsx
import type { NullablePasswordInputProps } from "react-native-app-helpers";

const example: NullablePasswordInputProps = {
  value: "Example Value",
  onChange(value: undefined | string, complete: boolean): void {
    console.log(`Value: ${value}, complete: ${complete ? "Yes" : "No"}`);
  }}
  disabled: false,
  autoFocus: true,
  placeholder: "Shown when no text has been entered.",
  match: "Must match this when non-null.",
};
```
