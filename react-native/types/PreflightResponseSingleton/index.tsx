/**
 * A singleton within a response to a successful preflight request.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type PreflightResponseSingleton = {
  /**
   * The current version of the singleton.  If the singleton either does not
   * exist locally or has a different version, it is to be pulled down.
   */
  readonly version: string | number
}
