# `react-native-app-helpers/FlashMessageStyle`

Describes the style of a flash message.

## Usage

```tsx
import type { FlashMessageStyle } from "react-native-app-helpers";

const flashMessageStyle: FlashMessageStyle<`exampleTypeA` | `exampleTypeB` | `exampleTypeC` | `exampleTypeD`> = {
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
};
```
