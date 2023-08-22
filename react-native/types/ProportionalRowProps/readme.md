# `react-native-app-helpers/ProportionalRowProps`

Props to be given to proportional row components.

## Usage

```tsx
import type { ProportionalRowProps } from "react-native-app-helpers";

const example: ProportionalRowProps<"exampleKeyA" | "exampleKeyB" | "exampleKeyC"> = {
  height: "fillsContainer",
  verticalAlignment: "stretched",
  children: {
    exampleKeyA: "Example Value A",
    exampleKeyB: "Example Value B",
    exampleKeyC: "Example Value C",
  },
};
```
