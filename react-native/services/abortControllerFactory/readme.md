# `react-native-app-helpers/abortControllerFactory`

A source of abort controllers.

## Usage

```tsx
import { abortControllerFactory } from "react-native-app-helpers";

const abortController = abortControllerFactory.create();
```

## Interface

This package also exports a `AbortControllerFactoryInterface` type which can be
used to substitute other types in place of this object (for unit tests, for
example).
