# `react-native-app-helpers/PreflightResponse`

The response to a successful preflight request.

## Usage

```tsx
import type { PreflightResponseCollection } from "react-native-app-helpers";

type ExampleSchema = {
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

type ExampleAdditionalCollectionItemData = {
  readonly exampleAdditionalCollectionItemDataKey: string;
};

const exampleWithNumberVersion: PreflightResponse<ExampleSchema, ExampleAdditionalCollectionItemData> = {
  collections: {
    exampleCollectionAKey: {
      "0f4dc56b-6a5f-4146-8b88-360d35927186": {
        version: 1234,
        exampleAdditionalCollectionItemDataKey: `Example String`,
      },
      "6ad72f51-97dc-47e6-8e18-19210c5064a7": {
        version: `Example Version`,
        exampleAdditionalCollectionItemDataKey: `Example String`,
      },
    },
    exampleCollectionBKey: {
      "71e368d8-82d6-4b0b-9480-fcb87c2b1f07": {
        version: 1234,
        exampleAdditionalCollectionItemDataKey: `Example String`,
      },
      "471f5237-4693-46dc-a7d7-0b64c2989a0b": {
        version: `Example Version`,
        exampleAdditionalCollectionItemDataKey: `Example String`,
      },
    },
    exampleCollectionCKey: {
      "d314ed48-cee5-4629-a73b-6b72e6ef32a5": {
        version: 1234,
        exampleAdditionalCollectionItemDataKey: `Example String`,
      },
      "e62609d8-01b7-4b2e-a84e-fe6fd67d76ad": {
        version: `Example Version`,
        exampleAdditionalCollectionItemDataKey: `Example String`,
      },
    },
  },
};
```
