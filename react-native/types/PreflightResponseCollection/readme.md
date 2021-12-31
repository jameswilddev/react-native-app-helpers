# `react-native-app-helpers/PreflightResponseCollection`

The an item in a collection within a response to a successful preflight request.

## Usage

```tsx
import type { PreflightResponseCollection } from "react-native-app-helpers";

type ExampleAdditionalCollectionItemData = {
  readonly exampleAdditionalCollectionItemDataKey: string;
};

const exampleWithNumberVersion: PreflightResponseCollection<ExampleAdditionalCollectionItemData> = {
  "0f4dc56b-6a5f-4146-8b88-360d35927186": {
    version: 1234,
    exampleAdditionalCollectionItemDataKey: `Example String`,
  },
  "6ad72f51-97dc-47e6-8e18-19210c5064a7": {
    version: `Example Version`,
    exampleAdditionalCollectionItemDataKey: `Example String`,
  },
};
```
