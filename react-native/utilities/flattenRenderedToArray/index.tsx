import * as React from 'react'
import { setRenderedKey } from '../setRenderedKey'
import { isRenderedByReact } from '../isRenderedByReact'

/**
 * Flattens a rendered JSX element (which could be empty, a fragment, a
 * component, a hierarchy of arrays, etc.) into an array.
 * @param element The rendered JSX element to flatten into an array.
 * @returns The elements within the given JSX element, flattened into an array.
 */
export const flattenRenderedToArray = (
  element: undefined | React.ReactNode | JSX.Element
): ReadonlyArray<React.ReactNode | JSX.Element> => {
  const recurseChildren = (
    child: undefined | React.ReactNode | JSX.Element
  ): ReadonlyArray<React.ReactNode | JSX.Element> => {
    if (child === null || child === undefined) {
      return []
    } else if (Array.isArray(child)) {
      return child.flatMap(recurseChildren)
    } else if (
      typeof child === 'object' &&
      'type' in child &&
      child.type === React.Fragment
    ) {
      if (isRenderedByReact(child.props.children)) {
        if (Array.isArray(child.props.children)) {
          return child.props.children.flatMap(recurseChildren)
        } else {
          return recurseChildren(child.props.children)
        }
      } else {
        return []
      }
    } else {
      return [child]
    }
  }

  return recurseChildren(element).map((element, index) =>
    setRenderedKey(element, String(index))
  )
}
