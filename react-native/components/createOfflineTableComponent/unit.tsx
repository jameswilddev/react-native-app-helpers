import * as React from 'react'
import { Text, View } from 'react-native'
import {
  unwrapRenderedFunctionComponent,
  Hitbox,
  createOfflineTableComponent
} from '../../..'

test('renders as expected', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'right'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'middle'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4,
                textAlign: 'right'
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4,
                textAlign: 'center'
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
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
                justifyContent: 'flex-end'
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                justifyContent: 'center'
              }}
            >
              <Text>Example False</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
                textAlign: 'right'
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
                paddingVertical: 3
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
                paddingVertical: 3
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
                justifyContent: 'center'
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
                textAlign: 'right'
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                justifyContent: 'center'
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
                textAlign: 'right'
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                justifyContent: 'center'
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected with only one string column', () => {
  interface TableRow {
    readonly columnA: null | string
  }

  const Component = createOfflineTableComponent<
  'columnA',
  never,
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'right'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C'
          },
          {
            columnA: null
          },
          {
            columnA: 'Example Column A Value A'
          },
          {
            columnA: 'Example Column A Value B'
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingHorizontal: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4,
                textAlign: 'right'
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
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
                justifyContent: 'flex-end'
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 56,
                paddingVertical: 3,
                textAlign: 'right'
              }}
            >
              Example Column A Value A
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 56,
                paddingVertical: 3,
                textAlign: 'right'
              }}
            >
              Example Column A Value B
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 56,
                paddingVertical: 3,
                textAlign: 'right'
              }}
            >
              Example Column A Value C
            </Text>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected without rows', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: []
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      <Text
        style={{
          width: '100%',
          paddingHorizontal: 74,
          paddingVertical: 85,
          backgroundColor: '#989874',
          color: '#298272',
          fontFamily: 'Example Empty Font Family',
          fontSize: 63,
          lineHeight: 88.19999999999999,
          textAlign: 'center'
        }}
      >
        Example When Empty
      </Text>
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected without rows without vertical padding', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 0,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'middle'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: []
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4,
                textAlign: 'center'
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      <Text
        style={{
          width: '100%',
          paddingHorizontal: 74,
          backgroundColor: '#989874',
          color: '#298272',
          fontFamily: 'Example Empty Font Family',
          fontSize: 63,
          lineHeight: 88.19999999999999,
          textAlign: 'center'
        }}
      >
        Example When Empty
      </Text>
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected without rows without horizontal padding', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 0,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: []
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      <Text
        style={{
          width: '100%',
          paddingVertical: 85,
          backgroundColor: '#989874',
          color: '#298272',
          fontFamily: 'Example Empty Font Family',
          fontSize: 63,
          lineHeight: 88.19999999999999,
          textAlign: 'center'
        }}
      >
        Example When Empty
      </Text>
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected without a header/first row separator', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: null,
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: []
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      <Text
        style={{
          width: '100%',
          paddingHorizontal: 74,
          paddingVertical: 85,
          backgroundColor: '#989874',
          color: '#298272',
          fontFamily: 'Example Empty Font Family',
          fontSize: 63,
          lineHeight: 88.19999999999999,
          textAlign: 'center'
        }}
      >
        Example When Empty
      </Text>
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected when filtering by a string column', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'middle'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'right'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: '   \n  \n \t \r    Example \t \t  \n Column    \r \r A \t \t \r  Value  \n \n \t \r    A  \n \n \t   \r   ',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={' \n \n \t \r  LUe  \r \r \t \t \n   a    \t \t \r \n  '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4,
                textAlign: 'center'
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4,
              textAlign: 'right'
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={'   \n  \n \t \r    Example \t \t  \n Column    \r \r A \t \t \r  Value  \n \n \t \r    A  \n \n \t   \r   '}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
                textAlign: 'center'
              }}
            >
              {'   \n  \n \t \r    Example \t \t  \n Column    \r \r A \t \t \r  Value  \n \n \t \r    A  \n \n \t   \r   '}
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                justifyContent: 'flex-end'
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected when filtering by a numeric column', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'middle'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={' \n \n \t \r  348  \r \r \t \t \n  '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4,
              textAlign: 'center'
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                justifyContent: 'center'
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected when filtering by a custom column', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={' \n \n \t \r  Example    \r \r \t  Filter \n \n \n \t Text  \r \r \t \t \n  '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected when everything is filtered out', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t   Example \n Total  \t   Mismatch \r   \n \r \t   '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      <Text
        style={{
          width: '100%',
          paddingHorizontal: 74,
          paddingVertical: 85,
          backgroundColor: '#989874',
          color: '#298272',
          fontFamily: 'Example Empty Font Family',
          fontSize: 63,
          lineHeight: 88.19999999999999,
          textAlign: 'center'
        }}
      >
        Example When Empty
      </Text>
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected when sorting by a string column, ascending', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↑
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>,
        <View
          key={null}
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected when sorting by a boolean column', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnD"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label ↓
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </View>,
        <View
          key={null}
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected when sorting by a boolean column, descending', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnD"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label ↑
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>,
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected when sorting by a numeric column', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnB"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column B Label ↓
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </View>,
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected when sorting by a numeric column, descending', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 43532,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 63636,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnB"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column B Label ↑
            </Text>
          </Hitbox>,
          <Text
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 11,
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </View>,
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected without horizontal padding', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 0,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
            }}
          >
            Example Column C Label
          </Text>,
          <Hitbox
            key={3}
            style={{
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3
              }}
            >
              {63636}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingVertical: 3
              }}
            >
              <Text>Example Column C Value B</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3
              }}
            >
              Example Column A Value A
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingVertical: 3
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3
              }}
            >
              {43532}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingVertical: 3
              }}
            >
              <Text>Example Column C Value C</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3
              }}
            >
              {934893}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingVertical: 3
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>,
            <View
              key={3}
              style={{
                flexBasis: 0,
                flexGrow: 33,
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected without vertical padding on the header', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 0
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              flexBasis: 0,
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected without vertical padding on cells', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 0,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28
              }}
            >
              {63636}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28
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
                paddingRight: 56
              }}
            >
              <Text>Example False</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28
              }}
            >
              Example Column A Value A
            </Text>,
            <View
              key={1}
              style={{
                flexBasis: 0,
                flexGrow: 22,
                paddingHorizontal: 28
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28
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
                paddingRight: 56
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28
              }}
            >
              {43532}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28
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
                paddingRight: 56
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28
              }}
            >
              {934893}
            </Text>,
            <View
              key={2}
              style={{
                flexBasis: 0,
                flexGrow: 11,
                paddingHorizontal: 28
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
                paddingRight: 56
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected without header/row separators', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: null,
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected without row separators', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: null,
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('executes the expected callback on clicking on a column header which is not currently sorted', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnD"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  unwrapRenderedFunctionComponent(rendered).props.children[0].props.children[1].props.onPress()

  expect(onSortChange).toHaveBeenCalledTimes(1)
  expect(onSortChange).toHaveBeenCalledWith('columnB', 'ascending')
})

test('executes the expected callback on clicking on a column header which is sorted ascending', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnB"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  unwrapRenderedFunctionComponent(rendered).props.children[0].props.children[1].props.onPress()

  expect(onSortChange).toHaveBeenCalledTimes(1)
  expect(onSortChange).toHaveBeenCalledWith('columnB', 'descending')
})

test('executes the expected callback on clicking on a column header which is sorted descending', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnB"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  unwrapRenderedFunctionComponent(rendered).props.children[0].props.children[1].props.onPress()

  expect(onSortChange).toHaveBeenCalledTimes(1)
  expect(onSortChange).toHaveBeenCalledWith('columnB', 'ascending')
})

test('styles correctly when the first and last columns are custom', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customElement',
          label: 'Example Column A Label',
          width: 44,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column A Value A</Text>

                case 1:
                  return <Text>Example Column A Value B</Text>

                case 2:
                  return <Text>Example Column A Value C</Text>

                case 3:
                  return <Text>Example Column A Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column D Label',
          width: 33,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column D Value A</Text>

                case 1:
                  return <Text>Example Column D Value B</Text>

                case 2:
                  return <Text>Example Column D Value C</Text>

                case 3:
                  return <Text>Example Column D Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
            }}
          >
            Example Column D Label
          </Text>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Column A Value B</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Column D Value B</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Column D Value A</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Column A Value C</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Column D Value C</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Column A Value D</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Column D Value D</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('styles correctly when the first column is a boolean', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={2}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
            }}
          >
            Example Column C Label
          </Text>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Column C Value B</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Column C Value A</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Column C Value C</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Column C Value D</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('styles correctly when the last column is not custom and does not contain a boolean', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={3}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Example Column A Value A
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={3}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Example Column A Value B
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={3}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Example Column A Value C
            </Text>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected with only one custom text column', () => {
  interface TableRow {
    readonly columnA: null | string
  }

  const Component = createOfflineTableComponent<
  'columnA',
  never,
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              switch (value) {
                case null:
                  return '\n   \r  \t  Example \t \r \n Strawberry \t \n \r Column \r \t \n  '

                case 'Example Column A Value A':
                  return '\n   \r  \t  Example \t \r \n Orange \t \n \r Column \r \t \n  '

                case 'Example Column A Value B':
                  return null

                default:
                  return '\n   \r  \t  Example \t \r \n Raspberry \t \n \r Column \r \t \n  '
              }
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C'
          },
          {
            columnA: null
          },
          {
            columnA: 'Example Column A Value A'
          },
          {
            columnA: 'Example Column A Value B'
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingHorizontal: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 56,
                paddingVertical: 3
              }}
            >
              {'\n   \r  \t  Example \t \r \n Strawberry \t \n \r Column \r \t \n  '}
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 56,
                paddingVertical: 3
              }}
            >
              {'\n   \r  \t  Example \t \r \n Orange \t \n \r Column \r \t \n  '}
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingHorizontal: 56,
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 56,
                paddingVertical: 3
              }}
            >
              {'\n   \r  \t  Example \t \r \n Raspberry \t \n \r Column \r \t \n  '}
            </Text>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected with only one custom number column', () => {
  interface TableRow {
    readonly columnA: null | string
  }

  const Component = createOfflineTableComponent<
  'columnA',
  never,
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 1234
            } else {
              switch (value) {
                case null:
                  return 249483

                case 'Example Column A Value A':
                  return 139874

                case 'Example Column A Value B':
                  return null

                default:
                  return 23435
              }
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C'
          },
          {
            columnA: null
          },
          {
            columnA: 'Example Column A Value A'
          },
          {
            columnA: 'Example Column A Value B'
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingHorizontal: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 56,
                paddingVertical: 3
              }}
            >
              {249483}
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 56,
                paddingVertical: 3
              }}
            >
              {139874}
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingHorizontal: 56,
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 56,
                paddingVertical: 3
              }}
            >
              {23435}
            </Text>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected with only one custom boolean column', () => {
  interface TableRow {
    readonly columnA: null | string
  }

  const Component = createOfflineTableComponent<
  'columnA',
  never,
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              switch (value) {
                case null:
                  return true

                case 'Example Column A Value A':
                  return false

                case 'Example Column A Value B':
                  return null

                default:
                  return true
              }
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C'
          },
          {
            columnA: null
          },
          {
            columnA: 'Example Column A Value A'
          },
          {
            columnA: 'Example Column A Value B'
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingHorizontal: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingHorizontal: 56,
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingHorizontal: 56,
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingHorizontal: 56,
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingHorizontal: 56,
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected with multiple custom text columns', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnC',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              switch (value) {
                case null:
                  return true

                case 'Example Column A Value A':
                  return false

                case 'Example Column A Value B':
                  return null

                default:
                  return true
              }
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column B Label',
          width: 27,
          key: 'columnB',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return (value ?? 33) + 100
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column C Label',
          width: 64,
          key: 'columnC',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return `Prefix ${value} Suffix`
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 20,
            columnC: true
          },
          {
            columnA: null,
            columnB: 50,
            columnC: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 70,
            columnC: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 27
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Hitbox
            key={2}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 64
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column C Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {150}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix false Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {133}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {170}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix null Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {120}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('can sort by a custom text column descending', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnC',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              switch (value) {
                case null:
                  return true

                case 'Example Column A Value A':
                  return false

                case 'Example Column A Value B':
                  return null

                default:
                  return true
              }
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column B Label',
          width: 27,
          key: 'columnB',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return (value ?? 33) + 100
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column C Label',
          width: 64,
          key: 'columnC',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return `Prefix ${value} Suffix`
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 20,
            columnC: true
          },
          {
            columnA: null,
            columnB: 50,
            columnC: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 70,
            columnC: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↑
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 27
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Hitbox
            key={2}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 64
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column C Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {120}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {170}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix null Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {133}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>,
        <View
          key={null}
          style={{
            backgroundColor: '#AEAEFA',
            flexDirection: 'row',
            width: '100%',
            borderTopColor: '#AB3928',
            borderTopWidth: 19
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {150}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix false Suffix
            </Text>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('can sort by a custom text column ascending when it backs onto a boolean', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnC',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              switch (value) {
                case null:
                  return true

                case 'Example Column A Value A':
                  return false

                case 'Example Column A Value B':
                  return null

                default:
                  return true
              }
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column B Label',
          width: 27,
          key: 'columnB',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return (value ?? 33) + 100
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column C Label',
          width: 64,
          key: 'columnC',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return `Prefix ${value} Suffix`
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 20,
            columnC: true
          },
          {
            columnA: null,
            columnB: 50,
            columnC: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 70,
            columnC: null
          }
        ]
      }}
      sortBy="columnC"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              flexGrow: 27
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Hitbox
            key={2}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 64
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column C Label ↓
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {170}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix null Suffix
            </Text>
          ]}
        </View>,
        <View
          key={null}
          style={{
            backgroundColor: '#AEAEFA',
            flexDirection: 'row',
            width: '100%',
            borderTopColor: '#AB3928',
            borderTopWidth: 19
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {150}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix false Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {120}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {133}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('can sort by a custom text column descending when it backs onto a boolean', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnC',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              switch (value) {
                case null:
                  return true

                case 'Example Column A Value A':
                  return false

                case 'Example Column A Value B':
                  return null

                default:
                  return true
              }
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column B Label',
          width: 27,
          key: 'columnB',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return (value ?? 33) + 100
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column C Label',
          width: 64,
          key: 'columnC',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return `Prefix ${value} Suffix`
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 20,
            columnC: true
          },
          {
            columnA: null,
            columnB: 50,
            columnC: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 70,
            columnC: null
          }
        ]
      }}
      sortBy="columnC"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              flexGrow: 27
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Hitbox
            key={2}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 64
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column C Label ↑
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {120}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {133}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>,
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {150}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix false Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {170}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix null Suffix
            </Text>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('can sort by a custom text column ascending when it backs onto a number', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnC',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              switch (value) {
                case null:
                  return true

                case 'Example Column A Value A':
                  return false

                case 'Example Column A Value B':
                  return null

                default:
                  return true
              }
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column B Label',
          width: 27,
          key: 'columnB',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return (value ?? 33) + 100
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column C Label',
          width: 64,
          key: 'columnC',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return `Prefix ${value} Suffix`
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 20,
            columnC: true
          },
          {
            columnA: null,
            columnB: 50,
            columnC: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 70,
            columnC: null
          }
        ]
      }}
      sortBy="columnB"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              flexGrow: 27
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column B Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={2}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 64
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column C Label
            </Text>
          </Hitbox>
        ]}
      </View>

      {[
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {133}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {120}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>,
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%',
            borderTopColor: '#AB3928',
            borderTopWidth: 19
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {150}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix false Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {170}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix null Suffix
            </Text>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('can sort by a custom text column descending when it backs onto a number', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnC',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              switch (value) {
                case null:
                  return true

                case 'Example Column A Value A':
                  return false

                case 'Example Column A Value B':
                  return null

                default:
                  return true
              }
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column B Label',
          width: 27,
          key: 'columnB',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return (value ?? 33) + 100
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column C Label',
          width: 64,
          key: 'columnC',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return `Prefix ${value} Suffix`
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 20,
            columnC: true
          },
          {
            columnA: null,
            columnB: 50,
            columnC: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 70,
            columnC: null
          }
        ]
      }}
      sortBy="columnB"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              flexGrow: 27
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column B Label ↑
            </Text>
          </Hitbox>,
          <Hitbox
            key={2}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 64
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column C Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {170}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix null Suffix
            </Text>
          ]}
        </View>,
        <View
          key={null}
          style={{
            backgroundColor: '#AEAEFA',
            flexDirection: 'row',
            width: '100%',
            borderTopColor: '#AB3928',
            borderTopWidth: 19
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {150}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix false Suffix
            </Text>
          ]}
        </View>,

        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {120}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {133}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('sorts descending on pressing a custom column header which is currently sorted ascending', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnC',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              switch (value) {
                case null:
                  return true

                case 'Example Column A Value A':
                  return false

                case 'Example Column A Value B':
                  return null

                default:
                  return true
              }
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column B Label',
          width: 27,
          key: 'columnB',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return (value ?? 33) + 100
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column C Label',
          width: 64,
          key: 'columnC',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return `Prefix ${value} Suffix`
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 20,
            columnC: true
          },
          {
            columnA: null,
            columnB: 50,
            columnC: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 70,
            columnC: null
          }
        ]
      }}
      sortBy="columnB"
      sortDirection="ascending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  unwrapRenderedFunctionComponent(rendered).props.children[0].props.children[1].props.onPress()

  expect(onSortChange).toHaveBeenCalledTimes(1)
  expect(onSortChange).toHaveBeenCalledWith('columnB', 'descending')
})

test('sorts ascending on pressing a custom column header which is currently sorted descending', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnC',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              switch (value) {
                case null:
                  return true

                case 'Example Column A Value A':
                  return false

                case 'Example Column A Value B':
                  return null

                default:
                  return true
              }
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column B Label',
          width: 27,
          key: 'columnB',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return (value ?? 33) + 100
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column C Label',
          width: 64,
          key: 'columnC',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return `Prefix ${value} Suffix`
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 20,
            columnC: true
          },
          {
            columnA: null,
            columnB: 50,
            columnC: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 70,
            columnC: null
          }
        ]
      }}
      sortBy="columnB"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  unwrapRenderedFunctionComponent(rendered).props.children[0].props.children[1].props.onPress()

  expect(onSortChange).toHaveBeenCalledTimes(1)
  expect(onSortChange).toHaveBeenCalledWith('columnB', 'ascending')
})

test('sorts ascending on pressing a custom column header which is currently unsorted', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnC',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              switch (value) {
                case null:
                  return true

                case 'Example Column A Value A':
                  return false

                case 'Example Column A Value B':
                  return null

                default:
                  return true
              }
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column B Label',
          width: 27,
          key: 'columnB',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return (value ?? 33) + 100
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column C Label',
          width: 64,
          key: 'columnC',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return `Prefix ${value} Suffix`
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 20,
            columnC: true
          },
          {
            columnA: null,
            columnB: 50,
            columnC: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 70,
            columnC: null
          }
        ]
      }}
      sortBy="columnC"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  unwrapRenderedFunctionComponent(rendered).props.children[0].props.children[1].props.onPress()

  expect(onSortChange).toHaveBeenCalledTimes(1)
  expect(onSortChange).toHaveBeenCalledWith('columnB', 'ascending')
})

test('renders as expected with custom text columns without horizontal padding', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnC',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 0,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              switch (value) {
                case null:
                  return true

                case 'Example Column A Value A':
                  return false

                case 'Example Column A Value B':
                  return null

                default:
                  return true
              }
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column B Label',
          width: 27,
          key: 'columnB',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return (value ?? 33) + 100
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column C Label',
          width: 64,
          key: 'columnC',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return `Prefix ${value} Suffix`
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 20,
            columnC: true
          },
          {
            columnA: null,
            columnB: 50,
            columnC: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 70,
            columnC: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 27
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Hitbox
            key={2}
            style={{
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 64
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column C Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3
              }}
            >
              {150}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3
              }}
            >
              Prefix false Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3
              }}
            >
              {133}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3
              }}
            >
              {170}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3
              }}
            >
              Prefix null Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3
              }}
            >
              {120}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingVertical: 3
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected with custom text columns without vertical padding', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnC',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 0,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              switch (value) {
                case null:
                  return true

                case 'Example Column A Value A':
                  return false

                case 'Example Column A Value B':
                  return null

                default:
                  return true
              }
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column B Label',
          width: 27,
          key: 'columnB',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return (value ?? 33) + 100
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column C Label',
          width: 64,
          key: 'columnC',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return `Prefix ${value} Suffix`
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 20,
            columnC: true
          },
          {
            columnA: null,
            columnB: 50,
            columnC: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 70,
            columnC: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 27
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Hitbox
            key={2}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 64
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column C Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28
              }}
            >
              {150}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56
              }}
            >
              Prefix false Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28
              }}
            >
              <Text>Example False</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28
              }}
            >
              {133}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28
              }}
            >
              {170}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56
              }}
            >
              Prefix null Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
        >
          {[
            <View
              key={0}
              style={{
                flexBasis: 0,
                flexGrow: 44,
                paddingLeft: 56,
                paddingRight: 28
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28
              }}
            >
              {120}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected with custom text columns without horizontal padding in the header', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnC',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 0
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              switch (value) {
                case null:
                  return true

                case 'Example Column A Value A':
                  return false

                case 'Example Column A Value B':
                  return null

                default:
                  return true
              }
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column B Label',
          width: 27,
          key: 'columnB',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return (value ?? 33) + 100
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column C Label',
          width: 64,
          key: 'columnC',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return `Prefix ${value} Suffix`
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 20,
            columnC: true
          },
          {
            columnA: null,
            columnB: 50,
            columnC: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 70,
            columnC: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
        }}
      >
        {[
          <Hitbox
            key={0}
            style={{
              paddingLeft: 56,
              paddingRight: 28,
              flexBasis: 0,
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              flexBasis: 0,
              flexGrow: 27
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Hitbox
            key={2}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              flexBasis: 0,
              flexGrow: 64
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column C Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {150}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix false Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example False</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {133}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {170}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix null Suffix
            </Text>
          ]}
        </View>,
        <View
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {120}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              Prefix true Suffix
            </Text>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('can filter a custom text column rendered as a string', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnC',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              switch (value) {
                case null:
                  return true

                case 'Example Column A Value A':
                  return false

                case 'Example Column A Value B':
                  return null

                default:
                  return true
              }
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column B Label',
          width: 27,
          key: 'columnB',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return (value ?? 33) + 100
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column C Label',
          width: 64,
          key: 'columnC',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return `Prefix \n \r \t ${value} Suffix`
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 20,
            columnC: true
          },
          {
            columnA: null,
            columnB: 50,
            columnC: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 70,
            columnC: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    FIX \n \t \r faL \n \n \r \t  '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 27
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Hitbox
            key={2}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 64
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column C Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {150}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              {'Prefix \n \r \t false Suffix'}
            </Text>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('can filter a custom text column rendered as a number', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnC',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'customText',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              switch (value) {
                case null:
                  return true

                case 'Example Column A Value A':
                  return false

                case 'Example Column A Value B':
                  return null

                default:
                  return true
              }
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column B Label',
          width: 27,
          key: 'columnB',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return (value ?? 33) + 100
            }
          },
          alignment: 'left'
        },
        {
          type: 'customText',
          label: 'Example Column C Label',
          width: 64,
          key: 'columnC',
          render (value, context) {
            if (context !== 'Example Context') {
              return 'Invalid Context'
            } else {
              return `Prefix \n \r \t ${value} Suffix`
            }
          },
          alignment: 'left'
        }
      ]
    }
  )

  const onSortChange = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 20,
            columnC: true
          },
          {
            columnA: null,
            columnB: 50,
            columnC: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 70,
            columnC: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    15 \n \n \r \t  '}
      whenEmpty="Example When Empty"
      context="Example Context"
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 27
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column B Label
            </Text>
          </Hitbox>,
          <Hitbox
            key={2}
            style={{
              paddingLeft: 28,
              paddingRight: 56,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 64
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
              }}
            >
              Example Column C Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <View
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
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
                paddingVertical: 3
              }}
            >
              <Text>Example True</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 27,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
              }}
            >
              {150}
            </Text>,
            <Text
              key={2}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 64,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 28,
                paddingRight: 56,
                paddingVertical: 3
              }}
            >
              {'Prefix \n \r \t false Suffix'}
            </Text>
          ]}
        </View>
      ]}
    </View>
  )
  expect(onSortChange).not.toHaveBeenCalled()
})

test('renders as expected with a row press callback', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'right'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'middle'
        }
      ]
    }
  )

  const onSortChange = jest.fn()
  const onPressRow = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
      onPressRow={onPressRow}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%' }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: '#213EA5',
          borderBottomWidth: 12,
          borderBottomColor: '#323098'
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
              flexGrow: 44
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4,
                textAlign: 'right'
              }}
            >
              Example Column A Label ↓
            </Text>
          </Hitbox>,
          <Hitbox
            key={1}
            style={{
              paddingHorizontal: 28,
              paddingVertical: 7,
              flexBasis: 0,
              flexGrow: 22
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4
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
              color: '#EA0498',
              fontFamily: 'Example Header Font Family',
              fontSize: 31,
              lineHeight: 43.4
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
              flexGrow: 33
            }}
            onPress={expect.any(Function)}
            disabled={false}
          >
            <Text
              style={{
                color: '#EA0498',
                fontFamily: 'Example Header Font Family',
                fontSize: 31,
                lineHeight: 43.4,
                textAlign: 'center'
              }}
            >
              Example Column D Label
            </Text>
          </Hitbox>
        ]}
      </View>
      {[
        <Hitbox
          key={null}
          style={{
            backgroundColor: '#7A7ACE',
            flexDirection: 'row',
            width: '100%'
          }}
          onPress={expect.any(Function)}
          disabled={false}
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
                justifyContent: 'flex-end'
              }}
            >
              <Text>Example Null</Text>
            </View>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                justifyContent: 'center'
              }}
            >
              <Text>Example False</Text>
            </View>
          ]}
        </Hitbox>,
        <Hitbox
          key="Example Column A Value A"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
          onPress={expect.any(Function)}
          disabled={false}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
                textAlign: 'right'
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
                paddingVertical: 3
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
                paddingVertical: 3
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
                justifyContent: 'center'
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </Hitbox>,
        <Hitbox
          key="Example Column A Value B"
          style={{
            backgroundColor: '#7A7ACE',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
          onPress={expect.any(Function)}
          disabled={false}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
                textAlign: 'right'
              }}
            >
              Example Column A Value B
            </Text>,
            <Text
              key={1}
              style={{
                color: '#92EAEA',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                justifyContent: 'center'
              }}
            >
              <Text>Example Null</Text>
            </View>
          ]}
        </Hitbox>,
        <Hitbox
          key="Example Column A Value C"
          style={{
            backgroundColor: '#AEAEFA',
            borderTopColor: '#AB3928',
            borderTopWidth: 19,
            flexDirection: 'row',
            width: '100%'
          }}
          onPress={expect.any(Function)}
          disabled={false}
        >
          {[
            <Text
              key={0}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 44,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingLeft: 56,
                paddingRight: 28,
                paddingVertical: 3,
                textAlign: 'right'
              }}
            >
              Example Column A Value C
            </Text>,
            <Text
              key={1}
              style={{
                color: '#348472',
                flexBasis: 0,
                flexGrow: 22,
                fontFamily: 'Example Body Font Family',
                fontSize: 27,
                lineHeight: 37.8,
                paddingHorizontal: 28,
                paddingVertical: 3
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
                paddingVertical: 3
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
                justifyContent: 'center'
              }}
            >
              <Text>Example True</Text>
            </View>
          ]}
        </Hitbox>
      ]}
    </View>
  )

  expect(onSortChange).not.toHaveBeenCalled()
  expect(onPressRow).not.toHaveBeenCalled()
})

test('executes row press callbacks on press', () => {
  interface TableRow {
    readonly columnA: null | string
    readonly columnB: null | number
    readonly columnC: 0 | 1 | 2 | 3
    readonly columnD: null | boolean
  }

  const Component = createOfflineTableComponent<
  'columnA' | 'columnB',
  'columnD',
  TableRow,
  'Example Context'
  >(
    {
      header: {
        fontFamily: 'Example Header Font Family',
        fontSize: 31,
        background: '#213EA5',
        color: '#EA0498',
        verticalPadding: 7
      },
      headerFirstRowSeparator: {
        color: '#323098',
        width: 12
      },
      body: {
        fontFamily: 'Example Body Font Family',
        fontSize: 27,
        horizontalPadding: 56,
        verticalPadding: 3,
        odd: {
          color: '#92EAEA',
          background: '#7A7ACE'
        },
        even: {
          color: '#348472',
          background: '#AEAEFA'
        },
        primitiveElements: {
          null: <Text>Example Null</Text>,
          false: <Text>Example False</Text>,
          true: <Text>Example True</Text>
        }
      },
      rowSeparator: {
        color: '#AB3928',
        width: 19
      },
      empty: {
        fontFamily: 'Example Empty Font Family',
        fontSize: 63,
        horizontalPadding: 74,
        verticalPadding: 85,
        background: '#989874',
        color: '#298272'
      }
    },
    {
      key: 'columnA',
      columns: [
        {
          type: 'basic',
          label: 'Example Column A Label',
          width: 44,
          key: 'columnA',
          alignment: 'right'
        },
        {
          type: 'basic',
          label: 'Example Column B Label',
          width: 22,
          key: 'columnB',
          alignment: 'left'
        },
        {
          type: 'customElement',
          label: 'Example Column C Label',
          width: 11,
          render (row, context) {
            if (context !== 'Example Context') {
              return <Text>Invalid Context</Text>
            } else {
              switch (row.columnC) {
                case 0:
                  return <Text>Example Column C Value A</Text>

                case 1:
                  return <Text>Example Column C Value B</Text>

                case 2:
                  return <Text>Example Column C Value C</Text>

                case 3:
                  return <Text>Example Column C Value D</Text>
              }
            }
          },
          containsSearchTerm (row, filter, context) {
            return (
              context === 'Example Context' &&
              filter === 'example filter text' &&
              row.columnC === 3
            )
          },
          alignment: 'left'
        },
        {
          type: 'basic',
          label: 'Example Column D Label',
          width: 33,
          key: 'columnD',
          alignment: 'middle'
        }
      ]
    }
  )

  const onSortChange = jest.fn()
  const onPressRow = jest.fn()

  const rendered = (
    <Component
      data={{
        rows: [
          {
            columnA: 'Example Column A Value C',
            columnB: 934893,
            columnC: 3,
            columnD: true
          },
          {
            columnA: null,
            columnB: 63636,
            columnC: 1,
            columnD: false
          },
          {
            columnA: 'Example Column A Value A',
            columnB: null,
            columnC: 0,
            columnD: true
          },
          {
            columnA: 'Example Column A Value B',
            columnB: 43532,
            columnC: 2,
            columnD: null
          }
        ]
      }}
      sortBy="columnA"
      sortDirection="descending"
      onSortChange={onSortChange}
      filter={'   \n   \r    \t    '}
      whenEmpty="Example When Empty"
      context="Example Context"
      onPressRow={onPressRow}
    />
  )

  unwrapRenderedFunctionComponent(rendered).props.children[1][1].props.onPress()

  expect(onSortChange).not.toHaveBeenCalled()
  expect(onPressRow).toBeCalledTimes(1)
  expect(onPressRow).toBeCalledWith({
    columnA: 'Example Column A Value A',
    columnB: null,
    columnC: 0,
    columnD: true
  })
})
