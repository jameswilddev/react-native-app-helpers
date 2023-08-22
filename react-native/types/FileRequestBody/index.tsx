/**
 * A request body is to contain a file.
 */
export interface FileRequestBody {
  /**
   * Indicates the type of request body.
   */
  readonly type: 'file'

  /**
   * The URI of the file to include in the request body.
   */
  readonly fileUri: string
}
