import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import type { MinimumWidthProps } from '../../types/MinimumWidthProps'

/**
 * Creates a React component which has a maximum width.
 * @param minimumWidth The maximum width of the component
 * @returns     The created component.
 */
export const createMinimumWidthComponent = (
  minimumWidth: number
): React.FunctionComponent<MinimumWidthProps> => {
  const styles = StyleSheet.create({
    fillsContainer: {
      minWidth: minimumWidth,
      height: '100%'
    },
    fitsContent: {
      minWidth: minimumWidth
    }
  })

  const MinimumWidth: React.FunctionComponent<MinimumWidthProps> = ({ children, height }) => (
    <View
      style={
        height === 'fillsContainer' ? styles.fillsContainer : styles.fitsContent
      }
      pointerEvents="box-none"
    >
      {children}
    </View>
  )

  return MinimumWidth
}
