import * as React from 'react'
import {
  StyleSheet,
  Modal,
  Platform,
  TouchableWithoutFeedback,
  View,
  type ViewStyle
} from 'react-native'

let nonWebStyles: null | { readonly view: ViewStyle } = null
let webStyles: null | {
  readonly shadeView: ViewStyle
  childrenWrapperView: ViewStyle
} = null

/**
 * A replacement for the React Native `Modal` component which supports web
 * browsers as a target.
 */
export const SimpleModal: React.FunctionComponent<
React.PropsWithChildren<{
  /**
     * Called when the back button is pressed or the background is clicked or
     * touched.
     */
  readonly onClose: () => void
}>
> = ({ onClose, children }) => {
  switch (Platform.OS) {
    case 'android':
    case 'ios':
    case 'macos':
    case 'windows':
      if (nonWebStyles === null) {
        nonWebStyles = StyleSheet.create({
          view: {
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          }
        })
      }

      return (
        <Modal transparent visible onRequestClose={onClose}>
          <React.Fragment>
            <TouchableWithoutFeedback onPress={onClose}>
              <View style={nonWebStyles.view} />
            </TouchableWithoutFeedback>
            {children}
          </React.Fragment>
        </Modal>
      )

    case 'web':
      if (webStyles === null) {
        webStyles = StyleSheet.create({
          shadeView: {
            position: 'fixed' as unknown as undefined,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 9998
          },
          childrenWrapperView: {
            position: 'fixed' as unknown as undefined,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 9999
          }
        })
      }

      return (
        <React.Fragment>
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={webStyles.shadeView} />
          </TouchableWithoutFeedback>
          <View style={webStyles.childrenWrapperView} pointerEvents="box-none">
            {children}
          </View>
        </React.Fragment>
      )
  }
}
