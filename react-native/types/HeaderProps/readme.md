# `react-native-app-helpers/HeaderProps`

Props to be given to header components.

## Usage

```tsx
import type { HeaderProps } from "react-native-app-helpers";
import { Text } from "react-native";

const example: HeaderProps = {
  leftIcons: [
    {
      icon: ExampleIconA,
      onPress() {
        alert(`You have pressed the left icon.`);
      },
    },
  ]
  rightIcons: [
    {
      icon: ExampleIconB,
      onPress() {
        alert(`You have pressed the first right icon.`);
      },
    },
    {
      icon: ExampleIconC,
      onPress() {
        alert(`You have pressed the second right icon.`);
      },
    },
  ],
  children: "Title",
};
```
