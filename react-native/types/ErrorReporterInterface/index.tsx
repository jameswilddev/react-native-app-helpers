/**
 * Represents an error reporter.
 */
export interface ErrorReporterInterface {
  /**
   * Reports an error.
   * @param reason The error to log.
   */
  report: (reason: any) => void
}
