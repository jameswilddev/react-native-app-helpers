import * as React from 'react'
import { type ColorValue, StyleSheet, Text as RNText } from 'react-native'
import { Hitbox } from '../Hitbox'
import type { TextProps } from '../../types/TextProps'

/**
 * Creates a new React component which can be used to render text.
 * @param fontFamily The font family to use.
 * @param fontSize The font size to use.  Line height will be adjusted to match.
 * @param color The color to use.
 * @param alignment The horizontal alignment to use.
 * @param multiLine When true, text will wrap across multiple lines when it does
 *                  not fit within the available width.  When false, text will
 *                  be truncated with an ellipsis.
 * @param decoration When null, the text is not decorated.  Otherwise, a
 *                   description of the decoration to apply.
 * @returns A new React component which can be used to render text.
 */
export const createTextComponent = (
  fontFamily: string,
  fontSize: number,
  color: ColorValue,
  alignment: 'left' | 'center' | 'right',
  multiLine: boolean,
  decoration: null | (({
    readonly underline: true
    readonly strikethrough: true
  } | {
    readonly underline: false
    readonly strikethrough: true
  } | {
    readonly underline: true
    readonly strikethrough: false
  }) & {
    /**
     * The style of the text decoration to apply.
     */
    readonly style: 'solid' | 'double' | 'dotted' | 'dashed'

    /**
     * The color of hte xt d
     */
    readonly color: ColorValue
  })
): React.FunctionComponent<TextProps> => {
  const styles = StyleSheet.create({
    text: {
      fontFamily,
      fontSize,
      lineHeight: fontSize * 1.4,
      color,
      textAlign: alignment,
      flexShrink: 1,
      textDecorationLine: decoration === null ? 'none' : (decoration.strikethrough ? (decoration.underline ? 'underline line-through' : 'line-through') : 'underline'),
      textDecorationColor: decoration === null ? undefined : decoration.color,
      textDecorationStyle: decoration === null ? undefined : decoration.style
    }
  })

  const Text: React.FunctionComponent<TextProps> = ({ onPress, children }) => (
    <RNText
      style={styles.text}
      numberOfLines={multiLine ? 0 : 1}
      {...(onPress === undefined
        ? {}
        : {
            onPress: () => {
              if (Hitbox.enabled) {
                onPress()
              }
            }
          }
        )}
    >
      {children}
    </RNText>
  )

  return Text
}
