# `react-native-app-helpers/SearchableMultiSelectProps`

Props to be given to searchable multi-select components.

## Usage

```tsx
import type { SearchableMultiSelectProps } from "react-native-app-helpers";
import { Text } from "react-native";

type ExampleValue = "Example Value A" | "Example Value B" | "Example Value C";

const example: SearchableMultiSelectProps<ExampleValue> = {
    disabled: false,
    placeholder: "Select...",
    required: true,
    value: ["Example Value A" | "Example Value B"],
    onChange(to: ReadonlyArray<ExampleValue>) {
      console.log(to);
    },
    options: {[
      { value: "Example Value A", label: `Example Option A` },
      { value: "Example Value B", label: `Example Option B` },
      { value: "Example Value C", label: `Example Option C` },
    ]},
    noMatchesText: "No matching records were found.",
    rightIcon: <Text>Example Right Icon</Text>,
};
```
