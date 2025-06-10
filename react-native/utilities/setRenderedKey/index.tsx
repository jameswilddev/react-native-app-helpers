import type * as React from 'react'

/**
 * Sets the key of a rendered React element.
 * @param element The element in which the key is to be set.
 * @param key     The key to set.
 * @returns       - If the given element is incapable of supporting a key, the
 *                given element.
 *                - If the given element already has a key, the given element.
 *                - Otherwise, a shallow clone of the element with the given key
 *                injected.
 */
export const setRenderedKey = (
  element: undefined | React.ReactNode | React.JSX.Element,
  key: string
): undefined | React.ReactNode | React.JSX.Element => {
  if (typeof element === 'object' && element !== null && 'key' in element) {
    return {
      ...element,
      key: element.key ?? key
    }
  } else {
    return element
  }
}
