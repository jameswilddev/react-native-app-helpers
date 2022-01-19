/**
 * An enum within a response to a successful preflight request.
 */
export type PreflightResponseEnum = {
  /**
   * The current version of the enum.  If the enum either does not exist locally
   * or has a different version number, it is to be pulled down.
   */
  readonly version: string | number;
};
