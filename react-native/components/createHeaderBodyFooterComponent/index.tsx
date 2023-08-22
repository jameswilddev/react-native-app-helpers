import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { isRenderedByReact } from '../../utilities/isRenderedByReact'
import type { HeaderBodyFooterProps } from '../../types/HeaderBodyFooterProps'

const wrappingViewBase = {
  width: '100%',
  height: '100%'
}

const globalStyles = StyleSheet.create({
  emptyWrappingView: {
    ...wrappingViewBase
  },
  wrappingView: {
    ...wrappingViewBase,
    flex: 1
  },
  wrappingViewWithoutBody: {
    ...wrappingViewBase,
    flex: 1,
    justifyContent: 'space-between'
  },
  wrappingViewWithOnlyFooter: {
    ...wrappingViewBase,
    flex: 1,
    justifyContent: 'flex-end'
  },
  bodyView: {
    flexShrink: 1,
    flexGrow: 1,
    overflow: 'hidden'
  }
})

/**
 * Creates a new React component which displays a header above and a footer
 * below a fluid-height body.
 * @param headerBodySpacing The amount of spacing between the header and the
 *                          body.  May be negative.
 * @param bodyFooterSpacing The amount of spacing between the body and the
 *                          footer.  May be negative.
 * @returns A new React component which surrounds its children with padding.
 */
export const createHeaderBodyFooterComponent = (
  headerBodySpacing: number,
  bodyFooterSpacing: number
): React.FunctionComponent<HeaderBodyFooterProps> => {
  const localStyles = StyleSheet.create({
    headerView: {
      marginBottom: headerBodySpacing
    },
    footerView: {
      marginTop: bodyFooterSpacing
    }
  })

  const HeaderBodyFooter: React.FunctionComponent<HeaderBodyFooterProps> = ({ header, body, footer }) => {
    if (isRenderedByReact(header)) {
      if (isRenderedByReact(body)) {
        if (isRenderedByReact(footer)) {
          return (
            <View pointerEvents="box-none" style={globalStyles.wrappingView}>
              <View
                pointerEvents="box-none"
                {...(headerBodySpacing === 0
                  ? {}
                  : { style: localStyles.headerView })}
              >
                {header}
              </View>
              <View style={globalStyles.bodyView} pointerEvents="box-none">
                {body}
              </View>
              <View
                pointerEvents="box-none"
                {...(bodyFooterSpacing === 0
                  ? {}
                  : { style: localStyles.footerView }
                  )}
              >
                {footer}
              </View>
            </View>
          )
        } else {
          return (
            <View pointerEvents="box-none" style={globalStyles.wrappingView}>
              <View
                pointerEvents="box-none"
                {...(headerBodySpacing === 0
                  ? {}
                  : { style: localStyles.headerView }
                  )}
              >
                {header}
              </View>
              <View style={globalStyles.bodyView} pointerEvents="box-none">
                {body}
              </View>
            </View>
          )
        }
      } else {
        if (isRenderedByReact(footer)) {
          return (
            <View
              pointerEvents="box-none"
              style={globalStyles.wrappingViewWithoutBody}
            >
              <View pointerEvents="box-none">{header}</View>
              <View pointerEvents="box-none">{footer}</View>
            </View>
          )
        } else {
          return (
            <View pointerEvents="box-none" style={globalStyles.wrappingView}>
              <View pointerEvents="box-none">{header}</View>
            </View>
          )
        }
      }
    } else {
      if (isRenderedByReact(body)) {
        if (isRenderedByReact(footer)) {
          return (
            <View pointerEvents="box-none" style={globalStyles.wrappingView}>
              <View style={globalStyles.bodyView} pointerEvents="box-none">
                {body}
              </View>
              <View
                pointerEvents="box-none"
                {...(bodyFooterSpacing === 0
                  ? {}
                  : { style: localStyles.footerView }
                  )}
              >
                {footer}
              </View>
            </View>
          )
        } else {
          return (
            <View pointerEvents="box-none" style={globalStyles.wrappingView}>
              <View style={globalStyles.bodyView} pointerEvents="box-none">
                {body}
              </View>
            </View>
          )
        }
      } else {
        if (isRenderedByReact(footer)) {
          return (
            <View
              pointerEvents="box-none"
              style={globalStyles.wrappingViewWithOnlyFooter}
            >
              <View pointerEvents="box-none">{footer}</View>
            </View>
          )
        } else {
          return (
            <View
              pointerEvents="box-none"
              style={globalStyles.emptyWrappingView}
            />
          )
        }
      }
    }
  }

  return HeaderBodyFooter
}
