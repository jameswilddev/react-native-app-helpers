import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import type { FixedWidthProps } from '../../types/FixedWidthProps'

/**
 * Creates a React component which has a fixed width.
 * @param width The width of the component
 * @returns     The created component.
 */
export const createFixedWidthComponent = (
  width: number
): React.FunctionComponent<FixedWidthProps> => {
  const styles = StyleSheet.create({
    fillsContainer: {
      width,
      height: '100%'
    },
    fitsContent: {
      width
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
