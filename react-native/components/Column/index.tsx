import * as React from 'react'
import { StyleSheet, View, type ViewStyle } from 'react-native'

const styles: Record<string, ViewStyle> = {}

/**
 * A React component which fills the container horizontally and applies a flex
 * column to its children.
 */
export const Column: React.FunctionComponent<
React.PropsWithChildren<{
  readonly width: 'fitsContent' | 'fillsContainer'
  readonly verticalDistribution:
  | 'top'
  | 'centered'
  | 'bottom'
  | 'spaced'
  | 'spacedTouchingEnds'
  readonly horizontalAlignment: 'left' | 'centered' | 'right' | 'stretched'
}>
> = ({ width, verticalDistribution, horizontalAlignment, children }) => {
  const styleKey = `${width}-${verticalDistribution}-${horizontalAlignment}`

  if (!(styleKey in styles)) {
    const view: ViewStyle = { height: '100%', flexDirection: 'column' }

    if (width === 'fillsContainer') {
      view.width = '100%'
    }

    switch (verticalDistribution) {
      case 'centered':
        view.justifyContent = 'center'
        break

      case 'bottom':
        view.justifyContent = 'flex-end'
        break

      case 'spaced':
        view.justifyContent = 'space-evenly'
        break

      case 'spacedTouchingEnds':
        view.justifyContent = 'space-between'
        break
    }

    switch (horizontalAlignment) {
      case 'left':
        view.alignItems = 'flex-start'
        break

      case 'centered':
        view.alignItems = 'center'
        break

      case 'right':
        view.alignItems = 'flex-end'
        break
    }

    styles[styleKey] = StyleSheet.create({ view }).view
  }

  return (
    <View style={styles[styleKey]} pointerEvents="box-none">
      {children}
    </View>
  )
}
