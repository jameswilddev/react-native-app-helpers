# `react-native-app-helpers/SyncableStateHelper`

Provides helpers for working with states which can be synced.

## Usage

```tsx
import { SyncableStateHelper } from "react-native-app-helpers";

const syncableStateHelper = new SyncableStateHelper(syncConfiguration);

syncableStateHelper.upsertCollection(
  state,
  `exampleCollectionKey`,
  `76a7d202-7971-45d4-8fb6-586403a312b0`,
  `Example Data`,
  setState,
);
```

### Without amending files

A call to `upsertCollection` will enqueue file uploads and deletions based upon the differences between the new data and the previous data.

There are some rare cases in which this should be skipped; for example, if a record had embedded child records with files, removal of one such child record should not lead the sync system to start trying to delete its associated files from the server.  Use `upsertCollectionWithoutAmendingFiles` to handle this:

```tsx
import { SyncableStateHelper } from "react-native-app-helpers";

const syncableStateHelper = new SyncableStateHelper(syncConfiguration);

syncableStateHelper.upsertCollectionWithoutAmendingFiles(
  state,
  `exampleCollectionKey`,
  `76a7d202-7971-45d4-8fb6-586403a312b0`,
  `Example Data`,
  setState,
);
```
