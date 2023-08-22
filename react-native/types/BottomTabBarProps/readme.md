# `react-native-app-helpers/BottomTabBarProps`

 Props to be given to bottom tab bar components.

 ## Usage

 ```tsx
 import type { BottomTabBarProps } from "react-native-app-helpers";

 type ExampleTab = "Example Tab";

 const example: BottomTabBarProps<ExampleTab> = {
   tab: "Example Tab"
   setTab=(to: ExampleTab): void {
     console.log(to);
   }
   resetActiveTab(): void {
     alert(`The active tab should now reset to its "home" route.`);
   }
 };
 ```
