import * as React from 'react'
import { type ColorValue, StyleSheet, View } from 'react-native'
import type { FlatColorBackgroundProps } from '../../types/FlatColorBackgroundProps'

/**
 * Creates a new React component which displays a solid color background behind
 * its children.
 * @param color The color to use.
 * @returns a new React component which displays a solid color background behind
 * its children.
 */
export const createFlatColorBackgroundComponent = (
  color: ColorValue
): React.FunctionComponent<FlatColorBackgroundProps> => {
  const styles = StyleSheet.create({
    fitsContent: {
      backgroundColor: color
    },
    fillsContainer: {
      backgroundColor: color,
      flexGrow: 1
    }
  })

  const FlatColorBackground: React.FunctionComponent<FlatColorBackgroundProps> = ({ size, children }) => (
    <View style={styles[size]} pointerEvents="box-none">
      {children}
    </View>
  )

  return FlatColorBackground
}
