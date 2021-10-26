# `react-native-app-helpers/useRefresh`

A React hook which returns a function which can be invoked to force a refresh of
the Component.

## Usage

```tsx
import { useRefresh } from "react-native-app-helpers";

const ExampleScreen = () => {
  const invocations = React.useRef(-1);
  invocations.current++;

  const refresh = useRefresh();

  return (
    <Button
      onPress={refresh}
      title={`Refreshed ${invocations.current} time(s).  Click or touch to refresh again.`}
    />
  );
};
```
