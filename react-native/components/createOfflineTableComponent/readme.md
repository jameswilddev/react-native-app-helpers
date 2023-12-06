# `react-native-app-helpers/createOfflineTableComponent`

Creates a new React component which surrounds its children with padding.

## Usage

```tsx
import { createOfflineTableComponent, SortDirection } from "react-native-app-helpers";

type TableRow = {
  readonly columnA: null | string;
  readonly columnB: null | number;
  readonly columnC: 0 | 1 | 2 | 3;
  readonly columnD: null | boolean;
};

const ExampleTable = createOfflineTableComponent<
  `columnA` | `columnB`,
  `columnD`,
  TableRow
>(
  {
    header: {
      fontFamily: `Example Header Font Family`,
      fontSize: 31,
      background: `#213EA5`,
      color: `#EA0498`,
      verticalPadding: 7,
    },
    headerFirstRowSeparator: {
      color: `#323098`,
      width: 12,
    },
    body: {
      fontFamily: `Example Body Font Family`,
      fontSize: 27,
      horizontalPadding: 56,
      verticalPadding: 3,
      odd: {
        color: `#92EAEA`,
        background: `#7A7ACE`,
      },
      even: {
        color: `#348472`,
        background: `#AEAEFA`,
      },
      primitiveElements: {
        null: <Text>Example Null</Text>,
        false: <Text>Example False</Text>,
        true: <Text>Example True</Text>,
      },
    },
    rowSeparator: {
      color: `#AB3928`,
      width: 19,
    },
    empty: {
      fontFamily: `Example Empty Font Family`,
      fontSize: 63,
      horizontalPadding: 74,
      verticalPadding: 85,
      background: `#989874`,
      color: `#298272`,
    },
  },
  {
    key: `columnA`,
    columns: [
      {
        type: `basic`,
        label: `Example Column A Label`,
        width: 44,
        key: `columnA`,
      },
      {
        type: `basic`,
        label: `Example Column B Label`,
        width: 11,
        key: `columnB`,
      },
      {
        type: `customText`,
        label: `Example Column C A Label`,
        width: 11,
        render(row, context) {
          switch (row.columnC) {
            case 0:
              return "Example Column C A Value A";

            case 1:
              return "Example Column C A Value B";

            case 2:
              return "Example Column C A Value C";

            case 3:
              return "Example Column C A Value D";
          }
        },
        containsSearchTerm(row, filter, context) {
          return filter === `example filter a text` && row.columnC === 2;
        },
      },
      {
        type: `customElement`,
        label: `Example Column C B Label`,
        width: 11,
        render(row, context) {
          switch (row.columnC) {
            case 0:
              return <Text>Example Column C B Value A</Text>;

            case 1:
              return <Text>Example Column C B Value B</Text>;

            case 2:
              return <Text>Example Column C B Value C</Text>;

            case 3:
              return <Text>Example Column C B Value D</Text>;
          }
        },
        containsSearchTerm(row, filter, context) {
          return filter === `example filter b text` && row.columnC === 3;
        },
      },
      {
        type: `basic`,
        label: `Example Column D Label`,
        width: 33,
        key: `columnD`,
      },
    ],
  }
);

const ExampleScreen = () => {
  const [filter, setFilter] = React.useState(``);
  const [sort, setSort] = React.useState<{
    readonly by: `columnA` | `columnB` | `columnD`;
    readonly direction: SortDirection;
  }>({
    by: `columnA`,
    direction: `ascending`,
  });

  return (
    <React.Fragment>
      <TextInput value={filter} onChangeText={setFilter} />
      <ExampleTable
        data={{
          rows: [
            {
              columnA: `Example Column A Value C`,
              columnB: 934893,
              columnC: 3,
              columnD: true,
            },
            {
              columnA: null,
              columnB: 63636,
              columnC: 1,
              columnD: false,
            },
            {
              columnA: `Example Column A Value A`,
              columnB: null,
              columnC: 0,
              columnD: true,
            },
            {
              columnA: `Example Column A Value B`,
              columnB: 43532,
              columnC: 2,
              columnD: null,
            },
          ],
        }}
        sortBy={sort.by}
        sortDirection={sort.direction}
        onSortChange={(by, direction) => {
          setSort({ by, direction });
        }}
        filter={filter}
        whenEmpty="No matching rows found."
        context="Example Context"
        onPressRow={(row: TableRow): void => {
          console.log(row);
        }}
      />
    </React.Fragment>
  )
};
```
