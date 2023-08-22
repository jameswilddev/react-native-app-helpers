# `react-native-app-helpers/isRenderedByReact`

Checks whether React will render an item.

## Usage

```tsx
import { isRenderedByReact } from "react-native-app-helpers";
import { Text } from "react-native";

// True.
isRenderedByReact(<Text>Example</Text>);
isRenderedByReact(1);
isRenderedByReact(true);
isRenderedByReact([true]);
isRenderedByReact("Example");

// False.
isRenderedByReact(null);
isRenderedByReact(undefined);
isRenderedByReact(0);
isRenderedByReact(false);
isRenderedByReact([]);
isRenderedByReact([false]);
isRenderedByReact("");
```
