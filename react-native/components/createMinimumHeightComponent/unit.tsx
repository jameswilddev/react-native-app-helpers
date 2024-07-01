import * as React from 'react'
import { Text, View } from 'react-native'
import {
  createMinimumHeightComponent,
  unwrapRenderedFunctionComponent
} from '../../..'

test('renders as expected when filling its container vertically', () => {
  const Component = createMinimumHeightComponent(243)

  const rendered = (
    <Component width="fillsContainer">
      <Text>Example Content</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ minHeight: 243, width: '100%' }} pointerEvents="box-none">
      <Text>Example Content</Text>
    </View>
  )
})

test('renders as expected when fitting its content vertically', () => {
  const Component = createMinimumHeightComponent(243)

  const rendered = (
    <Component width="fitsContent">
      <Text>Example Content</Text>
    </Component>
  )

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ minHeight: 243 }} pointerEvents="box-none">
      <Text>Example Content</Text>
    </View>
  )
})
