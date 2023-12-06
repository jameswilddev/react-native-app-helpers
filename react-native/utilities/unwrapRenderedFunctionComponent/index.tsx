/**
 * Unwraps a rendered JSX element which itself renders to a JSX element.
 * @param element The rendered JSX element to unwrap.
 * @returns The JSX element produced by unwrapping the given element.
 * @throws When the given JSX element is not wrapping another JSX element.
 */
export const unwrapRenderedFunctionComponent = (
  element: JSX.Element
): JSX.Element => {
  if (
    element.type instanceof Function &&
    Object.prototype.hasOwnProperty.call(element.type, 'arguments')
  ) {
    return element.type(element.props)
  } else {
    throw new Error('Can only unwrap rendered function components.')
  }
}
