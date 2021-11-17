# `react-native-app-helpers/createFullHeightPopoverComponent`

Creates a new React component which displays a button which can be pressed to
show an element in a pop-over which fills the display vertically.

This is particularly useful for searchable and creatable selects, where the
button may be obscured by the keyboard (and as much vertical height as possible
is desirable for the list of options).

## Usage

```tsx
import { createFullHeightPopoverComponent } from "react-native-app-helpers";

const ExampleFullHeightPopover = createDropDownComponent(
  {
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 5,
      border: {
        width: 4,
        color: `#FF00FF`,
      },
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 6,
        color: `#9A9A8E`,
      },
    },
    focusedValid: {
      textColor: `#55EA13`,
      placeholderColor: `#273346`,
      backgroundColor: `#CABA99`,
      radius: 3,
      border: {
        width: 5,
        color: `#646464`,
      },
    },
    focusedInvalid: {
      textColor: `#ABAADE`,
      placeholderColor: `#47ADAD`,
      backgroundColor: `#32AA88`,
      radius: 47,
      border: {
        width: 12,
        color: `#98ADAA`,
      },
    },
    disabledValid: {
      textColor: `#AE2195`,
      placeholderColor: `#FFAAEE`,
      backgroundColor: `#772728`,
      radius: 100,
      border: {
        width: 14,
        color: `#5E5E5E`,
      },
    },
    disabledInvalid: {
      textColor: `#340297`,
      placeholderColor: `#233832`,
      backgroundColor: `#938837`,
      radius: 2,
      border: {
        width: 19,
        color: `#573829`,
      },
    },
  }
);

const ExampleScreen = () => (
  <ExampleFullHeightPopover
    button={<Text>Click or touch to open the pop-over.</Text>}
    body={(position) => (
      <Text>
        This is shown in a column spanning the full height of the display when
        the button is pressed.
      </Text>
    )}
    disabled={false}
  />
);
```
