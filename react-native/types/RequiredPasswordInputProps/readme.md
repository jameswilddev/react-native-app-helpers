# `react-native-app-helpers/RequiredPasswordInputProps`

Props to be given to required password input components.

## Usage

```tsx
import type { RequiredPasswordInputProps } from "react-native-app-helpers";

const example: RequiredPasswordInputProps = {
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
