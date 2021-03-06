# `react-native-app-helpers/ControlStateStyle`

Describes the style of a control (such as a text box or drop-down) in a
particular state (focused/blurred, valid/invalid).

## Usage

```tsx
import type { ControlStyle } from "react-native-app-helpers";

const value: ControlStyle = {
  fontFamily: `Example Font Family`,
  fontSize: 12,
  paddingVertical: 2,
  paddingHorizontal: 6,
  blurredValid: {
    textColor: `blue`,
    placeholderColor: `green`,
    backgroundColor: `yellow`,
    radius: 10,
    border: null,
    iconColor: `purple`,
  },
  blurredInvalid: {
    textColor: `blue`,
    placeholderColor: `green`,
    backgroundColor: `yellow`,
    radius: 10,
    border: {
      width: 5,
      color: `red`,
    },
    iconColor: `purple`,
  },
  focusedValid: {
    textColor: `blue`,
    placeholderColor: `green`,
    backgroundColor: `yellow`,
    radius: 10,
    border: null,
    iconColor: `purple`,
  },
  focusedInvalid: {
    textColor: `blue`,
    placeholderColor: `green`,
    backgroundColor: `yellow`,
    radius: 10,
    border: {
      width: 5,
      color: `red`,
    },
    iconColor: `purple`,
  },
  disabledValid: {
    textColor: `blue`,
    placeholderColor: `green`,
    backgroundColor: `yellow`,
    radius: 10,
    border: null,
    iconColor: `purple`,
  },
  disabledInvalid: {
    textColor: `blue`,
    placeholderColor: `green`,
    backgroundColor: `yellow`,
    radius: 10,
    border: {
      width: 5,
      color: `red`,
    },
    iconColor: `purple`,
  },
};
```
