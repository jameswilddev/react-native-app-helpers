# `react-native-app-helpers/SyncConfiguration`

Describes implementation details of a sync process.

## Usage

```tsx
import type { SyncConfiguration } from "react-native-app-helpers";

type ExampleSchema = {
  readonly singletons: {
    readonly exampleSingletonAKey: {
      readonly exampleDataAKey: boolean;
    };
    readonly exampleSingletonBKey: {
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

type ExampleAdditionalCollectionData = {
  readonly exampleAdditionalCollectionKey: number;
};

const example: SyncConfiguration<ExampleSchema, ExampleAdditionalCollectionData> = {
  order: [
    {
      type: `collection`;
      key: `exampleCollectionBKey`;
    },
    {
      type: `singleton`;
      key: `exampleSingletonAKey`;
    },
    {
      type: `collection`;
      key: `exampleCollectionCKey`;
    },
    {
      type: `singleton`;
      key: `exampleSingletonBKey`;
    },
    {
      type: `collection`;
      key: `exampleCollectionAKey`;
    },
  ]
  collections: {
    exampleCollectionBKey: {
      listFiles(item) {
        return [
          {
            route: `example/get/and/put/route`,
            uuid: `52b92c59-880f-48e7-bed1-fbd8fec0241b`,
          },
        ];
      },
      exampleAdditionalCollectionKey: 1234,
    },
    exampleCollectionCKey: {
      listFiles(item) {
        return [
          {
            route: `example/get/and/put/route`,
            uuid: `3f89790b-72c1-4ef2-8979-1ca47748b8cf`,
          },
        ];
      },
      exampleAdditionalCollectionKey: 1234,
    },
    exampleCollectionAKey: {
      listFiles(item) {
        return [
          {
            route: `example/get/and/put/route`,
            uuid: `dbf84c8b-6408-4c0f-a839-dae0e26ace5a`,
          },
        ];
      },
      exampleAdditionalCollectionKey: 1234,
    }
  },
};
```
