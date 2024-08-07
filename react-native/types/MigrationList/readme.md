# `react-native-app-helpers/MigrationList`

A list of migrations to be ran in order.

## Usage

```tsx
import type { MigrationList } from "react-native-app-helpers";

const migrationList: MigrationList = [
  ['b4dac8cd-af18-4e7d-a723-27f61d368228', (previous) => ({
    ...previous,
    exampleChangeAKey: 'exampleChangeAValue',
  })],
  ['1b69c28f-454e-4511-aa05-596fe5ae23a8', (previous) => ({
    ...previous,
    exampleChangeBKey: 'exampleChangeBValue',
  })],
  ['b07bc75d-1ba2-4bf7-b510-51a93d554a56', (previous) => ({
    ...previous,
    exampleChangeCKey: 'exampleChangeCValue',
  })],
]
```
