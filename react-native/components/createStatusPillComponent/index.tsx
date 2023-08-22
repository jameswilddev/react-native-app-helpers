import * as React from 'react'
import { StyleSheet, Text, type TextStyle } from 'react-native'
import type { StatusPillStyle } from '../../types/StatusPillStyle'
import type { StatusPillStyleStatus } from '../../types/StatusPillStyleStatus'
import type { StatusPillProps } from '../../types/StatusPillProps'

/**
 * Creates a new React component for showing a status in a "pill".
 * @template T            The type of status displayed.
 * @param statusPillStyle The styling to apply to the pill.
 * @returns               The created REact component.
 */
export function createStatusPillComponent<T extends string> (
  statusPillStyle: StatusPillStyle<T>
): React.FunctionComponent<StatusPillProps<T>> {
  const statusStyles: { [TStatus in T]?: TextStyle } = {}

  for (const statusKey in statusPillStyle.statuses) {
    const statusValue = statusPillStyle.statuses[
      statusKey
    ] as StatusPillStyleStatus

    const style: TextStyle = {
      fontFamily: statusPillStyle.fontFamily,
      fontSize: statusPillStyle.fontSize,
      lineHeight: statusPillStyle.fontSize * 1.4,
      color: statusValue.color,
      backgroundColor: statusValue.background,
      borderRadius:
        statusPillStyle.padding + (statusPillStyle.fontSize * 1.4) / 2,
      overflow: 'hidden',
      paddingHorizontal:
        statusPillStyle.padding + (statusPillStyle.fontSize * 1.4) / 2,
      textAlign: 'center'
    }

    if (statusPillStyle.padding > 0) {
      style.paddingVertical = statusPillStyle.padding
    }

    statusStyles[statusKey] = style
  }

  const styles = StyleSheet.create(
    statusStyles as { [TStatus in T]: TextStyle }
  )

  return ({ status }) => {
    const object = statusPillStyle.statuses[status] as StatusPillStyleStatus

    return (
      <Text numberOfLines={1} style={styles[status]}>
        {object.label}
      </Text>
    )
  }
}
