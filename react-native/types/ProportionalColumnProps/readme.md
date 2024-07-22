# `react-native-app-helpers/ProportionalColumnProps`

Props to be given to proportional column components.

## Usage

```tsx
import type { ProportionalColumnProps } from "react-native-app-helpers";

const example: ProportionalColumnProps<"exampleKeyA" | "exampleKeyB" | "exampleKeyC"> = {
  width: "fillsContainer",
  horizontalAlignment: "stretched",
  children: {
    exampleKeyA: "Example Value A",
    exampleKeyB: "Example Value B",
    exampleKeyC: "Example Value C",
  },
};
```
