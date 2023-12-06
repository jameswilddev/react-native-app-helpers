import { UuidGenerator } from '../../..'

test('generates valid UUIDs', () => {
  const uuidGenerator = new UuidGenerator()

  const a = uuidGenerator.generate()

  expect(a).toEqual(expect.stringMatching(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
  ))
})

test('generates distinct UUIDs', () => {
  const uuidGenerator = new UuidGenerator()

  const a = uuidGenerator.generate()
  const b = uuidGenerator.generate()

  expect(a).not.toEqual(b)
})
