# `react-native-app-helpers/createTextComponent`

Creates a new React component which can be used to render text.

## Usage

```tsx
import { createTextComponent } from "react-native-app-helpers";

const ExampleText = createTextComponent(`example`, `red`, 12, `left`, false, null);

const ExampleScreen = () => (
  <ExampleText>
    Hello World! (
      in the "example" font,
      in red,
      at size 12,
      left-aligned,
      truncates with ellipsis rather than wrapping
    )
  </ExampleText>
);
```

```tsx
import { createTextComponent } from "react-native-app-helpers";

const ExampleText = createTextComponent(`example`, `red`, 12, `left`, true, null);

const ExampleScreen = () => (
  <ExampleText>
    Hello World! (
      in the "example" font,
      in red,
      at size 12,
      left-aligned,
      wraps over multiple lines when the available width is exceeded
    )
  </ExampleText>
);
```

```tsx
import { createTextComponent } from "react-native-app-helpers";

const ExampleText = createTextComponent(`example`, `red`, 12, `left`, false, {
  underline: true,
  strikethrough: false,
  style: `solid`, // Also: double, dotted, dashed.
  color: `blue`,
});

const ExampleScreen = () => (
  <ExampleText>
    This has text decorations applied to it as described above.
  </ExampleText>
);
```
