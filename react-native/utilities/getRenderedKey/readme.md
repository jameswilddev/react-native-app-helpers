# `react-native-app-helpers/getRenderedKey`

Gets the key of a rendered React element.

## Usage

```tsx
import { getRenderedKey } from "react-native-app-helpers";

// null.
setRenderedKey(<Text>A</Text>);

// `1234`.
setRenderedKey(<Text key={1234}>A</Text>);

// `Example Key`.
setRenderedKey(<Text key="Example Key">A</Text>);
```
