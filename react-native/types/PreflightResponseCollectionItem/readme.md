# `react-native-app-helpers/PreflightResponseCollectionItem`

The an item in a collection within a response to a successful preflight request.

## Usage

```tsx
import type { PreflightResponseCollectionItem } from "react-native-app-helpers";

type ExampleAdditionalCollectionItemData = {
  readonly exampleAdditionalCollectionItemDataKey: string;
};

const exampleWithNumberVersion: PreflightResponseCollectionItem<ExampleAdditionalCollectionItemData> = {
  version: 1234,
  exampleAdditionalCollectionItemDataKey: `Example String`,
};

const exampleWithStringVersion: PreflightResponseCollectionItem<ExampleAdditionalCollectionItemData> = {
  version: `Example Version`,
  exampleAdditionalCollectionItemDataKey: `Example String`,
};
```
