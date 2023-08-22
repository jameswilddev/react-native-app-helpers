import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { intercalateRendered } from '../../utilities/intercalateRendered'

const globalStyles = StyleSheet.create({
  horizontalWrappingView: {
    height: '100%',
    flexDirection: 'row'
  },
  verticalWrappingView: {
    width: '100%'
  }
})

/**
 * Creates a new React component which displays its children in a stack with a
 * set spacing between each item.
 * @param spacing   The spacing between each item.
 * @param direction The direction in which items are to be stacked.
 * @returns         A new React component which displays its children in a stack
 *                  with a set spacing between each item.
 */
export const createStackComponent = (
  spacing: number,
  direction: 'horizontal' | 'vertical'
): React.FunctionComponent<React.PropsWithChildren<Record<never, never>>> => {
  if (spacing === 0) {
    const Stack: React.FunctionComponent<React.PropsWithChildren<Record<never, never>>> = ({ children }) => (
      <View
        pointerEvents="box-none"
        style={globalStyles[`${direction}WrappingView`]}
      >
        {children}
      </View>
    )

    return Stack
  } else {
    const localStyles = StyleSheet.create({
      spacingView:
        direction === 'vertical'
          ? {
              height: spacing
            }
          : { width: spacing }
    })

    const Stack: React.FunctionComponent<React.PropsWithChildren<Record<never, never>>> = ({ children }) => {
      const childArray = intercalateRendered(
        <View pointerEvents="none" style={localStyles.spacingView} />,
        children
      )

      return (
        <View
          pointerEvents="box-none"
          style={globalStyles[`${direction}WrappingView`]}
          {...(childArray.length === 0
            ? {}
            : childArray.length === 1
              ? { children: childArray[0] }
              : { children: childArray })}
        />
      )
    }

    return Stack
  }
}
