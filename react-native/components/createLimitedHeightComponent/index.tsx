import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import type { LimitedHeightProps } from '../../types/LimitedHeightProps'

/**
 * Creates a React component which has a maximum height.
 * @param maximumHeight The maximum Height of the component
 * @returns     The created component.
 */
export const createLimitedHeightComponent = (
  maximumHeight: number
): React.FunctionComponent<LimitedHeightProps> => {
  const styles = StyleSheet.create({
    fillsContainer: {
      maxHeight: maximumHeight,
      width: '100%'
    },
    fitsContent: {
      maxHeight: maximumHeight
    }
  })

  const LimitedHeight: React.FunctionComponent<LimitedHeightProps> = ({ children, width }) => (
    <View
      style={
        width === 'fillsContainer' ? styles.fillsContainer : styles.fitsContent
      }
      pointerEvents="box-none"
    >
      {children}
    </View>
  )

  return LimitedHeight
}
