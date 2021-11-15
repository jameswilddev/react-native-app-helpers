import * as React from "react";
import { View, StyleSheet } from "react-native";

const wrappingViewBase = {
  width: `100%`,
  height: `100%`,
};

const globalStyles = StyleSheet.create({
  emptyWrappingView: {
    ...wrappingViewBase,
  },
  wrappingView: {
    ...wrappingViewBase,
    flex: 1,
    flexDirection: `row`,
  },
  wrappingViewWithoutBody: {
    ...wrappingViewBase,
    flex: 1,
    flexDirection: `row`,
    justifyContent: `space-between`,
  },
  wrappingViewWithOnlyright: {
    ...wrappingViewBase,
    flex: 1,
    flexDirection: `row`,
    justifyContent: `flex-end`,
  },
  bodyView: {
    flexShrink: 1,
    flexGrow: 1,
    overflow: `hidden`,
  },
});

/**
 * Creates a new React component which displays sidebars to the left and right
 * of a fluid-width body.
 * @param leftBodySpacing  The amount of spacing between the left sidebar and
 *                         the body.  May be negative.
 * @param bodyRightSpacing The amount of spacing between the body and the right
 *                         sidebar.  May be negative.
 * @returns                The created React component.
 */
export const createSidebarComponent = (
  leftBodySpacing: number,
  bodyRightSpacing: number
): React.FunctionComponent<{
  /**
   * The element to show in the left sidebar.
   */
  readonly left?: JSX.Element;

  /**
   * The element to show in the middle, with fluid width.
   */
  readonly body?: JSX.Element;

  /**
   * The element to show in the right sidebar.
   */
  readonly right?: JSX.Element;
}> => {
  const localStyles = StyleSheet.create({
    leftView: {
      marginRight: leftBodySpacing,
    },
    rightView: {
      marginLeft: bodyRightSpacing,
    },
  });

  return ({ left, body, right }) => {
    const children = [];

    if (left) {
      children.push(
        <View
          pointerEvents="box-none"
          {...(body && leftBodySpacing ? { style: localStyles.leftView } : {})}
        >
          {left}
        </View>
      );
    }

    if (body) {
      children.push(
        <View style={globalStyles.bodyView} pointerEvents="box-none">
          {body}
        </View>
      );
    }

    if (right) {
      children.push(
        <View
          pointerEvents="box-none"
          {...(body && bodyRightSpacing
            ? { style: localStyles.rightView }
            : {})}
        >
          {right}
        </View>
      );
    }

    return (
      <View
        pointerEvents="box-none"
        style={
          !left && !right && !body
            ? globalStyles.emptyWrappingView
            : left && right && !body
            ? globalStyles.wrappingViewWithoutBody
            : right && !body && !left
            ? globalStyles.wrappingViewWithOnlyright
            : globalStyles.wrappingView
        }
        {...(children.length === 0
          ? {}
          : children.length === 1
          ? { children: children[0] }
          : { children })}
      />
    );
  };
};
