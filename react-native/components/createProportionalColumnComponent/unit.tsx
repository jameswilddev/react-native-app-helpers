import * as React from 'react'
import { Text, View } from 'react-native'
import { createProportionalColumnComponent, unwrapRenderedFunctionComponent } from '../../..'

test('renders as expected without spacing when fitting content horizontally and aligning to the left', () => {
  const Component = createProportionalColumnComponent(0, [27, 18, 33, 44])

  const rendered = (
    <Component width="fitsContent" horizontalAlignment="left">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  )
})

test('renders as expected with spacing when fitting content horizontally and aligning to the left', () => {
  const Component = createProportionalColumnComponent(23, [27, 18, 33, 44])

  const rendered = (
    <Component width="fitsContent" horizontalAlignment="left">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View key="separator0" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View key="separator1" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View key="separator2" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  )
})

test('renders as expected without spacing when fitting content horizontally and aligning to the center', () => {
  const Component = createProportionalColumnComponent(0, [27, 18, 33, 44])

  const rendered = (
    <Component width="fitsContent" horizontalAlignment="centered">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  )
})

test('renders as expected with spacing when fitting content horizontally and aligning to the center', () => {
  const Component = createProportionalColumnComponent(23, [27, 18, 33, 44])

  const rendered = (
    <Component width="fitsContent" horizontalAlignment="centered">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View key="separator0" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View key="separator1" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View key="separator2" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  )
})

test('renders as expected without spacing when fitting content horizontally and aligning to the right', () => {
  const Component = createProportionalColumnComponent(0, [27, 18, 33, 44])

  const rendered = (
    <Component width="fitsContent" horizontalAlignment="right">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  )
})

test('renders as expected with spacing when fitting content horizontally and aligning to the right', () => {
  const Component = createProportionalColumnComponent(23, [27, 18, 33, 44])

  const rendered = (
    <Component width="fitsContent" horizontalAlignment="right">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View key="separator0" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View key="separator1" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View key="separator2" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  )
})

test('renders as expected without spacing when fitting content horizontally and stretching to fit', () => {
  const Component = createProportionalColumnComponent(0, [27, 18, 33, 44])

  const rendered = (
    <Component width="fitsContent" horizontalAlignment="stretched">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  )
})

test('renders as expected with spacing when fitting content horizontally and stretching to fit', () => {
  const Component = createProportionalColumnComponent(23, [27, 18, 33, 44])

  const rendered = (
    <Component width="fitsContent" horizontalAlignment="stretched">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View key="separator0" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View key="separator1" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View key="separator2" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  )
})

test('renders as expected without spacing when filling the container horizontally and aligning to the left', () => {
  const Component = createProportionalColumnComponent(0, [27, 18, 33, 44])

  const rendered = (
    <Component width="fillsContainer" horizontalAlignment="left">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  )
})

test('renders as expected with spacing when filling the container horizontally and aligning to the left', () => {
  const Component = createProportionalColumnComponent(23, [27, 18, 33, 44])

  const rendered = (
    <Component width="fillsContainer" horizontalAlignment="left">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View key="separator0" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View key="separator1" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View key="separator2" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  )
})

test('renders as expected without spacing when filling the container horizontally and aligning to the center', () => {
  const Component = createProportionalColumnComponent(0, [27, 18, 33, 44])

  const rendered = (
    <Component width="fillsContainer" horizontalAlignment="centered">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  )
})

test('renders as expected with spacing when filling the container horizontally and aligning to the center', () => {
  const Component = createProportionalColumnComponent(23, [27, 18, 33, 44])

  const rendered = (
    <Component width="fillsContainer" horizontalAlignment="centered">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View key="separator0" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View key="separator1" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View key="separator2" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  )
})

test('renders as expected without spacing when filling the container horizontally and aligning to the right', () => {
  const Component = createProportionalColumnComponent(0, [27, 18, 33, 44])

  const rendered = (
    <Component width="fillsContainer" horizontalAlignment="right">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  )
})

test('renders as expected with spacing when filling the container horizontally and aligning to the right', () => {
  const Component = createProportionalColumnComponent(23, [27, 18, 33, 44])

  const rendered = (
    <Component width="fillsContainer" horizontalAlignment="right">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View key="separator0" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View key="separator1" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View key="separator2" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  )
})

test('renders as expected without spacing when filling the container horizontally and stretching to fit', () => {
  const Component = createProportionalColumnComponent(0, [27, 18, 33, 44])

  const rendered = (
    <Component width="fillsContainer" horizontalAlignment="stretched">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  )
})

test('renders as expected with spacing when filling the container horizontally and stretching to fit', () => {
  const Component = createProportionalColumnComponent(23, [27, 18, 33, 44])

  const rendered = (
    <Component width="fillsContainer" horizontalAlignment="stretched">
      <Text>Example Panel A</Text>
      <Text>Example Panel B</Text>
      <Text>Example Panel C</Text>
      <Text>Example Panel D</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}
      pointerEvents="box-none"
    >
      <View
        key="0"
        style={{ flexBasis: 0, flexGrow: 27 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel A</Text>
      </View>
      <View key="separator0" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="1"
        style={{ flexBasis: 0, flexGrow: 18 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel B</Text>
      </View>
      <View key="separator1" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="2"
        style={{ flexBasis: 0, flexGrow: 33 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel C</Text>
      </View>
      <View key="separator2" style={{ flexBasis: 23 }} pointerEvents="none" />
      <View
        key="3"
        style={{ flexBasis: 0, flexGrow: 44 }}
        pointerEvents="box-none"
      >
        <Text>Example Panel D</Text>
      </View>
    </View>
  )
})
