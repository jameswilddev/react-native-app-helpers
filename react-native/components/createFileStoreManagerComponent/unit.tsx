import * as React from 'react'
import { Text } from 'react-native'
import * as TestRenderer from 'react-test-renderer'
import { createFileStoreManagerComponent, type FileStoreInterface } from '../../..'

test('displays the loading screen', async () => {
  const load = jest.fn().mockReturnValue(
    new Promise<void>(() => {
      // Empty.
    })
  )
  const _delete = jest.fn()
  const list = jest.fn()
  const generatePath = jest.fn()
  const unload = jest.fn()
  const _import = jest.fn()
  const fileStore: FileStoreInterface = {
    load,
    delete: _delete,
    list,
    generatePath,
    unload,
    import: _import
  }
  const FileStoreManager = createFileStoreManagerComponent(fileStore)

  const renderer = TestRenderer.create(
    <FileStoreManager
      subdirectoryName="Example Subdirectory Name"
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
    />
  )

  await TestRenderer.act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 250))
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Loading'
      })
    })
  )

  expect(load).toBeCalledTimes(1)
  expect(load).toBeCalledWith('Example Subdirectory Name')
  expect(_delete).not.toHaveBeenCalled()
  expect(list).not.toHaveBeenCalled()
  expect(generatePath).not.toHaveBeenCalled()
  expect(unload).not.toHaveBeenCalled()
  expect(_import).not.toHaveBeenCalled()

  renderer.unmount()
})

test('shows the ready screen once given time to load', async () => {
  const load = jest.fn(async () => {
    // Empty.
  })
  const _delete = jest.fn()
  const list = jest.fn()
  const generatePath = jest.fn()
  const unload = jest.fn()
  const _import = jest.fn()
  const fileStore: FileStoreInterface = {
    load,
    delete: _delete,
    list,
    generatePath,
    unload,
    import: _import
  }
  const FileStoreManager = createFileStoreManagerComponent(fileStore)

  const renderer = TestRenderer.create(
    <FileStoreManager
      subdirectoryName="Example Subdirectory Name"
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
    />
  )

  await new Promise((resolve) => setTimeout(resolve, 250))

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Ready'
      })
    })
  )

  expect(load).toBeCalledTimes(1)
  expect(load).toBeCalledWith('Example Subdirectory Name')
  expect(_delete).not.toHaveBeenCalled()
  expect(list).not.toHaveBeenCalled()
  expect(generatePath).not.toHaveBeenCalled()
  expect(unload).not.toHaveBeenCalled()
  expect(_import).not.toHaveBeenCalled()

  renderer.unmount()
})

test('does not try to load without a key', async () => {
  const load = jest.fn()
  const _delete = jest.fn()
  const list = jest.fn()
  const generatePath = jest.fn()
  const unload = jest.fn()
  const _import = jest.fn()
  const fileStore: FileStoreInterface = {
    load,
    delete: _delete,
    list,
    generatePath,
    unload,
    import: _import
  }
  const FileStoreManager = createFileStoreManagerComponent(fileStore)

  const renderer = TestRenderer.create(
    <FileStoreManager
      subdirectoryName={null}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
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

  expect(load).not.toHaveBeenCalled()
  expect(_delete).not.toHaveBeenCalled()
  expect(list).not.toHaveBeenCalled()
  expect(generatePath).not.toHaveBeenCalled()
  expect(unload).not.toHaveBeenCalled()
  expect(_import).not.toHaveBeenCalled()

  renderer.unmount()
})

test('does nothing when the subdirectory name changes to null during loading', async () => {
  const load = jest.fn().mockReturnValue(
    new Promise<void>(() => {
      // Empty.
    })
  )
  const _delete = jest.fn()
  const list = jest.fn()
  const generatePath = jest.fn()
  const unload = jest.fn()
  const _import = jest.fn()
  const fileStore: FileStoreInterface = {
    load,
    delete: _delete,
    list,
    generatePath,
    unload,
    import: _import
  }
  const FileStoreManager = createFileStoreManagerComponent(fileStore)

  const renderer = TestRenderer.create(
    <FileStoreManager
      subdirectoryName="Example Subdirectory Name"
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
    />
  )

  await TestRenderer.act(() => {
    renderer.update(
      <FileStoreManager
        subdirectoryName={null}
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={<Text>Ready</Text>}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 250)
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Unloading'
      })
    })
  )

  expect(load).toBeCalledTimes(1)
  expect(load).toBeCalledWith('Example Subdirectory Name')
  expect(_delete).not.toHaveBeenCalled()
  expect(list).not.toHaveBeenCalled()
  expect(generatePath).not.toHaveBeenCalled()
  expect(unload).not.toHaveBeenCalled()
  expect(_import).not.toHaveBeenCalled()

  renderer.unmount()
})

test('unloads when the subdirectory name changes to null and loading completes', async () => {
  let resolve: () => void
  const load = jest.fn(
    async () => {
      await new Promise<void>((_resolve) => {
        resolve = _resolve
      })
    }
  )
  const _delete = jest.fn()
  const list = jest.fn()
  const generatePath = jest.fn()
  const unload = jest.fn()
  const _import = jest.fn()
  const fileStore: FileStoreInterface = {
    load,
    delete: _delete,
    list,
    generatePath,
    unload,
    import: _import
  }
  const FileStoreManager = createFileStoreManagerComponent(fileStore)

  const renderer = TestRenderer.create(
    <FileStoreManager
      subdirectoryName="Example Subdirectory Name"
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
    />
  )

  await TestRenderer.act(() => {
    renderer.update(
      <FileStoreManager
        subdirectoryName={null}
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={<Text>Ready</Text>}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 250)
  })

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  resolve!()

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 250)
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Unloaded'
      })
    })
  )

  expect(load).toBeCalledTimes(1)
  expect(load).toBeCalledWith('Example Subdirectory Name')
  expect(_delete).not.toHaveBeenCalled()
  expect(list).not.toHaveBeenCalled()
  expect(generatePath).not.toHaveBeenCalled()
  expect(unload).toBeCalledTimes(1)
  expect(_import).not.toHaveBeenCalled()

  renderer.unmount()
})

test('unloads when loading completes and the subdirectory name changes to null', async () => {
  const load = jest.fn(async () => {
    // Empty.
  })
  const _delete = jest.fn()
  const list = jest.fn()
  const generatePath = jest.fn()
  const unload = jest.fn()
  const _import = jest.fn()
  const fileStore: FileStoreInterface = {
    load,
    delete: _delete,
    list,
    generatePath,
    unload,
    import: _import
  }
  const FileStoreManager = createFileStoreManagerComponent(fileStore)

  const renderer = TestRenderer.create(
    <FileStoreManager
      subdirectoryName="Example Subdirectory Name"
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
    />
  )

  await TestRenderer.act(() => {
    renderer.update(
      <FileStoreManager
        subdirectoryName={null}
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={<Text>Ready</Text>}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 250)
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Unloaded'
      })
    })
  )

  expect(load).toBeCalledTimes(1)
  expect(load).toBeCalledWith('Example Subdirectory Name')
  expect(_delete).not.toHaveBeenCalled()
  expect(list).not.toHaveBeenCalled()
  expect(generatePath).not.toHaveBeenCalled()
  expect(unload).toBeCalledTimes(1)
  expect(_import).not.toHaveBeenCalled()

  renderer.unmount()
})

test('does nothing when the subdirectory name changes during loading', async () => {
  const load = jest.fn().mockReturnValue(
    new Promise<void>(() => {
      // Empty.
    })
  )
  const _delete = jest.fn()
  const list = jest.fn()
  const generatePath = jest.fn()
  const unload = jest.fn()
  const _import = jest.fn()
  const fileStore: FileStoreInterface = {
    load,
    delete: _delete,
    list,
    generatePath,
    unload,
    import: _import
  }
  const FileStoreManager = createFileStoreManagerComponent(fileStore)

  const renderer = TestRenderer.create(
    <FileStoreManager
      subdirectoryName="Example Subdirectory Name A"
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
    />
  )

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 250)
  })

  await TestRenderer.act(() => {
    renderer.update(
      <FileStoreManager
        subdirectoryName="Example Subdirectory Name B"
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={<Text>Ready</Text>}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 250)
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Unloading'
      })
    })
  )

  expect(load).toBeCalledTimes(1)
  expect(load).toBeCalledWith('Example Subdirectory Name A')
  expect(_delete).not.toHaveBeenCalled()
  expect(list).not.toHaveBeenCalled()
  expect(generatePath).not.toHaveBeenCalled()
  expect(unload).not.toHaveBeenCalled()
  expect(_import).not.toHaveBeenCalled()

  renderer.unmount()
})

test('unloads and starts loading again when the subdirectory name changes and loading completes', async () => {
  let resolve: () => void
  const load = jest.fn(
    async () => {
      await new Promise<void>((_resolve) => {
        resolve = _resolve
      })
    }
  )
  const _delete = jest.fn()
  const list = jest.fn()
  const generatePath = jest.fn()
  const unload = jest.fn()
  const _import = jest.fn()
  const fileStore: FileStoreInterface = {
    load,
    delete: _delete,
    list,
    generatePath,
    unload,
    import: _import
  }
  const FileStoreManager = createFileStoreManagerComponent(fileStore)

  const renderer = TestRenderer.create(
    <FileStoreManager
      subdirectoryName="Example Subdirectory Name A"
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
    />
  )

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 250)
  })

  await TestRenderer.act(() => {
    renderer.update(
      <FileStoreManager
        subdirectoryName="Example Subdirectory Name B"
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={<Text>Ready</Text>}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 250)
  })

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  resolve!()

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 250)
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Loading'
      })
    })
  )

  expect(load).toBeCalledTimes(2)
  expect(load).toBeCalledWith('Example Subdirectory Name A')
  expect(load).toBeCalledWith('Example Subdirectory Name B')
  expect(_delete).not.toHaveBeenCalled()
  expect(list).not.toHaveBeenCalled()
  expect(generatePath).not.toHaveBeenCalled()
  expect(unload).toBeCalledTimes(1)
  expect(_import).not.toHaveBeenCalled()

  // TODO: call order load -> unload -> load

  renderer.unmount()
})

test('unloads and starts loading again when loading completes and the subdirectory name changes', async () => {
  let resolve: () => void
  const load = jest.fn(
    async () => {
      await new Promise<void>((_resolve) => {
        resolve = _resolve
      })
    }
  )
  const _delete = jest.fn()
  const list = jest.fn()
  const generatePath = jest.fn()
  const unload = jest.fn()
  const _import = jest.fn()
  const fileStore: FileStoreInterface = {
    load,
    delete: _delete,
    list,
    generatePath,
    unload,
    import: _import
  }
  const FileStoreManager = createFileStoreManagerComponent(fileStore)

  const renderer = TestRenderer.create(
    <FileStoreManager
      subdirectoryName="Example Subdirectory Name A"
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
    />
  )

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 250)
  })

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  resolve!()

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 250)
  })

  await TestRenderer.act(() => {
    renderer.update(
      <FileStoreManager
        subdirectoryName="Example Subdirectory Name B"
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={<Text>Ready</Text>}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 250)
  })

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Loading'
      })
    })
  )

  expect(load).toBeCalledTimes(2)
  expect(load).toBeCalledWith('Example Subdirectory Name A')
  expect(load).toBeCalledWith('Example Subdirectory Name B')
  expect(_delete).not.toHaveBeenCalled()
  expect(list).not.toHaveBeenCalled()
  expect(generatePath).not.toHaveBeenCalled()
  expect(unload).toBeCalledTimes(1)
  expect(_import).not.toHaveBeenCalled()

  // TODO: call order load -> unload -> load

  renderer.unmount()
})

test('displays the loading screen from null', async () => {
  const load = jest.fn().mockReturnValue(
    new Promise<void>(() => {
      // Empty.
    })
  )
  const _delete = jest.fn()
  const list = jest.fn()
  const generatePath = jest.fn()
  const unload = jest.fn()
  const _import = jest.fn()
  const fileStore: FileStoreInterface = {
    load,
    delete: _delete,
    list,
    generatePath,
    unload,
    import: _import
  }
  const FileStoreManager = createFileStoreManagerComponent(fileStore)

  const renderer = TestRenderer.create(
    <FileStoreManager
      subdirectoryName={null}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
    />
  )

  await new Promise((resolve) => setTimeout(resolve, 250))

  await TestRenderer.act(() => {
    renderer.update(
      <FileStoreManager
        subdirectoryName="Example Subdirectory Name"
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={<Text>Ready</Text>}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  await new Promise((resolve) => setTimeout(resolve, 250))

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Loading'
      })
    })
  )

  expect(load).toBeCalledTimes(1)
  expect(load).toBeCalledWith('Example Subdirectory Name')
  expect(_delete).not.toHaveBeenCalled()
  expect(list).not.toHaveBeenCalled()
  expect(generatePath).not.toHaveBeenCalled()
  expect(unload).not.toHaveBeenCalled()
  expect(_import).not.toHaveBeenCalled()

  renderer.unmount()
})

test('shows the ready screen once given time to load from null', async () => {
  const load = jest.fn(async () => {
    // Empty.
  })
  const _delete = jest.fn()
  const list = jest.fn()
  const generatePath = jest.fn()
  const unload = jest.fn()
  const _import = jest.fn()
  const fileStore: FileStoreInterface = {
    load,
    delete: _delete,
    list,
    generatePath,
    unload,
    import: _import
  }
  const FileStoreManager = createFileStoreManagerComponent(fileStore)

  const renderer = TestRenderer.create(
    <FileStoreManager
      subdirectoryName={null}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
    />
  )

  await new Promise((resolve) => setTimeout(resolve, 250))

  await TestRenderer.act(() => {
    renderer.update(
      <FileStoreManager
        subdirectoryName="Example Subdirectory Name"
        unloaded={<Text>Unloaded</Text>}
        loading={<Text>Loading</Text>}
        ready={<Text>Ready</Text>}
        unloading={<Text>Unloading</Text>}
      />
    )
  })

  await new Promise((resolve) => setTimeout(resolve, 250))

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      props: expect.objectContaining({
        children: 'Ready'
      })
    })
  )

  expect(load).toBeCalledTimes(1)
  expect(load).toBeCalledWith('Example Subdirectory Name')
  expect(_delete).not.toHaveBeenCalled()
  expect(list).not.toHaveBeenCalled()
  expect(generatePath).not.toHaveBeenCalled()
  expect(unload).not.toHaveBeenCalled()
  expect(_import).not.toHaveBeenCalled()

  renderer.unmount()
})

test('does nothing when the component unmounts when unloaded', async () => {
  const load = jest.fn()
  const _delete = jest.fn()
  const list = jest.fn()
  const generatePath = jest.fn()
  const unload = jest.fn()
  const _import = jest.fn()
  const fileStore: FileStoreInterface = {
    load,
    delete: _delete,
    list,
    generatePath,
    unload,
    import: _import
  }
  const FileStoreManager = createFileStoreManagerComponent(fileStore)

  const renderer = TestRenderer.create(
    <FileStoreManager
      subdirectoryName={null}
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
    />
  )

  await new Promise((resolve) => setTimeout(resolve, 250))

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 250))

  expect(load).not.toHaveBeenCalled()
  expect(_delete).not.toHaveBeenCalled()
  expect(list).not.toHaveBeenCalled()
  expect(generatePath).not.toHaveBeenCalled()
  expect(unload).not.toHaveBeenCalled()
  expect(_import).not.toHaveBeenCalled()

  renderer.unmount()
})

test('does nothing when the component unmounts during loading', async () => {
  const load = jest.fn().mockReturnValue(
    new Promise(() => {
      // Empty.
    })
  )
  const _delete = jest.fn()
  const list = jest.fn()
  const generatePath = jest.fn()
  const unload = jest.fn()
  const _import = jest.fn()
  const fileStore: FileStoreInterface = {
    load,
    delete: _delete,
    list,
    generatePath,
    unload,
    import: _import
  }
  const FileStoreManager = createFileStoreManagerComponent(fileStore)

  const renderer = TestRenderer.create(
    <FileStoreManager
      subdirectoryName="Example Subdirectory Name"
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
    />
  )

  await new Promise((resolve) => setTimeout(resolve, 250))

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 250))

  expect(load).toBeCalledTimes(1)
  expect(load).toBeCalledWith('Example Subdirectory Name')
  expect(_delete).not.toHaveBeenCalled()
  expect(list).not.toHaveBeenCalled()
  expect(generatePath).not.toHaveBeenCalled()
  expect(unload).not.toHaveBeenCalled()
  expect(_import).not.toHaveBeenCalled()

  renderer.unmount()
})

test('unloads when the component finishes loading following unmount', async () => {
  let resolve: () => void
  const load = jest.fn(
    async () => {
      await new Promise<void>((_resolve) => {
        resolve = _resolve
      })
    }
  )
  const _delete = jest.fn()
  const list = jest.fn()
  const generatePath = jest.fn()
  const unload = jest.fn()
  const _import = jest.fn()
  const fileStore: FileStoreInterface = {
    load,
    delete: _delete,
    list,
    generatePath,
    unload,
    import: _import
  }
  const FileStoreManager = createFileStoreManagerComponent(fileStore)

  const renderer = TestRenderer.create(
    <FileStoreManager
      subdirectoryName="Example Subdirectory Name"
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
    />
  )

  await new Promise((resolve) => setTimeout(resolve, 250))

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 250))

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  resolve!()

  await new Promise((resolve) => setTimeout(resolve, 250))

  expect(load).toBeCalledTimes(1)
  expect(load).toBeCalledWith('Example Subdirectory Name')
  expect(_delete).not.toHaveBeenCalled()
  expect(list).not.toHaveBeenCalled()
  expect(generatePath).not.toHaveBeenCalled()
  expect(unload).toBeCalledTimes(1)
  expect(_import).not.toHaveBeenCalled()

  renderer.unmount()
})

test('unloads when the component finishes loading following subdirectory name change and unmount', async () => {
  let resolve: () => void
  const load = jest.fn(
    async () => {
      await new Promise<void>((_resolve) => {
        resolve = _resolve
      })
    }
  )
  const _delete = jest.fn()
  const list = jest.fn()
  const generatePath = jest.fn()
  const unload = jest.fn()
  const _import = jest.fn()
  const fileStore: FileStoreInterface = {
    load,
    delete: _delete,
    list,
    generatePath,
    unload,
    import: _import
  }
  const FileStoreManager = createFileStoreManagerComponent(fileStore)

  const renderer = TestRenderer.create(
    <FileStoreManager
      subdirectoryName="Example Subdirectory Name A"
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
    />
  )

  await new Promise((resolve) => setTimeout(resolve, 250))

  renderer.update(
    <FileStoreManager
      subdirectoryName="Example Subdirectory Name B"
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
    />
  )

  await new Promise((resolve) => setTimeout(resolve, 250))

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 250))

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  resolve!()

  await new Promise((resolve) => setTimeout(resolve, 250))

  expect(load).toBeCalledTimes(1)
  expect(load).toBeCalledWith('Example Subdirectory Name A')
  expect(_delete).not.toHaveBeenCalled()
  expect(list).not.toHaveBeenCalled()
  expect(generatePath).not.toHaveBeenCalled()
  expect(unload).toBeCalledTimes(1)
  expect(_import).not.toHaveBeenCalled()

  renderer.unmount()
})

test('unloads when the component unmounts when ready', async () => {
  const load = jest.fn(async () => {
    // Empty.
  })
  const _delete = jest.fn()
  const list = jest.fn()
  const generatePath = jest.fn()
  const unload = jest.fn()
  const _import = jest.fn()
  const fileStore: FileStoreInterface = {
    load,
    delete: _delete,
    list,
    generatePath,
    unload,
    import: _import
  }
  const FileStoreManager = createFileStoreManagerComponent(fileStore)

  const renderer = TestRenderer.create(
    <FileStoreManager
      subdirectoryName="Example Subdirectory Name"
      unloaded={<Text>Unloaded</Text>}
      loading={<Text>Loading</Text>}
      ready={<Text>Ready</Text>}
      unloading={<Text>Unloading</Text>}
    />
  )

  await new Promise((resolve) => setTimeout(resolve, 250))

  renderer.unmount()

  await new Promise((resolve) => setTimeout(resolve, 250))

  expect(load).toBeCalledTimes(1)
  expect(load).toBeCalledWith('Example Subdirectory Name')
  expect(_delete).not.toHaveBeenCalled()
  expect(list).not.toHaveBeenCalled()
  expect(generatePath).not.toHaveBeenCalled()
  expect(unload).toBeCalledTimes(1)
  expect(_import).not.toHaveBeenCalled()

  renderer.unmount()
})
