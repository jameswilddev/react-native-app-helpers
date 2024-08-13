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
    false,
    null
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
        flexShrink: 1,
        textDecorationLine: 'none',
        textDecorationStyle: undefined,
        textDecorationColor: undefined
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
    true,
    null
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
        flexShrink: 1,
        textDecorationLine: 'none',
        textDecorationStyle: undefined,
        textDecorationColor: undefined
      }}
      numberOfLines={0}
    >
      Test Content
    </Text>
  )
})

test('renders underlined', () => {
  const Component = createTextComponent(
    'Test Font Family',
    37,
    '#34AE17',
    'left',
    false,
    { underline: true, strikethrough: false, style: 'solid', color: 'blue' }
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
        flexShrink: 1,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: 'blue'
      }}
      numberOfLines={1}
    >
      Test Content
    </Text>
  )
})

test('renders strikethrough', () => {
  const Component = createTextComponent(
    'Test Font Family',
    37,
    '#34AE17',
    'left',
    false,
    { underline: false, strikethrough: true, style: 'solid', color: 'blue' }
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
        flexShrink: 1,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        textDecorationColor: 'blue'
      }}
      numberOfLines={1}
    >
      Test Content
    </Text>
  )
})

test('renders underlined strikethrough', () => {
  const Component = createTextComponent(
    'Test Font Family',
    37,
    '#34AE17',
    'left',
    false,
    { underline: true, strikethrough: true, style: 'solid', color: 'blue' }
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
        flexShrink: 1,
        textDecorationLine: 'underline line-through',
        textDecorationStyle: 'solid',
        textDecorationColor: 'blue'
      }}
      numberOfLines={1}
    >
      Test Content
    </Text>
  )
})

test('renders double', () => {
  const Component = createTextComponent(
    'Test Font Family',
    37,
    '#34AE17',
    'left',
    false,
    { underline: true, strikethrough: false, style: 'double', color: 'blue' }
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
        flexShrink: 1,
        textDecorationLine: 'underline',
        textDecorationStyle: 'double',
        textDecorationColor: 'blue'
      }}
      numberOfLines={1}
    >
      Test Content
    </Text>
  )
})

test('renders dotted', () => {
  const Component = createTextComponent(
    'Test Font Family',
    37,
    '#34AE17',
    'left',
    false,
    { underline: true, strikethrough: false, style: 'dotted', color: 'blue' }
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
        flexShrink: 1,
        textDecorationLine: 'underline',
        textDecorationStyle: 'dotted',
        textDecorationColor: 'blue'
      }}
      numberOfLines={1}
    >
      Test Content
    </Text>
  )
})

test('renders dashed', () => {
  const Component = createTextComponent(
    'Test Font Family',
    37,
    '#34AE17',
    'left',
    false,
    { underline: true, strikethrough: false, style: 'dashed', color: 'blue' }
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
        flexShrink: 1,
        textDecorationLine: 'underline',
        textDecorationStyle: 'dashed',
        textDecorationColor: 'blue'
      }}
      numberOfLines={1}
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
    false,
    null
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
        flexShrink: 1,
        textDecorationLine: 'none',
        textDecorationStyle: undefined,
        textDecorationColor: undefined
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
    false,
    null
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
        flexShrink: 1,
        textDecorationLine: 'none',
        textDecorationStyle: undefined,
        textDecorationColor: undefined
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
    false,
    null
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
    false,
    null
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
