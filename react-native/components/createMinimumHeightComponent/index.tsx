import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import type { MinimumHeightProps } from '../../types/MinimumHeightProps'

/**
 * Creates a React component which has a minimum height.
 * @param minimumHeight The minimum Height of the component
 * @returns     The created component.
 */
export const createMinimumHeightComponent = (
  minimumHeight: number
): React.FunctionComponent<MinimumHeightProps> => {
  const styles = StyleSheet.create({
    fillsContainer: {
      minHeight: minimumHeight,
      width: '100%'
    },
    fitsContent: {
      minHeight: minimumHeight
    }
  })

  const MinimumHeight: React.FunctionComponent<MinimumHeightProps> = ({ children, width }) => (
    <View
      style={
        width === 'fillsContainer' ? styles.fillsContainer : styles.fitsContent
      }
      pointerEvents="box-none"
    >
      {children}
    </View>
  )

  return MinimumHeight
}
