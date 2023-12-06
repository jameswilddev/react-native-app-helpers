# `react-native-app-helpers/RequiredTextInputProps`

Props to be given to required text input components.

## Usage

```tsx
import type { RequiredTextInputProps } from "react-native-app-helpers";

const example: RequiredTextInputProps = {
  value: "Example Value",
  onChange(value: undefined | string, complete: boolean): void {
    console.log(`Value: ${value}, complete: ${complete ? "Yes" : "No"}`);
  }}
  disabled: false,
  placeholder: "Shown when no text has been entered",
  unique: [`Not`, `In`, `This`, `List`],
};
```
