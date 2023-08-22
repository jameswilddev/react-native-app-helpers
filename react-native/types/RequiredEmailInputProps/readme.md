# `react-native-app-helpers/RequiredEmailInputProps`

Props to be given to required text input components.

## Usage

```tsx
import type { RequiredEmailInputProps } from "react-native-app-helpers";

const example: RequiredEmailInputProps = {
  value: "example@value.com",
  onChange(value: undefined | string, complete: boolean): void {
    console.log(`Value: ${value}, complete: ${complete ? "Yes" : "No"}`);
  }}
  disabled: false,
  placeholder: "Shown when no text has been entered",
  unique: [`Not`, `In`, `This`, `List`],
};
```
