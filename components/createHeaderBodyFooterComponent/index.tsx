import * as React from "react";
import { View, StyleSheet } from "react-native";

const wrappingViewBase = {
  width: "100%",
  height: "100%",
};

const globalStyles = StyleSheet.create({
  emptyWrappingView: {
    ...wrappingViewBase,
  },
  wrappingView: {
    ...wrappingViewBase,
    flex: 1,
  },
  wrappingViewWithoutBody: {
    ...wrappingViewBase,
    flex: 1,
    justifyContent: "space-between",
  },
  wrappingViewWithOnlyFooter: {
    ...wrappingViewBase,
    flex: 1,
    justifyContent: "flex-end",
  },
  bodyView: {
    flexShrink: 1,
    flexGrow: 1,
    overflow: "hidden",
  },
});

/**
 * Creates a new React component which displays a header above and a footer
 * below a fluid-height body.
 * @param headerBodySpacing The amount of spacing between the header and the
 *                          body.  May be negative.
 * @param bodyFooterSpacing The amount of spacing between the body and the
 *                          footer.  May be negative.
 * @returns A new React component which surrounds its children with padding.
 */
export const createHeaderBodyFooterComponent = (
  headerBodySpacing: number,
  bodyFooterSpacing: number
): React.FunctionComponent<{
  readonly header?: JSX.Element;
  readonly body?: JSX.Element;
  readonly footer?: JSX.Element;
}> => {
  const localStyles = StyleSheet.create({
    headerView: {
      marginBottom: headerBodySpacing,
    },
    footerView: {
      marginTop: bodyFooterSpacing,
    },
  });

  return ({ header, body, footer }) => (
    <View
      style={
        !header && !footer && !body
          ? globalStyles.emptyWrappingView
          : header && footer && !body
            ? globalStyles.wrappingViewWithoutBody
            : footer && !body && !header
              ? globalStyles.wrappingViewWithOnlyFooter
              : globalStyles.wrappingView
      }
    >
      {header ? (
        <View
          {...(body && headerBodySpacing
            ? { style: localStyles.headerView }
            : {})}
        >
          {header}
        </View>
      ) : null}
      {body ? <View style={globalStyles.bodyView}>{body}</View> : null}
      {footer ? (
        <View
          {...(body && bodyFooterSpacing
            ? { style: localStyles.footerView }
            : {})}
        >
          {footer}
        </View>
      ) : null}
    </View>
  );
};
