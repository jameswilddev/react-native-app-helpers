# `react-native-app-helpers/errorReporter`

A wrapper around `console` and Sentry for easier mocking in tests.

## Usage

```tsx
import { errorReporter } from "react-native-app-helpers";

errorReporter.report(new Error(`An example error.`));
```

## Interface

This package also exports a `ErrorReporterInterface` type which can be used to substitute other types in place of this object (for unit tests, for example).
