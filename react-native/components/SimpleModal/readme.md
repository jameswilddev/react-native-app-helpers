# `react-native-app-helpers/SimpleModal`

A replacement for the React Native `Modal` component which supports web browsers
as a target.

## Usage

```tsx
import { SimpleModal } from "react-native-app-helpers";

const ExampleScreen = () => (
  <SimpleModal onClose={() => {
    console.log(`Called when either the back button is pressed or the modal's background is pressed.`);
  }}>
    <Text>
      This is overlaid on top of the rest of the app.
      The background is transparent, but blocks clicks/touches.
    </Text>
  </SimpleModal>
);
```
