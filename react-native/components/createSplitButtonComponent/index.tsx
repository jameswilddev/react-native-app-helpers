import * as React from 'react'
import { StyleSheet, Text, type TextStyle, View, type ViewStyle } from 'react-native'
import { flattenRenderedToArray } from '../../utilities/flattenRenderedToArray'
import type { SplitButtonStyle } from '../../types/SplitButtonStyle'
import type { SplitButtonStateStyle } from '../../types/SplitButtonStateStyle'
import { Hitbox } from '../Hitbox'

const createSingleButtonHitboxStyleInstance = (
  splitButtonStyle: SplitButtonStyle<string>,
  splitButtonStateStyle: SplitButtonStateStyle,
  width: 'fitsContent' | 'fillsContainer',
  distribution: 'even' | 'proportional'
): ViewStyle => {
  const output: ViewStyle = {
    backgroundColor: splitButtonStateStyle.backgroundColor
  }

  if (width === 'fillsContainer') {
    output.flexGrow = 1
    output.flexShrink = 1
  }

  if (distribution === 'even') {
    output.flexBasis = 0
  }

  if (splitButtonStyle.horizontalPadding !== 0) {
    output.paddingHorizontal = splitButtonStyle.horizontalPadding
  }

  if (splitButtonStyle.verticalPadding !== 0) {
    output.paddingVertical = splitButtonStyle.verticalPadding
  }

  if (splitButtonStateStyle.radius !== 0) {
    output.borderRadius = splitButtonStateStyle.radius
  }

  if (splitButtonStateStyle.border !== null) {
    output.borderWidth = splitButtonStateStyle.border.width
    output.borderColor = splitButtonStateStyle.border.color
  }

  const effectiveBorderWidth =
    splitButtonStateStyle.border === null
      ? 0
      : splitButtonStateStyle.border.width

  const margin = splitButtonStyle.neutralBorderWidth - effectiveBorderWidth

  if (margin !== 0) {
    output.margin = margin
  }

  return output
}

const createLeftButtonHitboxStyleInstance = (
  splitButtonStyle: SplitButtonStyle<string>,
  splitButtonStateStyle: SplitButtonStateStyle,
  width: 'fitsContent' | 'fillsContainer',
  distribution: 'even' | 'proportional'
): ViewStyle => {
  const output = createSingleButtonHitboxStyleInstance(
    splitButtonStyle,
    splitButtonStateStyle,
    width,
    distribution
  )

  if (output.borderWidth !== undefined) {
    output.borderRightWidth = 0
  }

  if (output.borderRadius !== undefined) {
    output.borderTopLeftRadius = output.borderRadius
    output.borderBottomLeftRadius = output.borderRadius
    delete output.borderRadius
  }

  if (output.margin !== undefined) {
    output.marginRight = 0
  }

  return output
}

const createMiddleButtonHitboxStyleInstance = (
  splitButtonStyle: SplitButtonStyle<string>,
  splitButtonStateStyle: SplitButtonStateStyle,
  width: 'fitsContent' | 'fillsContainer',
  distribution: 'even' | 'proportional'
): ViewStyle => {
  const output = createSingleButtonHitboxStyleInstance(
    splitButtonStyle,
    splitButtonStateStyle,
    width,
    distribution
  )

  if (output.borderWidth !== undefined) {
    output.borderTopWidth = output.borderWidth
    output.borderBottomWidth = output.borderWidth
    delete output.borderWidth
  }

  if (output.margin !== undefined) {
    output.marginVertical = output.margin
    delete output.margin
  }

  delete output.borderRadius

  return output
}

const createRightButtonHitboxStyleInstance = (
  splitButtonStyle: SplitButtonStyle<string>,
  splitButtonStateStyle: SplitButtonStateStyle,
  width: 'fitsContent' | 'fillsContainer',
  distribution: 'even' | 'proportional'
): ViewStyle => {
  const output = createSingleButtonHitboxStyleInstance(
    splitButtonStyle,
    splitButtonStateStyle,
    width,
    distribution
  )

  if (output.borderWidth !== undefined) {
    output.borderLeftWidth = 0
  }

  if (output.borderRadius !== undefined) {
    output.borderTopRightRadius = output.borderRadius
    output.borderBottomRightRadius = output.borderRadius
    delete output.borderRadius
  }

  if (output.margin !== undefined) {
    output.marginLeft = 0
  }

  return output
}

const createButtonTextStyleInstance = (
  splitButtonStyle: SplitButtonStyle<string>,
  splitButtonStateStyle: SplitButtonStateStyle
): TextStyle => {
  return {
    fontFamily: splitButtonStyle.fontFamily,
    fontSize: splitButtonStyle.fontSize,
    lineHeight: splitButtonStyle.fontSize * 1.4,
    color: splitButtonStateStyle.color,
    textAlign: 'center'
  }
}

type Instance<TValue extends null | number | string> = React.FunctionComponent<
React.PropsWithChildren<{
  /**
     * The currently selected value.
     */
  readonly value: TValue

  /**
     * Invoked when the selected value changes.
     * @param to The newly selected value.
     */
  onChange: (to: TValue) => void

} & ({
  /**
   * Describes how the split button should be sized.
   */
  readonly width: 'fitsContent'

  /**
   * Describes how the width of the split button should be divided up.
   */
  readonly distribution: 'proportional'
} | {
  /**
   * Describes how the split button should be sized.
   */
  readonly width: 'fillsContainer'

  /**
     * Describes how the width of the split button should be divided up.
     */
  readonly distribution: 'even' | 'proportional'
})>
>

type SegmentInstance<TValue extends null | number | string> =
  React.FunctionComponent<{
    /**
     * The value of the segment.
     */
    readonly value: TValue

    /**
     * When true, the segment will style itself to appear disabled, and will not
     * accept user input.  It will otherwise style itself to appear enabled, and
     * will select the segment's value on press (assuming it is not already
     * selected).
     */
    readonly disabled: boolean

    /**
     * The text to display within the segment.
     */
    readonly children: string
  }>

/**
 * Creates a new React component representing a split button.
 * @template TType         The types of segment within the button.
 * @template TValue        The value selected using the button.
 * @param splitButtonStyle The style to apply to the split button.
 * @returns                The created React component.
 */
export const createSplitButtonComponent = <
  TType extends string,
  TValue extends null | number | string
>(
    splitButtonStyle: SplitButtonStyle<TType>
  ): Instance<TValue> & {
    readonly segments: {
      readonly [TTypeItem in TType]: SegmentInstance<TValue>;
    }
  } => {
  const styles = StyleSheet.create({
    view: {
      flexDirection: 'row',
      alignItems: 'stretch'
    }
  })

  const partialSegments: {
    [TTypeItem in TType]?: SegmentInstance<TValue>;
  } = {}

  const partialButtonFactories: {
    [TTypeItem in TType]?: (
      value: TValue,
      onChange: (to: TValue) => void,
      buttonPosition: 'single' | 'left' | 'middle' | 'right',
      buttonValue: TValue,
      buttonLabel: string,
      buttonDisabled: boolean,
      width: 'fitsContent' | 'fillsContainer',
      distribution: 'even' | 'proportional'
    ) => JSX.Element;
  } = {}

  for (const typeKey in splitButtonStyle.types) {
    const typeValue = splitButtonStyle.types[typeKey]

    const typeStyles = StyleSheet.create({
      inactiveEnabledSingleHitboxFitsContent: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled,
        'fitsContent',
        'proportional'
      ),
      inactiveEnabledLeftHitboxFitsContent: createLeftButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled,
        'fitsContent',
        'proportional'
      ),
      inactiveEnabledMiddleHitboxFitsContent: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled,
        'fitsContent',
        'proportional'
      ),
      inactiveEnabledRightHitboxFitsContent: createRightButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled,
        'fitsContent',
        'proportional'
      ),
      inactiveDisabledSingleHitboxFitsContent: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled,
        'fitsContent',
        'proportional'
      ),
      inactiveDisabledLeftHitboxFitsContent: createLeftButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled,
        'fitsContent',
        'proportional'
      ),
      inactiveDisabledMiddleHitboxFitsContent: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled,
        'fitsContent',
        'proportional'
      ),
      inactiveDisabledRightHitboxFitsContent: createRightButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled,
        'fitsContent',
        'proportional'
      ),

      activeEnabledSingleHitboxFitsContent: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled,
        'fitsContent',
        'proportional'
      ),
      activeEnabledLeftHitboxFitsContent: createLeftButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled,
        'fitsContent',
        'proportional'
      ),
      activeEnabledMiddleHitboxFitsContent: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled,
        'fitsContent',
        'proportional'
      ),
      activeEnabledRightHitboxFitsContent: createRightButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled,
        'fitsContent',
        'proportional'
      ),

      activeDisabledSingleHitboxFitsContent: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled,
        'fitsContent',
        'proportional'
      ),
      activeDisabledLeftHitboxFitsContent: createLeftButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled,
        'fitsContent',
        'proportional'
      ),
      activeDisabledMiddleHitboxFitsContent: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled,
        'fitsContent',
        'proportional'
      ),
      activeDisabledRightHitboxFitsContent: createRightButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled,
        'fitsContent',
        'proportional'
      ),

      inactiveEnabledSingleHitboxFillsContainerEven: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled,
        'fillsContainer',
        'even'
      ),
      inactiveEnabledLeftHitboxFillsContainerEven: createLeftButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled,
        'fillsContainer',
        'even'
      ),
      inactiveEnabledMiddleHitboxFillsContainerEven: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled,
        'fillsContainer',
        'even'
      ),
      inactiveEnabledRightHitboxFillsContainerEven: createRightButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled,
        'fillsContainer',
        'even'
      ),
      inactiveDisabledSingleHitboxFillsContainerEven: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled,
        'fillsContainer',
        'even'
      ),
      inactiveDisabledLeftHitboxFillsContainerEven: createLeftButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled,
        'fillsContainer',
        'even'
      ),
      inactiveDisabledMiddleHitboxFillsContainerEven: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled,
        'fillsContainer',
        'even'
      ),
      inactiveDisabledRightHitboxFillsContainerEven: createRightButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled,
        'fillsContainer',
        'even'
      ),

      activeEnabledSingleHitboxFillsContainerEven: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled,
        'fillsContainer',
        'even'
      ),
      activeEnabledLeftHitboxFillsContainerEven: createLeftButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled,
        'fillsContainer',
        'even'
      ),
      activeEnabledMiddleHitboxFillsContainerEven: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled,
        'fillsContainer',
        'even'
      ),
      activeEnabledRightHitboxFillsContainerEven: createRightButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled,
        'fillsContainer',
        'even'
      ),

      activeDisabledSingleHitboxFillsContainerEven: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled,
        'fillsContainer',
        'even'
      ),
      activeDisabledLeftHitboxFillsContainerEven: createLeftButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled,
        'fillsContainer',
        'even'
      ),
      activeDisabledMiddleHitboxFillsContainerEven: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled,
        'fillsContainer',
        'even'
      ),
      activeDisabledRightHitboxFillsContainerEven: createRightButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled,
        'fillsContainer',
        'even'
      ),

      inactiveEnabledSingleHitboxFillsContainerProportional: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled,
        'fillsContainer',
        'proportional'
      ),
      inactiveEnabledLeftHitboxFillsContainerProportional: createLeftButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled,
        'fillsContainer',
        'proportional'
      ),
      inactiveEnabledMiddleHitboxFillsContainerProportional: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled,
        'fillsContainer',
        'proportional'
      ),
      inactiveEnabledRightHitboxFillsContainerProportional: createRightButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled,
        'fillsContainer',
        'proportional'
      ),
      inactiveDisabledSingleHitboxFillsContainerProportional: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled,
        'fillsContainer',
        'proportional'
      ),
      inactiveDisabledLeftHitboxFillsContainerProportional: createLeftButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled,
        'fillsContainer',
        'proportional'
      ),
      inactiveDisabledMiddleHitboxFillsContainerProportional: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled,
        'fillsContainer',
        'proportional'
      ),
      inactiveDisabledRightHitboxFillsContainerProportional: createRightButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled,
        'fillsContainer',
        'proportional'
      ),

      activeEnabledSingleHitboxFillsContainerProportional: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled,
        'fillsContainer',
        'proportional'
      ),
      activeEnabledLeftHitboxFillsContainerProportional: createLeftButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled,
        'fillsContainer',
        'proportional'
      ),
      activeEnabledMiddleHitboxFillsContainerProportional: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled,
        'fillsContainer',
        'proportional'
      ),
      activeEnabledRightHitboxFillsContainerProportional: createRightButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled,
        'fillsContainer',
        'proportional'
      ),

      activeDisabledSingleHitboxFillsContainerProportional: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled,
        'fillsContainer',
        'proportional'
      ),
      activeDisabledLeftHitboxFillsContainerProportional: createLeftButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled,
        'fillsContainer',
        'proportional'
      ),
      activeDisabledMiddleHitboxFillsContainerProportional: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled,
        'fillsContainer',
        'proportional'
      ),
      activeDisabledRightHitboxFillsContainerProportional: createRightButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled,
        'fillsContainer',
        'proportional'
      ),

      inactiveEnabledText: createButtonTextStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled
      ),
      inactiveDisabledText: createButtonTextStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled
      ),
      activeEnabledText: createButtonTextStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled
      ),
      activeDisabledText: createButtonTextStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled
      )
    })

    /* istanbul ignore next */
    partialSegments[typeKey] = () => null

    partialButtonFactories[typeKey] = (
      value,
      onChange,
      buttonPosition,
      buttonValue,
      buttonLabel,
      buttonDisabled,
      width,
      distribution
    ) => {
      let hitboxStyle: ViewStyle
      let textStyle: TextStyle

      if (buttonValue === value) {
        if (buttonDisabled) {
          switch (buttonPosition) {
            case 'single':
              switch (width) {
                case 'fitsContent':
                  hitboxStyle = typeStyles.activeDisabledSingleHitboxFitsContent
                  break
                case 'fillsContainer':
                  switch (distribution) {
                    case 'even':
                      hitboxStyle = typeStyles.activeDisabledSingleHitboxFillsContainerEven
                      break
                    case 'proportional':
                      hitboxStyle = typeStyles.activeDisabledSingleHitboxFillsContainerProportional
                      break
                  }
                  break
              }
              break

            case 'left':
              switch (width) {
                case 'fitsContent':
                  hitboxStyle = typeStyles.activeDisabledLeftHitboxFitsContent
                  break
                case 'fillsContainer':
                  switch (distribution) {
                    case 'even':
                      hitboxStyle = typeStyles.activeDisabledLeftHitboxFillsContainerEven
                      break
                    case 'proportional':
                      hitboxStyle = typeStyles.activeDisabledLeftHitboxFillsContainerProportional
                      break
                  }
                  break
              }
              break

            case 'middle':
              switch (width) {
                case 'fitsContent':
                  hitboxStyle = typeStyles.activeDisabledMiddleHitboxFitsContent
                  break
                case 'fillsContainer':
                  switch (distribution) {
                    case 'even':
                      hitboxStyle = typeStyles.activeDisabledMiddleHitboxFillsContainerEven
                      break
                    case 'proportional':
                      hitboxStyle = typeStyles.activeDisabledMiddleHitboxFillsContainerProportional
                      break
                  }
                  break
              }
              break

            case 'right':
              switch (width) {
                case 'fitsContent':
                  hitboxStyle = typeStyles.activeDisabledRightHitboxFitsContent
                  break
                case 'fillsContainer':
                  switch (distribution) {
                    case 'even':
                      hitboxStyle = typeStyles.activeDisabledRightHitboxFillsContainerEven
                      break
                    case 'proportional':
                      hitboxStyle = typeStyles.activeDisabledRightHitboxFillsContainerProportional
                      break
                  }
                  break
              }
              break
          }

          textStyle = typeStyles.activeDisabledText
        } else {
          switch (buttonPosition) {
            case 'single':
              switch (width) {
                case 'fitsContent':
                  hitboxStyle = typeStyles.activeEnabledSingleHitboxFitsContent
                  break
                case 'fillsContainer':
                  switch (distribution) {
                    case 'even':
                      hitboxStyle = typeStyles.activeEnabledSingleHitboxFillsContainerEven
                      break
                    case 'proportional':
                      hitboxStyle = typeStyles.activeEnabledSingleHitboxFillsContainerProportional
                      break
                  }
                  break
              }
              break

            case 'left':
              switch (width) {
                case 'fitsContent':
                  hitboxStyle = typeStyles.activeEnabledLeftHitboxFitsContent
                  break
                case 'fillsContainer':
                  switch (distribution) {
                    case 'even':
                      hitboxStyle = typeStyles.activeEnabledLeftHitboxFillsContainerEven
                      break
                    case 'proportional':
                      hitboxStyle = typeStyles.activeEnabledLeftHitboxFillsContainerProportional
                      break
                  }
                  break
              }
              break

            case 'middle':
              switch (width) {
                case 'fitsContent':
                  hitboxStyle = typeStyles.activeEnabledMiddleHitboxFitsContent
                  break
                case 'fillsContainer':
                  switch (distribution) {
                    case 'even':
                      hitboxStyle = typeStyles.activeEnabledMiddleHitboxFillsContainerEven
                      break
                    case 'proportional':
                      hitboxStyle = typeStyles.activeEnabledMiddleHitboxFillsContainerProportional
                      break
                  }
                  break
              }
              break

            case 'right':
              switch (width) {
                case 'fitsContent':
                  hitboxStyle = typeStyles.activeEnabledRightHitboxFitsContent
                  break
                case 'fillsContainer':
                  switch (distribution) {
                    case 'even':
                      hitboxStyle = typeStyles.activeEnabledRightHitboxFillsContainerEven
                      break
                    case 'proportional':
                      hitboxStyle = typeStyles.activeEnabledRightHitboxFillsContainerProportional
                      break
                  }
                  break
              }
              break
          }

          textStyle = typeStyles.activeEnabledText
        }
      } else {
        if (buttonDisabled) {
          switch (buttonPosition) {
            case 'single':
              switch (width) {
                case 'fitsContent':
                  hitboxStyle = typeStyles.inactiveDisabledSingleHitboxFitsContent
                  break
                case 'fillsContainer':
                  switch (distribution) {
                    case 'even':
                      hitboxStyle = typeStyles.inactiveDisabledSingleHitboxFillsContainerEven
                      break
                    case 'proportional':
                      hitboxStyle = typeStyles.inactiveDisabledSingleHitboxFillsContainerProportional
                      break
                  }
                  break
              }
              break

            case 'left':
              switch (width) {
                case 'fitsContent':
                  hitboxStyle = typeStyles.inactiveDisabledLeftHitboxFitsContent
                  break
                case 'fillsContainer':
                  switch (distribution) {
                    case 'even':
                      hitboxStyle = typeStyles.inactiveDisabledLeftHitboxFillsContainerEven
                      break
                    case 'proportional':
                      hitboxStyle = typeStyles.inactiveDisabledLeftHitboxFillsContainerProportional
                      break
                  }
                  break
              }
              break

            case 'middle':
              switch (width) {
                case 'fitsContent':
                  hitboxStyle = typeStyles.inactiveDisabledMiddleHitboxFitsContent
                  break
                case 'fillsContainer':
                  switch (distribution) {
                    case 'even':
                      hitboxStyle = typeStyles.inactiveDisabledMiddleHitboxFillsContainerEven
                      break
                    case 'proportional':
                      hitboxStyle = typeStyles.inactiveDisabledMiddleHitboxFillsContainerProportional
                      break
                  }
                  break
              }
              break

            case 'right':
              switch (width) {
                case 'fitsContent':
                  hitboxStyle = typeStyles.inactiveDisabledRightHitboxFitsContent
                  break
                case 'fillsContainer':
                  switch (distribution) {
                    case 'even':
                      hitboxStyle = typeStyles.inactiveDisabledRightHitboxFillsContainerEven
                      break
                    case 'proportional':
                      hitboxStyle = typeStyles.inactiveDisabledRightHitboxFillsContainerProportional
                      break
                  }
                  break
              }
              break
          }

          textStyle = typeStyles.inactiveDisabledText
        } else {
          switch (buttonPosition) {
            case 'single':
              switch (width) {
                case 'fitsContent':
                  hitboxStyle = typeStyles.inactiveEnabledSingleHitboxFitsContent
                  break
                case 'fillsContainer':
                  switch (distribution) {
                    case 'even':
                      hitboxStyle = typeStyles.inactiveEnabledSingleHitboxFillsContainerEven
                      break
                    case 'proportional':
                      hitboxStyle = typeStyles.inactiveEnabledSingleHitboxFillsContainerProportional
                      break
                  }
                  break
              }
              break

            case 'left':
              switch (width) {
                case 'fitsContent':
                  hitboxStyle = typeStyles.inactiveEnabledLeftHitboxFitsContent
                  break
                case 'fillsContainer':
                  switch (distribution) {
                    case 'even':
                      hitboxStyle = typeStyles.inactiveEnabledLeftHitboxFillsContainerEven
                      break
                    case 'proportional':
                      hitboxStyle = typeStyles.inactiveEnabledLeftHitboxFillsContainerProportional
                      break
                  }
                  break
              }
              break

            case 'middle':
              switch (width) {
                case 'fitsContent':
                  hitboxStyle = typeStyles.inactiveEnabledMiddleHitboxFitsContent
                  break
                case 'fillsContainer':
                  switch (distribution) {
                    case 'even':
                      hitboxStyle = typeStyles.inactiveEnabledMiddleHitboxFillsContainerEven
                      break
                    case 'proportional':
                      hitboxStyle = typeStyles.inactiveEnabledMiddleHitboxFillsContainerProportional
                      break
                  }
                  break
              }
              break

            case 'right':
              switch (width) {
                case 'fitsContent':
                  hitboxStyle = typeStyles.inactiveEnabledRightHitboxFitsContent
                  break
                case 'fillsContainer':
                  switch (distribution) {
                    case 'even':
                      hitboxStyle = typeStyles.inactiveEnabledRightHitboxFillsContainerEven
                      break
                    case 'proportional':
                      hitboxStyle = typeStyles.inactiveEnabledRightHitboxFillsContainerProportional
                      break
                  }
                  break
              }
              break
          }

          textStyle = typeStyles.inactiveEnabledText
        }
      }

      return (
        <Hitbox
          key={String(buttonValue)}
          style={hitboxStyle}
          disabled={buttonDisabled || buttonValue === value}
          onPress={() => {
            onChange(buttonValue)
          }}
        >
          <Text style={textStyle} numberOfLines={1}>
            {buttonLabel}
          </Text>
        </Hitbox>
      )
    }
  }

  const segments = partialSegments as {
    readonly [TTypeItem in TType]: SegmentInstance<TValue>;
  }

  const buttonFactories: {
    readonly [TTypeItem in TType]: (
      value: TValue,
      onChange: (to: TValue) => void,
      buttonPosition: 'single' | 'left' | 'middle' | 'right',
      buttonValue: TValue,
      buttonLabel: string,
      buttonDisabled: boolean,
      width: 'fitsContent' | 'fillsContainer',
      distribution: 'even' | 'proportional'
    ) => JSX.Element;
  } = partialButtonFactories as {
    [TTypeItem in TType]: (
      value: TValue,
      onChange: (to: TValue) => void,
      buttonPosition: 'single' | 'left' | 'middle' | 'right',
      buttonValue: TValue,
      buttonLabel: string,
      buttonDisabled: boolean,
      width: 'fitsContent' | 'fillsContainer',
      distribution: 'even' | 'proportional'
    ) => JSX.Element;
  }

  const SplitButton: Instance<TValue> & {
    segments?: {
      readonly [TTypeItem in TType]: SegmentInstance<TValue>;
    }
  } = ({ value, onChange, children, width, distribution }) => {
    const childrenArray = flattenRenderedToArray(children)

    return (
      <View style={styles.view}>
        {childrenArray
          .filter((element): element is JSX.Element => element !== null)
          .map((element, i) => {
            if (typeof element === 'object' && 'type' in element) {
              for (const typeKey in segments) {
                if (segments[typeKey] === element.type) {
                  return buttonFactories[typeKey](
                    value,
                    onChange,
                    childrenArray.length === 1
                      ? 'single'
                      : i === 0
                        ? 'left'
                        : i === childrenArray.length - 1
                          ? 'right'
                          : 'middle',
                    element.props.value,
                    element.props.children,
                    element.props.disabled,
                    width,
                    distribution
                  )
                }
              }
            }

            throw new Error('Unexpected child in split button.')
          })}
      </View>
    )
  }

  SplitButton.segments = segments

  return SplitButton as Instance<TValue> & {
    readonly segments: {
      readonly [TTypeItem in TType]: SegmentInstance<TValue>;
    }
  }
}
