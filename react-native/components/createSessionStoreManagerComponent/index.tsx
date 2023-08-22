import * as React from 'react'
import { useRefresh } from '../../hooks/useRefresh'
import { useEventRefresh } from '../../hooks/useEventRefresh'
import type { SessionStore } from '../../services/SessionStore'
import type { Json } from '../../types/Json'

/**
 * Creates a React component which automatically manages a session store,
 * loading it and unloading it as appropriate and passing its content down to
 * its props.
 *
 * A re-render will be triggered automatically should the store's content
 * change.
 * @template T         The type of session maintained by the session store.
 * @param sessionStore The session store.  This must not yet be loaded.
 * @returns            A React component which automatically manages the session
 *                     store, loading it and unloading it as appropriate and
 *                     passing its content down to its props.
 */
export const createSessionStoreManagerComponent = <T extends Json>(
  sessionStore: SessionStore<T>
): React.FunctionComponent<{
    readonly loading: null | JSX.Element
    readonly ready: (
      session: T,
      setSession: (to: T) => void
    ) => null | JSX.Element
  }> => {
  return ({ loading, ready }) => {
    const loaded = React.useRef(false)
    const refresh = useRefresh()
    useEventRefresh(sessionStore, 'set')

    React.useEffect(() => {
      let state: 'loading' | 'loaded' | 'aborting' = 'loading'

      void (async () => {
        await sessionStore.load()

        switch (state as 'loading' | 'aborting') {
          case 'loading':
            state = 'loaded'
            loaded.current = true
            refresh()
            break

          case 'aborting':
            await sessionStore.unload()
            break
        }
      })()

      return () => {
        switch (state) {
          case 'loading':
            state = 'aborting'
            break

          case 'loaded':
            void (async () => {
              await sessionStore.unload()
            })()
        }
      }
    }, [])

    if (loaded.current) {
      return ready(sessionStore.get(), (to: T) => {
        sessionStore.set(to)
      })
    } else {
      return loading
    }
  }
}
