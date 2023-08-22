import * as React from 'react'
import { Text } from 'react-native'
import { isRenderedByReact } from '../../..'

describe('returns truthy for', () => {
  const check = (description: string, value: undefined | React.ReactNode | JSX.Element): void => {
    test(description, () => {
      expect(isRenderedByReact(value)).toBeTruthy()
    })
  }

  check('elements', <Text>Example</Text>)
  check('non-zero numbers', 1)
  check('true', true)
  check('arrays containing at least one rendered item', [true])
  check('non-empty strings', 'Example')
})

describe('returns falsy for', () => {
  const check = (description: string, value: undefined | React.ReactNode | JSX.Element): void => {
    test(description, () => {
      expect(isRenderedByReact(value)).toBeFalsy()
    })
  }

  check('null', null)
  check('undefined', undefined)
  check('zero', 0)
  check('false', false)
  check('empty arrays', [])
  check('arrays containing only non-rendered items', [false])
  check('empty strings', '')
})
