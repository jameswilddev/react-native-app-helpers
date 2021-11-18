# `react-native-app-helpers/createCheckboxComponent`

Creates a React component representing a form checkbox.

## Usage

```tsx
import { createCheckboxComponent } from "react-native-app-helpers";

const ExampleCheckbox = createCheckboxComponent({
  fontFamily: `Example Font Family`,
  fontSize: 16,
  boxSize: 14,
  boxLabelSpacing: 5,
  disabledFalse: {
    backgroundColor: 'blue',
    color: 'yellow',
    boxChild: <Text>DF</Text>,
    radius: 3,
    border: {
      width: 5,
      color: `red`,
    },
  },
  disabledTrue: {
    backgroundColor: 'blue',
    color: 'yellow',
    boxChild: <Text>DT</Text>,
    radius: 3,
    border: {
      width: 5,
      color: `red`,
    },
  },
  enabledFalse: {
    backgroundColor: 'blue',
    color: 'yellow',
    boxChild: <Text>EF</Text>,
    radius: 3,
    border: {
      width: 5,
      color: `red`,
    },
  },
  enabledTrue: {
    backgroundColor: 'blue',
    color: 'yellow',
    boxChild: <Text>ET</Text>,
    radius: 3,
    border: {
      width: 5,
      color: `red`,
    },
  },
});

const ExampleScreen = () => {
  const [value, setValue] = React.useState(false);

  return (
    <ExampleCheckbox value={value} onChange={setValue} disabled={false}>
      Example Label
    </ExampleCheckbox>
  );
};
```
