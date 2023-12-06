import * as React from 'react'
import { Text } from 'react-native'
import { intercalateRendered } from '../../..'

test('intercalates nothing', () => {
  const separator = <Text>Example Separator</Text>

  const between: JSX.Element = <React.Fragment />

  const flattened = intercalateRendered(separator, between)

  expect(flattened).toEqual([])
})

test('intercalates one', () => {
  const separator = <Text>Example Separator</Text>

  const between: JSX.Element = <Text>Example Item A</Text>

  const flattened = intercalateRendered(separator, between)

  expect(flattened).toEqual([<Text key="0">Example Item A</Text>])
})

test('intercalates two', () => {
  const separator = <Text>Example Separator</Text>

  const between: JSX.Element = (
    <React.Fragment>
      <Text>Example Item A</Text>
      <Text>Example Item B</Text>
    </React.Fragment>
  )

  const flattened = intercalateRendered(separator, between)

  expect(flattened).toEqual([
    <Text key="0">Example Item A</Text>,
    <Text key="separator0">Example Separator</Text>,
    <Text key="1">Example Item B</Text>
  ])
})

test('intercalates three', () => {
  const separator = <Text>Example Separator</Text>

  const between: JSX.Element = (
    <React.Fragment>
      <Text>Example Item A</Text>
      <Text>Example Item B</Text>
      <Text>Example Item C</Text>
    </React.Fragment>
  )

  const flattened = intercalateRendered(separator, between)

  expect(flattened).toEqual([
    <Text key="0">Example Item A</Text>,
    <Text key="separator0">Example Separator</Text>,
    <Text key="1">Example Item B</Text>,
    <Text key="separator1">Example Separator</Text>,
    <Text key="2">Example Item C</Text>
  ])
})

test('intercalates four', () => {
  const separator = <Text>Example Separator</Text>

  const between: JSX.Element = (
    <React.Fragment>
      <Text>Example Item A</Text>
      <Text>Example Item B</Text>
      <Text>Example Item C</Text>
      <Text>Example Item D</Text>
    </React.Fragment>
  )

  const flattened = intercalateRendered(separator, between)

  expect(flattened).toEqual([
    <Text key="0">Example Item A</Text>,
    <Text key="separator0">Example Separator</Text>,
    <Text key="1">Example Item B</Text>,
    <Text key="separator1">Example Separator</Text>,
    <Text key="2">Example Item C</Text>,
    <Text key="separator2">Example Separator</Text>,
    <Text key="3">Example Item D</Text>
  ])
})
