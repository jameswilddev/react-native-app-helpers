# `react-native-app-helpers/SessionStore`

Synchronizes a local StateStore with a server.

## Usage

```tsx
import type { Sync } from "react-native-app-helpers";

const sync = new Sync(
  stateStore,
  request,
  logger,
  syncConfiguration,
  fileStore,
);

// Returns `noChangesMade`, `needsToRunAgain` or `atLeastOneChangeMade`.
await sync.run(abortSignal);
```
