# `react-native-app-helpers/SyncConfigurationCollection`

Describes implementation details of a collection during a sync process.

## Usage

```tsx
import type { SyncConfigurationCollection } from "react-native-app-helpers";

type ExampleData = {
  readonly exampleDataBKey: number;
};

type ExampleAdditionalCollectionData = {
  readonly exampleAdditionalCollectionKey: number;
};

const example: SyncConfigurationCollection<ExampleData, ExampleAdditionalCollectionData> = {
  listFiles(item) {
    return [
      {
        route: `example/get/put/and/delete/route`,
        uuid: `52b92c59-880f-48e7-bed1-fbd8fec0241b`,
      },
    ];
  },
  exampleAdditionalCollectionKey: 1234,
};
```
