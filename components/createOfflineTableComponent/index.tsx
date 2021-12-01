import * as React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import type { SortDirection } from "../../types/SortDirection";
import type { OfflineTableData } from "../../types/OfflineTableData";
import type { TableSchema } from "../../types/TableSchema";
import type { TableStyle } from "../../types/TableStyle";
import type { TableRow } from "../../types/TableRow";
import { Hitbox } from "../Hitbox";
import type { KeyableTableCell, NonKeyableTableCell } from "../..";

const normalize = (cell: KeyableTableCell | NonKeyableTableCell): string => {
  switch (typeof cell) {
    // null.
    case `object`:
    case `boolean`:
      return ``;

    case `number`:
      return String(cell);

    case `string`:
      return cell.trim().replace(/\s+/g, ` `).toLowerCase();
  }
};

/**
 * Creates a new React component which renders a table to view data which is
 * held locally, offline.
 * @template TKeyableColumnKey    The keys of keyable columns within the table.
 * @template TNonKeyableColumnKey The keys of non-keyable columns within the
 *                                table.
 * @template TRow                 The type of a row of data provided to the
 *                                table.
 * @template TContext             The type of the context in which the table is
 *                                being rendered.
 * @param style  The style to apply to the table.
 * @param schema The schema of the table to show.
 * @returns      The created React component.
 */
export const createOfflineTableComponent = <
  TKeyableColumnKey extends string,
  TNonKeyableColumnKey extends string,
  TRow extends TableRow<TKeyableColumnKey, TNonKeyableColumnKey>,
  TContext
>(
  style: TableStyle,
  schema: TableSchema<TKeyableColumnKey, TNonKeyableColumnKey, TRow, TContext>
): React.FunctionComponent<{
  /**
   * The data to show in the table.
   */
  readonly data: OfflineTableData<
    TKeyableColumnKey,
    TNonKeyableColumnKey,
    TRow
  >;

  /**
   * The key of the column to sort by.
   */
  readonly sortBy: TKeyableColumnKey | TNonKeyableColumnKey;

  /**
   * The direction in which to sort.
   */
  readonly sortDirection: SortDirection;

  /**
   * Invoked when the user request a change of sort direction.
   * @param sortBy        The key of the column to sort by.
   * @param sortDirection The direction in which sorting is to be performed.
   */
  readonly onSortChange: (
    sortBy: TKeyableColumnKey | TNonKeyableColumnKey,
    sortDirection: SortDirection
  ) => void;

  /**
   * A piece of text to the data by.  Not used if empty or white space.
   */
  readonly filter: string;

  /**
   * Shown when there are no rows to display.
   */
  readonly whenEmpty: string;

  /**
   * The context in which the table is being rendered.
   */
  readonly context: TContext;
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

  const emptyText: TextStyle = {
    fontFamily: style.empty.fontFamily,
    fontSize: style.empty.fontSize,
    lineHeight: style.empty.fontSize * 1.4,
    color: style.empty.color,
    backgroundColor: style.empty.background,
    width: `100%`,
    textAlign: `center`,
  };

  if (style.empty.horizontalPadding !== 0) {
    emptyText.paddingHorizontal = style.empty.horizontalPadding;
  }

  if (style.empty.verticalPadding !== 0) {
    emptyText.paddingVertical = style.empty.verticalPadding;
  }

  const headerView: ViewStyle = {
    width: `100%`,
    flexDirection: `row`,
    backgroundColor: style.header.background,
  };

  if (style.headerFirstRowSeparator !== null) {
    headerView.borderBottomColor = style.headerFirstRowSeparator.color;
    headerView.borderBottomWidth = style.headerFirstRowSeparator.width;
  }

  const styles = StyleSheet.create({
    wrapperView: {
      width: `100%`,
    },
    headerView,
    headerText: {
      fontFamily: style.header.fontFamily,
      fontSize: style.header.fontSize,
      lineHeight: style.header.fontSize * 1.4,
      color: style.header.color,
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

  const basicHeaderInput: { [key: string]: ViewStyle } = {};
  const customHeaderInput: { [key: string]: TextStyle } = {};
  const customCellInput: { [key: string]: ViewStyle } = {};
  const oddRowCellInput: { [key: string]: TextStyle } = {};
  const evenRowCellInput: { [key: string]: TextStyle } = {};

  for (const key in schema.columns) {
    const column = schema.columns[key];

    basicHeaderInput[key] = {
      flexBasis: 0,
      flexGrow: column?.width,
    };

    customHeaderInput[key] = {
      flexBasis: 0,
      flexGrow: column?.width,
      fontFamily: style.header.fontFamily,
      fontSize: style.header.fontSize,
      lineHeight: style.header.fontSize * 1.4,
      color: style.header.color,
    };

    customCellInput[key] = {
      flexBasis: 0,
      flexGrow: column?.width,
    };

    oddRowCellInput[key] = {
      fontFamily: style.body.fontFamily,
      fontSize: style.body.fontSize,
      lineHeight: style.body.fontSize * 1.4,
      color: style.body.odd.color,
      flexBasis: 0,
      flexGrow: column?.width,
    };

    evenRowCellInput[key] = {
      fontFamily: style.body.fontFamily,
      fontSize: style.body.fontSize,
      lineHeight: style.body.fontSize * 1.4,
      color: style.body.even.color,
      flexBasis: 0,
      flexGrow: column?.width,
    };

    if (style.header.verticalPadding !== 0) {
      (basicHeaderInput[key] as ViewStyle).paddingVertical =
        style.header.verticalPadding;
      (customHeaderInput[key] as TextStyle).paddingVertical =
        style.header.verticalPadding;
    }

    if (style.body.horizontalPadding !== 0) {
      (basicHeaderInput[key] as ViewStyle).paddingHorizontal =
        style.body.horizontalPadding / 2;
      (customHeaderInput[key] as TextStyle).paddingHorizontal =
        style.body.horizontalPadding / 2;
      (customCellInput[key] as ViewStyle).paddingHorizontal =
        style.body.horizontalPadding / 2;
      (oddRowCellInput[key] as ViewStyle).paddingHorizontal =
        style.body.horizontalPadding / 2;
      (evenRowCellInput[key] as ViewStyle).paddingHorizontal =
        style.body.horizontalPadding / 2;
    }

    if (style.body.verticalPadding !== 0) {
      (customCellInput[key] as ViewStyle).paddingVertical =
        style.body.verticalPadding;
      (oddRowCellInput[key] as TextStyle).paddingVertical =
        style.body.verticalPadding;
      (evenRowCellInput[key] as TextStyle).paddingVertical =
        style.body.verticalPadding;
    }
  }

  if (style.body.horizontalPadding !== 0) {
    if (schema.columns.length === 1) {
      (basicHeaderInput[0] as ViewStyle).paddingHorizontal =
        style.body.horizontalPadding;
      (customHeaderInput[0] as TextStyle).paddingHorizontal =
        style.body.horizontalPadding;
      (customCellInput[0] as ViewStyle).paddingHorizontal =
        style.body.horizontalPadding;
      (oddRowCellInput[0] as TextStyle).paddingHorizontal =
        style.body.horizontalPadding;
      (evenRowCellInput[0] as TextStyle).paddingHorizontal =
        style.body.horizontalPadding;
    } else {
      delete basicHeaderInput[0]?.paddingHorizontal;
      (basicHeaderInput[0] as ViewStyle).paddingLeft =
        style.body.horizontalPadding;
      (basicHeaderInput[0] as ViewStyle).paddingRight =
        style.body.horizontalPadding / 2;
      delete basicHeaderInput[schema.columns.length - 1]?.paddingHorizontal;
      (basicHeaderInput[schema.columns.length - 1] as ViewStyle).paddingLeft =
        style.body.horizontalPadding / 2;
      (basicHeaderInput[schema.columns.length - 1] as ViewStyle).paddingRight =
        style.body.horizontalPadding;

      delete customHeaderInput[0]?.paddingHorizontal;
      (customHeaderInput[0] as TextStyle).paddingLeft =
        style.body.horizontalPadding;
      (customHeaderInput[0] as TextStyle).paddingRight =
        style.body.horizontalPadding / 2;
      delete customHeaderInput[schema.columns.length - 1]?.paddingHorizontal;
      (customHeaderInput[schema.columns.length - 1] as TextStyle).paddingLeft =
        style.body.horizontalPadding / 2;
      (customHeaderInput[schema.columns.length - 1] as TextStyle).paddingRight =
        style.body.horizontalPadding;

      delete customCellInput[0]?.paddingHorizontal;
      (customCellInput[0] as ViewStyle).paddingLeft =
        style.body.horizontalPadding;
      (customCellInput[0] as ViewStyle).paddingRight =
        style.body.horizontalPadding / 2;
      delete customCellInput[schema.columns.length - 1]?.paddingHorizontal;
      (customCellInput[schema.columns.length - 1] as ViewStyle).paddingLeft =
        style.body.horizontalPadding / 2;
      (customCellInput[schema.columns.length - 1] as ViewStyle).paddingRight =
        style.body.horizontalPadding;

      delete oddRowCellInput[0]?.paddingHorizontal;
      (oddRowCellInput[0] as TextStyle).paddingLeft =
        style.body.horizontalPadding;
      (oddRowCellInput[0] as TextStyle).paddingRight =
        style.body.horizontalPadding / 2;
      delete oddRowCellInput[schema.columns.length - 1]?.paddingHorizontal;
      (oddRowCellInput[schema.columns.length - 1] as TextStyle).paddingLeft =
        style.body.horizontalPadding / 2;
      (oddRowCellInput[schema.columns.length - 1] as TextStyle).paddingRight =
        style.body.horizontalPadding;

      delete evenRowCellInput[0]?.paddingHorizontal;
      (evenRowCellInput[0] as TextStyle).paddingLeft =
        style.body.horizontalPadding;
      (evenRowCellInput[0] as TextStyle).paddingRight =
        style.body.horizontalPadding / 2;
      delete evenRowCellInput[schema.columns.length - 1]?.paddingHorizontal;
      (evenRowCellInput[schema.columns.length - 1] as TextStyle).paddingLeft =
        style.body.horizontalPadding / 2;
      (evenRowCellInput[schema.columns.length - 1] as TextStyle).paddingRight =
        style.body.horizontalPadding;
    }
  }

  const headerStyles = StyleSheet.create(basicHeaderInput);
  const customHeaderStyles = StyleSheet.create(customHeaderInput);
  const customCellStyles = StyleSheet.create(customCellInput);
  const oddRowCellStyles = StyleSheet.create(oddRowCellInput);
  const evenRowCellStyles = StyleSheet.create(evenRowCellInput);

  return ({
    data,
    whenEmpty,
    filter,
    sortBy,
    sortDirection,
    onSortChange,
    context,
  }) => {
    let rows = [...data.rows];

    filter = normalize(filter);

    if (filter !== ``) {
      rows = rows.filter((row) => {
        for (const column of schema.columns) {
          switch (column.type) {
            case `basic`:
              {
                const value = row[column.key];

                if (normalize(value).includes(filter)) {
                  return true;
                }
              }
              break;

            case `customText`:
              {
                const value = column.render(row[column.key] as never, context);

                if (normalize(value).includes(filter)) {
                  return true;
                }
              }
              break;

            case `customElement`:
              if (column.containsSearchTerm(row, filter, context)) {
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

      const fromA = a[sortBy];
      const fromB = b[sortBy];

      if (fromA === fromB) {
        comparisonResult = 0;
      } else {
        if (fromA === null) {
          comparisonResult = -1;
        } else if (fromB === null) {
          comparisonResult = 1;

          // TODO: why does TypeScript think this can't be false?
        } else if ((fromA as unknown as boolean) === false) {
          comparisonResult = -1;

          // TODO: why does TypeScript think this can't be false?
        } else if ((fromB as unknown as boolean) === false) {
          comparisonResult = 1;
        } else {
          comparisonResult = String(fromA).localeCompare(String(fromB), [], {
            numeric: true,
          });
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
          {schema.columns.map((column, index) => {
            switch (column.type) {
              case `basic`:
              case `customText`:
                return (
                  <Hitbox
                    key={String(index)}
                    style={headerStyles[index] as ViewStyle}
                    onPress={() => {
                      onSortChange(
                        column.key,
                        sortBy === column.key && sortDirection === `ascending`
                          ? `descending`
                          : `ascending`
                      );
                    }}
                  >
                    <Text style={styles.headerText}>
                      {sortBy === column.key
                        ? `${column.label} ${
                            sortDirection === `ascending` ? `↓` : `↑`
                          }`
                        : column.label}
                    </Text>
                  </Hitbox>
                );

              case `customElement`:
                return (
                  <Text key={String(index)} style={customHeaderStyles[index]}>
                    {column.label}
                  </Text>
                );
            }
          })}
        </View>
        {rows.length === 0 ? (
          <Text style={styles.emptyText}>{whenEmpty}</Text>
        ) : (
          rows.map((row, index) => (
            <View
              key={String(row[schema.key])}
              style={
                index === 0
                  ? styles.firstRowView
                  : index % 2 === 0
                  ? styles.oddRowView
                  : styles.evenRowView
              }
            >
              {schema.columns.map((column, columnIndex) => {
                switch (column.type) {
                  case `basic`: {
                    const value = row[column.key];

                    // TODO: why does TypeScript think this cannot be null, false or true?
                    switch (value as unknown) {
                      case null:
                        return (
                          <View
                            key={String(columnIndex)}
                            style={customCellStyles[columnIndex]}
                          >
                            {style.body.primitiveElements.null}
                          </View>
                        );

                      case false:
                        return (
                          <View
                            key={String(columnIndex)}
                            style={customCellStyles[columnIndex]}
                          >
                            {style.body.primitiveElements.false}
                          </View>
                        );

                      case true:
                        return (
                          <View
                            key={String(columnIndex)}
                            style={customCellStyles[columnIndex]}
                          >
                            {style.body.primitiveElements.true}
                          </View>
                        );

                      default:
                        return (
                          <Text
                            key={String(columnIndex)}
                            style={
                              index % 2 === 0
                                ? oddRowCellStyles[columnIndex]
                                : evenRowCellStyles[columnIndex]
                            }
                          >
                            {value}
                          </Text>
                        );
                    }
                  }

                  case `customText`: {
                    const value = column.render(
                      row[column.key] as never,
                      context
                    );

                    // TODO: why does TypeScript think this cannot be null, false or true?
                    switch (value as unknown) {
                      case null:
                        return (
                          <View
                            key={String(columnIndex)}
                            style={customCellStyles[columnIndex]}
                          >
                            {style.body.primitiveElements.null}
                          </View>
                        );

                      case false:
                        return (
                          <View
                            key={String(columnIndex)}
                            style={customCellStyles[columnIndex]}
                          >
                            {style.body.primitiveElements.false}
                          </View>
                        );

                      case true:
                        return (
                          <View
                            key={String(columnIndex)}
                            style={customCellStyles[columnIndex]}
                          >
                            {style.body.primitiveElements.true}
                          </View>
                        );

                      default:
                        return (
                          <Text
                            key={String(columnIndex)}
                            style={
                              index % 2 === 0
                                ? oddRowCellStyles[columnIndex]
                                : evenRowCellStyles[columnIndex]
                            }
                          >
                            {value}
                          </Text>
                        );
                    }
                  }

                  case `customElement`:
                    return (
                      <View
                        key={String(columnIndex)}
                        style={customCellStyles[columnIndex]}
                      >
                        {column.render(row, context)}
                      </View>
                    );
                }
              })}
            </View>
          ))
        )}
      </View>
    );
  };
};
