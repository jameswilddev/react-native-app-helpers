import * as React from "react";
import { StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import type { BottomTab } from "../../types/BottomTab";
import type { BottomTabBarStyle } from "../../types/BottomTabBarStyle";
import { Hitbox } from "../Hitbox";
import { HorizontallySymmetricalSafeAreaView } from "../HorizontallySymmetricalSafeAreaView";

/**
 * Creates a new React component which can be used to render a bottom tab bar.
 * @template TTab           The type which represents the selected tab.
 * @param bottomTabBarStyle The style to apply to the bottom tab bar.
 * @param bottomTabs        The tabs to include in the bar.
 * @returns                 The created React component.
 */
export function createBottomTabBarComponent<
  TTab extends string | number | null | undefined
>(
  bottomTabBarStyle: BottomTabBarStyle,
  bottomTabs: ReadonlyArray<BottomTab<TTab>>
): React.FunctionComponent<{
  /**
   * The selected tab.
   */
  readonly tab: TTab;

  /**
   * Called when the user presses an inactive tab.
   * @param to The tab which the user pressed.
   */
  setTab(to: TTab): void;
}> {
  const textBase: TextStyle = {
    fontSize: bottomTabBarStyle.fontSize,
    lineHeight: bottomTabBarStyle.fontSize * 1.4,
  };

  if (bottomTabBarStyle.iconTextSpacing > 0) {
    textBase.paddingTop = bottomTabBarStyle.iconTextSpacing;
  }

  const hitboxBase: ViewStyle = {
    flexBasis: 0,
    flexGrow: 1,
  };

  const innerHorizontallySymmetricalSafeAreaView: ViewStyle = {
    alignItems: "center",
  };

  if (bottomTabBarStyle.topPadding > 0) {
    innerHorizontallySymmetricalSafeAreaView.paddingTop =
      bottomTabBarStyle.topPadding;
  }

  if (bottomTabBarStyle.bottomPadding > 0) {
    innerHorizontallySymmetricalSafeAreaView.paddingBottom =
      bottomTabBarStyle.bottomPadding;
  }

  const styles = StyleSheet.create({
    outerHorizontallySymmetricalSafeAreaView: {
      width: "100%",
      flexDirection: "row",
      backgroundColor: bottomTabBarStyle.inactive.background,
    },
    innerHorizontallySymmetricalSafeAreaView,
    inactiveHitbox: {
      ...hitboxBase,
      backgroundColor: bottomTabBarStyle.inactive.background,
    },
    activeHitbox: {
      ...hitboxBase,
      backgroundColor: bottomTabBarStyle.active.background,
    },
    inactiveText: {
      ...textBase,
      color: bottomTabBarStyle.inactive.color,
      fontFamily: bottomTabBarStyle.inactive.fontFamily,
    },
    activeText: {
      ...textBase,
      color: bottomTabBarStyle.active.color,
      fontFamily: bottomTabBarStyle.active.fontFamily,
    },
  });

  return ({ tab, setTab }) => (
    <HorizontallySymmetricalSafeAreaView
      left
      right
      style={styles.outerHorizontallySymmetricalSafeAreaView}
    >
      {bottomTabs.map((bottomTab) => {
        const isActive = bottomTab.tab === tab;

        return (
          <Hitbox
            disabled={isActive}
            onPress={() => {
              setTab(bottomTab.tab);
            }}
            key={bottomTab.tab}
            style={isActive ? styles.activeHitbox : styles.inactiveHitbox}
          >
            <HorizontallySymmetricalSafeAreaView
              style={styles.innerHorizontallySymmetricalSafeAreaView}
              bottom
            >
              {React.createElement(bottomTab.icon, {
                fill: isActive
                  ? bottomTabBarStyle.active.iconFill
                  : bottomTabBarStyle.inactive.iconFill,
              })}
              <Text
                style={isActive ? styles.activeText : styles.inactiveText}
                numberOfLines={1}
              >
                {bottomTab.text}
              </Text>
            </HorizontallySymmetricalSafeAreaView>
          </Hitbox>
        );
      })}
    </HorizontallySymmetricalSafeAreaView>
  );
}
