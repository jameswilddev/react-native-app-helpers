import { randomUUID } from 'crypto'
import * as React from 'react'
import { Button, Text } from 'react-native'
import * as TestRenderer from 'react-test-renderer'
import { createSessionStoreManagerComponent, SessionStore } from '../../..'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TestSession = { readonly value: number }

test('displays the loading screen', async () => {
  const sessionStore = new SessionStore<TestSession>({ value: 5 }, randomUUID().toLowerCase())
  const SessionStoreManager = createSessionStoreManagerComponent(sessionStore)

  const renderer = TestRenderer.create(
    <SessionStoreManager
      loading={<Text>Loading</Text>}
      ready={(session, setSession) => (
        <Button
          title={`Session contains ${session.value}`}
          onPress={() => {
            setSession({ value: session.value + 1 })
          }}
        />
      )}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Loading'
      })
    })
  )

  renderer.unmount()

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  await sessionStore.load()
  expect(sessionStore.get()).toEqual({ value: 5 })
  await sessionStore.unload()
})

test('shows the ready screen once given time to load', async () => {
  const sessionStore = new SessionStore<TestSession>({ value: 5 }, randomUUID().toLowerCase())
  const SessionStoreManager = createSessionStoreManagerComponent(sessionStore)

  const renderer = TestRenderer.create(
    <SessionStoreManager
      loading={<Text>Loading</Text>}
      ready={(session, setSession) => (
        <Button
          title={`Session contains ${session.value}`}
          onPress={() => {
            setSession({ value: session.value + 1 })
          }}
        />
      )}
    />
  )

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        title: 'Session contains 5'
      })
    })
  )

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 250))

  await sessionStore.load()
  expect(sessionStore.get()).toEqual({ value: 5 })
  await sessionStore.unload()
})

test('re-renders when the session is changed externally once', async () => {
  const sessionStore = new SessionStore<TestSession>({ value: 5 }, randomUUID().toLowerCase())
  const SessionStoreManager = createSessionStoreManagerComponent(sessionStore)

  const renderer = TestRenderer.create(
    <SessionStoreManager
      loading={<Text>Loading</Text>}
      ready={(session, setSession) => (
        <Button
          title={`Session contains ${session.value}`}
          onPress={() => {
            setSession({ value: session.value + 1 })
          }}
        />
      )}
    />
  )

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
    sessionStore.set({ value: 6 })
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        title: 'Session contains 6'
      })
    })
  )

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 250))

  await sessionStore.load()
  expect(sessionStore.get()).toEqual({ value: 6 })
  await sessionStore.unload()
})

test('re-renders when the session is changed externally twice', async () => {
  const sessionStore = new SessionStore<TestSession>({ value: 5 }, randomUUID().toLowerCase())
  const SessionStoreManager = createSessionStoreManagerComponent(sessionStore)

  const renderer = TestRenderer.create(
    <SessionStoreManager
      loading={<Text>Loading</Text>}
      ready={(session, setSession) => (
        <Button
          title={`Session contains ${session.value}`}
          onPress={() => {
            setSession({ value: session.value + 1 })
          }}
        />
      )}
    />
  )

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
    sessionStore.set({ value: 6 })
    sessionStore.set({ value: 7 })
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        title: 'Session contains 7'
      })
    })
  )

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 250))

  await sessionStore.load()
  expect(sessionStore.get()).toEqual({ value: 7 })
  await sessionStore.unload()
})

test('re-renders when the session is changed internally once', async () => {
  const sessionStore = new SessionStore<TestSession>({ value: 5 }, randomUUID().toLowerCase())
  const SessionStoreManager = createSessionStoreManagerComponent(sessionStore)

  const renderer = TestRenderer.create(
    <SessionStoreManager
      loading={<Text>Loading</Text>}
      ready={(session, setSession) => (
        <Button
          title={`Session contains ${session.value}`}
          onPress={() => {
            setSession({ value: session.value + 1 })
          }}
        />
      )}
    />
  )

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        title: 'Session contains 6'
      })
    })
  )

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 250))

  await sessionStore.load()
  expect(sessionStore.get()).toEqual({ value: 6 })
  await sessionStore.unload()
})

test('re-renders when the session is changed internally twice', async () => {
  const sessionStore = new SessionStore<TestSession>({ value: 5 }, randomUUID().toLowerCase())
  const SessionStoreManager = createSessionStoreManagerComponent(sessionStore)

  const renderer = TestRenderer.create(
    <SessionStoreManager
      loading={<Text>Loading</Text>}
      ready={(session, setSession) => (
        <Button
          title={`Session contains ${session.value}`}
          onPress={() => {
            setSession({ value: session.value + 1 })
          }}
        />
      )}
    />
  )

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]();
    (renderer.toTree()?.rendered as TestRenderer.ReactTestRendererTree).props[
      'onPress'
    ]()
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        title: 'Session contains 7'
      })
    })
  )

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 250))

  await sessionStore.load()
  expect(sessionStore.get()).toEqual({ value: 7 })
  await sessionStore.unload()
})
