# `react-native-app-helpers/createSearchableMultiSelectComponent`

Creates a new React component which provides a searchable list of options (of
which any number can be selected) on pressing a button.

## Usage

```tsx
import { createSearchableMultiSelectComponent } from "react-native-app-helpers";

const ExampleSelectComponent = createSearchableMultiSelectComponent<number>(
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

const ExampleScreen = () => {
  const [value, setValue] = React.useState<ReadonlyArray<ExampleValue>>([1, 2, 4]);

  return (
    <ExampleSelectComponent
      disabled={false}
      placeholder="Select..."
      value={value}
      onChange={setValue}
      options={[
        { value: 2, label: `Example Option A` },
        { value: 3, label: `Example Option B` },
        { value: 4, label: `Example Option C` },
      ]}
      noMatchesText="No matching records were found."
    />
  );
}
```
