# `react-native-app-helpers/createHeaderBodyFooterComponent`

Creates a new React component which displays a header above and a footer below a
fluid-height body.

## Usage

```tsx
import { createHeaderBodyFooterComponent } from "react-native-app-helpers";
import ExampleIconA from "./assets/example-icon-a.svg";
import ExampleIconB from "./assets/example-icon-b.svg";
import ExampleIconC from "./assets/example-icon-c.svg";

const ExampleHeader = createHeaderComponent({
  textColor: `red`,
  fontFamily: `Example Font Family`,
  fontSize: 30,
  background: `green`,
  outerHorizontalPadding: 50,
  innerHorizontalPadding: 14,
  verticalPadding: 3,
});

const ExampleScreen = () => (
  <ExampleHeader
    leftIcons={[
      {
        icon: ExampleIconA,
        onPress() {
          alert(`You have pressed the left icon.`);
        },
      },
    ]}
    rightIcons={[
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
    ]}
  >
    Title
  </ExampleHeader>
);
```
