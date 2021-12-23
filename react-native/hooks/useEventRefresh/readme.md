# `react-native-app-helpers/useEventRefresh`

A React hook which refreshes the Component each time an event is raised.

## Usage

```tsx
import { useEventRefresh } from "react-native-app-helpers";
import { EventEmitter } from "events";

const event = new EventEmitter();

const ExampleScreen = () => {
  const invocations = React.useRef(-1);
  invocations.current++;

  useEventRefresh(event, `eventType`);

  return (
    <Button
      onPress={() => {
        event.emit(`eventType`);
      }}
      title={`Refreshed ${invocations.current} time(s).  Click or touch to raise the event again.`}
    />
  );
};
```
