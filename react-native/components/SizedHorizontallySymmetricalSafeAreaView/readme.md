# `react-native-app-helpers/SizedHorizontallySymmetricalSafeAreaView`

A SafeAreaView-like element which can be sized to fill its container.

This uses
[react-native-safe-area-context]https://github.com/th3rdwave/react-native-safe-area-context)'s
`useSafeAreaInsets`, so its instructions (such as adding a `<SafeAreaProvider>`)
must be followed.

## Usage

```tsx
import { SizedHorizontallySymmetricalSafeAreaView } from "react-native-app-helpers";

const ExampleScreen = () => (
  <SizedHorizontallySymmetricalSafeAreaView
    width="fillsContainer"
    height="fitsContent"
    top bottom left right
  >
    <Text>
      This is inside a SafeAreaView which fills its container horiontally and
      fits its content vertically.
    </Text>
  </SizedHorizontallySymmetricalSafeAreaView>
);
```
