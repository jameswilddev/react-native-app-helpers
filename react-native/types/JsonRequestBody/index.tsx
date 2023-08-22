import type { Json } from '../Json'

/**
 * A request body is to contain JSON.
 */
export interface JsonRequestBody {
  /**
   * Indicates the type of request body.
   */
  readonly type: 'json'

  /**
   * The JSON to include in the request body.
   */
  readonly value: Json
}
