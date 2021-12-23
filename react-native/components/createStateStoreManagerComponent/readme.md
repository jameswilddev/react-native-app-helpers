# `react-native-app-helpers/createStateStoreManagerComponent`

Creates a React component which automatically manages a state store, loading
it and unloading it as appropriate and passing its content down to its props.

A re-render will be triggered automatically should the store's content change.

## Usage

```tsx
import {
  StateStore,
  createStateStoreManagerComponent,
} from "react-native-app-helpers";

const stateStore = new StateStore<number>(0);

const StateStoreManager = createStateStoreManagerComponent(stateStore);

export default () => {
  const [key, setKey] = React.useState<null | string>(null);

  return (
    <StateStoreManager
      stateKey={key}
      unloaded={(
        <React.Fragment>
          <Button
            title="Load state A"
            onPress={() => {
              setKey(`a`);
            }}
          />
          <Button
            title="Load state B"
            onPress={() => {
              setKey(`b`);
            }}
          />
        </React.Fragment>
      )}
      loading={<Text>The state store is loading...</Text>}
      ready={(state, setState) => (
        <React.Fragment>
          <Button
            title={`State ${key}: ${state}; click or touch to increment.`}
            onPress={() => {
              setState(state + 1);
            }}
          />
          <Button
            title="Unload"
            onPress={() => {
              setKey(null);
            }}
          />
        </React.Fragment>
      )}
      unloading={<Text>The state store is unloading...</Text>}
    />
  );
};
```
