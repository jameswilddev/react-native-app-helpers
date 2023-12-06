import * as React from 'react'
import { useRefresh } from '../../hooks/useRefresh'
import type { FileStoreInterface } from '../../..'

/**
 * Creates a React component which automatically manages a file store, loading
 * it and unloading it as appropriate.
 *
 * A re-render will be triggered automatically when the store loads.
 * @param fileStore The file store.  This must not yet be loaded.
 * @returns         A React component which automatically manages the file
 *                  store, loading it and unloading it as appropriate.
 */
export const createFileStoreManagerComponent = (
  fileStore: FileStoreInterface
): React.FunctionComponent<{
  /**
   * The name of the current subdirectory, or null if one should not be loaded.
   */
  readonly subdirectoryName: null | string

  /**
   * A React element to display when nothing is to be loaded.
   */
  readonly unloaded: null | JSX.Element

  /**
   * A React element to display when loading is in progress.
   */
  readonly loading: null | JSX.Element

  /**
   * A React element to display when loading has completed.
   */
  readonly ready: null | JSX.Element

  /**
   * A React element to display when unloading is in progress.
   */
  readonly unloading: null | JSX.Element
}> => {
  return ({ subdirectoryName, unloaded, loading, ready, unloading }) => {
    const state = React.useRef<
    | { readonly type: 'unloaded' }
    | { readonly type: 'loading', readonly subdirectoryName: string }
    | { readonly type: 'ready', readonly key: string }
    >({ type: 'unloaded' })

    const unmounting = React.useRef(false)

    const refresh = useRefresh()

    const migrateState = async (
      forSubdirectoryName: null | string
    ): Promise<void> => {
      switch (state.current.type) {
        case 'unloaded':
          if (forSubdirectoryName !== null) {
            state.current = {
              type: 'loading',
              subdirectoryName: forSubdirectoryName
            }
            refresh()

            await fileStore.load(forSubdirectoryName)

            if (unmounting.current) {
              fileStore.unload()
            } else {
              state.current = { type: 'ready', key: forSubdirectoryName }
              refresh()
            }
          }
          break

        case 'ready':
          if (forSubdirectoryName !== state.current.key) {
            fileStore.unload()

            state.current = { type: 'unloaded' }
            refresh()
          }
          break
      }
    }

    React.useEffect(() => {
      void migrateState(subdirectoryName)
    })

    React.useEffect(() => {
      return () => {
        switch (state.current.type) {
          case 'loading':
            unmounting.current = true
            break

          case 'ready':
            fileStore.unload()
            break
        }
      }
    }, [])

    switch (state.current.type) {
      case 'unloaded':
        if (subdirectoryName === null) {
          return unloaded
        } else {
          return loading
        }

      case 'loading':
        if (subdirectoryName === state.current.subdirectoryName) {
          return loading
        } else {
          return unloading
        }

      case 'ready':
        if (subdirectoryName === state.current.key) {
          return ready
        } else {
          return unloading
        }
    }
  }
}
