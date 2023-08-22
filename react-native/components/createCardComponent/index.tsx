import * as React from 'react'
import { StyleSheet, View, type ViewStyle } from 'react-native'
import type { BorderStyle } from '../../types/BorderStyle'
import { shadow } from '../helpers'

const globalStyles = StyleSheet.create({
  fillsContainerFillsContainer: {
    width: '100%',
    height: '100%'
  },
  fillsContainerFitsContent: {
    width: '100%'
  },
  fitsContentFillsContainer: {
    height: '100%'
  }
})

/**
 * Creates a new React component which wraps other elements with optional
 * rounded corners and shadows.
 * @param borderRadius The border radius to use.
 * @param shadowRadius The shadow radius to use.
 * @param border       The border to use (or null when no border is to be used).
 * @returns The created React component.
 */
export const createCardComponent = (
  borderRadius: number,
  shadowRadius: number,
  border: null | BorderStyle
): React.FunctionComponent<
React.PropsWithChildren<{
  readonly width: 'fillsContainer' | 'fitsContent'
  readonly height: 'fillsContainer' | 'fitsContent'
}>
> => {
  if (borderRadius === 0) {
    if (shadowRadius === 0) {
      if (border === null) {
        return ({ width, height, children }) => {
          if (width === 'fillsContainer') {
            if (height === 'fillsContainer') {
              return (
                <View style={globalStyles.fillsContainerFillsContainer}>
                  {children}
                </View>
              )
            } else {
              return (
                <View style={globalStyles.fillsContainerFitsContent}>
                  {children}
                </View>
              )
            }
          } else {
            if (height === 'fillsContainer') {
              return (
                <View style={globalStyles.fitsContentFillsContainer}>
                  {children}
                </View>
              )
            } else {
              return <View>{children}</View>
            }
          }
        }
      } else {
        const base: ViewStyle = {
          borderWidth: border.width,
          borderColor: border.color
        }

        const globalStyles = StyleSheet.create({
          fitsContentFitsContent: {
            ...base
          },
          fillsContainerFillsContainer: {
            ...base,
            width: '100%',
            height: '100%'
          },
          fillsContainerFitsContent: {
            ...base,
            width: '100%'
          },
          fitsContentFillsContainer: {
            ...base,
            height: '100%'
          }
        })

        return ({ width, height, children }) => {
          if (width === 'fillsContainer') {
            if (height === 'fillsContainer') {
              return (
                <View style={globalStyles.fillsContainerFillsContainer}>
                  {children}
                </View>
              )
            } else {
              return (
                <View style={globalStyles.fillsContainerFitsContent}>
                  {children}
                </View>
              )
            }
          } else {
            if (height === 'fillsContainer') {
              return (
                <View style={globalStyles.fitsContentFillsContainer}>
                  {children}
                </View>
              )
            } else {
              return (
                <View style={globalStyles.fitsContentFitsContent}>
                  {children}
                </View>
              )
            }
          }
        }
      }
    } else {
      const base: ViewStyle = shadow(shadowRadius)

      if (border !== null) {
        base.borderWidth = border.width
        base.borderColor = border.color
      }

      const styles = StyleSheet.create({
        fillsContainerFillsContainer: {
          ...base,
          width: '100%',
          height: '100%'
        },
        fillsContainerFitsContent: {
          ...base,
          width: '100%'
        },
        fitsContentFillsContainer: {
          ...base,
          height: '100%'
        },
        fitsContentFitsContent: {
          ...base
        }
      })

      return ({ width, height, children }) => {
        if (width === 'fillsContainer') {
          if (height === 'fillsContainer') {
            return (
              <View style={styles.fillsContainerFillsContainer}>
                {children}
              </View>
            )
          } else {
            return (
              <View style={styles.fillsContainerFitsContent}>{children}</View>
            )
          }
        } else {
          if (height === 'fillsContainer') {
            return (
              <View style={styles.fitsContentFillsContainer}>{children}</View>
            )
          } else {
            return (
              <View style={styles.fitsContentFitsContent}>{children}</View>
            )
          }
        }
      }
    }
  } else {
    if (shadowRadius === 0) {
      const base: ViewStyle = { borderRadius, overflow: 'hidden' }

      if (border !== null) {
        base.borderWidth = border.width
        base.borderColor = border.color
      }

      const styles = StyleSheet.create({
        fillsContainerFillsContainer: {
          ...base,
          width: '100%',
          height: '100%'
        },
        fillsContainerFitsContent: {
          ...base,
          width: '100%'
        },
        fitsContentFillsContainer: {
          ...base,
          height: '100%'
        },
        fitsContentFitsContent: {
          ...base
        }
      })

      return ({ width, height, children }) => {
        if (width === 'fillsContainer') {
          if (height === 'fillsContainer') {
            return (
              <View style={styles.fillsContainerFillsContainer}>
                {children}
              </View>
            )
          } else {
            return (
              <View style={styles.fillsContainerFitsContent}>{children}</View>
            )
          }
        } else {
          if (height === 'fillsContainer') {
            return (
              <View style={styles.fitsContentFillsContainer}>{children}</View>
            )
          } else {
            return (
              <View style={styles.fitsContentFitsContent}>{children}</View>
            )
          }
        }
      }
    } else {
      const outerBase: ViewStyle = {
        borderRadius,
        ...shadow(shadowRadius)
      }

      const innerBase: ViewStyle = {
        borderRadius,
        overflow: 'hidden'
      }

      if (border !== null) {
        innerBase.borderWidth = border.width
        innerBase.borderColor = border.color
      }

      const styles = StyleSheet.create({
        outerFillsContainerFillsContainer: {
          ...outerBase,
          width: '100%',
          height: '100%'
        },
        outerFillsContainerFitsContent: {
          ...outerBase,
          width: '100%'
        },
        outerFitsContentFillsContainer: {
          ...outerBase,
          height: '100%'
        },
        outerFitsContentFitsContent: {
          ...outerBase
        },
        innerFillsContainerFillsContainer: {
          ...innerBase,
          width: '100%',
          height: '100%'
        },
        innerFillsContainerFitsContent: {
          ...innerBase,
          width: '100%'
        },
        innerFitsContentFillsContainer: {
          ...innerBase,
          height: '100%'
        },
        innerFitsContentFitsContent: {
          ...innerBase
        }
      })

      return ({ width, height, children }) => {
        if (width === 'fillsContainer') {
          if (height === 'fillsContainer') {
            return (
              <View style={styles.outerFillsContainerFillsContainer}>
                <View style={styles.innerFillsContainerFillsContainer}>
                  {children}
                </View>
              </View>
            )
          } else {
            return (
              <View style={styles.outerFillsContainerFitsContent}>
                <View style={styles.innerFillsContainerFitsContent}>
                  {children}
                </View>
              </View>
            )
          }
        } else {
          if (height === 'fillsContainer') {
            return (
              <View style={styles.outerFitsContentFillsContainer}>
                <View style={styles.innerFitsContentFillsContainer}>
                  {children}
                </View>
              </View>
            )
          } else {
            return (
              <View style={styles.outerFitsContentFitsContent}>
                <View style={styles.innerFitsContentFitsContent}>
                  {children}
                </View>
              </View>
            )
          }
        }
      }
    }
  }
}
