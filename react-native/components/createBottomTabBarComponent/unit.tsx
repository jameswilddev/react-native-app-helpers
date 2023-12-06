import * as React from 'react'
import { Text } from 'react-native'
import {
  createBottomTabBarComponent,
  type SvgIcon,
  unwrapRenderedFunctionComponent,
  Hitbox,
  HorizontallySymmetricalSafeAreaView
} from '../../..'

test('renders as expected', () => {
  type Tab =
    | 'Example Tab A'
    | 'Example Tab B'
    | 'Example Tab C'
    | 'Example Tab D'
  const ExampleTabAIcon: SvgIcon = () => null
  const ExampleTabBIcon: SvgIcon = () => null
  const ExampleTabCIcon: SvgIcon = () => null
  const ExampleTabDIcon: SvgIcon = () => null
  const Component = createBottomTabBarComponent<Tab>(
    {
      topPadding: 12,
      iconTextSpacing: 4,
      fontSize: 20,
      bottomPadding: 5,
      inactive: {
        background: 'yellow',
        iconFill: 'green',
        color: 'blue',
        fontFamily: 'Example Inactive Font Family'
      },
      active: {
        background: 'purple',
        iconFill: 'red',
        color: 'aquamarine',
        fontFamily: 'Example Active Font Family'
      }
    },
    [
      {
        tab: 'Example Tab A',
        icon: ExampleTabAIcon,
        text: 'Example Tab A Label'
      },
      {
        tab: 'Example Tab B',
        icon: ExampleTabBIcon,
        text: 'Example Tab B Label'
      },
      {
        tab: 'Example Tab C',
        icon: ExampleTabCIcon,
        text: 'Example Tab C Label'
      },
      {
        tab: 'Example Tab D',
        icon: ExampleTabDIcon,
        text: 'Example Tab D Label'
      }
    ]
  )
  const setTab = jest.fn()
  const resetActiveTab = jest.fn()

  const rendered = (
    <Component
      tab="Example Tab B"
      setTab={setTab}
      resetActiveTab={resetActiveTab}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      style={{ width: '100%', flexDirection: 'row', backgroundColor: 'yellow' }}
      left
      right
    >
      {[
        <Hitbox
          onPress={expect.any(Function)}
          key="Example Tab A"
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'yellow'
          }}
        >
          <HorizontallySymmetricalSafeAreaView
            style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 5 }}
            bottom
          >
            <ExampleTabAIcon fill="green" />
            <Text
              numberOfLines={1}
              style={{
                paddingTop: 4,
                fontSize: 20,
                lineHeight: 28,
                color: 'blue',
                fontFamily: 'Example Inactive Font Family'
              }}
            >
              Example Tab A Label
            </Text>
          </HorizontallySymmetricalSafeAreaView>
        </Hitbox>,
        <Hitbox
          onPress={expect.any(Function)}
          key="Example Tab B"
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'purple'
          }}
        >
          <HorizontallySymmetricalSafeAreaView
            style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 5 }}
            bottom
          >
            <ExampleTabBIcon fill="red" />
            <Text
              numberOfLines={1}
              style={{
                paddingTop: 4,
                fontSize: 20,
                lineHeight: 28,
                color: 'aquamarine',
                fontFamily: 'Example Active Font Family'
              }}
            >
              Example Tab B Label
            </Text>
          </HorizontallySymmetricalSafeAreaView>
        </Hitbox>,
        <Hitbox
          onPress={expect.any(Function)}
          key="Example Tab C"
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'yellow'
          }}
        >
          <HorizontallySymmetricalSafeAreaView
            style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 5 }}
            bottom
          >
            <ExampleTabCIcon fill="green" />
            <Text
              numberOfLines={1}
              style={{
                paddingTop: 4,
                fontSize: 20,
                lineHeight: 28,
                color: 'blue',
                fontFamily: 'Example Inactive Font Family'
              }}
            >
              Example Tab C Label
            </Text>
          </HorizontallySymmetricalSafeAreaView>
        </Hitbox>,
        <Hitbox
          onPress={expect.any(Function)}
          key="Example Tab D"
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'yellow'
          }}
        >
          <HorizontallySymmetricalSafeAreaView
            style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 5 }}
            bottom
          >
            <ExampleTabDIcon fill="green" />
            <Text
              numberOfLines={1}
              style={{
                paddingTop: 4,
                fontSize: 20,
                lineHeight: 28,
                color: 'blue',
                fontFamily: 'Example Inactive Font Family'
              }}
            >
              Example Tab D Label
            </Text>
          </HorizontallySymmetricalSafeAreaView>
        </Hitbox>
      ]}
    </HorizontallySymmetricalSafeAreaView>
  )
  expect(setTab).not.toHaveBeenCalled()
  expect(resetActiveTab).not.toBeCalled()
})

test('renders as expected without top padding', () => {
  type Tab =
    | 'Example Tab A'
    | 'Example Tab B'
    | 'Example Tab C'
    | 'Example Tab D'
  const ExampleTabAIcon: SvgIcon = () => null
  const ExampleTabBIcon: SvgIcon = () => null
  const ExampleTabCIcon: SvgIcon = () => null
  const ExampleTabDIcon: SvgIcon = () => null
  const Component = createBottomTabBarComponent<Tab>(
    {
      topPadding: 0,
      iconTextSpacing: 4,
      fontSize: 20,
      bottomPadding: 5,
      inactive: {
        background: 'yellow',
        iconFill: 'green',
        color: 'blue',
        fontFamily: 'Example Inactive Font Family'
      },
      active: {
        background: 'purple',
        iconFill: 'red',
        color: 'aquamarine',
        fontFamily: 'Example Active Font Family'
      }
    },
    [
      {
        tab: 'Example Tab A',
        icon: ExampleTabAIcon,
        text: 'Example Tab A Label'
      },
      {
        tab: 'Example Tab B',
        icon: ExampleTabBIcon,
        text: 'Example Tab B Label'
      },
      {
        tab: 'Example Tab C',
        icon: ExampleTabCIcon,
        text: 'Example Tab C Label'
      },
      {
        tab: 'Example Tab D',
        icon: ExampleTabDIcon,
        text: 'Example Tab D Label'
      }
    ]
  )
  const setTab = jest.fn()
  const resetActiveTab = jest.fn()

  const rendered = (
    <Component
      tab="Example Tab B"
      setTab={setTab}
      resetActiveTab={resetActiveTab}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      style={{ width: '100%', flexDirection: 'row', backgroundColor: 'yellow' }}
      left
      right
    >
      {[
        <Hitbox
          onPress={expect.any(Function)}
          key="Example Tab A"
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'yellow'
          }}
        >
          <HorizontallySymmetricalSafeAreaView
            style={{ alignItems: 'center', paddingBottom: 5 }}
            bottom
          >
            <ExampleTabAIcon fill="green" />
            <Text
              numberOfLines={1}
              style={{
                paddingTop: 4,
                fontSize: 20,
                lineHeight: 28,
                color: 'blue',
                fontFamily: 'Example Inactive Font Family'
              }}
            >
              Example Tab A Label
            </Text>
          </HorizontallySymmetricalSafeAreaView>
        </Hitbox>,
        <Hitbox
          onPress={expect.any(Function)}
          key="Example Tab B"
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'purple'
          }}
        >
          <HorizontallySymmetricalSafeAreaView
            style={{ alignItems: 'center', paddingBottom: 5 }}
            bottom
          >
            <ExampleTabBIcon fill="red" />
            <Text
              numberOfLines={1}
              style={{
                paddingTop: 4,
                fontSize: 20,
                lineHeight: 28,
                color: 'aquamarine',
                fontFamily: 'Example Active Font Family'
              }}
            >
              Example Tab B Label
            </Text>
          </HorizontallySymmetricalSafeAreaView>
        </Hitbox>,
        <Hitbox
          onPress={expect.any(Function)}
          key="Example Tab C"
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'yellow'
          }}
        >
          <HorizontallySymmetricalSafeAreaView
            style={{ alignItems: 'center', paddingBottom: 5 }}
            bottom
          >
            <ExampleTabCIcon fill="green" />
            <Text
              numberOfLines={1}
              style={{
                paddingTop: 4,
                fontSize: 20,
                lineHeight: 28,
                color: 'blue',
                fontFamily: 'Example Inactive Font Family'
              }}
            >
              Example Tab C Label
            </Text>
          </HorizontallySymmetricalSafeAreaView>
        </Hitbox>,
        <Hitbox
          onPress={expect.any(Function)}
          key="Example Tab D"
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'yellow'
          }}
        >
          <HorizontallySymmetricalSafeAreaView
            style={{ alignItems: 'center', paddingBottom: 5 }}
            bottom
          >
            <ExampleTabDIcon fill="green" />
            <Text
              numberOfLines={1}
              style={{
                paddingTop: 4,
                fontSize: 20,
                lineHeight: 28,
                color: 'blue',
                fontFamily: 'Example Inactive Font Family'
              }}
            >
              Example Tab D Label
            </Text>
          </HorizontallySymmetricalSafeAreaView>
        </Hitbox>
      ]}
    </HorizontallySymmetricalSafeAreaView>
  )
  expect(setTab).not.toHaveBeenCalled()
  expect(resetActiveTab).not.toBeCalled()
})

test('renders as expected without bottom padding', () => {
  type Tab =
    | 'Example Tab A'
    | 'Example Tab B'
    | 'Example Tab C'
    | 'Example Tab D'
  const ExampleTabAIcon: SvgIcon = () => null
  const ExampleTabBIcon: SvgIcon = () => null
  const ExampleTabCIcon: SvgIcon = () => null
  const ExampleTabDIcon: SvgIcon = () => null
  const Component = createBottomTabBarComponent<Tab>(
    {
      topPadding: 12,
      iconTextSpacing: 4,
      fontSize: 20,
      bottomPadding: 0,
      inactive: {
        background: 'yellow',
        iconFill: 'green',
        color: 'blue',
        fontFamily: 'Example Inactive Font Family'
      },
      active: {
        background: 'purple',
        iconFill: 'red',
        color: 'aquamarine',
        fontFamily: 'Example Active Font Family'
      }
    },
    [
      {
        tab: 'Example Tab A',
        icon: ExampleTabAIcon,
        text: 'Example Tab A Label'
      },
      {
        tab: 'Example Tab B',
        icon: ExampleTabBIcon,
        text: 'Example Tab B Label'
      },
      {
        tab: 'Example Tab C',
        icon: ExampleTabCIcon,
        text: 'Example Tab C Label'
      },
      {
        tab: 'Example Tab D',
        icon: ExampleTabDIcon,
        text: 'Example Tab D Label'
      }
    ]
  )
  const setTab = jest.fn()
  const resetActiveTab = jest.fn()

  const rendered = (
    <Component
      tab="Example Tab B"
      setTab={setTab}
      resetActiveTab={resetActiveTab}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      style={{ width: '100%', flexDirection: 'row', backgroundColor: 'yellow' }}
      left
      right
    >
      {[
        <Hitbox
          onPress={expect.any(Function)}
          key="Example Tab A"
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'yellow'
          }}
        >
          <HorizontallySymmetricalSafeAreaView
            style={{ alignItems: 'center', paddingTop: 12 }}
            bottom
          >
            <ExampleTabAIcon fill="green" />
            <Text
              numberOfLines={1}
              style={{
                paddingTop: 4,
                fontSize: 20,
                lineHeight: 28,
                color: 'blue',
                fontFamily: 'Example Inactive Font Family'
              }}
            >
              Example Tab A Label
            </Text>
          </HorizontallySymmetricalSafeAreaView>
        </Hitbox>,
        <Hitbox
          onPress={expect.any(Function)}
          key="Example Tab B"
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'purple'
          }}
        >
          <HorizontallySymmetricalSafeAreaView
            style={{ alignItems: 'center', paddingTop: 12 }}
            bottom
          >
            <ExampleTabBIcon fill="red" />
            <Text
              numberOfLines={1}
              style={{
                paddingTop: 4,
                fontSize: 20,
                lineHeight: 28,
                color: 'aquamarine',
                fontFamily: 'Example Active Font Family'
              }}
            >
              Example Tab B Label
            </Text>
          </HorizontallySymmetricalSafeAreaView>
        </Hitbox>,
        <Hitbox
          onPress={expect.any(Function)}
          key="Example Tab C"
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'yellow'
          }}
        >
          <HorizontallySymmetricalSafeAreaView
            style={{ alignItems: 'center', paddingTop: 12 }}
            bottom
          >
            <ExampleTabCIcon fill="green" />
            <Text
              numberOfLines={1}
              style={{
                paddingTop: 4,
                fontSize: 20,
                lineHeight: 28,
                color: 'blue',
                fontFamily: 'Example Inactive Font Family'
              }}
            >
              Example Tab C Label
            </Text>
          </HorizontallySymmetricalSafeAreaView>
        </Hitbox>,
        <Hitbox
          onPress={expect.any(Function)}
          key="Example Tab D"
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'yellow'
          }}
        >
          <HorizontallySymmetricalSafeAreaView
            style={{ alignItems: 'center', paddingTop: 12 }}
            bottom
          >
            <ExampleTabDIcon fill="green" />
            <Text
              numberOfLines={1}
              style={{
                paddingTop: 4,
                fontSize: 20,
                lineHeight: 28,
                color: 'blue',
                fontFamily: 'Example Inactive Font Family'
              }}
            >
              Example Tab D Label
            </Text>
          </HorizontallySymmetricalSafeAreaView>
        </Hitbox>
      ]}
    </HorizontallySymmetricalSafeAreaView>
  )
  expect(setTab).not.toHaveBeenCalled()
  expect(resetActiveTab).not.toBeCalled()
})

test('renders as expected without icon-text spacing', () => {
  type Tab =
    | 'Example Tab A'
    | 'Example Tab B'
    | 'Example Tab C'
    | 'Example Tab D'
  const ExampleTabAIcon: SvgIcon = () => null
  const ExampleTabBIcon: SvgIcon = () => null
  const ExampleTabCIcon: SvgIcon = () => null
  const ExampleTabDIcon: SvgIcon = () => null
  const Component = createBottomTabBarComponent<Tab>(
    {
      topPadding: 12,
      iconTextSpacing: 0,
      fontSize: 20,
      bottomPadding: 5,
      inactive: {
        background: 'yellow',
        iconFill: 'green',
        color: 'blue',
        fontFamily: 'Example Inactive Font Family'
      },
      active: {
        background: 'purple',
        iconFill: 'red',
        color: 'aquamarine',
        fontFamily: 'Example Active Font Family'
      }
    },
    [
      {
        tab: 'Example Tab A',
        icon: ExampleTabAIcon,
        text: 'Example Tab A Label'
      },
      {
        tab: 'Example Tab B',
        icon: ExampleTabBIcon,
        text: 'Example Tab B Label'
      },
      {
        tab: 'Example Tab C',
        icon: ExampleTabCIcon,
        text: 'Example Tab C Label'
      },
      {
        tab: 'Example Tab D',
        icon: ExampleTabDIcon,
        text: 'Example Tab D Label'
      }
    ]
  )
  const setTab = jest.fn()
  const resetActiveTab = jest.fn()

  const rendered = (
    <Component
      tab="Example Tab B"
      setTab={setTab}
      resetActiveTab={resetActiveTab}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <HorizontallySymmetricalSafeAreaView
      style={{ width: '100%', flexDirection: 'row', backgroundColor: 'yellow' }}
      left
      right
    >
      {[
        <Hitbox
          onPress={expect.any(Function)}
          key="Example Tab A"
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'yellow'
          }}
        >
          <HorizontallySymmetricalSafeAreaView
            style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 5 }}
            bottom
          >
            <ExampleTabAIcon fill="green" />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 20,
                lineHeight: 28,
                color: 'blue',
                fontFamily: 'Example Inactive Font Family'
              }}
            >
              Example Tab A Label
            </Text>
          </HorizontallySymmetricalSafeAreaView>
        </Hitbox>,
        <Hitbox
          onPress={expect.any(Function)}
          key="Example Tab B"
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'purple'
          }}
        >
          <HorizontallySymmetricalSafeAreaView
            style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 5 }}
            bottom
          >
            <ExampleTabBIcon fill="red" />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 20,
                lineHeight: 28,
                color: 'aquamarine',
                fontFamily: 'Example Active Font Family'
              }}
            >
              Example Tab B Label
            </Text>
          </HorizontallySymmetricalSafeAreaView>
        </Hitbox>,
        <Hitbox
          onPress={expect.any(Function)}
          key="Example Tab C"
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'yellow'
          }}
        >
          <HorizontallySymmetricalSafeAreaView
            style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 5 }}
            bottom
          >
            <ExampleTabCIcon fill="green" />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 20,
                lineHeight: 28,
                color: 'blue',
                fontFamily: 'Example Inactive Font Family'
              }}
            >
              Example Tab C Label
            </Text>
          </HorizontallySymmetricalSafeAreaView>
        </Hitbox>,
        <Hitbox
          onPress={expect.any(Function)}
          key="Example Tab D"
          style={{
            flexBasis: 0,
            flexGrow: 1,
            backgroundColor: 'yellow'
          }}
        >
          <HorizontallySymmetricalSafeAreaView
            style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 5 }}
            bottom
          >
            <ExampleTabDIcon fill="green" />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 20,
                lineHeight: 28,
                color: 'blue',
                fontFamily: 'Example Inactive Font Family'
              }}
            >
              Example Tab D Label
            </Text>
          </HorizontallySymmetricalSafeAreaView>
        </Hitbox>
      ]}
    </HorizontallySymmetricalSafeAreaView>
  )
  expect(setTab).not.toHaveBeenCalled()
  expect(resetActiveTab).not.toBeCalled()
})

test('changes tab on pressing an inactive tab', () => {
  type Tab =
    | 'Example Tab A'
    | 'Example Tab B'
    | 'Example Tab C'
    | 'Example Tab D'
  const ExampleTabAIcon: SvgIcon = () => null
  const ExampleTabBIcon: SvgIcon = () => null
  const ExampleTabCIcon: SvgIcon = () => null
  const ExampleTabDIcon: SvgIcon = () => null
  const Component = createBottomTabBarComponent<Tab>(
    {
      topPadding: 12,
      iconTextSpacing: 4,
      fontSize: 20,
      bottomPadding: 5,
      inactive: {
        background: 'yellow',
        iconFill: 'green',
        color: 'blue',
        fontFamily: 'Example Inactive Font Family'
      },
      active: {
        background: 'purple',
        iconFill: 'red',
        color: 'aquamarine',
        fontFamily: 'Example Active Font Family'
      }
    },
    [
      {
        tab: 'Example Tab A',
        icon: ExampleTabAIcon,
        text: 'Example Tab A Label'
      },
      {
        tab: 'Example Tab B',
        icon: ExampleTabBIcon,
        text: 'Example Tab B Label'
      },
      {
        tab: 'Example Tab C',
        icon: ExampleTabCIcon,
        text: 'Example Tab C Label'
      },
      {
        tab: 'Example Tab D',
        icon: ExampleTabDIcon,
        text: 'Example Tab D Label'
      }
    ]
  )
  const setTab = jest.fn()
  const resetActiveTab = jest.fn()

  const rendered = (
    <Component
      tab="Example Tab B"
      setTab={setTab}
      resetActiveTab={resetActiveTab}
    />
  )

  unwrapRenderedFunctionComponent(rendered).props.children[2].props.onPress()
  expect(setTab).toBeCalledTimes(1)
  expect(setTab).toBeCalledWith('Example Tab C')
  expect(resetActiveTab).not.toBeCalled()
})

test('resets the active tab on press', () => {
  type Tab =
    | 'Example Tab A'
    | 'Example Tab B'
    | 'Example Tab C'
    | 'Example Tab D'
  const ExampleTabAIcon: SvgIcon = () => null
  const ExampleTabBIcon: SvgIcon = () => null
  const ExampleTabCIcon: SvgIcon = () => null
  const ExampleTabDIcon: SvgIcon = () => null
  const Component = createBottomTabBarComponent<Tab>(
    {
      topPadding: 12,
      iconTextSpacing: 4,
      fontSize: 20,
      bottomPadding: 5,
      inactive: {
        background: 'yellow',
        iconFill: 'green',
        color: 'blue',
        fontFamily: 'Example Inactive Font Family'
      },
      active: {
        background: 'purple',
        iconFill: 'red',
        color: 'aquamarine',
        fontFamily: 'Example Active Font Family'
      }
    },
    [
      {
        tab: 'Example Tab A',
        icon: ExampleTabAIcon,
        text: 'Example Tab A Label'
      },
      {
        tab: 'Example Tab B',
        icon: ExampleTabBIcon,
        text: 'Example Tab B Label'
      },
      {
        tab: 'Example Tab C',
        icon: ExampleTabCIcon,
        text: 'Example Tab C Label'
      },
      {
        tab: 'Example Tab D',
        icon: ExampleTabDIcon,
        text: 'Example Tab D Label'
      }
    ]
  )
  const setTab = jest.fn()
  const resetActiveTab = jest.fn()

  const rendered = (
    <Component
      tab="Example Tab B"
      setTab={setTab}
      resetActiveTab={resetActiveTab}
    />
  )

  unwrapRenderedFunctionComponent(rendered).props.children[1].props.onPress()
  expect(setTab).not.toBeCalled()
  expect(resetActiveTab).toBeCalledTimes(1)
})
