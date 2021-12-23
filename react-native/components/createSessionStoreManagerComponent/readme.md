# `react-native-app-helpers/createSessionStoreManagerComponent`

Creates a React component which automatically manages a session store, loading
it and unloading it as appropriate and passing its content down to its props.

A re-render will be triggered automatically should the store's content change.

## Usage

```tsx
import {
  SessionStore,
  createSessionStoreManagerComponent,
} from "react-native-app-helpers";

const sessionStore = new SessionStore<number>(0, `Secure Storage Key`);

const SessionStoreManager = createSessionStoreManager(sessionStore);

const ExampleScreen = () => (
  <SessionStoreManager
    loading={<Text>The session store is loading...</Text>}
    ready={(session, setSession) => (
      <Button
        title={`Session: ${session}; click or touch to increment.`}
        onPress={() => {
          setSession(session + 1);
        }}
      />
    )}
  />
);
```
