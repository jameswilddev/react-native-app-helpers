# `react-native-app-helpers/createFlatColorBackgroundComponent`

Creates a new React component which displays a button which can be pressed to
show an element in a drop-down area.

## Usage

```tsx
import { createDropDownComponent } from "react-native-app-helpers";

const ExampleDropDown = createDropDownComponent(
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  },
  150
);

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
