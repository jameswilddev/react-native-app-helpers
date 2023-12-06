import * as React from 'react'
import { BackHandler } from 'react-native'

/**
 * A React hook which executes a given callback when the hardware back button is
 * pressed.
 * @param callback The callback to execute when the hardware back button is
 *                 pressed.
 */
export const useBackButton = (
  callback: () => undefined | null | boolean
): void => {
  React.useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      callback
    )

    return () => {
      subscription.remove()
    }
  }, [callback])
}
