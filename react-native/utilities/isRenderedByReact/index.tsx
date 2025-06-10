/**
 * Checks whether React will render an item.
 * @param item The item to check.
 * @returns       If React will render (not skip) the given item, true, otherwise, false.
 */
export const isRenderedByReact = (
  item: undefined | React.ReactNode | React.JSX.Element
): boolean => item !== null && item !== false && item !== 0 && item !== undefined && item !== '' && (!Array.isArray(item) || item.some(child => isRenderedByReact(child)))
