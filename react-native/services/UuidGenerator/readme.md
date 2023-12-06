# `react-native-app-helpers/UuidGenerator`

Generates UUIDs.

## Usage

```tsx
import { UuidGenerator } from "react-native-app-helpers";

const uuidGenerator = new UuidGenerator();

// Example: "4f52e91e-cadc-4654-a1fc-f54d94143fdc".
const uuid = uuidGenerator.generate();
```

## Interface

This package also exports a `UuidGenerator` type which can be used to
substitute other types in place of this class (for unit tests, for example).
