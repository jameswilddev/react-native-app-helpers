import * as React from 'react'
import { StyleSheet, View, type ViewStyle } from 'react-native'
import type { ProportionalRowProps } from '../../types/ProportionalRowProps'

const globalStyles = StyleSheet.create({
  fillsContainerTop: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  fillsContainerCentered: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  fillsContainerBottom: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  fillsContainerStretched: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  fitsContentTop: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  fitsContentCentered: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  fitsContentBottom: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  fitsContentStretched: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'stretch'
  }
})

/**
 * Creates a new React component which fills its container horizontally and
 * presents a fixed set of columns with proportional width and optional spacing.
 * @template T Keys representing the columns within.
 * @param spacing The spacing between the columns.
 * @param widths  The proportional widths of the columns.
 * @returns       The created React component.
 */
export function createProportionalRowComponent<T extends readonly never[]> (
  spacing: number,
  widths: { [TKey in keyof T]: number }
): React.FunctionComponent<ProportionalRowProps<T>> {
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

  return ({ height, verticalAlignment, children }) => {
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
          height === 'fitsContent'
            ? verticalAlignment === 'top'
              ? globalStyles.fitsContentTop
              : verticalAlignment === 'centered'
                ? globalStyles.fitsContentCentered
                : verticalAlignment === 'bottom'
                  ? globalStyles.fitsContentBottom
                  : globalStyles.fitsContentStretched
            : verticalAlignment === 'top'
              ? globalStyles.fillsContainerTop
              : verticalAlignment === 'centered'
                ? globalStyles.fillsContainerCentered
                : verticalAlignment === 'bottom'
                  ? globalStyles.fillsContainerBottom
                  : globalStyles.fillsContainerStretched
        }
        pointerEvents="box-none"
      >
        {intercalatedChildren}
      </View>
    )
  }
}
