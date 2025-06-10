import * as React from 'react'
import { Text } from 'react-native'
import { unwrapRenderedFunctionComponent } from '../../..'

test('unwraps a wrapped element', () => {
  const Component: React.FunctionComponent<
  React.PropsWithChildren<Record<never, never>>
  > = ({ children }) => <Text>{children}</Text>
  const rendered = <Component>Test Content</Component>

  const unwrapped = unwrapRenderedFunctionComponent(rendered)

  expect(unwrapped).toEqual(<Text>Test Content</Text>)
})

test('throws when given a class-typed element', () => {
  const rendered = <Text>Test Content</Text>

  const act = (): React.JSX.Element => unwrapRenderedFunctionComponent(rendered)

  expect(act).toThrowError('Can only unwrap rendered function components.')
})

test('throws when given a string-typed element', () => {
  const rendered = <div>Test Content</div>

  const act = (): React.JSX.Element => unwrapRenderedFunctionComponent(rendered)

  expect(act).toThrowError('Can only unwrap rendered function components.')
})
