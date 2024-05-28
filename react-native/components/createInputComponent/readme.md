# `react-native-app-helpers/createInputComponent`

Creates a React component which allows for the editing of text.

## Usage

```tsx
import { createInputComponent } from "react-native-app-helpers";

// This example allows any text containing only the letter "G".
// The value is the length of the text.

const ExampleInput = createInputComponent<number, null>(
    (value, context) => `G`.repeat(value),
    (value, context) => /[^G]/.test(value) || !value ? undefined : value.split(`G`).length - 1,
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
    false,
    `email`,
    `numeric`,
    true,
    `left`
);

const ExampleScreen = () => {
  // Useful for realtime submit button updates.
  const [incompleteValue, setIncompleteValue] = React.useState<undefined | number>(undefined);

  // Useful for persistence.
  const [completeValue, setCompleteValue] = React.useState<undefined | number>(undefined);

  // Useful for search boxes, etc.
  const [submittedValue, setSubmittedValue] = React.useState<undefined | number>(undefined);

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
        onSubmit={(value) => {
          setSubmittedValue(value);
        }}
        secureTextEntry={false}
        disabled={false}
        autoFocus={false}
        placeholder="Shown when no text has been entered"
        leftIcon={<Text>Shown to the left</Text>}
        rightIcon={<Text>Shown to the right</Text>}
        context={null}
      />
      <Text>Incomplete: {incompleteValue}</Text>
      <Text>Complete: {completeValue}</Text>
      <Text>Submitted: {submittedValue}</Text>
    </React.Fragment>
  );
}
```
