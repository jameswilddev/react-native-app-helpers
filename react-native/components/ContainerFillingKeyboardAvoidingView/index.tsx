import * as React from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  type KeyboardAvoidingViewProps,
  Platform
} from 'react-native'

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    width: '100%',
    height: '100%'
  }
})

/**
 * A KeyboardAvoidingView which is styled to fill its container (and uses
 * platform-appropriate behavior by default).
 */
export const ContainerFillingKeyboardAvoidingView: React.FunctionComponent<
KeyboardAvoidingViewProps
> = (props) => {
  switch (Platform.OS) {
    case 'ios':
      return (
        <KeyboardAvoidingView
          pointerEvents="box-none"
          style={styles.keyboardAvoidingView}
          behavior="padding"
          {...props}
        />
      )

    case 'android':
    case 'macos':
    case 'windows':
    case 'web':
      return (
        <KeyboardAvoidingView
          pointerEvents="box-none"
          style={styles.keyboardAvoidingView}
          {...props}
        />
      )
  }
}
