import * as React from "react";
import { Text, View } from "react-native";
import {
  unwrapRenderedFunctionComponent,
  Hitbox,
  createOfflineTableComponent,
} from "../..";

test(`renders as expected`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {63636}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value B</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example False</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value A
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: `#7A7ACE`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {43532}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value C</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {934893}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected with only one string column`, () => {
  type TableRow = {
    readonly columnA: null | string;
  };

  const Component = createOfflineTableComponent<`columnA`, never, TableRow>(
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
      ],
    }
  );

  const onSortChange = jest.fn();

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: `Example Column A Value C`,
          },
          {
            columnA: null,
          },
          {
            columnA: `Example Column A Value A`,
          },
          {
            columnA: `Example Column A Value B`,
          },
        ],
      }}
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingHorizontal: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingHorizontal: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 56,
                paddingVertical: 3,
              }}
            >
              Example Column A Value A
            </Text>,
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: `#7A7ACE`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 56,
                paddingVertical: 3,
              }}
            >
              Example Column A Value B
            </Text>,
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 56,
                paddingVertical: 3,
              }}
            >
              Example Column A Value C
            </Text>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected without rows`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
      data={{
        rows: [],
      }}
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      <Text
        style={{
          width: `100%`,
          paddingHorizontal: 74,
          paddingVertical: 85,
          backgroundColor: `#989874`,
          color: `#298272`,
          fontFamily: `Example Empty Font Family`,
          fontSize: 63,
          lineHeight: 88.19999999999999,
          textAlign: `center`,
        }}
      >
        Example When Empty
      </Text>
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected without rows without vertical padding`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
        verticalPadding: 0,
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
      data={{
        rows: [],
      }}
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      <Text
        style={{
          width: `100%`,
          paddingHorizontal: 74,
          backgroundColor: `#989874`,
          color: `#298272`,
          fontFamily: `Example Empty Font Family`,
          fontSize: 63,
          lineHeight: 88.19999999999999,
          textAlign: `center`,
        }}
      >
        Example When Empty
      </Text>
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected without rows without horizontal padding`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
        horizontalPadding: 0,
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
      data={{
        rows: [],
      }}
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      <Text
        style={{
          width: `100%`,
          paddingVertical: 85,
          backgroundColor: `#989874`,
          color: `#298272`,
          fontFamily: `Example Empty Font Family`,
          fontSize: 63,
          lineHeight: 88.19999999999999,
          textAlign: `center`,
        }}
      >
        Example When Empty
      </Text>
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected without a header/first row separator`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
      headerFirstRowSeparator: null,
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
      data={{
        rows: [],
      }}
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      <Text
        style={{
          width: `100%`,
          paddingHorizontal: 74,
          paddingVertical: 85,
          backgroundColor: `#989874`,
          color: `#298272`,
          fontFamily: `Example Empty Font Family`,
          fontSize: 63,
          lineHeight: 88.19999999999999,
          textAlign: `center`,
        }}
      >
        Example When Empty
      </Text>
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected when filtering by a string column`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
            columnA: `   \n  \n \t \r    Example \t \t  \n Column    \r \r A \t \t \r  Value  \n \n \t \r    A  \n \n \t   \r   `,
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
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={` \n \n \t \r  LUe  \r \r \t \t \n   a    \t \t \r \n  `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      {[
        <View
          key={`   \n  \n \t \r    Example \t \t  \n Column    \r \r A \t \t \r  Value  \n \n \t \r    A  \n \n \t   \r   `}
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              {`   \n  \n \t \r    Example \t \t  \n Column    \r \r A \t \t \r  Value  \n \n \t \r    A  \n \n \t   \r   `}
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected when filtering by a numeric column`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={` \n \n \t \r  348  \r \r \t \t \n  `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      {[
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {934893}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected when filtering by a custom column`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={` \n \n \t \r  Example    \r \r \t  Filter \n \n \n \t Text  \r \r \t \t \n  `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      {[
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {934893}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected when everything is filtered out`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t   Example \n Total  \t   Mismatch \r   \n \r \t   `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      <Text
        style={{
          width: `100%`,
          paddingHorizontal: 74,
          paddingVertical: 85,
          backgroundColor: `#989874`,
          color: `#298272`,
          fontFamily: `Example Empty Font Family`,
          fontSize: 63,
          lineHeight: 88.19999999999999,
          textAlign: `center`,
        }}
      >
        Example When Empty
      </Text>
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected when sorting by a string column, descending`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▼
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      {[
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {934893}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {43532}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value C</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: `#7A7ACE`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value A
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
        <View
          key={null}
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {63636}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value B</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example False</Text>
            </View>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected when sorting by a boolean column`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnD"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label ▲
            </Text>
          </Hitbox>,
        ]}
      </View>
      {[
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {43532}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value C</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
          ]}
        </View>,
        <View
          key={null}
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {63636}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value B</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example False</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#7A7ACE`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {934893}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value A
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected when sorting by a boolean column, descending`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnD"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label ▼
            </Text>
          </Hitbox>,
        ]}
      </View>
      {[
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {934893}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value A
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
        <View
          key={null}
          style={{
            backgroundColor: `#7A7ACE`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {63636}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value B</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example False</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {43532}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value C</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected when sorting by a numeric column`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnB"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label ▲
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      {[
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value A
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {43532}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value C</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
          ]}
        </View>,
        <View
          key={null}
          style={{
            backgroundColor: `#7A7ACE`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {63636}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value B</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example False</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {934893}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected when sorting by a numeric column, descending`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
            columnB: 43532,
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
            columnB: 63636,
            columnC: 2,
            columnD: null,
          },
        ],
      }}
      sortBy="columnB"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label ▼
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      {[
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {934893}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {63636}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value C</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
          ]}
        </View>,
        <View
          key={null}
          style={{
            backgroundColor: `#7A7ACE`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {43532}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value B</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example False</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value A
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected without horizontal padding`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
        horizontalPadding: 0,
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3,
              }}
            >
              {63636}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value B</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingVertical: 3,
              }}
            >
              <Text>Example False</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3,
              }}
            >
              Example Column A Value A
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: `#7A7ACE`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3,
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3,
              }}
            >
              {43532}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value C</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3,
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3,
              }}
            >
              {934893}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected without vertical padding on the header`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
        verticalPadding: 0,
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {63636}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value B</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example False</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value A
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: `#7A7ACE`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {43532}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value C</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {934893}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected without vertical padding on cells`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
        verticalPadding: 0,
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
              }}
            >
              {63636}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
              }}
            >
              <Text>Example Column C Value B</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
              }}
            >
              <Text>Example False</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
              }}
            >
              Example Column A Value A
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingHorizontal: 28,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: `#7A7ACE`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
              }}
            >
              {43532}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
              }}
            >
              <Text>Example Column C Value C</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
              }}
            >
              <Text>Example Null</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
              }}
            >
              {934893}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected without header/row separators`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
      headerFirstRowSeparator: null,
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {63636}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value B</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example False</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value A
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: `#7A7ACE`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {43532}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value C</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {934893}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`renders as expected without row separators`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
      rowSeparator: null,
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {63636}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value B</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example False</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: `#AEAEFA`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value A
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {43532}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value C</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#AEAEFA`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {934893}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`executes the expected callback on clicking on a column header which is not currently sorted`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnD"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  unwrapRenderedFunctionComponent(rendered).props[
    `children`
  ][0].props.children[1].props.onPress();

  expect(onSortChange).toHaveBeenCalledTimes(1);
  expect(onSortChange).toHaveBeenCalledWith(`columnB`, `ascending`);
});

test(`executes the expected callback on clicking on a column header which is sorted ascending`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnB"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  unwrapRenderedFunctionComponent(rendered).props[
    `children`
  ][0].props.children[1].props.onPress();

  expect(onSortChange).toHaveBeenCalledTimes(1);
  expect(onSortChange).toHaveBeenCalledWith(`columnB`, `descending`);
});

test(`executes the expected callback on clicking on a column header which is sorted descending`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
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

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnB"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  unwrapRenderedFunctionComponent(rendered).props[
    `children`
  ][0].props.children[1].props.onPress();

  expect(onSortChange).toHaveBeenCalledTimes(1);
  expect(onSortChange).toHaveBeenCalledWith(`columnB`, `ascending`);
});

test(`styles correctly when the first and last columns are custom`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          type: `custom`,
          label: `Example Column A Label`,
          width: 44,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column A Value A</Text>;

              case 1:
                return <Text>Example Column A Value B</Text>;

              case 2:
                return <Text>Example Column A Value C</Text>;

              case 3:
                return <Text>Example Column A Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
          },
        },
        {
          type: `basic`,
          label: `Example Column B Label`,
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
          },
        },
        {
          type: `custom`,
          label: `Example Column D Label`,
          width: 33,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column D Value A</Text>;

              case 1:
                return <Text>Example Column D Value B</Text>;

              case 2:
                return <Text>Example Column D Value C</Text>;

              case 3:
                return <Text>Example Column D Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
          },
        },
      ],
    }
  );

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Text
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column A Label
          </Text>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Text
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column D Label
          </Text>,
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column A Value B</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {63636}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value B</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column D Value B</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column A Value A</Text>
            </View>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column D Value A</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: `#7A7ACE`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column A Value C</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {43532}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value C</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column D Value C</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column A Value D</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {934893}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column D Value D</Text>
            </View>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`styles correctly when the first column is a boolean`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          label: `Example Column D Label`,
          width: 33,
          key: `columnD`,
        },
        {
          type: `basic`,
          label: `Example Column A Label`,
          width: 44,
          key: `columnA`,
        },
        {
          type: `basic`,
          label: `Example Column B Label`,
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
          },
        },
      ],
    }
  );

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
          <Hitbox
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example False</Text>
            </View>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={2}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {63636}
            </Text>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value B</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value A
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: `#7A7ACE`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={2}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {43532}
            </Text>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value C</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={2}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              {934893}
            </Text>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});

test(`styles correctly when the last column is not custom and does not contain a boolean`, () => {
  type TableRow = {
    readonly columnA: null | string;
    readonly columnB: null | number;
    readonly columnC: 0 | 1 | 2 | 3;
    readonly columnD: null | boolean;
  };

  const Component = createOfflineTableComponent<
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
          label: `Example Column B Label`,
          width: 22,
          key: `columnB`,
        },
        {
          type: `custom`,
          label: `Example Column C Label`,
          width: 11,
          render(row) {
            switch (row.columnC) {
              case 0:
                return <Text>Example Column C Value A</Text>;

              case 1:
                return <Text>Example Column C Value B</Text>;

              case 2:
                return <Text>Example Column C Value C</Text>;

              case 3:
                return <Text>Example Column C Value D</Text>;
            }
          },
          containsSearchTerm(row, filter) {
            return filter === `example filter text` && row.columnC === 3;
          },
        },
        {
          type: `basic`,
          label: `Example Column D Label`,
          width: 33,
          key: `columnD`,
        },
        {
          type: `basic`,
          label: `Example Column A Label`,
          width: 44,
          key: `columnA`,
        },
      ],
    }
  );

  const onSortChange = jest.fn();

  const rendered = (
    <Component
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
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={`   \n   \r    \t    `}
      whenEmpty="Example When Empty"
    />
  );

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: `100%` }}>
      <View
        style={{
          width: `100%`,
          flexDirection: `row`,
          backgroundColor: `#213EA5`,
          borderBottomWidth: 12,
          borderBottomColor: `#323098`,
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Text
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: `#EA0498`,
              fontFamily: `Example Header Font Family`,
              fontSize: 31,
              lineHeight: 43.4,
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>,
          <Hitbox
            key={3}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44,
            }}
            onPress={expect.any(Function)}
          >
            <Text
              style={{
                color: `#EA0498`,
                fontFamily: `Example Header Font Family`,
                fontSize: 31,
                lineHeight: 43.4,
              }}
            >
              Example Column A Label ▲
            </Text>
          </Hitbox>,
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: `#7A7ACE`,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              {63636}
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value B</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example False</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={3}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              Example Column A Value A
            </Text>,
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: `#7A7ACE`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              {43532}
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value C</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={3}
              style={{
                color: `#92EAEA`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              Example Column A Value B
            </Text>,
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: `#AEAEFA`,
            borderTopColor: `#AB3928`,
            borderTopWidth: 19,
            flexDirection: `row`,
            width: `100%`,
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
              }}
            >
              {934893}
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingHorizontal: 28,
                paddingVertical: 3,
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={3}
              style={{
                color: `#348472`,
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: `Example Body Font Family`,
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3,
              }}
            >
              Example Column A Value C
            </Text>,
          ]}
        </View>,
      ]}
    </View>
  );
  expect(onSortChange).not.toHaveBeenCalled();
});
