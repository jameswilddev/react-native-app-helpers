# `react-native-app-helpers/createBottomTabBarComponent`

Creates a new React component which can be used to render a bottom tab bar.

## Usage

```tsx
import { createBottomTabBarComponent } from "react-native-app-helpers";
import ExampleIconA from "./assets/example-icon-a.svg";
import ExampleIconB from "./assets/example-icon-b.svg";
import ExampleIconC from "./assets/example-icon-c.svg";

type ExampleTab = `A` | `B` | `C`;

const ExampleTabBar = createBottomTabBarComponent<ExampleTab>({
  topPadding: 12,
  iconTextSpacing: 4,
  fontSize: 20,
  bottomPadding: 5,
  inactive: {
    backgroundColor: `yellow`,
    iconFill: `green`,
    color: `blue`,
    fontFamily: `Example Font Family`,
  },
  active: {
    backgroundColor: `yellow`,
    iconFill: `green`,
    color: `blue`,
    fontFamily: `Example Font Family`,
  },
}, [
  {
    tab: `A`,
    icon: ExampleIconA,
    text: `Example Label A`,
  },
  {
    tab: `B`,
    icon: ExampleIconB,
    text: `Example Label B`,
  },
  {
    tab: `C`,
    icon: ExampleIconC,
    text: `Example Label C`,
  },
]);

const ExampleScreen = () => {
  const [tab, setTab] = React.useState<ExampleTab>(`A`);

  return (
    <ExampleTabBar tab={tab} setTab={setTab} />
  );
};
```
