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
  },
  focusedValid: {
    textColor: `blue`,
    placeholderColor: `green`,
    backgroundColor: `yellow`,
    radius: 10,
    border: null,
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
  },
  disabledValid: {
    textColor: `blue`,
    placeholderColor: `green`,
    backgroundColor: `yellow`,
    radius: 10,
    border: null,
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
  },
};
```
