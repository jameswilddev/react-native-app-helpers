# `react-native-app-helpers/SyncableState`

Represents a local mirror of data which can be synced.

## Usage

```tsx
import type { SyncableState } from "react-native-app-helpers";

type ExampleSchema = {
  readonly enums: {
    readonly exampleEnumAKey: {
      readonly exampleDataAKey: boolean;
    };
    readonly exampleEnumBKey: {
      readonly exampleDataBKey: number;
    };
  };
  readonly collections: {
    readonly exampleCollectionAKey: {
      readonly exampleDataAKey: boolean;
    };
    readonly exampleCollectionBKey: {
      readonly exampleDataBKey: number;
    };
    readonly exampleCollectionCKey: {
      readonly exampleDataCKey: string;
    };
  };
};

const example: SyncableState<ExampleSchema> = {
  enums: {
    exampleEnumAKey: {
      type: `absent`,
    },
    exampleEnumBKey: {
      type: `upToDate`,
      version: `Example Version`,
      items: {
        "5a82bfb8-35ef-4cd6-92d7-efcb532e5fd1": {
            exampleDataBKey: 1234,
        },
        "459ef49b-59a2-4f1b-a055-3577b8f974dd": {
            exampleDataBKey: 5678,
        },
      },
    },
  },
  collections: {
    exampleCollectionAKey: {
      "5a82bfb8-35ef-4cd6-92d7-efcb532e5fd1": {
        type: `upToDate`,
        version: 1234,
        data: {
          exampleDataAKey: true,
        },
      },
      "459ef49b-59a2-4f1b-a055-3577b8f974dd": {
        type: `upToDate`,
        version: `Example Version`,
        data: {
          exampleDataAKey: false,
        },
      },
      "052627d9-bd33-4475-ab19-880585a7cd71": {
        type: `awaitingPush`,
        data: {
          exampleDataAKey: true,
        }
      },
      "d6d37ba5-b5b8-4c4b-892b-27643b45aed6": {
        type: `awaitingPush`,
        data: {
          exampleDataAKey: true,
        }
      },
      "b41d82d5-1735-4906-bdc0-4dfca6d15375": {
        type: `awaitingPull`,
        data: {
          exampleDataAKey: true,
        }
      },
    },
    exampleCollectionBKey: {
      "604b2316-b9e5-44c8-811d-1a014fc3d3a5": {
        type: `awaitingPush`,
        exampleDataBKey: 1234,
      },
    },
    exampleCollectionCKey: {
      "ecd32785-43e8-4c72-a613-d115de3e3371": {
        type: `pushing`,
        exampleDataCKey: `Example String`,
      },
    },
  },
  addedFileUuids: [
    `870654f6-c2ed-4332-8dde-75dd2312f569`,
    `ad493206-01a7-499a-ae0c-8d0f2fabd2f4`,
  ],
  deletedFileRoutes: [
    `example/get/put/and/delete/route/a`,
    `example/get/put/and/delete/route/b`,
    `example/get/put/and/delete/route/c`,
  ],
};
```
