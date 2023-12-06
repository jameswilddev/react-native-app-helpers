# `react-native-app-helpers/SearchableSelectProps`

Props to be given to searchable select components.

## Usage

```tsx
import type { HeaderProps } from "react-native-app-helpers";
import { Text } from "react-native";

type ExampleValue = "Example Value A" | "Example Value B" | "Example Value C";

const example: SearchableSelectProps<ExampleValue> = {
    disabled: false,
    placeholder: "Select...",
    required: true,
    value: ExampleValue,
    onChange(to: ExampleValue) {
      console.log(to);
    },
    options: {[
      { value: "Example Value A", label: `Example Option A` },
      { value: "Example Value B", label: `Example Option B` },
      { value: "Example Value C", label: `Example Option C` },
    ]},
    noMatchesText: "No matching records were found.",
};
```
