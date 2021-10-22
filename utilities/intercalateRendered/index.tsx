import * as React from "react";
import { flattenRenderedToArray } from "../flattenRenderedToArray";

/**
 * Inserts instances of a React component between the contents of a rendered JSX
 * element.
 * @param separator The React Component to place between each element.
 * @param between   The rendered JSX element into which separators are to be
 *                  added.
 * @returns         The elements within the given JSX element, flattened into an
 *                  array with the separator Component added between each pair
 *                  of elements.
 */
export const intercalateRendered = (
  separator: React.FunctionComponent | React.ComponentClass,
  between: undefined | React.ReactNode | JSX.Element
): ReadonlyArray<React.ReactNode | JSX.Element> => {
  const flattenedBetween = flattenRenderedToArray(between);

  if (flattenedBetween.length === 0) {
    return [];
  } else {
    const output = flattenedBetween.flatMap((element, i) => [
      React.createElement(separator, { key: `separator${i - 1}` }),
      element,
    ]);

    output.shift();

    return output;
  }
};
