# `react-native-app-helpers/SessionStore`

A wrapper around EncryptedStorage which adds:

- Concurrency control.
- JSON parsing and serialization.
- Change events.
- A synchronous read/write API (with asynchronous write-back).

## Usage

TODO

```tsx
import type { SessionStore } from "react-native-app-helpers";

type Session = `Session A` | `Session B`;

const store = new SessionStore<Session>(`Session A`, `SecureStorage Key`);


await store.load();

// Session A
console.log(store.get());

store.set(`Session B`);

// Session B
console.log(store.get());

await store.unload();


await store.load();

// Session B
console.log(store.get());

await store.unload();
```
