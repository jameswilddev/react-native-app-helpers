import * as React from 'react'
import { Text } from 'react-native'
import * as TestRenderer from 'react-test-renderer'
import { createMigratorManagerComponent, type MigratorInterface } from '../../..'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type State = { readonly items: readonly number[] }

test('displays the migrating screen when no migrations are required', async () => {
  const migrator: MigratorInterface<State> = {
    executionRequired: jest.fn().mockReturnValue(true),
    execute: jest.fn()
  }
  const MigratorManager = createMigratorManagerComponent(migrator)
  const setState = jest.fn()

  const renderer = TestRenderer.create(
    <MigratorManager
      state={{ items: [1, 2, 3] }}
      setState={setState}
      migrating={<Text>Migrating</Text>}
      ready={<Text>Ready</Text>}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Migrating'
      })
    })
  )

  expect(setState).not.toHaveBeenCalled()
  expect(migrator.executionRequired).toHaveBeenCalledTimes(1)
  expect(migrator.executionRequired).toHaveBeenCalledWith({ items: [1, 2, 3] })
  expect(migrator.execute).not.toHaveBeenCalled()

  renderer.unmount()

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })
})

test('executes migrations when required', async () => {
  const migrator: MigratorInterface<State> = {
    executionRequired: jest.fn().mockReturnValue(true),
    execute: jest.fn().mockReturnValue({ items: [4, 5, 6] })
  }
  const MigratorManager = createMigratorManagerComponent(migrator)
  const setState = jest.fn()

  const renderer = TestRenderer.create(
    <MigratorManager
      state={{ items: [1, 2, 3] }}
      setState={setState}
      migrating={<Text>Migrating</Text>}
      ready={<Text>Ready</Text>}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Migrating'
      })
    })
  )

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  expect(migrator.executionRequired).toHaveBeenCalledTimes(1)
  expect(migrator.execute).toHaveBeenCalledTimes(1)
  expect(migrator.execute).toHaveBeenCalledWith({ items: [1, 2, 3] })
  expect(setState).toHaveBeenCalledTimes(1)
  expect(setState).toHaveBeenCalledWith({ items: [4, 5, 6] })

  renderer.unmount()

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })
})

test('displays the ready screen when no migrations are required', async () => {
  const migrator: MigratorInterface<State> = {
    executionRequired: jest.fn().mockReturnValue(false),
    execute: jest.fn()
  }
  const MigratorManager = createMigratorManagerComponent(migrator)
  const setState = jest.fn()

  const renderer = TestRenderer.create(
    <MigratorManager
      state={{ items: [1, 2, 3] }}
      setState={setState}
      migrating={<Text>Migrating</Text>}
      ready={<Text>Ready</Text>}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Ready'
      })
    })
  )

  renderer.unmount()

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  expect(setState).not.toHaveBeenCalled()
  expect(migrator.executionRequired).toHaveBeenCalledTimes(1)
  expect(migrator.executionRequired).toHaveBeenCalledWith({ items: [1, 2, 3] })
  expect(migrator.execute).not.toHaveBeenCalled()
})
