# `react-native-app-helpers/NullableEmailInputProps`

Props to be given to nullable text input components.

## Usage

```tsx
import type { NullableEmailInputProps } from "react-native-app-helpers";

const example: NullableEmailInputProps = {
  value: "example@value.com",
  onChange(value: undefined | string, complete: boolean): void {
    console.log(`Value: ${value}, complete: ${complete ? "Yes" : "No"}`);
  }}
  disabled: false,
  autoFocus: true,
  placeholder: "Shown when no text has been entered",
  unique: [`Not`, `In`, `This`, `List`],
};
```
