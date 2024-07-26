import * as React from 'react'
import type {
  LayoutChangeEvent,
  MeasureOnSuccessCallback,
  NativeMethods
} from 'react-native'

/**
 * A React hook which executes a callback when an element's dimensions are first
 * known or change.
 * @param onMeasure The callback executed when the element's dimensions are
 *                  first known or change.
 * @returns         A "ref" callback and "onLayout" callback to pass to the
 *                  monitored element.
 */
export function useMeasure<T extends NativeMethods> (
  onMeasure: MeasureOnSuccessCallback
): readonly [React.RefCallback<T>, (event: LayoutChangeEvent) => void] {
  const element = React.useRef<null | T>(null)
  const queuedLayout = React.useRef(false)

  const wrapped = (x: undefined | number, y: undefined | number, width: undefined | number, height: undefined | number, pageX: undefined | number, pageY: undefined | number): void => {
    // According to types/documentation, these are never undefined.  In
    // practice, however, they have been observed to be undefined multiple
    // times.
    if (x !== undefined && y !== undefined && width !== undefined && height !== undefined && pageX !== undefined && pageY !== undefined) {
      onMeasure(x, y, width, height, pageX, pageY)
    }
  }

  return [
    (_element) => {
      element.current = _element

      if (queuedLayout.current) {
        queuedLayout.current = false

        _element?.measure(wrapped)
      }
    },
    () => {
      if (element.current === null) {
        queuedLayout.current = true
      } else {
        element.current.measure(wrapped)
      }
    }
  ]
}
