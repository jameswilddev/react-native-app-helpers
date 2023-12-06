import * as React from 'react'
import { Text } from 'react-native'
import { createTextComponent, Hitbox } from '../../..'
import { unwrapRenderedFunctionComponent } from '../../utilities/unwrapRenderedFunctionComponent'

test('renders single-line', () => {
  const Component = createTextComponent(
    'Test Font Family',
    37,
    '#34AE17',
    'left',
    false
  )

  const rendered = <Component>Test Content</Component>

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Text
      style={{
        fontFamily: 'Test Font Family',
        fontSize: 37,
        lineHeight: 51.8,
        color: '#34AE17',
        textAlign: 'left',
        flexShrink: 1
      }}
      numberOfLines={1}
    >
      Test Content
    </Text>
  )
})

test('renders multi-line', () => {
  const Component = createTextComponent(
    'Test Font Family',
    37,
    '#34AE17',
    'left',
    true
  )

  const rendered = <Component>Test Content</Component>

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Text
      style={{
        fontFamily: 'Test Font Family',
        fontSize: 37,
        lineHeight: 51.8,
        color: '#34AE17',
        textAlign: 'left',
        flexShrink: 1
      }}
      numberOfLines={0}
    >
      Test Content
    </Text>
  )
})

test('renders with onPress undefined', () => {
  const Component = createTextComponent(
    'Test Font Family',
    37,
    '#34AE17',
    'left',
    false
  )

  const rendered = <Component onPress={undefined}>Test Content</Component>

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Text
      style={{
        fontFamily: 'Test Font Family',
        fontSize: 37,
        lineHeight: 51.8,
        color: '#34AE17',
        textAlign: 'left',
        flexShrink: 1
      }}
      numberOfLines={1}
    >
      Test Content
    </Text>
  )
})

test('renders with onPress set', () => {
  const Component = createTextComponent(
    'Test Font Family',
    37,
    '#34AE17',
    'left',
    false
  )
  const onPress = jest.fn()

  const rendered = <Component onPress={onPress}>Test Content</Component>

  expect(unwrapRenderedFunctionComponent(rendered)).toEqual(
    <Text
      style={{
        fontFamily: 'Test Font Family',
        fontSize: 37,
        lineHeight: 51.8,
        color: '#34AE17',
        textAlign: 'left',
        flexShrink: 1
      }}
      numberOfLines={1}
      onPress={expect.any(Function)}
    >
      Test Content
    </Text>
  )

  expect(onPress).not.toHaveBeenCalled()
})

test('executes the press callback once when hitboxes are enabled', () => {
  const Component = createTextComponent(
    'Test Font Family',
    37,
    '#34AE17',
    'left',
    false
  )
  const onPress = jest.fn()

  const rendered = <Component onPress={onPress}>Test Content</Component>

  const hitboxesPreviouslyEnabled = Hitbox.enabled

  try {
    Hitbox.enabled = true
    unwrapRenderedFunctionComponent(rendered).props.onPress()
  } finally {
    Hitbox.enabled = hitboxesPreviouslyEnabled
  }

  expect(onPress).toBeCalledTimes(1)
})

test('does not execute the press callback when hitboxes are disabled', () => {
  const Component = createTextComponent(
    'Test Font Family',
    37,
    '#34AE17',
    'left',
    false
  )
  const onPress = jest.fn()

  const rendered = <Component onPress={onPress}>Test Content</Component>

  const hitboxesPreviouslyEnabled = Hitbox.enabled

  try {
    Hitbox.enabled = false
    unwrapRenderedFunctionComponent(rendered).props.onPress()
  } finally {
    Hitbox.enabled = hitboxesPreviouslyEnabled
  }

  expect(onPress).not.toHaveBeenCalled()
})
