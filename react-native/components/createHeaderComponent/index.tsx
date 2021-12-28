import * as React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import type { HeaderIcon } from "../../types/HeaderIcon";
import type { HeaderStyle } from "../../types/HeaderStyle";
import { Hitbox } from "../Hitbox";
import { HorizontallySymmetricalSafeAreaView } from "../HorizontallySymmetricalSafeAreaView";

/**
 * Creates a new React component which represents a header bar.
 * @param headerStyle The styling to apply to the header bar.
 * @returns           The created React component.
 */
export const createHeaderComponent = (
  headerStyle: HeaderStyle
): React.FunctionComponent<{
  /**
   * The icons to show on the left.
   */
  readonly leftIcons: ReadonlyArray<HeaderIcon>;

  /**
   * The icons to show on the right.
   */
  readonly rightIcons: ReadonlyArray<HeaderIcon>;
}> => {
  const viewBase: ViewStyle = {
    flexBasis: 0,
    flexGrow: 1,
    flexDirection: `row`,
  };

  const leftView: ViewStyle = {
    ...viewBase,
  };

  const rightView: ViewStyle = {
    ...viewBase,
    justifyContent: `flex-end`,
  };

  const hitbox: ViewStyle = {};

  const viewMargin =
    headerStyle.outerHorizontalPadding - headerStyle.innerHorizontalPadding / 2;

  if (viewMargin !== 0) {
    leftView.marginLeft = viewMargin;
    rightView.marginRight = viewMargin;
  }

  if (headerStyle.innerHorizontalPadding !== 0) {
    hitbox.paddingHorizontal = headerStyle.innerHorizontalPadding / 2;
  }

  const text: TextStyle = {
    color: headerStyle.textColor,
    fontFamily: headerStyle.fontFamily,
    fontSize: headerStyle.fontSize,
    lineHeight: headerStyle.fontSize * 1.4,
  };

  if (headerStyle.verticalPadding !== 0) {
    hitbox.paddingVertical = headerStyle.verticalPadding;
    text.paddingVertical = headerStyle.verticalPadding;
  }

  const styles = StyleSheet.create({
    horizontallySymmetricalSafeAreaView: {
      width: `100%`,
      flexDirection: `row`,
      backgroundColor: headerStyle.background,
    },
    leftView,
    rightView,
    hitbox,
    text,
  });

  return ({ leftIcons, children, rightIcons }) => (
    <HorizontallySymmetricalSafeAreaView
      left
      top
      right
      style={styles.horizontallySymmetricalSafeAreaView}
    >
      <View style={styles.leftView}>
        {leftIcons.map((icon, index) => (
          <Hitbox
            key={String(index)}
            onPress={icon.onPress}
            {...(headerStyle.verticalPadding === 0 &&
            headerStyle.innerHorizontalPadding === 0
              ? {}
              : { style: styles.hitbox })}
          >
            {React.createElement(icon.icon, { fill: headerStyle.textColor })}
          </Hitbox>
        ))}
      </View>
      <Text numberOfLines={1} style={styles.text}>
        {children}
      </Text>
      <View style={styles.rightView}>
        {rightIcons.map((icon, index) => (
          <Hitbox
            key={String(index)}
            onPress={icon.onPress}
            {...(headerStyle.verticalPadding === 0 &&
            headerStyle.innerHorizontalPadding === 0
              ? {}
              : { style: styles.hitbox })}
          >
            {React.createElement(icon.icon, { fill: headerStyle.textColor })}
          </Hitbox>
        ))}
      </View>
    </HorizontallySymmetricalSafeAreaView>
  );
};
