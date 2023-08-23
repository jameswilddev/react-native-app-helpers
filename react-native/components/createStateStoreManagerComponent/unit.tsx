import { randomUUID } from 'crypto'
import * as React from 'react'
import { Button, Text } from 'react-native'
import * as TestRenderer from 'react-test-renderer'
import { createStateStoreManagerComponent, StateStore } from '../../..'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TestState = { readonly value: number }

test('displays the loading screen', async () => {
  const stateKey = randomUUID()
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={stateKey}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Loading</Text>}
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

  await stateStore.load(stateKey)
  expect(stateStore.get()).toEqual({ value: 5 })
  await stateStore.unload()
})

test('shows the ready screen once given time to load', async () => {
  const stateKey = randomUUID()
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={stateKey}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Unloading</Text>}
    />
  )

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        title: 'State contains 5'
      })
    })
  )

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 250))

  await stateStore.load(stateKey)
  expect(stateStore.get()).toEqual({ value: 5 })
  await stateStore.unload()
})

test('re-renders when the state is changed externally once', async () => {
  const stateKey = randomUUID()
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={stateKey}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Unloading</Text>}
    />
  )

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
    stateStore.set({ value: 6 })
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        title: 'State contains 6'
      })
    })
  )

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 250))

  await stateStore.load(stateKey)
  expect(stateStore.get()).toEqual({ value: 6 })
  await stateStore.unload()
})

test('re-renders when the state is changed externally twice', async () => {
  const stateKey = randomUUID()
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={stateKey}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Unloading</Text>}
    />
  )

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
    stateStore.set({ value: 6 })
    stateStore.set({ value: 7 })
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        title: 'State contains 7'
      })
    })
  )

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 250))

  await stateStore.load(stateKey)
  expect(stateStore.get()).toEqual({ value: 7 })
  await stateStore.unload()
})

test('re-renders when the state is changed internally once', async () => {
  const stateKey = randomUUID()
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={stateKey}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Unloading</Text>}
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
        title: 'State contains 6'
      })
    })
  )

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 250))

  await stateStore.load(stateKey)
  expect(stateStore.get()).toEqual({ value: 6 })
  await stateStore.unload()
})

test('re-renders when the state is changed internally twice', async () => {
  const stateKey = randomUUID()
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={stateKey}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Unloading</Text>}
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
        title: 'State contains 7'
      })
    })
  )

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 250))

  await stateStore.load(stateKey)
  expect(stateStore.get()).toEqual({ value: 7 })
  await stateStore.unload()
})

test('does not try to load without a key', async () => {
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={null}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Loading</Text>}
    />
  )

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Unloaded'
      })
    })
  )

  renderer.unmount()
})

test('starts unloading when the state key changes to null during loading', async () => {
  const stateKey = randomUUID()
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={stateKey}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Loading</Text>}
    />
  )

  void TestRenderer.act(() => {
    renderer.update(
      <StateStoreManager
        stateKey={null}
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={(state, setState) => (
          <Button
            title={`State contains ${state.value}`}
            onPress={() => {
              setState({ value: state.value + 1 })
            }}
          />
        )}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Unloading'
      })
    })
  )

  renderer.unmount()

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  await stateStore.load(stateKey)
  expect(stateStore.get()).toEqual({ value: 5 })
  await stateStore.unload()
})

test('fully unloads when the state key changes to null during loading', async () => {
  const stateKey = randomUUID()
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={stateKey}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Loading</Text>}
    />
  )

  void TestRenderer.act(() => {
    renderer.update(
      <StateStoreManager
        stateKey={null}
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={(state, setState) => (
          <Button
            title={`State contains ${state.value}`}
            onPress={() => {
              setState({ value: state.value + 1 })
            }}
          />
        )}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Unloaded'
      })
    })
  )

  renderer.unmount()

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  await stateStore.load(stateKey)
  expect(stateStore.get()).toEqual({ value: 5 })
  await stateStore.unload()
})

test('starts unloading when the state key changes to null after loading', async () => {
  const stateKey = randomUUID()
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={stateKey}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Loading</Text>}
    />
  )

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  void TestRenderer.act(() => {
    renderer.update(
      <StateStoreManager
        stateKey={null}
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={(state, setState) => (
          <Button
            title={`State contains ${state.value}`}
            onPress={() => {
              setState({ value: state.value + 1 })
            }}
          />
        )}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Unloading'
      })
    })
  )

  renderer.unmount()

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  await stateStore.load(stateKey)
  expect(stateStore.get()).toEqual({ value: 5 })
  await stateStore.unload()
})

test('fully unloads when the state key changes to null after loading', async () => {
  const stateKey = randomUUID()
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={stateKey}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Loading</Text>}
    />
  )

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  void TestRenderer.act(() => {
    renderer.update(
      <StateStoreManager
        stateKey={null}
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={(state, setState) => (
          <Button
            title={`State contains ${state.value}`}
            onPress={() => {
              setState({ value: state.value + 1 })
            }}
          />
        )}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Unloaded'
      })
    })
  )

  renderer.unmount()

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  await stateStore.load(stateKey)
  expect(stateStore.get()).toEqual({ value: 5 })
  await stateStore.unload()
})

test('starts reloading when the state key changes to another value during loading', async () => {
  const stateKeyA = randomUUID()
  const stateKeyB = randomUUID()
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  await stateStore.load(stateKeyB)
  stateStore.set({ value: 10 })
  await stateStore.unload()
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={stateKeyA}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Loading</Text>}
    />
  )

  void TestRenderer.act(() => {
    renderer.update(
      <StateStoreManager
        stateKey={stateKeyB}
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={(state, setState) => (
          <Button
            title={`State contains ${state.value}`}
            onPress={() => {
              setState({ value: state.value + 1 })
            }}
          />
        )}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Unloading'
      })
    })
  )

  renderer.unmount()

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  await stateStore.load(stateKeyA)
  expect(stateStore.get()).toEqual({ value: 5 })
  await stateStore.unload()

  await stateStore.load(stateKeyB)
  expect(stateStore.get()).toEqual({ value: 10 })
  await stateStore.unload()
})

test('fully reloads when the state key changes to another value during loading', async () => {
  const stateKeyA = randomUUID()
  const stateKeyB = randomUUID()
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  await stateStore.load(stateKeyB)
  stateStore.set({ value: 10 })
  await stateStore.unload()
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={stateKeyA}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Loading</Text>}
    />
  )

  void TestRenderer.act(() => {
    renderer.update(
      <StateStoreManager
        stateKey={stateKeyB}
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={(state, setState) => (
          <Button
            title={`State contains ${state.value}`}
            onPress={() => {
              setState({ value: state.value + 1 })
            }}
          />
        )}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        title: 'State contains 10'
      })
    })
  )

  renderer.unmount()

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  await stateStore.load(stateKeyA)
  expect(stateStore.get()).toEqual({ value: 5 })
  await stateStore.unload()

  await stateStore.load(stateKeyB)
  expect(stateStore.get()).toEqual({ value: 10 })
  await stateStore.unload()
})

test('starts reloading when the state key changes to another value after loading', async () => {
  const stateKeyA = randomUUID()
  const stateKeyB = randomUUID()
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  await stateStore.load(stateKeyB)
  stateStore.set({ value: 10 })
  await stateStore.unload()
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={stateKeyA}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Loading</Text>}
    />
  )

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  void TestRenderer.act(() => {
    renderer.update(
      <StateStoreManager
        stateKey={stateKeyB}
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={(state, setState) => (
          <Button
            title={`State contains ${state.value}`}
            onPress={() => {
              setState({ value: state.value + 1 })
            }}
          />
        )}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Unloading'
      })
    })
  )

  renderer.unmount()

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  await stateStore.load(stateKeyA)
  expect(stateStore.get()).toEqual({ value: 5 })
  await stateStore.unload()

  await stateStore.load(stateKeyB)
  expect(stateStore.get()).toEqual({ value: 10 })
  await stateStore.unload()
})

test('fully reloads when the state key changes to another value after loading', async () => {
  const stateKeyA = randomUUID()
  const stateKeyB = randomUUID()
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  await stateStore.load(stateKeyB)
  stateStore.set({ value: 10 })
  await stateStore.unload()
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={stateKeyA}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Loading</Text>}
    />
  )

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  void TestRenderer.act(() => {
    renderer.update(
      <StateStoreManager
        stateKey={stateKeyB}
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={(state, setState) => (
          <Button
            title={`State contains ${state.value}`}
            onPress={() => {
              setState({ value: state.value + 1 })
            }}
          />
        )}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        title: 'State contains 10'
      })
    })
  )

  renderer.unmount()

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  await stateStore.load(stateKeyA)
  expect(stateStore.get()).toEqual({ value: 5 })
  await stateStore.unload()

  await stateStore.load(stateKeyB)
  expect(stateStore.get()).toEqual({ value: 10 })
  await stateStore.unload()
})

test('displays the loading screen from null', async () => {
  const stateKey = randomUUID()
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={null}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Loading</Text>}
    />
  )

  void TestRenderer.act(() => {
    renderer.update(
      <StateStoreManager
        stateKey={stateKey}
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={(state, setState) => (
          <Button
            title={`State contains ${state.value}`}
            onPress={() => {
              setState({ value: state.value + 1 })
            }}
          />
        )}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

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

  await stateStore.load(stateKey)
  expect(stateStore.get()).toEqual({ value: 5 })
  await stateStore.unload()
})

test('shows the ready screen once given time to load from null', async () => {
  const stateKey = randomUUID()
  const stateStore = new StateStore<TestState>({ value: 5 }, 'Test Version A')
  const StateStoreManager = createStateStoreManagerComponent(stateStore)

  const renderer = TestRenderer.create(
    <StateStoreManager
      stateKey={null}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={(state, setState) => (
        <Button
          title={`State contains ${state.value}`}
          onPress={() => {
            setState({ value: state.value + 1 })
          }}
        />
      )}
      unloading={<Text>Unloading</Text>}
    />
  )

  void TestRenderer.act(() => {
    renderer.update(
      <StateStoreManager
        stateKey={stateKey}
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={(state, setState) => (
          <Button
            title={`State contains ${state.value}`}
            onPress={() => {
              setState({ value: state.value + 1 })
            }}
          />
        )}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        title: 'State contains 5'
      })
    })
  )

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 250))

  await stateStore.load(stateKey)
  expect(stateStore.get()).toEqual({ value: 5 })
  await stateStore.unload()
})
