/**
 * Gets the key of a rendered React element.
 * @param element The element from which the key is to be get.
 * @returns       The key extracted, or null if none was found.
 */
export const getRenderedKey = (
  element: undefined | React.ReactNode | JSX.Element
): null | string => {
  if (
    typeof element === 'object' &&
    element !== null &&
    'key' in element &&
    element.key !== null
  ) {
    return String(element.key)
  } else {
    return null
  }
}
