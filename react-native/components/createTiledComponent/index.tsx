import * as React from 'react'
import { StyleSheet, View, type ViewStyle } from 'react-native'
import { flattenRenderedToArray } from '../../utilities/flattenRenderedToArray'
import { useMeasure } from '../../hooks/useMeasure'
import { getRenderedKey } from '../../utilities/getRenderedKey'

const globalStyles = StyleSheet.create({
  outerView: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

/**
 * Creates a new React component which shows a grid of equally sized tiles,
 * flowing from left to right then wrapping onto a new line.
 * @param columnSpacing   The amount of spacing between each column of the grid.
 * @param rowSpacing      The amount of spacing between each row of the grid.
 * @param minimumTileSize The minimum size of a tile (tiles have equal width and
 *                        height, and as many will be fit on a row as possible
 *                        without tiles being smaller than this; they may be
 *                        larger to fill the container horizontally).
 * @param aspectRatio     When null, the height of each tile is fluid (and rows
 *                        are aligned to the top).  Otherwise, the desired
 *                        aspect ratio of each tile (where 16/9 = 16:9).
 * @returns               The created React component.
 */
export const createTiledComponent = (
  columnSpacing: number,
  rowSpacing: number,
  minimumTileSize: number,
  aspectRatio: null | number
): React.FunctionComponent<React.PropsWithChildren<Record<never, never>>> => {
  const Tiled: React.FunctionComponent<React.PropsWithChildren<Record<never, never>>> = ({ children }) => {
    const [sizing, setSizing] = React.useState<null | {
      readonly size: number
      readonly perRow: number
    }>(null)

    const [ref, onLayout] = useMeasure((_x, _y, width) => {
      let perRow = 1

      while (
        (width - perRow * columnSpacing) / (perRow + 1) >=
        minimumTileSize
      ) {
        perRow++
      }

      setSizing({
        size: (width - (perRow - 1) * columnSpacing) / perRow,
        perRow
      })
    })

    if (sizing === null) {
      return (
        <View
          collapsable={false}
          ref={ref}
          onLayout={onLayout}
          style={globalStyles.outerView}
          pointerEvents="box-none"
        />
      )
    } else {
      const transformedChildren: JSX.Element[] = []

      for (const child of flattenRenderedToArray(children)) {
        const style: ViewStyle = {}

        if (
          transformedChildren.length % sizing.perRow === 0 ||
          columnSpacing === 0
        ) {
          style.flexBasis = sizing.size
        } else {
          style.flexBasis = sizing.size + columnSpacing
          style.paddingLeft = columnSpacing
        }

        if (aspectRatio === null) {
          if (transformedChildren.length >= sizing.perRow && rowSpacing !== 0) {
            style.paddingTop = rowSpacing
          }
        } else if (transformedChildren.length < sizing.perRow || rowSpacing === 0) {
          style.height = sizing.size / aspectRatio
        } else {
          style.height = sizing.size / aspectRatio + rowSpacing
          style.paddingTop = rowSpacing
        }

        transformedChildren.push(
          <View
            pointerEvents="box-none"
            key={getRenderedKey(child)}
            style={style}
          >
            {child}
          </View>
        )
      }

      return (
        <View
          collapsable={false}
          ref={ref}
          onLayout={onLayout}
          style={globalStyles.outerView}
          pointerEvents="box-none"
        >
          {transformedChildren}
        </View>
      )
    }
  }

  return Tiled
}
