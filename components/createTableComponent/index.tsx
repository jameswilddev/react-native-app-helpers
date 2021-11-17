import * as React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import type { SortDirection } from "../../types/SortDirection";
import type { OfflineTableData } from "../../types/OfflineTableData";
import type { TableSchema } from "../../types/TableSchema";
import type { TableStyle } from "../../types/TableStyle";
import { Hitbox } from "../Hitbox";

export const createTableComponent = <
  TKeyableColumnKey extends string,
  TNonKeyableColumnKey extends string
>(
  style: TableStyle,
  schema: TableSchema<TKeyableColumnKey, TNonKeyableColumnKey>
): React.FunctionComponent<{
  readonly data: OfflineTableData<TKeyableColumnKey, TNonKeyableColumnKey>;
  readonly sortBy: TKeyableColumnKey | TNonKeyableColumnKey;
  readonly sortDirection: SortDirection;
  readonly filter: string;
  readonly onPressHeader: (
    header: TKeyableColumnKey | TNonKeyableColumnKey
  ) => void;
  readonly whenEmpty: string;
}> => {
  const rowViewBase: ViewStyle = {
    width: `100%`,
    flexDirection: `row`,
  };

  if (style.rowSeparator !== null) {
    rowViewBase.borderTopColor = style.rowSeparator.color;
    rowViewBase.borderTopWidth = style.rowSeparator.width;
  }

  const firstRowView: ViewStyle = {
    width: `100%`,
    flexDirection: `row`,
    backgroundColor: style.body.odd.background,
  };

  if (style.headerFirstRowSeparator !== null) {
    firstRowView.borderTopColor = style.headerFirstRowSeparator.color;
    firstRowView.borderTopWidth = style.headerFirstRowSeparator.width;
  }

  const emptyText: TextStyle = {
    fontFamily: style.empty.fontFamily,
    fontSize: style.empty.fontSize,
    lineHeight: style.empty.fontSize * 1.4,
    color: style.empty.color,
    backgroundColor: style.empty.background,
  };

  if (style.empty.horizontalPadding !== 0) {
    emptyText.paddingHorizontal = style.empty.horizontalPadding;
  }

  if (style.empty.verticalPadding !== 0) {
    emptyText.paddingVertical = style.empty.verticalPadding;
  }

  const styles = StyleSheet.create({
    wrapperView: {
      width: `100%`,
      alignItems: `stretch`,
    },
    headerText: {
      fontFamily: style.header.fontFamily,
      fontSize: style.header.fontSize,
      lineHeight: style.header.fontSize * 1.4,
      color: style.header.color,
    },
    headerView: {
      width: `100%`,
      flexDirection: `row`,
    },
    firstRowView,
    oddRowView: {
      ...rowViewBase,
      backgroundColor: style.body.odd.background,
    },
    evenRowView: {
      ...rowViewBase,
      backgroundColor: style.body.even.background,
    },
    emptyText,
  });

  const headerStyleInput: { [key: string]: ViewStyle } = {};
  const oddRowCellInput: { [key: string]: TextStyle } = {};
  const evenRowCellInput: { [key: string]: TextStyle } = {};

  for (const key in schema.columns) {
    const column = schema.columns[key];

    headerStyleInput[key] = {
      paddingHorizontal: style.body.horizontalPadding / 2,
      paddingVertical: style.header.verticalPadding,
      flexBasis: 0,
      flexGrow: column?.width,
    };

    oddRowCellInput[key] = {
      fontFamily: style.body.fontFamily,
      fontSize: style.body.fontSize,
      lineHeight: style.body.fontSize * 1.4,
      paddingHorizontal: style.body.horizontalPadding / 2,
      paddingVertical: style.body.verticalPadding,
      color: style.body.odd.color,
      flexBasis: 0,
      flexGrow: column?.width,
    };

    evenRowCellInput[key] = {
      fontFamily: style.body.fontFamily,
      fontSize: style.body.fontSize,
      lineHeight: style.body.fontSize * 1.4,
      paddingHorizontal: style.body.horizontalPadding / 2,
      paddingVertical: style.body.verticalPadding,
      color: style.body.even.color,
      flexBasis: 0,
      flexGrow: column?.width,
    };
  }

  if (schema.columns.length === 1) {
    (headerStyleInput[0] as TextStyle).paddingHorizontal =
      style.body.horizontalPadding;
    (oddRowCellInput[0] as TextStyle).paddingHorizontal =
      style.body.horizontalPadding;
    (evenRowCellInput[0] as TextStyle).paddingHorizontal =
      style.body.horizontalPadding;
  } else {
    delete headerStyleInput[0]?.paddingHorizontal;
    (headerStyleInput[0] as TextStyle).paddingLeft =
      style.body.horizontalPadding;
    (headerStyleInput[0] as TextStyle).paddingRight =
      style.body.horizontalPadding / 2;
    (headerStyleInput[schema.columns.length - 1] as TextStyle).paddingLeft =
      style.body.horizontalPadding / 2;
    (headerStyleInput[schema.columns.length - 1] as TextStyle).paddingRight =
      style.body.horizontalPadding;

    delete oddRowCellInput[0]?.paddingHorizontal;
    (oddRowCellInput[0] as TextStyle).paddingLeft =
      style.body.horizontalPadding;
    (oddRowCellInput[0] as TextStyle).paddingRight =
      style.body.horizontalPadding / 2;
    (oddRowCellInput[schema.columns.length - 1] as TextStyle).paddingLeft =
      style.body.horizontalPadding / 2;
    (oddRowCellInput[schema.columns.length - 1] as TextStyle).paddingRight =
      style.body.horizontalPadding;

    delete evenRowCellInput[0]?.paddingHorizontal;
    (evenRowCellInput[0] as TextStyle).paddingLeft =
      style.body.horizontalPadding;
    (evenRowCellInput[0] as TextStyle).paddingRight =
      style.body.horizontalPadding / 2;
    (evenRowCellInput[schema.columns.length - 1] as TextStyle).paddingLeft =
      style.body.horizontalPadding / 2;
    (evenRowCellInput[schema.columns.length - 1] as TextStyle).paddingRight =
      style.body.horizontalPadding;
  }

  const headerStyles = StyleSheet.create(headerStyleInput);
  const oddRowCellStyles = StyleSheet.create(oddRowCellInput);
  const evenRowCellStyles = StyleSheet.create(evenRowCellInput);

  return ({
    data,
    whenEmpty,
    filter,
    sortBy,
    sortDirection,
    onPressHeader,
  }) => {
    let rows = [...data.rows];

    filter = filter.trim().toLowerCase();

    if (filter !== ``) {
      rows = rows.filter((row) => {
        for (const column of schema.columns) {
          const value = row[column.key];

          switch (typeof value) {
            case `number`:
              if (String(value).includes(filter)) {
                return true;
              }
              break;

            case `string`:
              // TODO: why does TypeScript think this is "never"?
              if ((value as string).includes(filter)) {
                return true;
              }
              break;
          }
        }

        return false;
      });
    }

    rows.sort((a, b) => {
      let comparisonResult: number;

      if (a === b) {
        comparisonResult = 0;
      } else {
        const fromA = a[sortBy];
        const fromB = b[sortBy];

        if (fromA === null) {
          comparisonResult = -1;
        } else if (fromB === null) {
          comparisonResult = 1;
        } else if (fromA === false) {
          comparisonResult = -1;
        } else if (fromB === false) {
          comparisonResult = 1;
        } else {
          comparisonResult = String(fromA).localeCompare(String(fromB));
        }
      }

      if (sortDirection === `descending`) {
        comparisonResult = -comparisonResult;
      }

      return comparisonResult;
    });

    return (
      <View style={styles.wrapperView}>
        <View style={styles.headerView}>
          {schema.columns.map((column, index) => (
            <Hitbox
              key={column.key}
              style={headerStyles[index] as ViewStyle}
              onPress={() => {
                onPressHeader(column.key);
              }}
            >
              <Text numberOfLines={1} style={styles.headerText}>
                {column.label}
              </Text>
            </Hitbox>
          ))}
        </View>
        {data.rows.length === 0 ? (
          <Text style={styles.emptyText}>{whenEmpty}</Text>
        ) : (
          data.rows.map((row, index) => (
            <View
              key={row[schema.key]}
              style={
                index === 0
                  ? styles.firstRowView
                  : index % 2 === 0
                  ? styles.oddRowView
                  : styles.evenRowView
              }
            >
              {schema.columns.map((column, columnIndex) => (
                <Text
                  key={columnIndex}
                  style={
                    index % 2 === 0
                      ? oddRowCellStyles[columnIndex]
                      : evenRowCellStyles[columnIndex]
                  }
                  numberOfLines={1}
                >
                  {row[column.key]}
                </Text>
              ))}
            </View>
          ))
        )}
      </View>
    );
  };
};
