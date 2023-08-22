# `react-native-app-helpers/HeaderProps`

Props to be given to header components.

## Usage

```tsx
import type { HeaderProps } from "react-native-app-helpers";
import { Text } from "react-native";

const example: HeaderProps = {
  leftIcon(color): React.ReactNode {
    return <Text style={{ color }}>This is shown on the left.</Text>;
  },
  rightIcon(color): React.ReactNode {
    return <Text style={{ color }>This is shown on the right.</Text>;
  },
  onPress(): void {
    alert(`The button has been pressed.`);
  }
  disabled: false,
  children(color) {
    return <Text style={{ color }}>This is shown in the center.</Text>
  },
};
```
