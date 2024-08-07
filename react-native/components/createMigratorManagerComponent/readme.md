# `react-native-app-helpers/createMigratorManagerComponent`

Creates a React component which automatically manages a migrator, displaying a
loading screen and executing it if appropriate.

## Usage

```tsx
import {
  Migrator,
  MigratableState,
  createMigratorManagerComponent,
} from "react-native-app-helpers";

type State = { readonly items: ReadonlyArray<number> }

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

const MigratorManager = createMigratorManagerComponent(migrator);

export default () => {
  const [state, setState] = React.useState<MigratableState<State>>({
    executedMigrationUuids: ['1b69c28f-454e-4511-aa05-596fe5ae23a8'],
    items: [],
  });

  return (
    <MigratorManager
      state={state}
      setState={setState}
      migrating={<Text>Migrations are in progress...</Text>}
      ready={<Text>All migrations have completed.</Text>}
    />
  );
};
```
