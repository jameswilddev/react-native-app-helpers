# `react-native-app-helpers/NullableTextAreaProps`

Props to be given to nullable text area components.

## Usage

```tsx
import type { NullableTextAreaProps } from "react-native-app-helpers";

const example: NullableTextAreaProps = {
  value: "Example Value",
  onChange(value: undefined | string, complete: boolean): void {
    console.log(`Value: ${value}, complete: ${complete ? "Yes" : "No"}`);
  }}
  disabled: false,
  autoFocus: true,
  placeholder: "Shown when no text has been entered",
};
```
