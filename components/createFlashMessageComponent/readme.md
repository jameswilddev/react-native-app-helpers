# `react-native-app-helpers/createFlashMessageComponent`

Creates a new React component representing a flash message.

## Usage

```tsx
import { createFlashMessageComponent, FlashMessageState } from "react-native-app-helpers";
import { Button } from "react-native";

const ExampleFlashMessage = createFlashMessageComponent(
{
    fontFamily: `Example Font Family`,
    fontSize: 25,
    radius: 12,
    horizontalPadding: 41,
    verticalPadding: 57,
    types: {
      exampleTypeA: {
        backgroundColor: `red`,
        color: `green`,
        border: null,
      },
      exampleTypeB: {
        backgroundColor: `blue`,
        color: `yellow`,
        border: {
          width: 15,
          color: `orange`,
        },
      },
      exampleTypeC: {
        backgroundColor: `purple`,
        color: `cyan`,
        border: null,
      },
      exampleTypeD: {
        backgroundColor: `magenta`,
        color: `black`,
        border: {
          width: 24,
          color: `white`,
        },
      },
    },
  }
);

const ExampleScreen = () => {
  const [state, setState] = React.useState<null | FlashMessageState<`exampleTypeA` | `exampleTypeB` | `exampleTypeC` | `exampleTypeD`>>(null);

  return (
    <React.Fragment>
      <ExampleFlashMessage state={state} />
      <Button
        onPress={() => {
          setState({
            type: `exampleTypeB`,
            message: `This is example message B.`,
          })
        }}
        title="Show Message B"
      />
      <Button
        onPress={() => {
          setState({
            type: `exampleTypeC`,
            message: `This is example message C.`,
          })
        }}
        title="Show Message C"
      />
    </React.Fragment>
  );
};
```
