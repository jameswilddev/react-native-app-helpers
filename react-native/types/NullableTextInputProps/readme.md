# `react-native-app-helpers/NullableTextInputProps`

Props to be given to nullable text input components.

## Usage

```tsx
import type { NullableTextInputProps } from "react-native-app-helpers";

const example: NullableTextInputProps = {
  value: "Example Value",
  onChange(value: undefined | string, complete: boolean): void {
    console.log(`Value: ${value}, complete: ${complete ? "Yes" : "No"}`);
  }}
  disabled: false,
  placeholder: "Shown when no text has been entered",
  unique: [`Not`, `In`, `This`, `List`],
};
```
