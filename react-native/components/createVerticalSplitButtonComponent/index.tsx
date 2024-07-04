import * as React from 'react'
import { StyleSheet, Text, type TextStyle, View, type ViewStyle } from 'react-native'
import { flattenRenderedToArray } from '../../utilities/flattenRenderedToArray'
import type { SplitButtonStyle } from '../../types/SplitButtonStyle'
import type { SplitButtonStateStyle } from '../../types/SplitButtonStateStyle'
import { Hitbox } from '../Hitbox'

const createSingleButtonHitboxStyleInstance = (
  splitButtonStyle: SplitButtonStyle<string>,
  splitButtonStateStyle: SplitButtonStateStyle
): ViewStyle => {
  const output: ViewStyle = {
    backgroundColor: splitButtonStateStyle.backgroundColor
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

const createTopButtonHitboxStyleInstance = (
  splitButtonStyle: SplitButtonStyle<string>,
  splitButtonStateStyle: SplitButtonStateStyle
): ViewStyle => {
  const output = createSingleButtonHitboxStyleInstance(
    splitButtonStyle,
    splitButtonStateStyle
  )

  if (output.borderWidth !== undefined) {
    output.borderBottomWidth = 0
  }

  if (output.borderRadius !== undefined) {
    output.borderTopLeftRadius = output.borderRadius
    output.borderTopRightRadius = output.borderRadius
    delete output.borderRadius
  }

  if (output.margin !== undefined) {
    output.marginBottom = 0
  }

  return output
}

const createMiddleButtonHitboxStyleInstance = (
  splitButtonStyle: SplitButtonStyle<string>,
  splitButtonStateStyle: SplitButtonStateStyle
): ViewStyle => {
  const output = createSingleButtonHitboxStyleInstance(
    splitButtonStyle,
    splitButtonStateStyle
  )

  if (output.borderWidth !== undefined) {
    output.borderLeftWidth = output.borderWidth
    output.borderRightWidth = output.borderWidth
    delete output.borderWidth
  }

  if (output.margin !== undefined) {
    output.marginHorizontal = output.margin
    delete output.margin
  }

  delete output.borderRadius

  return output
}

const createBottomButtonHitboxStyleInstance = (
  splitButtonStyle: SplitButtonStyle<string>,
  splitButtonStateStyle: SplitButtonStateStyle
): ViewStyle => {
  const output = createSingleButtonHitboxStyleInstance(
    splitButtonStyle,
    splitButtonStateStyle
  )

  if (output.borderWidth !== undefined) {
    output.borderTopWidth = 0
  }

  if (output.borderRadius !== undefined) {
    output.borderBottomLeftRadius = output.borderRadius
    output.borderBottomRightRadius = output.borderRadius
    delete output.borderRadius
  }

  if (output.margin !== undefined) {
    output.marginTop = 0
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

type Instance<TValue extends null | boolean | number | string> = React.FunctionComponent<
React.PropsWithChildren<{
  /**
     * The currently selected values.
     */
  readonly value: readonly TValue[]

  /**
     * Invoked when the selected value changes.
     * @param to The newly selected values.
     */
  onChange: (to: readonly TValue[]) => void

}>
>

type SegmentInstance<TValue extends null | boolean | number | string> =
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
export const createVerticalSplitButtonComponent = <
  TType extends string,
  TValue extends null | boolean | number | string
>(
    splitButtonStyle: SplitButtonStyle<TType>
  ): Instance<TValue> & {
    readonly segments: {
      readonly [TTypeItem in TType]: SegmentInstance<TValue>;
    }
  } => {
  const styles = StyleSheet.create({
    view: {
      flexDirection: 'column',
      alignItems: 'stretch'
    }
  })

  const partialSegments: {
    [TTypeItem in TType]?: SegmentInstance<TValue>;
  } = {}

  const partialButtonFactories: {
    [TTypeItem in TType]?: (
      value: readonly TValue[],
      onChange: (to: readonly TValue[]) => void,
      buttonPosition: 'single' | 'top' | 'middle' | 'bottom',
      buttonValue: TValue,
      buttonLabel: string,
      buttonDisabled: boolean,
      allButtonValues: readonly TValue[]
    ) => JSX.Element;
  } = {}

  for (const typeKey in splitButtonStyle.types) {
    const typeValue = splitButtonStyle.types[typeKey]

    const typeStyles = StyleSheet.create({
      inactiveEnabledSingleHitbox: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled
      ),
      inactiveEnabledTopHitbox: createTopButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled
      ),
      inactiveEnabledMiddleHitbox: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled
      ),
      inactiveEnabledBottomHitbox: createBottomButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled
      ),

      inactiveDisabledSingleHitbox: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled
      ),
      inactiveDisabledTopHitbox: createTopButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled
      ),
      inactiveDisabledMiddleHitbox: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled
      ),
      inactiveDisabledBottomHitbox: createBottomButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled
      ),

      activeEnabledSingleHitbox: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled
      ),
      activeEnabledTopHitbox: createTopButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled
      ),
      activeEnabledMiddleHitbox: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled
      ),
      activeEnabledBottomHitbox: createBottomButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled
      ),

      activeDisabledSingleHitbox: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled
      ),
      activeDisabledTopHitbox: createTopButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled
      ),
      activeDisabledMiddleHitbox: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled
      ),
      activeDisabledBottomHitbox: createBottomButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled
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
      allButtonValues
    ) => {
      let hitboxStyle: ViewStyle
      let textStyle: TextStyle

      if (value.includes(buttonValue)) {
        if (buttonDisabled) {
          switch (buttonPosition) {
            case 'single':
              hitboxStyle = typeStyles.activeDisabledSingleHitbox
              break

            case 'top':
              hitboxStyle = typeStyles.activeDisabledTopHitbox
              break

            case 'middle':
              hitboxStyle = typeStyles.activeDisabledMiddleHitbox
              break

            case 'bottom':
              hitboxStyle = typeStyles.activeDisabledBottomHitbox
              break
          }

          textStyle = typeStyles.activeDisabledText
        } else {
          switch (buttonPosition) {
            case 'single':
              hitboxStyle = typeStyles.activeEnabledSingleHitbox
              break

            case 'top':
              hitboxStyle = typeStyles.activeEnabledTopHitbox
              break

            case 'middle':
              hitboxStyle = typeStyles.activeEnabledMiddleHitbox
              break

            case 'bottom':
              hitboxStyle = typeStyles.activeEnabledBottomHitbox
              break
          }

          textStyle = typeStyles.activeEnabledText
        }
      } else {
        if (buttonDisabled) {
          switch (buttonPosition) {
            case 'single':
              hitboxStyle = typeStyles.inactiveDisabledSingleHitbox
              break

            case 'top':
              hitboxStyle = typeStyles.inactiveDisabledTopHitbox
              break

            case 'middle':
              hitboxStyle = typeStyles.inactiveDisabledMiddleHitbox
              break

            case 'bottom':
              hitboxStyle = typeStyles.inactiveDisabledBottomHitbox
              break
          }

          textStyle = typeStyles.inactiveDisabledText
        } else {
          switch (buttonPosition) {
            case 'single':
              hitboxStyle = typeStyles.inactiveEnabledSingleHitbox
              break

            case 'top':
              hitboxStyle = typeStyles.inactiveEnabledTopHitbox
              break

            case 'middle':
              hitboxStyle = typeStyles.inactiveEnabledMiddleHitbox
              break

            case 'bottom':
              hitboxStyle = typeStyles.inactiveEnabledBottomHitbox
              break
          }

          textStyle = typeStyles.inactiveEnabledText
        }
      }

      return (
        <Hitbox
          key={String(buttonValue)}
          style={hitboxStyle}
          disabled={buttonDisabled}
          onPress={() => {
            if (value.includes(buttonValue)) {
              onChange(value.filter(item => allButtonValues.includes(item) && item !== buttonValue))
            } else {
              onChange([...value.filter(item => allButtonValues.includes(item)), buttonValue])
            }
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
      value: readonly TValue[],
      onChange: (to: readonly TValue[]) => void,
      buttonPosition: 'single' | 'top' | 'middle' | 'bottom',
      buttonValue: TValue,
      buttonLabel: string,
      buttonDisabled: boolean,
      allButtonValues: readonly TValue[]
    ) => JSX.Element;
  } = partialButtonFactories as {
    [TTypeItem in TType]: (
      value: readonly TValue[],
      onChange: (to: readonly TValue[]) => void,
      buttonPosition: 'single' | 'top' | 'middle' | 'bottom',
      buttonValue: TValue,
      buttonLabel: string,
      buttonDisabled: boolean,
      allButtonValues: readonly TValue[]
    ) => JSX.Element;
  }

  const SplitButton: Instance<TValue> & {
    segments?: {
      readonly [TTypeItem in TType]: SegmentInstance<TValue>;
    }
  } = ({ value, onChange, children }) => {
    const childrenArray = flattenRenderedToArray(children)

    const allButtonValues: TValue[] = []

    return (
      <View style={styles.view}>
        {childrenArray
          .filter((element): element is JSX.Element => element !== null)
          .map((element, i) => {
            if (typeof element === 'object' && 'type' in element) {
              for (const typeKey in segments) {
                if (segments[typeKey] === element.type) {
                  allButtonValues.push(element.props.value)

                  return buttonFactories[typeKey](
                    value,
                    onChange,
                    childrenArray.length === 1
                      ? 'single'
                      : i === 0
                        ? 'top'
                        : i === childrenArray.length - 1
                          ? 'bottom'
                          : 'middle',
                    element.props.value,
                    element.props.children,
                    element.props.disabled,
                    allButtonValues
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
