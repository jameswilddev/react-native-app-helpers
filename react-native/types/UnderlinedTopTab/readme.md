# `react-native-app-helpers/UnderlinedTopTab`

Describes the content of an underlined top tab.

## Usage

```tsx
import type { UnderlinedTopTab } from "react-native-app-helpers";

type Tab = `A` | `B` | `C`;

const example: UnderlinedTopTab<Tab> = {
  tab: `B`,
  text: `Example Text`,
};
```
