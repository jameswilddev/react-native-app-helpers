import type { ErrorReporterInterface } from '../../types/ErrorReporterInterface'
import { captureException } from '@sentry/react-native'

/**
 * A wrapper around the console and Sentry for easier mocking in tests.
 */
export const errorReporter: ErrorReporterInterface = {
  /**
   * Reports an error.
   * @param reason The error to log.
   */
  report: (reason: any) => {
    console.error(reason)
    captureException(reason)
  }
}
