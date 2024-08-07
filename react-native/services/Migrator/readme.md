# `react-native-app-helpers/Migrator`

Executes migrations.

## Usage

```tsx
import { Migrator, MigratableState } from "react-native-app-helpers";

type State = { readonly items: ReadonlyArray<number> }

const state: MigratableState<State> = {
  executedMigrationUuids: ['1b69c28f-454e-4511-aa05-596fe5ae23a8'],
  items: [],
}

const migrator = new Migrator<State>([
  ['b4dac8cd-af18-4e7d-a723-27f61d368228', (previous) => ({
    ...previous,
    items: [...previous.items, 1],
  })],
  ['1b69c28f-454e-4511-aa05-596fe5ae23a8', (previous) => ({
    ...previous,
    items: [...previous.items, 2],
  })],
  ['b07bc75d-1ba2-4bf7-b510-51a93d554a56', (previous) => ({
    ...previous,
    items: [...previous.items, 3],
  })],
]);

console.log(migrator.executionRequired(state));
console.log(migrator.execute(state));
```

## Interface

This package also exports a `MigratorInterface` type which can be used to
substitute other types in place of this class (for unit tests, for example).
