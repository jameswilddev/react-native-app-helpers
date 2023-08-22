import * as React from 'react'
import { View, Text } from 'react-native'
import { unwrapRenderedFunctionComponent, Aligned } from '../../..'

test('can be in the top left', () => {
  const rendered = (
    <Aligned horizontally="left" vertically="top">
      <Text>Example Content</Text>
    </Aligned>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      }}
      pointerEvents="box-none"
    >
      <Text>Example Content</Text>
    </View>
  )
})

test('can be in the top center', () => {
  const rendered = (
    <Aligned horizontally="centered" vertically="top">
      <Text>Example Content</Text>
    </Aligned>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
      pointerEvents="box-none"
    >
      <Text>Example Content</Text>
    </View>
  )
})

test('can be in the top right', () => {
  const rendered = (
    <Aligned horizontally="right" vertically="top">
      <Text>Example Content</Text>
    </Aligned>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <Text>Example Content</Text>
    </View>
  )
})

test('can be in the center left', () => {
  const rendered = (
    <Aligned horizontally="left" vertically="centered">
      <Text>Example Content</Text>
    </Aligned>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}
      pointerEvents="box-none"
    >
      <Text>Example Content</Text>
    </View>
  )
})

test('can be in the center center', () => {
  const rendered = (
    <Aligned horizontally="centered" vertically="centered">
      <Text>Example Content</Text>
    </Aligned>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      pointerEvents="box-none"
    >
      <Text>Example Content</Text>
    </View>
  )
})

test('can be in the center right', () => {
  const rendered = (
    <Aligned horizontally="right" vertically="centered">
      <Text>Example Content</Text>
    </Aligned>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <Text>Example Content</Text>
    </View>
  )
})

test('can be in the bottom left', () => {
  const rendered = (
    <Aligned horizontally="left" vertically="bottom">
      <Text>Example Content</Text>
    </Aligned>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
      }}
      pointerEvents="box-none"
    >
      <Text>Example Content</Text>
    </View>
  )
})

test('can be in the bottom center', () => {
  const rendered = (
    <Aligned horizontally="centered" vertically="bottom">
      <Text>Example Content</Text>
    </Aligned>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
      pointerEvents="box-none"
    >
      <Text>Example Content</Text>
    </View>
  )
})

test('can be in the bottom right', () => {
  const rendered = (
    <Aligned horizontally="right" vertically="bottom">
      <Text>Example Content</Text>
    </Aligned>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <Text>Example Content</Text>
    </View>
  )
})
