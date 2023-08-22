import type { TextStyle, ViewStyle } from 'react-native'
import type { ControlStyle } from '../../types/ControlStyle'
import type { ControlStateStyle } from '../../types/ControlStateStyle'

export const createControlStyleInstance = (
  controlStyle: ControlStyle,
  controlStateStyle: ControlStateStyle
): ViewStyle => {
  const output: ViewStyle = {
    backgroundColor: controlStateStyle.backgroundColor,
    flexDirection: 'row',
    alignItems: 'center'
  }

  if (controlStyle.paddingHorizontal !== 0) {
    output.paddingHorizontal = controlStyle.paddingHorizontal
  }

  if (controlStateStyle.radius !== 0) {
    output.borderRadius = controlStateStyle.radius
  }

  if (controlStateStyle.border !== null) {
    output.borderWidth = controlStateStyle.border.width
    output.borderColor = controlStateStyle.border.color
  }

  return output
}

export const createControlStateStyleInstance = (
  controlStyle: ControlStyle,
  controlStateStyle: ControlStateStyle
): ViewStyle => {
  const output = createControlStyleInstance(controlStyle, controlStateStyle)

  const effectiveBorderWidth =
    controlStateStyle.border === null ? 0 : controlStateStyle.border.width
  const effectiveRelativeToBorderWidth =
    controlStyle.blurredValid.border === null
      ? 0
      : controlStyle.blurredValid.border.width

  if (effectiveBorderWidth !== effectiveRelativeToBorderWidth) {
    output.margin = effectiveRelativeToBorderWidth - effectiveBorderWidth
  }

  return output
}

export const createControlTextStyleInstance = (
  controlStyle: ControlStyle,
  controlStateStyle: ControlStateStyle,
  alignment: 'left' | 'middle' | 'right'
): TextStyle => {
  const output: TextStyle = {
    flexGrow: 1,
    color: controlStateStyle.textColor,
    fontFamily: controlStyle.fontFamily,
    fontSize: controlStyle.fontSize
  }

  switch (alignment) {
    case 'middle':
      output.textAlign = 'center'
      break

    case 'right':
      output.textAlign = 'right'
      break
  }

  if (controlStyle.paddingVertical !== 0) {
    output.paddingVertical = controlStyle.paddingVertical
  }

  return output
}

export const createFullHeightPopoverStateStyleInstance = (
  controlStateStyle: ControlStateStyle
): ViewStyle => {
  const output: ViewStyle = {
    height: '100%',
    backgroundColor: controlStateStyle.backgroundColor
  }

  if (controlStateStyle.border !== null) {
    output.borderLeftWidth = controlStateStyle.border.width
    output.borderRightWidth = controlStateStyle.border.width
    output.borderColor = controlStateStyle.border.color
  }

  return output
}

export const shadow = (radius: number): ViewStyle => {
  if (radius < 0) {
    throw new Error('Shadow radius cannot be less than 0.')
  }

  if (radius > 24) {
    throw new Error('Shadow radius cannot be greater than 24.')
  }

  return {
    elevation: radius,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: radius / 2 },
    shadowRadius: (radius * 2) / 3,
    shadowOpacity: 0.3
  }
}
