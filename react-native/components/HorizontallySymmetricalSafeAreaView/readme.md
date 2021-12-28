# `react-native-app-helpers/HorizontallySymmetricalSafeAreaView`

Similar to SafeAreaView, but ensures that the left and right safe area insets
are identical.  This means that, for example, the notch will not push a tab
bar's contents off-center when the device is horizontal.

This uses
[react-native-safe-area-context]https://github.com/th3rdwave/react-native-safe-area-context)'s
`useSafeAreaInsets`, so its instructions (such as adding a `<SafeAreaProvider>`)
must be followed.

## Usage

```tsx
import { HorizontallySymmetricalSafeAreaView } from "react-native-app-helpers";

const ExampleScreen = () => (
  <HorizontallySymmetricalSafeAreaView
    top bottom left right
  >
    <Text>
      This is inside a SafeAreaView-like element, where the left and right
      paddings are identical.
    </Text>
  </SizedSafeAreaView>
);
```
