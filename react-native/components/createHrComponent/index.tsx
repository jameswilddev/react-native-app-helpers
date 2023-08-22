import * as React from 'react'
import { View, StyleSheet, type ColorValue } from 'react-native'

export const createHrComponent = (color: ColorValue, height: number): React.FunctionComponent => {
  const styles = StyleSheet.create({
    view: {
      width: '100%',
      height,
      backgroundColor: color
    }
  })

  const Hr: React.FunctionComponent = () => <View style={styles.view} />

  return Hr
}
