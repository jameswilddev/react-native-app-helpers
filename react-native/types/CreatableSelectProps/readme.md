# `react-native-app-helpers/CreatableSelectProps`

Props to be given to creatable select components.

## Usage

```tsx
import type { CreatableSelectProps } from "react-native-app-helpers";

const example: CreatableSelectProps = {
  disabled: false,
  placeholder: "Select...",
  required: true,
  value: "Test Value",
  onChange(to: "Test Value"): void {
    console.log(to);
  }
  onCreate=(label: string): void {
    console.log(label)
  }
  options={[
    { value: "Test Value", label: "Test Label" },
  ]}
  noMatchesText="No matching records were found."
  willCreateText="Press enter to create this record."
};
```
