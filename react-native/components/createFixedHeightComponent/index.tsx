import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import type { FixedHeightProps } from '../../types/FixedHeightProps'

/**
 * Creates a React component which has a fixed height.
 * @param height The height of the component
 * @returns     The created component.
 */
export const createFixedHeightComponent = (
  height: number
): React.FunctionComponent<FixedHeightProps> => {
  const styles = StyleSheet.create({
    fillsContainer: {
      height,
      width: '100%'
    },
    fitsContent: {
      height
    }
  })

  const FixedHeight: React.FunctionComponent<FixedHeightProps> = ({ children, width }) => (
    <View
      style={
        width === 'fillsContainer' ? styles.fillsContainer : styles.fitsContent
      }
      pointerEvents="box-none"
    >
      {children}
    </View>
  )

  return FixedHeight
}
