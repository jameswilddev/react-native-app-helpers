import * as React from 'react'
import { View, Text } from 'react-native'
import { Column } from '../../..'
import { unwrapRenderedFunctionComponent } from '../../utilities/unwrapRenderedFunctionComponent'

test('renders as expected when width fits content and vertical distribution is top and horizontal alignment is left', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="top"
      horizontalAlignment="left"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ height: '100%', flexDirection: 'column', alignItems: 'flex-start' }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is top and horizontal alignment is centered', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="top"
      horizontalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ height: '100%', flexDirection: 'column', alignItems: 'center' }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is top and horizontal alignment is right', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="top"
      horizontalAlignment="right"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ height: '100%', flexDirection: 'column', alignItems: 'flex-end' }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is top and horizontal alignment is stretched', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="top"
      horizontalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ height: '100%', flexDirection: 'column' }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is centered and horizontal alignment is left', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="centered"
      horizontalAlignment="left"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is centered and horizontal alignment is centered', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="centered"
      horizontalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is centered and horizontal alignment is right', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="centered"
      horizontalAlignment="right"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is centered and horizontal alignment is stretched', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="centered"
      horizontalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ height: '100%', flexDirection: 'column', justifyContent: 'center' }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is bottom and horizontal alignment is left', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="bottom"
      horizontalAlignment="left"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is bottom and horizontal alignment is centered', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="bottom"
      horizontalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is bottom and horizontal alignment is right', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="bottom"
      horizontalAlignment="right"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is bottom and horizontal alignment is stretched', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="bottom"
      horizontalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is spaced and horizontal alignment is left', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="spaced"
      horizontalAlignment="left"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is spaced and horizontal alignment is centered', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="spaced"
      horizontalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is spaced and horizontal alignment is right', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="spaced"
      horizontalAlignment="right"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is spaced and horizontal alignment is stretched', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="spaced"
      horizontalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is spaced to ends and horizontal alignment is left', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="spacedTouchingEnds"
      horizontalAlignment="left"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is spaced to ends and horizontal alignment is centered', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="spacedTouchingEnds"
      horizontalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is spaced to ends and horizontal alignment is right', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="spacedTouchingEnds"
      horizontalAlignment="right"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fits content and vertical distribution is spaced to ends and horizontal alignment is stretched', () => {
  const rendered = (
    <Column
      width="fitsContent"
      verticalDistribution="spacedTouchingEnds"
      horizontalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is top and horizontal alignment is left', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="top"
      horizontalAlignment="left"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is top and horizontal alignment is centered', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="top"
      horizontalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is top and horizontal alignment is right', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="top"
      horizontalAlignment="right"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is top and horizontal alignment is stretched', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="top"
      horizontalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{ height: '100%', width: '100%', flexDirection: 'column' }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is centered and horizontal alignment is left', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="centered"
      horizontalAlignment="left"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is centered and horizontal alignment is centered', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="centered"
      horizontalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is centered and horizontal alignment is right', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="centered"
      horizontalAlignment="right"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is centered and horizontal alignment is stretched', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="centered"
      horizontalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is bottom and horizontal alignment is left', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="bottom"
      horizontalAlignment="left"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is bottom and horizontal alignment is centered', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="bottom"
      horizontalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is bottom and horizontal alignment is right', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="bottom"
      horizontalAlignment="right"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is bottom and horizontal alignment is stretched', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="bottom"
      horizontalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is spaced and horizontal alignment is left', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="spaced"
      horizontalAlignment="left"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is spaced and horizontal alignment is centered', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="spaced"
      horizontalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is spaced and horizontal alignment is right', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="spaced"
      horizontalAlignment="right"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-evenly'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is spaced and horizontal alignment is stretched', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="spaced"
      horizontalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is spaced to ends and horizontal alignment is left', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="spacedTouchingEnds"
      horizontalAlignment="left"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is spaced to ends and horizontal alignment is centered', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="spacedTouchingEnds"
      horizontalAlignment="centered"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is spaced to ends and horizontal alignment is right', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="spacedTouchingEnds"
      horizontalAlignment="right"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected when width fills container and vertical distribution is spaced to ends and horizontal alignment is stretched', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="spacedTouchingEnds"
      horizontalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})

test('renders as expected a second time', () => {
  const rendered = (
    <Column
      width="fillsContainer"
      verticalDistribution="spacedTouchingEnds"
      horizontalAlignment="stretched"
    >
      <Text>Test Content</Text>
    </Column>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View
      style={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
      pointerEvents="box-none"
    >
      <Text>Test Content</Text>
    </View>
  )
})
