import * as React from "react";

/**
 * Flattens a rendered JSX element (which could be empty, a fragment, a
 * component, a hierarchy of arrays, etc.) into an array.
 * @param element The rendered JSX element to flatten into an array.
 * @returns The elements within the given JSX element, flattened into an array.
 */
export const flattenRenderedToArray = (
  element: JSX.Element
): ReadonlyArray<JSX.Element> => {
  const recurseChildren = (child: JSX.Element): ReadonlyArray<JSX.Element> => {
    if (child === null) {
      return [];
    } else if (Array.isArray(child)) {
      return child.flatMap(recurseChildren);
    } else if (child.type === React.Fragment) {
      return child.props.children
        ? child.props.children.flatMap(recurseChildren)
        : [];
    } else {
      return [child];
    }
  };

  return recurseChildren(element).map((element, index) => ({
    ...element,
    key: element.key ?? String(index),
  }));
};
