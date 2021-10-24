# `react-native-app-helpers/createFlatColorBackgroundComponent`

Creates a new React component which displays a button which can be pressed to
show an element in a drop-down area.

## Usage

```tsx
import { createDropDownComponent } from "react-native-app-helpers";

const ExampleDropDown = createDropDownComponent(150);

const ExampleScreen = () => (
  <ExampleDropDown
    button={<Text>Click or touch to open the drop-down.</Text>}
    body={(position) => (
      <Text>
        This is shown {position} (above or below) the button when the drop-down
        is open.  It can be up to 150 in height.
      </Text>
    )}
    disabled={false}
  />
);
```
