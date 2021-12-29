# `react-native-app-helpers/createUnderlinedTopTabBarComponent`

Creates a new React component which can be used to render a top tab bar, where
an underline is used to distinguish active and inactive tabs.

## Usage

```tsx
import { createUnderlinedTopTabBarComponent } from "react-native-app-helpers";

type ExampleTab = `A` | `B` | `C`;

const ExampleTabBar = createUnderlinedTopTabBarComponent(
  {
    fontSize: 20,
    verticalPadding: 10,
    inactive: {
      color: `yellow`,
      fontFamily: `Example Inactive Font Family`,
      backgroundColor: `red`,
      underline: { width: 4, color: `blue` },
    },
    active: {
      color: `green`,
      fontFamily: `Example Active Font Family`,
      backgroundColor: `orange`,
      underline: { width: 6, color: `purple` },
    },
  },
  [
    { tab: `A`, text: `Example Tab A Text` },
    { tab: `B`, text: `Example Tab B Text` },
    { tab: `C`, text: `Example Tab C Text` },
  ]
);

const ExampleScreen = () => {
  const [tab, setTab] = React.useState<ExampleTab>(`A`);

  return (
    <ExampleTabBar tab={tab} setTab={setTab} />
  );
};
```
