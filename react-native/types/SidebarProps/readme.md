# `react-native-app-helpers/SidebarProps`

Props to be given to sidebar components.

## Usage

```tsx
import type { SidebarProps } from "react-native-app-helpers";
import { Text } from "react-native";

const example: SidebarProps = {
  left: (
    <Text>
      This is shown on the left.
    </Text>
  ),
  body: (
    <Text>
      This is shown in a fluid-height section between the header and footer,
      with 25 pixels of margin left and 75 pixels right.
    </Text>
  ),
  right: (
    <Text>
      This is shown on the right.
    </Text>
  ),
};
```
