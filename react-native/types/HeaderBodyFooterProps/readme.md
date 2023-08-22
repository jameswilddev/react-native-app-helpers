# `react-native-app-helpers/HeaderBodyFooterProps`

Props to be given to header/body/footer components.

## Usage

```tsx
import type { HeaderBodyFooterProps } from "react-native-app-helpers";
import { Text } from "react-native";

const example: HeaderBodyFooterProps = {
  header: (
    <Text>
      This is shown at the top.
    </Text>
  ),
  body: (
    <Text>
      This is shown in a fluid-height section between the header and footer,
      with 25 pixels of margin above and 75 pixels below.
    </Text>
  ),
  footer: (
    <Text>
      This is shown at the bottom.
    </Text>
  ),
};
```
