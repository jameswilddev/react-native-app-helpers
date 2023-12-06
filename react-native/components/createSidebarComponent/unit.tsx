import * as React from 'react'
import { View, Text } from 'react-native'
import { createSidebarComponent } from '../../..'
import { unwrapRenderedFunctionComponent } from '../../utilities/unwrapRenderedFunctionComponent'

test('renders without spacings without a left sidebar body or right sidebar', () => {
  const Component = createSidebarComponent(0, 0)

  const rendered = <Component />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%' }}
      pointerEvents="box-none"
    ></View>
  )
})

test('renders without spacings with only a left sidebar', () => {
  const Component = createSidebarComponent(0, 0)

  const rendered = <Component left={<Text>Example Left</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
    </View>
  )
})

test('renders without spacings with only a body', () => {
  const Component = createSidebarComponent(0, 0)

  const rendered = <Component body={<Text>Example Body</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
    </View>
  )
})

test('renders without spacings with only a left sidebar and body', () => {
  const Component = createSidebarComponent(0, 0)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      body={<Text>Example Body</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
    </View>
  )
})

test('renders without spacings with only a right sidebar', () => {
  const Component = createSidebarComponent(0, 0)

  const rendered = <Component right={<Text>Example Right</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders without spacings with only a left sidebar and right sidebar', () => {
  const Component = createSidebarComponent(0, 0)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders without spacings with only a body and right sidebar', () => {
  const Component = createSidebarComponent(0, 0)

  const rendered = (
    <Component
      body={<Text>Example Body</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders without spacings with a left sidebar body and right sidebar', () => {
  const Component = createSidebarComponent(0, 0)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      body={<Text>Example Body</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with only a positive left sidebar-body spacing without a left sidebar body or right sidebar', () => {
  const Component = createSidebarComponent(53, 0)

  const rendered = <Component />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%', height: '100%' }} pointerEvents="box-none" />
  )
})

test('renders with only a positive left sidebar-body spacing with only a left sidebar', () => {
  const Component = createSidebarComponent(53, 0)

  const rendered = <Component left={<Text>Example Left</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
    </View>
  )
})

test('renders with only a positive left sidebar-body spacing with only a body', () => {
  const Component = createSidebarComponent(53, 0)

  const rendered = <Component body={<Text>Example Body</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
    </View>
  )
})

test('renders with only a positive left sidebar-body spacing with only a left sidebar and body', () => {
  const Component = createSidebarComponent(53, 0)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      body={<Text>Example Body</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View style={{ marginRight: 53 }} pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
    </View>
  )
})

test('renders with only a positive left sidebar-body spacing with only a right sidebar', () => {
  const Component = createSidebarComponent(53, 0)

  const rendered = <Component right={<Text>Example Right</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with only a positive left sidebar-body spacing with only a left sidebar and right sidebar', () => {
  const Component = createSidebarComponent(53, 0)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with only a positive left sidebar-body spacing with only a body and right sidebar', () => {
  const Component = createSidebarComponent(53, 0)

  const rendered = (
    <Component
      body={<Text>Example Body</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with only a positive left sidebar-body spacing with a left sidebar body and right sidebar', () => {
  const Component = createSidebarComponent(53, 0)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      body={<Text>Example Body</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View style={{ marginRight: 53 }} pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with only a negative left sidebar-body spacing without a left sidebar body or right sidebar', () => {
  const Component = createSidebarComponent(-53, 0)

  const rendered = <Component />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%', height: '100%' }} pointerEvents="box-none" />
  )
})

test('renders with only a negative left sidebar-body spacing with only a left sidebar', () => {
  const Component = createSidebarComponent(-53, 0)

  const rendered = <Component left={<Text>Example Left</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
    </View>
  )
})

test('renders with only a negative left sidebar-body spacing with only a body', () => {
  const Component = createSidebarComponent(-53, 0)

  const rendered = <Component body={<Text>Example Body</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
    </View>
  )
})

test('renders with only a negative left sidebar-body spacing with only a left sidebar and body', () => {
  const Component = createSidebarComponent(-53, 0)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      body={<Text>Example Body</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View style={{ marginRight: -53 }} pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
    </View>
  )
})

test('renders with only a negative left sidebar-body spacing with only a right sidebar', () => {
  const Component = createSidebarComponent(-53, 0)

  const rendered = <Component right={<Text>Example Right</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with only a negative left sidebar-body spacing with only a left sidebar and right sidebar', () => {
  const Component = createSidebarComponent(-53, 0)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with only a negative left sidebar-body spacing with only a body and right sidebar', () => {
  const Component = createSidebarComponent(-53, 0)

  const rendered = (
    <Component
      body={<Text>Example Body</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with only a negative left sidebar-body spacing with a left sidebar body and right sidebar', () => {
  const Component = createSidebarComponent(-53, 0)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      body={<Text>Example Body</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View style={{ marginRight: -53 }} pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with only a positive body-right sidebar spacing without a left sidebar body or right sidebar', () => {
  const Component = createSidebarComponent(0, 53)

  const rendered = <Component />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%', height: '100%' }} pointerEvents="box-none" />
  )
})

test('renders with only a positive body-right sidebar spacing with only a left sidebar', () => {
  const Component = createSidebarComponent(0, 53)

  const rendered = <Component left={<Text>Example Left</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
    </View>
  )
})

test('renders with only a positive body-right sidebar spacing with only a body', () => {
  const Component = createSidebarComponent(0, 53)

  const rendered = <Component body={<Text>Example Body</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
    </View>
  )
})

test('renders with only a positive body-right sidebar spacing with only a left sidebar and body', () => {
  const Component = createSidebarComponent(0, 53)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      body={<Text>Example Body</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
    </View>
  )
})

test('renders with only a positive body-right sidebar spacing with only a right sidebar', () => {
  const Component = createSidebarComponent(0, 53)

  const rendered = <Component right={<Text>Example Right</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with only a positive body-right sidebar spacing with only a left sidebar and right sidebar', () => {
  const Component = createSidebarComponent(0, 53)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with only a positive body-right sidebar spacing with only a body and right sidebar', () => {
  const Component = createSidebarComponent(0, 53)

  const rendered = (
    <Component
      body={<Text>Example Body</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
      <View style={{ marginLeft: 53 }} pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with only a positive body-right sidebar spacing with a left sidebar body and right sidebar', () => {
  const Component = createSidebarComponent(0, 53)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      body={<Text>Example Body</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
      <View style={{ marginLeft: 53 }} pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with only a negative body-right sidebar spacing without a left sidebar body or right sidebar', () => {
  const Component = createSidebarComponent(0, -53)

  const rendered = <Component />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%', height: '100%' }} pointerEvents="box-none" />
  )
})

test('renders with only a negative body-right sidebar spacing with only a left sidebar', () => {
  const Component = createSidebarComponent(0, -53)

  const rendered = <Component left={<Text>Example Left</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
    </View>
  )
})

test('renders with only a negative body-right sidebar spacing with only a body', () => {
  const Component = createSidebarComponent(0, -53)

  const rendered = <Component body={<Text>Example Body</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
    </View>
  )
})

test('renders with only a negative body-right sidebar spacing with only a left sidebar and body', () => {
  const Component = createSidebarComponent(0, -53)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      body={<Text>Example Body</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
    </View>
  )
})

test('renders with only a negative body-right sidebar spacing with only a right sidebar', () => {
  const Component = createSidebarComponent(0, -53)

  const rendered = <Component right={<Text>Example Right</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with only a negative body-right sidebar spacing with only a left sidebar and right sidebar', () => {
  const Component = createSidebarComponent(0, -53)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with only a negative body-right sidebar spacing with only a body and right sidebar', () => {
  const Component = createSidebarComponent(0, -53)

  const rendered = (
    <Component
      body={<Text>Example Body</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
      <View style={{ marginLeft: -53 }} pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with only a negative body-right sidebar spacing with a left sidebar body and right sidebar', () => {
  const Component = createSidebarComponent(0, -53)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      body={<Text>Example Body</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
      <View style={{ marginLeft: -53 }} pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with with both left sidebar-body and body-right sidebar spacings without a left sidebar body or right sidebar', () => {
  const Component = createSidebarComponent(27, 53)

  const rendered = <Component />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ width: '100%', height: '100%' }} pointerEvents="box-none" />
  )
})

test('renders with with both left sidebar-body and body-right sidebar spacings with only a left sidebar', () => {
  const Component = createSidebarComponent(27, 53)

  const rendered = <Component left={<Text>Example Left</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
    </View>
  )
})

test('renders with with both left sidebar-body and body-right sidebar spacings with only a body', () => {
  const Component = createSidebarComponent(27, 53)

  const rendered = <Component body={<Text>Example Body</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
    </View>
  )
})

test('renders with with both left sidebar-body and body-right sidebar spacings with only a left sidebar and body', () => {
  const Component = createSidebarComponent(27, 53)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      body={<Text>Example Body</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View style={{ marginRight: 27 }} pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
    </View>
  )
})

test('renders with with both left sidebar-body and body-right sidebar spacings with only a right sidebar', () => {
  const Component = createSidebarComponent(27, 53)

  const rendered = <Component right={<Text>Example Right</Text>} />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with with both left sidebar-body and body-right sidebar spacings with only a left sidebar and right sidebar', () => {
  const Component = createSidebarComponent(27, 53)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
      pointerEvents="box-none"
    >
      <View pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with with both left sidebar-body and body-right sidebar spacings with only a body and right sidebar', () => {
  const Component = createSidebarComponent(27, 53)

  const rendered = (
    <Component
      body={<Text>Example Body</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
      <View style={{ marginLeft: 53 }} pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})

test('renders with with both left sidebar-body and body-right sidebar spacings with a left sidebar body and right sidebar', () => {
  const Component = createSidebarComponent(27, 53)

  const rendered = (
    <Component
      left={<Text>Example Left</Text>}
      body={<Text>Example Body</Text>}
      right={<Text>Example Right</Text>}
    />
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row' }}
      pointerEvents="box-none"
    >
      <View style={{ marginRight: 27 }} pointerEvents="box-none">
        <Text>Example Left</Text>
      </View>
      <View
        style={{ flexGrow: 1, flexShrink: 1, overflow: 'hidden' }}
        pointerEvents="box-none"
      >
        <Text>Example Body</Text>
      </View>
      <View style={{ marginLeft: 53 }} pointerEvents="box-none">
        <Text>Example Right</Text>
      </View>
    </View>
  )
})
