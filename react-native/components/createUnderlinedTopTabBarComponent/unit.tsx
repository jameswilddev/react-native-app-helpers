import * as React from 'react'
import { Text } from 'react-native'
import {
  createUnderlinedTopTabBarComponent,
  unwrapRenderedFunctionComponent,
  Hitbox,
  HorizontallySymmetricalSafeAreaView
} from '../../..'

test('renders as expected without underlines or vertical padding', () => {
  const Component = createUnderlinedTopTabBarComponent(
    {
      fontSize: 20,
      verticalPadding: 0,
      inactive: {
        color: 'yellow',
        fontFamily: 'Example Inactive Font Family',
        backgroundColor: 'red',
        underline: null
      },
      active: {
        color: 'green',
        fontFamily: 'Example Active Font Family',
        backgroundColor: 'orange',
        underline: null
      }
    },
    [
      { tab: 'exampleTabA', text: 'Example Tab A Text' },
      { tab: 'exampleTabB', text: 'Example Tab B Text' },
      { tab: 'exampleTabC', text: 'Example Tab C Text' },
      { tab: 'exampleTabD', text: 'Example Tab D Text' }
    ]
  )
  const setTab = jest.fn()

  const rendered = <Component tab="exampleTabC" setTab={setTab} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      style={{ backgroundColor: 'red', height: 28, flexDirection: 'row' }}
      left
      right
    >
      {[
        <Hitbox
          key="exampleTabA"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab A Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabB"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab B Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabC"
          disabled
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'orange'
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'green',
              fontFamily: 'Example Active Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab C Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabD"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab D Text
          </Text>
        </Hitbox>
      ]}
    </HorizontallySymmetricalSafeAreaView>
  )
  expect(setTab).not.toHaveBeenCalled()
})

test('renders as expected without underlines with vertical padding', () => {
  const Component = createUnderlinedTopTabBarComponent(
    {
      fontSize: 20,
      verticalPadding: 10,
      inactive: {
        color: 'yellow',
        fontFamily: 'Example Inactive Font Family',
        backgroundColor: 'red',
        underline: null
      },
      active: {
        color: 'green',
        fontFamily: 'Example Active Font Family',
        backgroundColor: 'orange',
        underline: null
      }
    },
    [
      { tab: 'exampleTabA', text: 'Example Tab A Text' },
      { tab: 'exampleTabB', text: 'Example Tab B Text' },
      { tab: 'exampleTabC', text: 'Example Tab C Text' },
      { tab: 'exampleTabD', text: 'Example Tab D Text' }
    ]
  )
  const setTab = jest.fn()

  const rendered = <Component tab="exampleTabC" setTab={setTab} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      style={{ backgroundColor: 'red', height: 48, flexDirection: 'row' }}
      left
      right
    >
      {[
        <Hitbox
          key="exampleTabA"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab A Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabB"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab B Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabC"
          disabled
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'orange',
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'green',
              fontFamily: 'Example Active Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab C Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabD"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab D Text
          </Text>
        </Hitbox>
      ]}
    </HorizontallySymmetricalSafeAreaView>
  )
  expect(setTab).not.toHaveBeenCalled()
})

test('renders as expected with underlined inactive without vertical padding', () => {
  const Component = createUnderlinedTopTabBarComponent(
    {
      fontSize: 20,
      verticalPadding: 0,
      inactive: {
        color: 'yellow',
        fontFamily: 'Example Inactive Font Family',
        backgroundColor: 'red',
        underline: { width: 4, color: 'blue' }
      },
      active: {
        color: 'green',
        fontFamily: 'Example Active Font Family',
        backgroundColor: 'orange',
        underline: null
      }
    },
    [
      { tab: 'exampleTabA', text: 'Example Tab A Text' },
      { tab: 'exampleTabB', text: 'Example Tab B Text' },
      { tab: 'exampleTabC', text: 'Example Tab C Text' },
      { tab: 'exampleTabD', text: 'Example Tab D Text' }
    ]
  )
  const setTab = jest.fn()

  const rendered = <Component tab="exampleTabC" setTab={setTab} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      style={{
        backgroundColor: 'red',
        height: 28,
        flexDirection: 'row',
        borderBottomColor: 'blue',
        borderBottomWidth: 4
      }}
      left
      right
    >
      {[
        <Hitbox
          key="exampleTabA"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -4
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab A Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabB"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -4
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab B Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabC"
          disabled
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'orange',
            marginBottom: -4
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'green',
              fontFamily: 'Example Active Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab C Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabD"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -4
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab D Text
          </Text>
        </Hitbox>
      ]}
    </HorizontallySymmetricalSafeAreaView>
  )
  expect(setTab).not.toHaveBeenCalled()
})

test('renders as expected with underlined inactive and vertical padding', () => {
  const Component = createUnderlinedTopTabBarComponent(
    {
      fontSize: 20,
      verticalPadding: 10,
      inactive: {
        color: 'yellow',
        fontFamily: 'Example Inactive Font Family',
        backgroundColor: 'red',
        underline: { width: 4, color: 'blue' }
      },
      active: {
        color: 'green',
        fontFamily: 'Example Active Font Family',
        backgroundColor: 'orange',
        underline: null
      }
    },
    [
      { tab: 'exampleTabA', text: 'Example Tab A Text' },
      { tab: 'exampleTabB', text: 'Example Tab B Text' },
      { tab: 'exampleTabC', text: 'Example Tab C Text' },
      { tab: 'exampleTabD', text: 'Example Tab D Text' }
    ]
  )
  const setTab = jest.fn()

  const rendered = <Component tab="exampleTabC" setTab={setTab} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      style={{
        backgroundColor: 'red',
        height: 48,
        flexDirection: 'row',
        borderBottomColor: 'blue',
        borderBottomWidth: 4
      }}
      left
      right
    >
      {[
        <Hitbox
          key="exampleTabA"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -4,
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab A Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabB"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -4,
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab B Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabC"
          disabled
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'orange',
            marginBottom: -4,
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'green',
              fontFamily: 'Example Active Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab C Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabD"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -4,
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab D Text
          </Text>
        </Hitbox>
      ]}
    </HorizontallySymmetricalSafeAreaView>
  )
  expect(setTab).not.toHaveBeenCalled()
})

test('renders as expected with underlined active without vertical padding', () => {
  const Component = createUnderlinedTopTabBarComponent(
    {
      fontSize: 20,
      verticalPadding: 0,
      inactive: {
        color: 'yellow',
        fontFamily: 'Example Inactive Font Family',
        backgroundColor: 'red',
        underline: null
      },
      active: {
        color: 'green',
        fontFamily: 'Example Active Font Family',
        backgroundColor: 'orange',
        underline: { color: 'blue', width: 4 }
      }
    },
    [
      { tab: 'exampleTabA', text: 'Example Tab A Text' },
      { tab: 'exampleTabB', text: 'Example Tab B Text' },
      { tab: 'exampleTabC', text: 'Example Tab C Text' },
      { tab: 'exampleTabD', text: 'Example Tab D Text' }
    ]
  )
  const setTab = jest.fn()

  const rendered = <Component tab="exampleTabC" setTab={setTab} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      style={{ backgroundColor: 'red', height: 28, flexDirection: 'row' }}
      left
      right
    >
      {[
        <Hitbox
          key="exampleTabA"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab A Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabB"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab B Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabC"
          disabled
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'orange',
            borderBottomWidth: 4,
            borderBottomColor: 'blue'
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'green',
              fontFamily: 'Example Active Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab C Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabD"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab D Text
          </Text>
        </Hitbox>
      ]}
    </HorizontallySymmetricalSafeAreaView>
  )
  expect(setTab).not.toHaveBeenCalled()
})

test('renders as expected with underlined active vertical padding', () => {
  const Component = createUnderlinedTopTabBarComponent(
    {
      fontSize: 20,
      verticalPadding: 10,
      inactive: {
        color: 'yellow',
        fontFamily: 'Example Inactive Font Family',
        backgroundColor: 'red',
        underline: null
      },
      active: {
        color: 'green',
        fontFamily: 'Example Active Font Family',
        backgroundColor: 'orange',
        underline: { color: 'blue', width: 4 }
      }
    },
    [
      { tab: 'exampleTabA', text: 'Example Tab A Text' },
      { tab: 'exampleTabB', text: 'Example Tab B Text' },
      { tab: 'exampleTabC', text: 'Example Tab C Text' },
      { tab: 'exampleTabD', text: 'Example Tab D Text' }
    ]
  )
  const setTab = jest.fn()

  const rendered = <Component tab="exampleTabC" setTab={setTab} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      style={{ backgroundColor: 'red', height: 48, flexDirection: 'row' }}
      left
      right
    >
      {[
        <Hitbox
          key="exampleTabA"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab A Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabB"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab B Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabC"
          disabled
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'orange',
            borderBottomWidth: 4,
            borderBottomColor: 'blue',
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'green',
              fontFamily: 'Example Active Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab C Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabD"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab D Text
          </Text>
        </Hitbox>
      ]}
    </HorizontallySymmetricalSafeAreaView>
  )
  expect(setTab).not.toHaveBeenCalled()
})

test('renders as expected with thinly underlined inactive without vertical padding', () => {
  const Component = createUnderlinedTopTabBarComponent(
    {
      fontSize: 20,
      verticalPadding: 0,
      inactive: {
        color: 'yellow',
        fontFamily: 'Example Inactive Font Family',
        backgroundColor: 'red',
        underline: { width: 4, color: 'blue' }
      },
      active: {
        color: 'green',
        fontFamily: 'Example Active Font Family',
        backgroundColor: 'orange',
        underline: { width: 6, color: 'purple' }
      }
    },
    [
      { tab: 'exampleTabA', text: 'Example Tab A Text' },
      { tab: 'exampleTabB', text: 'Example Tab B Text' },
      { tab: 'exampleTabC', text: 'Example Tab C Text' },
      { tab: 'exampleTabD', text: 'Example Tab D Text' }
    ]
  )
  const setTab = jest.fn()

  const rendered = <Component tab="exampleTabC" setTab={setTab} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      style={{
        backgroundColor: 'red',
        height: 28,
        flexDirection: 'row',
        borderBottomColor: 'blue',
        borderBottomWidth: 4
      }}
      left
      right
    >
      {[
        <Hitbox
          key="exampleTabA"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -4
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab A Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabB"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -4
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab B Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabC"
          disabled
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'orange',
            marginBottom: -4,
            borderBottomWidth: 6,
            borderBottomColor: 'purple'
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'green',
              fontFamily: 'Example Active Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab C Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabD"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -4
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab D Text
          </Text>
        </Hitbox>
      ]}
    </HorizontallySymmetricalSafeAreaView>
  )
  expect(setTab).not.toHaveBeenCalled()
})

test('renders as expected with thinly underlined inactive and vertical padding', () => {
  const Component = createUnderlinedTopTabBarComponent(
    {
      fontSize: 20,
      verticalPadding: 10,
      inactive: {
        color: 'yellow',
        fontFamily: 'Example Inactive Font Family',
        backgroundColor: 'red',
        underline: { width: 4, color: 'blue' }
      },
      active: {
        color: 'green',
        fontFamily: 'Example Active Font Family',
        backgroundColor: 'orange',
        underline: { width: 6, color: 'purple' }
      }
    },
    [
      { tab: 'exampleTabA', text: 'Example Tab A Text' },
      { tab: 'exampleTabB', text: 'Example Tab B Text' },
      { tab: 'exampleTabC', text: 'Example Tab C Text' },
      { tab: 'exampleTabD', text: 'Example Tab D Text' }
    ]
  )
  const setTab = jest.fn()

  const rendered = <Component tab="exampleTabC" setTab={setTab} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      style={{
        backgroundColor: 'red',
        height: 48,
        flexDirection: 'row',
        borderBottomColor: 'blue',
        borderBottomWidth: 4
      }}
      left
      right
    >
      {[
        <Hitbox
          key="exampleTabA"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -4,
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab A Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabB"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -4,
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab B Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabC"
          disabled
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'orange',
            marginBottom: -4,
            borderBottomWidth: 6,
            borderBottomColor: 'purple',
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'green',
              fontFamily: 'Example Active Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab C Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabD"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -4,
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab D Text
          </Text>
        </Hitbox>
      ]}
    </HorizontallySymmetricalSafeAreaView>
  )
  expect(setTab).not.toHaveBeenCalled()
})

test('renders as expected with thinly underlined active without vertical padding', () => {
  const Component = createUnderlinedTopTabBarComponent(
    {
      fontSize: 20,
      verticalPadding: 0,
      inactive: {
        color: 'yellow',
        fontFamily: 'Example Inactive Font Family',
        backgroundColor: 'red',
        underline: { width: 6, color: 'blue' }
      },
      active: {
        color: 'green',
        fontFamily: 'Example Active Font Family',
        backgroundColor: 'orange',
        underline: { width: 4, color: 'purple' }
      }
    },
    [
      { tab: 'exampleTabA', text: 'Example Tab A Text' },
      { tab: 'exampleTabB', text: 'Example Tab B Text' },
      { tab: 'exampleTabC', text: 'Example Tab C Text' },
      { tab: 'exampleTabD', text: 'Example Tab D Text' }
    ]
  )
  const setTab = jest.fn()

  const rendered = <Component tab="exampleTabC" setTab={setTab} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      style={{
        backgroundColor: 'red',
        height: 28,
        flexDirection: 'row',
        borderBottomColor: 'blue',
        borderBottomWidth: 6
      }}
      left
      right
    >
      {[
        <Hitbox
          key="exampleTabA"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -6
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab A Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabB"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -6
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab B Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabC"
          disabled
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'orange',
            marginBottom: -6,
            borderBottomWidth: 4,
            borderBottomColor: 'purple'
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'green',
              fontFamily: 'Example Active Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab C Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabD"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -6
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab D Text
          </Text>
        </Hitbox>
      ]}
    </HorizontallySymmetricalSafeAreaView>
  )
  expect(setTab).not.toHaveBeenCalled()
})

test('renders as expected with thinly underlined active and vertical padding', () => {
  const Component = createUnderlinedTopTabBarComponent(
    {
      fontSize: 20,
      verticalPadding: 10,
      inactive: {
        color: 'yellow',
        fontFamily: 'Example Inactive Font Family',
        backgroundColor: 'red',
        underline: { width: 6, color: 'blue' }
      },
      active: {
        color: 'green',
        fontFamily: 'Example Active Font Family',
        backgroundColor: 'orange',
        underline: { width: 4, color: 'purple' }
      }
    },
    [
      { tab: 'exampleTabA', text: 'Example Tab A Text' },
      { tab: 'exampleTabB', text: 'Example Tab B Text' },
      { tab: 'exampleTabC', text: 'Example Tab C Text' },
      { tab: 'exampleTabD', text: 'Example Tab D Text' }
    ]
  )
  const setTab = jest.fn()

  const rendered = <Component tab="exampleTabC" setTab={setTab} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      style={{
        backgroundColor: 'red',
        height: 48,
        flexDirection: 'row',
        borderBottomColor: 'blue',
        borderBottomWidth: 6
      }}
      left
      right
    >
      {[
        <Hitbox
          key="exampleTabA"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -6,
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab A Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabB"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -6,
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab B Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabC"
          disabled
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'orange',
            marginBottom: -6,
            borderBottomWidth: 4,
            borderBottomColor: 'purple',
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'green',
              fontFamily: 'Example Active Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab C Text
          </Text>
        </Hitbox>,
        <Hitbox
          key="exampleTabD"
          disabled={false}
          style={{
            flexBasis: 0,
            flexGrow: 1,
            marginBottom: -6,
            paddingTop: 10
          }}
          onPress={expect.any(Function)}
        >
          <Text
            numberOfLines={1}
            style={{
              color: 'yellow',
              fontFamily: 'Example Inactive Font Family',
              fontSize: 20,
              lineHeight: 28,
              textAlign: 'center'
            }}
          >
            Example Tab D Text
          </Text>
        </Hitbox>
      ]}
    </HorizontallySymmetricalSafeAreaView>
  )
  expect(setTab).not.toHaveBeenCalled()
})

test('calls setTab once when an inactive tab is pressed', () => {
  const Component = createUnderlinedTopTabBarComponent(
    {
      fontSize: 20,
      verticalPadding: 0,
      inactive: {
        color: 'yellow',
        fontFamily: 'Example Inactive Font Family',
        backgroundColor: 'red',
        underline: null
      },
      active: {
        color: 'green',
        fontFamily: 'Example Active Font Family',
        backgroundColor: 'orange',
        underline: null
      }
    },
    [
      { tab: 'exampleTabA', text: 'Example Tab A Text' },
      { tab: 'exampleTabB', text: 'Example Tab B Text' },
      { tab: 'exampleTabC', text: 'Example Tab C Text' },
      { tab: 'exampleTabD', text: 'Example Tab D Text' }
    ]
  )
  const setTab = jest.fn()
  const rendered = <Component tab="exampleTabC" setTab={setTab} />

  unwrapRenderedFunctionComponent(rendered).props.children[1].props.onPress()

  expect(setTab).toBeCalledTimes(1)
  expect(setTab).toBeCalledWith('exampleTabB')
})
