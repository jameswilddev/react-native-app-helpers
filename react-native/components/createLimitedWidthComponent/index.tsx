import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import type { LimitedWidthProps } from '../../types/LimitedWidthProps'

/**
 * Creates a React component which has a maximum width.
 * @param maximumWidth The maximum width of the component
 * @returns     The created component.
 */
export const createLimitedWidthComponent = (
  maximumWidth: number
): React.FunctionComponent<LimitedWidthProps> => {
  const styles = StyleSheet.create({
    fillsContainer: {
      maxWidth: maximumWidth,
      height: '100%'
    },
    fitsContent: {
      maxWidth: maximumWidth
    }
  })

  return ({ children, height }) => (
    <View
      style={
        height === 'fillsContainer' ? styles.fillsContainer : styles.fitsContent
      }
      pointerEvents="box-none"
    >
      {children}
    </View>
  )
}
