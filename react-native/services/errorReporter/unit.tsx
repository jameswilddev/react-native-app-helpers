import { errorReporter } from '../../..'
const Sentry = jest.requireMock('@sentry/react-native')

test('report', () => {
  const originalLog = console.log
  const originalError = console.error
  const originalWarn = console.warn
  const originalInfo = console.info
  const originalDebug = console.debug

  try {
    const log = jest.fn()
    const error = jest.fn()
    const warn = jest.fn()
    const info = jest.fn()
    const debug = jest.fn()
    console.log = log
    console.error = error
    console.warn = warn
    console.info = info
    console.debug = debug

    errorReporter.report('Example Text')

    expect(log).not.toHaveBeenCalled()
    expect(error).toBeCalledTimes(1)
    expect(error).toBeCalledWith('Example Text')
    expect(error.mock.instances[0]).toBe(console)
    expect(warn).not.toHaveBeenCalled()
    expect(info).not.toHaveBeenCalled()
    expect(debug).not.toHaveBeenCalled()
    expect(Sentry.Native.captureException).toBeCalledTimes(1)
    expect(Sentry.Native.captureException).toBeCalledWith('Example Text')
  } finally {
    console.log = originalLog
    console.error = originalError
    console.warn = originalWarn
    console.info = originalInfo
    console.debug = originalDebug
  }
})
