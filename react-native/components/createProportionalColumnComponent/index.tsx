import * as React from 'react'
import { StyleSheet, View, type ViewStyle } from 'react-native'
import type { ProportionalColumnProps } from '../../types/ProportionalColumnProps'

const globalStyles = StyleSheet.create({
  fillsContainerLeft: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  fillsContainerCentered: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  fillsContainerRight: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  fillsContainerStretched: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  fitsContentLeft: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  fitsContentCentered: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  fitsContentRight: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  fitsContentStretched: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'stretch'
  }
})

/**
 * Creates a new React component which fills its container verticall and
 * presents a fixed set of rows with proportional height and optional spacing.
 * @template T Keys representing the rows within.
 * @param spacing The spacing between the rows.
 * @param widths  The proportional heights of the rows.
 * @returns       The created React component.
 */
export function createProportionalColumnComponent<T extends readonly never[]> (
  spacing: number,
  widths: { [TKey in keyof T]: number }
): React.FunctionComponent<ProportionalColumnProps<T>> {
  const viewStyles: Array<{ readonly view: ViewStyle }> = []

  for (const width of widths) {
    viewStyles.push(
      StyleSheet.create({
        view: {
          flexBasis: 0,
          flexGrow: width
        }
      })
    )
  }

  const localStyles = StyleSheet.create({
    spacer: {
      flexBasis: spacing
    }
  })

  const ProportionalColumn: React.FunctionComponent<ProportionalColumnProps<T>> = ({ width, horizontalAlignment, children }) => {
    const intercalatedChildren: Array<null | JSX.Element> = []

    let index = 0

    for (const view of children) {
      if (index > 0 && spacing !== 0) {
        intercalatedChildren.push(
          <View
            key={`separator${index - 1}`}
            style={localStyles.spacer}
            pointerEvents="none"
          />
        )
      }

      intercalatedChildren.push(
        <View
          key={String(index)}
          pointerEvents="box-none"
          style={viewStyles[index]?.view}
        >
          {view}
        </View>
      )

      index++
    }

    return (
      <View
        style={
          width === 'fitsContent'
            ? horizontalAlignment === 'left'
              ? globalStyles.fitsContentLeft
              : horizontalAlignment === 'centered'
                ? globalStyles.fitsContentCentered
                : horizontalAlignment === 'right'
                  ? globalStyles.fitsContentRight
                  : globalStyles.fitsContentStretched
            : horizontalAlignment === 'left'
              ? globalStyles.fillsContainerLeft
              : horizontalAlignment === 'centered'
                ? globalStyles.fillsContainerCentered
                : horizontalAlignment === 'right'
                  ? globalStyles.fillsContainerRight
                  : globalStyles.fillsContainerStretched
        }
        pointerEvents="box-none"
      >
        {intercalatedChildren}
      </View>
    )
  }

  return ProportionalColumn
}
