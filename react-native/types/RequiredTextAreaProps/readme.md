# `react-native-app-helpers/RequiredTextAreaProps`

Props to be given to required text area components.

## Usage

```tsx
import type { RequiredTextAreaProps } from "react-native-app-helpers";

const example: RequiredTextAreaProps = {
  value: "Example Value",
  onChange(value: undefined | string, complete: boolean): void {
    console.log(`Value: ${value}, complete: ${complete ? "Yes" : "No"}`);
  }}
  disabled: false,
  placeholder: "Shown when no text has been entered",
};
```
