import { flattenRenderedToArray } from '../flattenRenderedToArray'
import { setRenderedKey } from '../setRenderedKey'

/**
 * Inserts instances of a React component between the contents of a rendered JSX
 * element.
 * @param separator The React element to place between each element.
 * @param between   The React element into which separators are to be added.
 * @returns         The elements within the given React element, flattened into
 *                  an array with the separator React element added between each
 *                  pair of elements.
 */
export const intercalateRendered = (
  separator: React.ReactNode | React.JSX.Element,
  between: undefined | React.ReactNode | React.JSX.Element
): ReadonlyArray<React.ReactNode | React.JSX.Element> => {
  const flattenedBetween = flattenRenderedToArray(between)

  if (flattenedBetween.length === 0) {
    return []
  } else {
    const output = flattenedBetween.flatMap((element, i) => [
      setRenderedKey(separator, `separator${i - 1}`),
      element
    ])

    // TODO: ESLint seems to think output is a promise.
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    output.shift()

    return output
  }
}
