# `react-native-app-helpers/createNullableTextInputComponent`

Creates a new input component pre-configured as a nullable text input.

## Usage

```tsx
import { createNullableTextInputComponent } from "react-native-app-helpers";

const ExampleInput = createNullableTextInputComponent(
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
    <Text>Shown to the left</Text>,
    <Text>Shown to the right</Text>,
    null,
    -14,
    null,
    3,
);

const ExampleScreen = () => {
  // Useful for realtime submit button updates.
  const [incompleteValue, setIncompleteValue] = React.useState<undefined | null>(undefined);

  // Useful for persistence.
  const [completeValue, setCompleteValue] = React.useState<undefined | null>(undefined);

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
                onFocus={() => {}}
        disabled={false}
        placeholder="Shown when no text has been entered"
        unique={[`Not`, `In`, `This`, `List`]}
      />
      <Text>Incomplete: {incompleteValue}</Text>
      <Text>Complete: {completeValue}</Text>
      <Text>Submitted: {submittedValue}</Text>
    </React.Fragment>
  );
}
```
