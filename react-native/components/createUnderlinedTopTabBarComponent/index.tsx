import * as React from 'react'
import { StyleSheet, Text, type TextStyle, type ViewStyle } from 'react-native'
import type { UnderlinedTopTab } from '../../types/UnderlinedTopTab'
import type { UnderlinedTopTabBarStyle } from '../../types/UnderlinedTopTabBarStyle'
import { Hitbox } from '../Hitbox'
import { HorizontallySymmetricalSafeAreaView } from '../HorizontallySymmetricalSafeAreaView'
import type { UnderlinedTopTabBarProps } from '../../types/UnderlinedTopTabBarProps'

/**
 * Creates a new React component which can be used to render a top tab bar,
 * where an underline is used to distinguish active and inactive tabs.
 * @template TTab                  The type which represents the selected tab.
 * @param underlinedTopTabBarStyle The style to apply to the tab bar.
 * @param underlinedTopTabs        The tabs to include in the bar.
 * @returns                        The created React component.
 */
export function createUnderlinedTopTabBarComponent<
  TTab extends string | number | null | undefined
> (
  underlinedTopTabBarStyle: UnderlinedTopTabBarStyle,
  underlinedTopTabs: ReadonlyArray<UnderlinedTopTab<TTab>>
): React.FunctionComponent<UnderlinedTopTabBarProps<TTab>> {
  const inactiveUnderlineWidth =
    underlinedTopTabBarStyle.inactive.underline === null
      ? 0
      : underlinedTopTabBarStyle.inactive.underline.width

  const hitboxBase: ViewStyle = {
    flexBasis: 0,
    flexGrow: 1
  }

  if (underlinedTopTabBarStyle.verticalPadding !== 0) {
    hitboxBase.paddingTop = underlinedTopTabBarStyle.verticalPadding
  }

  if (inactiveUnderlineWidth !== 0) {
    hitboxBase.marginBottom = -inactiveUnderlineWidth
  }

  const inactiveHitbox: ViewStyle = {
    ...hitboxBase
  }

  const activeHitbox: ViewStyle = {
    ...hitboxBase,
    backgroundColor: underlinedTopTabBarStyle.active.backgroundColor
  }

  if (underlinedTopTabBarStyle.active.underline !== null) {
    activeHitbox.borderBottomWidth =
      underlinedTopTabBarStyle.active.underline.width
    activeHitbox.borderBottomColor =
      underlinedTopTabBarStyle.active.underline.color
  }

  const textBase: TextStyle = {
    fontSize: underlinedTopTabBarStyle.fontSize,
    lineHeight: underlinedTopTabBarStyle.fontSize * 1.4,
    textAlign: 'center'
  }

  const horizontallySymmetricalSafeAreaView: ViewStyle = {
    flexDirection: 'row',
    backgroundColor: underlinedTopTabBarStyle.inactive.backgroundColor,
    height:
      underlinedTopTabBarStyle.verticalPadding +
      underlinedTopTabBarStyle.fontSize * 1.4 +
      underlinedTopTabBarStyle.verticalPadding
  }

  if (underlinedTopTabBarStyle.inactive.underline !== null) {
    horizontallySymmetricalSafeAreaView.borderBottomWidth =
      underlinedTopTabBarStyle.inactive.underline.width
    horizontallySymmetricalSafeAreaView.borderBottomColor =
      underlinedTopTabBarStyle.inactive.underline.color
  }

  const styles = StyleSheet.create({
    horizontallySymmetricalSafeAreaView,
    inactiveHitbox,
    activeHitbox,
    inactiveText: {
      ...textBase,
      fontFamily: underlinedTopTabBarStyle.inactive.fontFamily,
      color: underlinedTopTabBarStyle.inactive.color
    },
    activeText: {
      ...textBase,
      fontFamily: underlinedTopTabBarStyle.active.fontFamily,
      color: underlinedTopTabBarStyle.active.color
    }
  })

  const UnderlinedTopTabBar: React.FunctionComponent<UnderlinedTopTabBarProps<TTab>> = ({ tab, setTab }) => (
    <HorizontallySymmetricalSafeAreaView
      style={styles.horizontallySymmetricalSafeAreaView}
      left
      right
    >
      {underlinedTopTabs.map((item) => {
        const isActive = item.tab === tab
        return (
          <Hitbox
            key={item.tab}
            disabled={isActive}
            style={isActive ? styles.activeHitbox : styles.inactiveHitbox}
            onPress={() => {
              setTab(item.tab)
            }}
          >
            <Text
              numberOfLines={1}
              style={isActive ? styles.activeText : styles.inactiveText}
            >
              {item.text}
            </Text>
          </Hitbox>
        )
      })}
    </HorizontallySymmetricalSafeAreaView>
  )

  return UnderlinedTopTabBar
}
