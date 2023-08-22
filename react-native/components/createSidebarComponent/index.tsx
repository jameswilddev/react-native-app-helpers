import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import type { SidebarProps } from '../../types/SidebarProps'
import { isRenderedByReact } from '../../utilities/isRenderedByReact'

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
    flex: 1,
    flexDirection: 'row'
  },
  wrappingViewWithoutBody: {
    ...wrappingViewBase,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  wrappingViewWithOnlyRight: {
    ...wrappingViewBase,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  bodyView: {
    flexShrink: 1,
    flexGrow: 1,
    overflow: 'hidden'
  }
})

/**
 * Creates a new React component which displays sidebars to the left and right
 * of a fluid-width body.
 * @param leftBodySpacing  The amount of spacing between the left sidebar and
 *                         the body.  May be negative.
 * @param bodyRightSpacing The amount of spacing between the body and the right
 *                         sidebar.  May be negative.
 * @returns                The created React component.
 */
export const createSidebarComponent = (
  leftBodySpacing: number,
  bodyRightSpacing: number
): React.FunctionComponent<SidebarProps> => {
  const localStyles = StyleSheet.create({
    leftView: {
      marginRight: leftBodySpacing
    },
    rightView: {
      marginLeft: bodyRightSpacing
    }
  })

  const Sidebar: React.FunctionComponent<SidebarProps> = ({ left, body, right }) => {
    if (isRenderedByReact(left)) {
      if (isRenderedByReact(body)) {
        if (isRenderedByReact(right)) {
          return (
            <View pointerEvents="box-none" style={globalStyles.wrappingView}>
              <View
                pointerEvents="box-none"
                {...(leftBodySpacing === 0 ? {} : { style: localStyles.leftView })}
              >
                {left}
              </View>
              <View style={globalStyles.bodyView} pointerEvents="box-none">
                {body}
              </View>
              <View
                pointerEvents="box-none"
                {...(bodyRightSpacing === 0 ? {} : { style: localStyles.rightView })}
              >
                {right}
              </View>
            </View>
          )
        } else {
          return (
            <View pointerEvents="box-none" style={globalStyles.wrappingView}>
              <View
                pointerEvents="box-none"
                {...(leftBodySpacing === 0 ? {} : { style: localStyles.leftView })}
              >
                {left}
              </View>
              <View style={globalStyles.bodyView} pointerEvents="box-none">
                {body}
              </View>
            </View>
          )
        }
      } else {
        if (isRenderedByReact(right)) {
          return (
            <View
              pointerEvents="box-none"
              style={globalStyles.wrappingViewWithoutBody}
            >
              <View pointerEvents="box-none">{left}</View>
              <View pointerEvents="box-none">{right}</View>
            </View>
          )
        } else {
          return (
            <View pointerEvents="box-none" style={globalStyles.wrappingView}>
              <View pointerEvents="box-none">{left}</View>
            </View>
          )
        }
      }
    } else {
      if (isRenderedByReact(body)) {
        if (isRenderedByReact(right)) {
          return (
            <View pointerEvents="box-none" style={globalStyles.wrappingView}>
              <View style={globalStyles.bodyView} pointerEvents="box-none">
                {body}
              </View>
              <View
                pointerEvents="box-none"
                {...(bodyRightSpacing === 0 ? {} : { style: localStyles.rightView })}
              >
                {right}
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
        if (isRenderedByReact(right)) {
          return (
            <View
              pointerEvents="box-none"
              style={globalStyles.wrappingViewWithOnlyRight}
            >
              <View pointerEvents="box-none">{right}</View>
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

  return Sidebar
}
