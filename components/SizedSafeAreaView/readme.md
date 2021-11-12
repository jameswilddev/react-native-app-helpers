# `react-native-app-helpers/SizedSafeAreaView`

A SafeAreaView which can be sized to fill its container.

This uses
[react-native-safe-area-context]https://github.com/th3rdwave/react-native-safe-area-context)'s
`<SafeAreaView>`, so its instructions (such as adding a `<SafeAreaProvider>`)
must be followed.

## Usage

```tsx
import { SizedSafeAreaView } from "react-native-app-helpers";

const ExampleScreen = () => (
  <SizedSafeAreaView
    width="fillsContainer"
    height="fitsContent"
    edges={[`left`]}
  >
    <Text>
      This is inside a SafeAreaView which fills its container horiontally and
      fits its content vertically.
    </Text>
  </SizedSafeAreaView>
);
```
