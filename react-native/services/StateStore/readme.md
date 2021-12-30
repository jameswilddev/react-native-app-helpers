# `react-native-app-helpers/StateStore`

A wrapper around `expo-file-system` which adds:

- Concurrency control.
- JSON parsing and serialization.
- Change events.
- A synchronous read/write API (with asynchronous write-back).

## Usage

```tsx
import type { StateStore } from "react-native-app-helpers";

type State = `State A` | `State B`;

const store = new StateStore<State>(`State A`);


await store.load(`AsyncStorage Key A`);

// State A
console.log(store.get());

store.set(`State B`);

// State B
console.log(store.get());

await store.unload();


await store.load(`AsyncStorage Key A`);

// State A
console.log(store.get());

await store.unload();


await store.load(`AsyncStorage Key A`);

// State B
console.log(store.get());

await store.unload();
```

## Interface

This package also exports a `StateStoreInterface` type which can be used to
substitute other types in place of this class (for unit tests, for example).
