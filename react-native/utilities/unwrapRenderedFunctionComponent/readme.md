# `react-native-app-helpers/unwrapRenderedFunctionComponent`

Unwraps a rendered JSX element which itself renders to a JSX element.

## Usage

```tsx
import { unwrapRenderedFunctionComponent } from "react-native-app-helpers";

const Component: React.FunctionComponent = ({ children }) => (
  <Text>{children}</Text>
);

const rendered = <Component>Test Content</Component>;

const a = unwrapRenderedFunctionComponent(rendered);

const b = <Text>Test Content</Text>;

// a and b are equivalent here.
```
