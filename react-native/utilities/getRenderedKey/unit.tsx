import * as React from 'react'
import { Text } from 'react-native'
import { getRenderedKey } from '../../..'

test('can handle undefined', () => {
  const element = undefined

  const set = getRenderedKey(element)

  expect(set).toBeNull()
})

test('can handle null', () => {
  const element = null

  const set = getRenderedKey(element)

  expect(set).toEqual(null)
})

test('can handle string typed components without keys', () => {
  const element = <div className="Example">Hello World</div>

  const key = getRenderedKey(element)

  expect(key).toBeNull()
})

test('can handle class typed components without keys', () => {
  const element = <Text numberOfLines={5}>Hello World</Text>

  const set = getRenderedKey(element)

  expect(set).toBeNull()
})

test('can handle string typed components which have string keys', () => {
  const element = (
    <div className="Example" key="Test Existing Key">
      Hello World
    </div>
  )

  const get = getRenderedKey(element)

  expect(get).toEqual('Test Existing Key')
})

test('can handle class typed components which have string keys', () => {
  const element = (
    <Text numberOfLines={5} key="Test Existing Key">
      Hello World
    </Text>
  )

  const get = getRenderedKey(element)

  expect(get).toEqual('Test Existing Key')
})

test('can handle string typed components which have number keys', () => {
  const element = (
    <div className="Example" key={1234}>
      Hello World
    </div>
  )

  const get = getRenderedKey(element)

  expect(get).toEqual('1234')
})

test('can handle class typed components which have number keys', () => {
  const element = (
    <Text numberOfLines={5} key={1234}>
      Hello World
    </Text>
  )

  const get = getRenderedKey(element)

  expect(get).toEqual('1234')
})
