import * as React from 'react'
import { useRefresh } from '../../hooks/useRefresh'
import { useEventRefresh } from '../../hooks/useEventRefresh'
import type { StateStore } from '../../services/StateStore'
import type { Json } from '../../types/Json'

/**
 * Creates a React component which automatically manages a state store, loading
 * it and unloading it as appropriate and passing its content down to its props.
 *
 * A re-render will be triggered automatically should the store's content
 * change.
 * @template T       The type of state maintained by the state store.
 * @param stateStore The state store.  This must not yet be loaded.
 * @returns          A React component which automatically manages the state
 *                   store, loading it and unloading it as appropriate and
 *                   passing its content down to its props.
 */
export const createStateStoreManagerComponent = <T extends Json>(
  stateStore: StateStore<T>
): React.FunctionComponent<{
    readonly stateKey: null | string
    readonly unloaded: null | JSX.Element
    readonly loading: null | JSX.Element
    readonly ready: (state: T, setState: (to: T) => void) => null | JSX.Element
    readonly unloading: null | JSX.Element
  }> => {
  return ({ stateKey, unloaded, loading, ready, unloading }) => {
    const state = React.useRef<
    | { readonly type: 'unloaded' }
    | { readonly type: 'loading', readonly key: string }
    | { readonly type: 'ready', readonly key: string }
    | { readonly type: 'unloading' }
    >({ type: 'unloaded' })

    const unmounting = React.useRef(false)

    const refresh = useRefresh()

    const migrateState = async (forKey: null | string): Promise<void> => {
      switch (state.current.type) {
        case 'unloaded':
          if (forKey !== null) {
            state.current = { type: 'loading', key: forKey }
            refresh()

            await stateStore.load(forKey)

            if (unmounting.current) {
              await stateStore.unload()
            } else {
              state.current = { type: 'ready', key: forKey }
              refresh()
            }
          }
          break

        case 'ready':
          if (forKey !== state.current.key) {
            state.current = { type: 'unloading' }
            refresh()

            await stateStore.unload()

            state.current = { type: 'unloaded' }
            refresh()
          }
          break
      }
    }

    React.useEffect(() => {
      void migrateState(stateKey)
    })

    React.useEffect(() => {
      return () => {
        void (async () => {
          switch (state.current.type) {
            case 'loading':
              unmounting.current = true
              break

            case 'ready':
              await stateStore.unload()
              break
          }
        })()
      }
    }, [])

    useEventRefresh(stateStore, 'set')

    switch (state.current.type) {
      case 'unloaded':
        if (stateKey === null) {
          return unloaded
        } else {
          return loading
        }

      case 'loading':
        if (stateKey === state.current.key) {
          return loading
        } else {
          return unloading
        }

      case 'ready':
        if (stateKey === state.current.key) {
          return ready(stateStore.get(), (to: T) => {
            stateStore.set(to)
          })
        } else {
          return unloading
        }

      case 'unloading':
        return unloading
    }
  }
}
