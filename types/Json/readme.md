# `react-native-app-helpers/Json`

A type representing an immutable, JSON-serializable value.

## Usage

```tsx
import { Json } from "react-native-app-helpers";

const aValue: Json = JSON.parse(`{"hello":"world"}`);

console.log(JSON.stringify(aValue));
```
