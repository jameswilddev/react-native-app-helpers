import { abortControllerFactory } from '../../..'

test('creates an un-aborted abort controller', () => {
  const actual = abortControllerFactory.create()

  expect(actual).toEqual(expect.any(AbortController))
  expect(actual.signal.aborted).toBeFalsy()
})

test('creates a new instance each call', () => {
  const expected = abortControllerFactory.create()

  const actual = abortControllerFactory.create()

  expect(actual).not.toBe(expected)
})
