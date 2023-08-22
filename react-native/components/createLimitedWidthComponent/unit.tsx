import * as React from 'react'
import { Text, View } from 'react-native'
import {
  createLimitedWidthComponent,
  unwrapRenderedFunctionComponent
} from '../../..'

test('renders as expected when filling its container vertically', () => {
  const Component = createLimitedWidthComponent(243)

  const rendered = (
    <Component height="fillsContainer">
      <Text>Example Content</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ maxWidth: 243, height: '100%' }} pointerEvents="box-none">
      <Text>Example Content</Text>
    </View>
  )
})

test('renders as expected when fitting its content vertically', () => {
  const Component = createLimitedWidthComponent(243)

  const rendered = (
    <Component height="fitsContent">
      <Text>Example Content</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ maxWidth: 243 }} pointerEvents="box-none">
      <Text>Example Content</Text>
    </View>
  )
})
