import * as FileSystem from "expo-file-system";
import type { EmptyRequestBody } from "../../types/EmptyRequestBody";
import type { FileRequestBody } from "../../types/FileRequestBody";
import type { Json } from "../../types/Json";
import type { JsonRequestBody } from "../../types/JsonRequestBody";
import type { QueryParameter } from "../../types/QueryParameter";
import type { QueryParameters } from "../../types/QueryParameters";

class AbortError extends Error {
  constructor() {
    super(`Aborted.`);

    this.name = `AbortError`;
  }
}

/**
 * Allows HTTP/S requests to be made for JSON and files relative to a base URL.
 */
export class Request {
  private readonly baseUrl: string;

  /**
   * @param baseUrl                    The base URL to which all requests will
   *                                   be relative.
   * @param timeoutMilliseconds        The maximum number of milliseconds before
   *                                   requests will be cancelled.
   * @param authorizationHeaderFactory Invoked immediately before requests; when
   *                                   null, no Authorization header is added;
   *                                   otherwise, the returned string (e.g.
   *                                   "BEARER 1234") is taken as the
   *                                   Authorization header.
   */
  constructor(
    baseUrl: string,
    private readonly timeoutMilliseconds: number,
    private readonly authorizationHeaderFactory: () => null | string
  ) {
    if (!/^[a-z]+:\/\//.test(baseUrl)) {
      baseUrl = `https://${baseUrl}`;
    }

    if (!baseUrl.endsWith(`/`)) {
      baseUrl += `/`;
    }

    this.baseUrl = baseUrl;
  }

  private constructUrl(
    route: string,
    queryParameters: QueryParameters
  ): string {
    let url = this.baseUrl + route;

    for (const queryParameterKey in queryParameters) {
      const queryParameterValue = queryParameters[
        queryParameterKey
      ] as QueryParameter;

      if (queryParameterValue === false) {
        continue;
      } else {
        const delimiter = url.includes(`?`) ? `&` : `?`;
        const encodedQueryParameterKey = encodeURIComponent(queryParameterKey);

        if (queryParameterValue === true) {
          url += `${delimiter}${encodedQueryParameterKey}`;
        } else {
          const encodedQueryParameterValue =
            encodeURIComponent(queryParameterValue);

          url += `${delimiter}${encodedQueryParameterKey}=${encodedQueryParameterValue}`;
        }
      }
    }

    return url;
  }

  private async withTimeout<T>(
    abortSignal: null | AbortSignal,
    then: (signal: AbortSignal) => T
  ): Promise<T> {
    const internalAbortController = new AbortController();
    const abortControllerCallback = () => {
      internalAbortController.abort();
    };

    let timeout: null | NodeJS.Timeout = null;

    try {
      if (abortSignal !== null) {
        abortSignal.addEventListener(`abort`, abortControllerCallback);
      }

      timeout = setTimeout(abortControllerCallback, this.timeoutMilliseconds);

      return await then(internalAbortController.signal);
    } finally {
      if (abortSignal !== null) {
        abortSignal.removeEventListener(`abort`, abortControllerCallback);
      }

      // It is impossible to skip this branch by force.
      /* istanbul ignore else */
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    }
  }

  private checkStatusCode(
    method: string,
    url: string,
    statusCode: number
  ): void {
    if (statusCode < 200 || statusCode >= 300) {
      throw new Error(
        `Unexpected status code ${statusCode} during ${method} of ${url}.`
      );
    }
  }

  private commonHeaders(): { readonly [key: string]: string } {
    const authorizationHeader = this.authorizationHeaderFactory();

    if (authorizationHeader === null) {
      return {};
    } else {
      return {
        Authorization: authorizationHeader,
      };
    }
  }

  private requestBodyHeaders(
    requestBody: EmptyRequestBody | JsonRequestBody | FileRequestBody
  ): { readonly [key: string]: string } {
    switch (requestBody.type) {
      case `empty`:
      case `file`:
        return {};

      case `json`:
        return {
          "Content-Type": `application/json`,
        };
    }
  }

  private requestBodyBody(
    requestBody: EmptyRequestBody | JsonRequestBody | FileRequestBody
  ): null | BodyInit_ {
    switch (requestBody.type) {
      case `empty`:
      case `file`:
        return null;

      case `json`:
        return JSON.stringify(requestBody.value);
    }
  }

  /**
   * Performs a request which does not return any data.
   * @param method          The HTTP method to use.
   * @param route           The URL path relative to the base URL.
   * @param requestBody     The request body to send.
   * @param queryParameters The query parameters to include in the URL.
   * @param abortSignal     When non-null, an AbortController's signal which may
   *                        be used to remotely cancel the request.
   */
  async withoutResponse(
    method: string,
    route: string,
    requestBody: EmptyRequestBody | JsonRequestBody | FileRequestBody,
    queryParameters: QueryParameters,
    abortSignal: null | AbortSignal
  ): Promise<void> {
    await this.withTimeout(abortSignal, async (signal) => {
      const url = this.constructUrl(route, queryParameters);

      let response: { readonly status: number };

      switch (requestBody.type) {
        case `empty`:
        case `json`:
          response = await fetch(url, {
            signal,
            method,
            headers: {
              ...this.commonHeaders(),
              ...this.requestBodyHeaders(requestBody),
            },
            body: this.requestBodyBody(requestBody),
          });
          break;

        case `file`: {
          const task = FileSystem.createUploadTask(url, requestBody.fileUri, {
            uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
            headers: {
              ...this.commonHeaders(),
              ...this.requestBodyHeaders(requestBody),
            },
          });

          const eventListener = () => {
            task.cancelAsync();
          };

          try {
            signal.addEventListener("abort", eventListener);

            const result = await task.uploadAsync();

            if (result === undefined) {
              throw new AbortError();
            } else {
              response = result;
            }
          } finally {
            signal.removeEventListener(`abort`, eventListener);
          }
          break;
        }
      }

      this.checkStatusCode(method, url, response.status);
    });
  }

  /**
   * Performs a request which returns JSON.
   * @template T            The shape of the returned JSON.  Be aware that
   *                        TypeScript does not generate any runtime type checks
   *                        for this!
   * @param method          The HTTP method to use.
   * @param route           The URL path relative to the base URL.
   * @param requestBody     The request body to send.
   * @param queryParameters The query parameters to include in the URL.
   * @param abortSignal     When non-null, an AbortController's signal which may
   *                        be used to remotely cancel the request.
   */
  async returningJson<T extends Json>(
    method: string,
    route: string,
    requestBody: EmptyRequestBody | JsonRequestBody,
    queryParameters: QueryParameters,
    abortSignal: null | AbortSignal
  ): Promise<T> {
    return await this.withTimeout(abortSignal, async (signal) => {
      const url = this.constructUrl(route, queryParameters);

      const response = await fetch(url, {
        signal,
        method,
        headers: {
          ...this.commonHeaders(),
          ...this.requestBodyHeaders(requestBody),
          Accept: `application/json`,
        },
        body: this.requestBodyBody(requestBody),
      });

      this.checkStatusCode(method, url, response.status);

      return await response.json();
    });
  }

  /**
   * Performs a request which returns a file.  NOTE: timeouts are not yet
   * available for this method.
   * @param method          The HTTP method to use.
   * @param route           The URL path relative to the base URL.
   * @param requestBody     The request body to send.
   * @param queryParameters The query parameters to include in the URL.
   * @param abortSignal     When non-null, an AbortController's signal which may
   *                        be used to remotely cancel the request.
   * @param fileUri         The URI to which the returned file is to be
   *                        downloaded.
   */
  async returningFile(
    method: `GET`,
    route: string,
    requestBody: EmptyRequestBody,
    queryParameters: QueryParameters,
    abortSignal: null,
    fileUri: string
  ): Promise<void> {
    // Not yet possible with FileSystem.downloadAsync.
    abortSignal;

    const url = this.constructUrl(route, queryParameters);

    try {
      const response = await FileSystem.downloadAsync(url, fileUri, {
        headers: {
          ...this.commonHeaders(),
          ...this.requestBodyHeaders(requestBody),
        },
      });

      this.checkStatusCode(method, url, response.status);
    } catch (e) {
      // It has been observed that FileSystem.downloadAsync will still create
      // files for non-2xx status codes.  It's possible that the application
      // will close before we hit this line, but this is the best we can do
      // unfortunately.
      await FileSystem.deleteAsync(fileUri, { idempotent: true });

      throw e;
    }
  }
}
