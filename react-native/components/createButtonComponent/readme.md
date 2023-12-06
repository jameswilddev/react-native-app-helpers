# `react-native-app-helpers/createButtonComponent`

Creates a new React component which displays a button which can be pressed to
show an element in a drop-down area.

## Usage

```tsx
import { createButtonComponent } from "react-native-app-helpers";

const ExampleDropDown = createButtonComponent({
  fontFamily: `Example Font Family`,
  fontSize: 16,
  horizontalPadding: 10,
  verticalPadding: 2,
  iconSpacing: 5,
  default: {
    backgroundColor: `yellow`,
    color: `blue`,
    radius: 10,
    border: null,
  },
  disabled: {
    backgroundColor: `orange`,
    color: `purple`,
    radius: 7,
    border: {
      width: 5,
      color: `aquamarine`,
    },
  },
});

const ExampleScreen = () => (
  <React.Fragment>
    <ExampleButton
      leftIcon={(color) => <Text style={{ color }}>This is shown on the left.</Text>}
      rightIcon={(color) => <Text style={{ color }>This is shown on the right.</Text>}
      onPress={() => {
        alert(`The button has been pressed.`);
      }}
      disabled={false}
    >
      This is shown in the center.
    </ExampleButton>
    <ExampleButton
      leftIcon={(color) => <Text style={{ color }}>This is shown on the left.</Text>}
      rightIcon={(color) => <Text style={{ color }>This is shown on the right.</Text>}
      onPress={() => {
        alert(`The button has been pressed.`);
      }}
      disabled={false}
    >
      {(color) => <Text style={{ color }}>This is shown in the center.</Text>}
    </ExampleButton>
  </React.Fragment>
);
```
