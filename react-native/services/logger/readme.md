# `react-native-app-helpers/logger`

A wrapper around `console` for easier mocking in tests.

## Usage

```tsx
import { logger } from "react-native-app-helpers";

logger.error(`Example Error Text`);
logger.warning(`Example Warning Text`);
logger.information(`Example Information Text`);
logger.debug(`Example Debug Text`);
```

## Interface

This package also exports a `LoggerInterface` type which can be used to
substitute other types in place of this object (for unit tests, for example).
