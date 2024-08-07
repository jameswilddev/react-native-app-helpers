import { Migrator } from '../../..'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type State = { readonly items: readonly number[] }

const migrator = new Migrator<State>([
  ['b4dac8cd-af18-4e7d-a723-27f61d368228', (previous) => ({
    ...previous,
    items: [...(previous['items'] as readonly number[]), 1]
  })],
  ['1b69c28f-454e-4511-aa05-596fe5ae23a8', (previous) => ({
    ...previous,
    items: [...(previous['items'] as readonly number[]), 2]
  })],
  ['b07bc75d-1ba2-4bf7-b510-51a93d554a56', (previous) => ({
    ...previous,
    items: [...(previous['items'] as readonly number[]), 3],
    executedMigrationUuids: 'overwritten'
  })]
])

test('execution is required when migrations do not exist', () => {
  expect(migrator.executionRequired({
    items: []
  })).toBeTruthy()
})

test('execution is not required when all migrations have executed', () => {
  expect(migrator.executionRequired({
    executedMigrationUuids: ['1b69c28f-454e-4511-aa05-596fe5ae23a8', 'b4dac8cd-af18-4e7d-a723-27f61d368228', 'b07bc75d-1ba2-4bf7-b510-51a93d554a56'],
    items: []
  })).toBeFalsy()
})

test('execution is required when at least one migration has not been executed', () => {
  expect(migrator.executionRequired({
    executedMigrationUuids: ['1b69c28f-454e-4511-aa05-596fe5ae23a8'],
    items: []
  })).toBeTruthy()
})

test('all unexecuted migrations are ran in order', () => {
  expect(migrator.execute({
    executedMigrationUuids: ['1b69c28f-454e-4511-aa05-596fe5ae23a8'],
    items: []
  })).toEqual({
    executedMigrationUuids: ['1b69c28f-454e-4511-aa05-596fe5ae23a8', 'b4dac8cd-af18-4e7d-a723-27f61d368228', 'b07bc75d-1ba2-4bf7-b510-51a93d554a56'],
    items: [1, 3]
  })
})

test('all migrations are ran in order', () => {
  expect(migrator.execute({
    items: []
  })).toEqual({
    executedMigrationUuids: ['b4dac8cd-af18-4e7d-a723-27f61d368228', '1b69c28f-454e-4511-aa05-596fe5ae23a8', 'b07bc75d-1ba2-4bf7-b510-51a93d554a56'],
    items: [1, 2, 3]
  })
})
