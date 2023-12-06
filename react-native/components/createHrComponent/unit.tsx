import * as React from 'react'
import { View } from 'react-native'
import { createHrComponent } from '../../..'
import { unwrapRenderedFunctionComponent } from '../../utilities/unwrapRenderedFunctionComponent'

test('renders as expected', () => {
  const Component = createHrComponent('red', 3)

  const rendered = <Component />

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <View style={{ backgroundColor: 'red', width: '100%', height: 3 }} />
  )
})
