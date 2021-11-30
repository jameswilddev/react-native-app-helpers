# `react-native-app-helpers/createRequiredTextAreaComponent`

Creates a new input component pre-configured as a required text area.

## Usage

```tsx
import { createRequiredTextAreaComponent } from "react-native-app-helpers";

const ExampleInput = createRequiredTextAreaComponent(
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
    },
    <Text>Shown to the left</Text>,
    <Text>Shown to the right</Text>,
    null,
    -14,
    null,
    3,
);

const ExampleScreen = () => {
  // Useful for realtime submit button updates.
  const [incompleteValue, setIncompleteValue] = React.useState<undefined | number>(undefined);

  // Useful for persistence.
  const [completeValue, setCompleteValue] = React.useState<undefined | number>(undefined);

  return (
    <React.Fragment>
      <ExampleInput
        value={incompleteValue}
        onChange={(value, complete) => {
          if (complete) {
            setCompleteValue(value);
          } else {
            setIncompleteValue(value);
          }
        }}
        disabled={false}
        placeholder="Shown when no text has been entered"
      />
      <Text>Incomplete: {incompleteValue}</Text>
      <Text>Complete: {completeValue}</Text>
    </React.Fragment>
  );
}
```
