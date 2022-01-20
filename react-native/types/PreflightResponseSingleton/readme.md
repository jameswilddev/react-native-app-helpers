# `react-native-app-helpers/PreflightResponseCollection`

A singleton within a response to a successful preflight request.

## Usage

```tsx
import type { PreflightResponseSingleton } from "react-native-app-helpers";

const exampleWithNumberVersion: PreflightResponseSingleton = {
  version: 1234,
};

const exampleWithStringVersion: PreflightResponseSingleton = {
  version: `Example Version`,
};
```
