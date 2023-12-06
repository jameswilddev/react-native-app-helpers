import * as React from 'react'

/**
 * A React hook which returns a function which can be invoked to force a refresh
 * of the Component.
 * @returns A function which can be invoked to force a refresh of the Component.
 */
export const useRefresh = (): (() => void) => {
  const [, refresh] = React.useReducer((x) => x + 1, 0)

  return refresh
}
