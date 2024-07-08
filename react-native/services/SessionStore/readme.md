# `react-native-app-helpers/SessionStore`

A wrapper around `expo-secure-store` which adds:

- Concurrency control.
- JSON parsing and serialization.
- Change events.
- A synchronous read/write API (with asynchronous write-back).

## Android decryption failure handling

Expo on Android unfortunately has a tendency to lose the ability to decrypt the
secure store.  It's not known why this is, but when it happens, the only
workaround is to catch the exception thrown by `expo-secure-store` and continue
as though the store is empty.

For this reason, any exceptions thrown by `expo-secure-store` during the load
phase are ignored.

## Usage

```tsx
import type { SessionStore, errorReporter } from "react-native-app-helpers";

type Session = `Session A` | `Session B`;

const store = new SessionStore<Session>(`Session A`, `SecureStorage Key`, errorReporter);


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
