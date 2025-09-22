import type { Directory } from 'expo-file-system'
import type { EmptyRequestBody } from '../EmptyRequestBody'
import type { FileRequestBody } from '../FileRequestBody'
import type { Json } from '../Json'
import type { JsonRequestBody } from '../JsonRequestBody'
import type { QueryParameters } from '../QueryParameters'

/**
 * The methods made available by the Request implementation.
 */
export interface RequestInterface {
  /**
   * Performs a request which does not return any data.
   * @template T                The expected response status code(s).
   * @param method              The HTTP method to use.
   * @param route               The URL path relative to the base URL.
   * @param requestBody         The request body to send.
   * @param queryParameters     The query parameters to include in the URL.
   * @param abortSignal         When non-null, an AbortController's signal which
   *                            may be used to remotely cancel the request.
   * @param expectedStatusCodes The status codes expected to be returned.
   * @returns                   The returned status code.
   * @throws                    When the request fails.
   * @throws                    When the response's status code is not in the
   *                            list of expected values.
   * @throws                    When the abort signal is raised.
   * @throws                    When the timeout elapses without a successful
   *                            response.
   */
  withoutResponse: <T extends string>(
    method: string,
    route: string,
    requestBody: EmptyRequestBody | JsonRequestBody | FileRequestBody,
    queryParameters: QueryParameters,
    abortSignal: null | AbortSignal,
    expectedStatusCodes: readonly T[]
  ) => Promise<T>

  /**
   * Performs a request which returns JSON.
   * @template T                The shape of the returned JSON, by status code.
   *                            Be aware that TypeScript does not generate any
   *                            runtime type checks for this!
   * @param method              The HTTP method to use.
   * @param route               The URL path relative to the base URL.
   * @param requestBody         The request body to send.
   * @param queryParameters     The query parameters to include in the URL.
   * @param abortSignal         When non-null, an AbortController's signal which
   *                            may be used to remotely cancel the request.
   * @param expectedStatusCodes The status codes expected to be returned.
   * @returns                   The returned status code and JSON.
   * @throws                    When the request fails.
   * @throws                    When the response's status code is not in the
   *                            list of expected values.
   * @throws                    When the abort signal is raised.
   * @throws                    When the timeout elapses without a successful
   *                            response.
   */
  returningJson: <
    T extends Readonly<Record<string, Json>>
  >(
    method: string,
    route: string,
    requestBody: EmptyRequestBody | JsonRequestBody,
    queryParameters: QueryParameters,
    abortSignal: null | AbortSignal,
    expectedStatusCodes: ReadonlyArray<keyof T>
  ) => Promise<
  {
    readonly [TStatusCode in keyof T]: {
      readonly statusCode: TStatusCode
      readonly value: T[TStatusCode]
    };
  }[keyof T]
  >

  /**
   * Performs a request which returns a file.  NOTE: timeouts are not yet
   * available for this method.
   * @param method                  The HTTP method to use.
   * @param route                   The URL path relative to the base URL.
   * @param requestBody             The request body to send.
   * @param queryParameters         The query parameters to include in the URL.
   * @param abortSignal             When non-null, an AbortController's signal
   *                                which may be used to remotely cancel the
   *                                request.
   * @param fileUri                 The URI to which the returned file is to be
   *                                downloaded.
   * @throws                        When the specified file already exists on
   *                                disk.
   * @throws                        When a non-2xx HTTP status code is returned.
   */
  returningFile: (
    method: 'GET',
    route: string,
    requestBody: EmptyRequestBody,
    queryParameters: QueryParameters,
    abortSignal: null,
    fileUri: ReadonlyArray<Directory | string>
  ) => Promise<void>
}
