import * as FileSystem from "expo-file-system";
import type { EmptyRequestBody } from "../../types/EmptyRequestBody";
import type { FileRequestBody } from "../../types/FileRequestBody";
import type { Json } from "../../types/Json";
import type { JsonRequestBody } from "../../types/JsonRequestBody";
import type { QueryParameter } from "../../types/QueryParameter";
import type { QueryParameters } from "../../types/QueryParameters";
import type { RequestInterface } from "../../types/RequestInterface";

class AbortError extends Error {
  constructor() {
    super(`Aborted.`);

    this.name = `AbortError`;
  }
}

/**
 * Allows HTTP/S requests to be made for JSON and files relative to a base URL.
 */
export class Request implements RequestInterface {
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
    statusCode: number,
    expectedStatusCodes: ReadonlyArray<string>
  ): void {
    if (!expectedStatusCodes.includes(String(statusCode))) {
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

  async withoutResponse<T extends string>(
    method: string,
    route: string,
    requestBody: EmptyRequestBody | JsonRequestBody | FileRequestBody,
    queryParameters: QueryParameters,
    abortSignal: null | AbortSignal,
    expectedStatusCodes: ReadonlyArray<T>
  ): Promise<T> {
    return await this.withTimeout(abortSignal, async (signal) => {
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
              Accept: `application/json`, // If we do not do this, Laravel will redirect to / in the event of an error, hiding the returned validation error.
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
              Accept: `application/json`, // If we do not do this, Laravel will redirect to / in the event of an error, hiding the returned validation error.
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

      this.checkStatusCode(method, url, response.status, expectedStatusCodes);

      return String(response.status) as T;
    });
  }

  async returningJson<
    T extends {
      readonly [statusCode: string]: Json;
    }
  >(
    method: string,
    route: string,
    requestBody: EmptyRequestBody | JsonRequestBody,
    queryParameters: QueryParameters,
    abortSignal: null | AbortSignal,
    expectedStatusCodes: ReadonlyArray<keyof T>
  ): Promise<
    {
      readonly [TStatusCode in keyof T]: {
        readonly statusCode: TStatusCode;
        readonly value: T[TStatusCode];
      };
    }[keyof T]
  > {
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

      this.checkStatusCode(method, url, response.status, expectedStatusCodes);

      return {
        statusCode: String(response.status) as keyof T,
        value: await response.json(),
      };
    });
  }

  async returningFile<T extends string>(
    method: `GET`,
    route: string,
    requestBody: EmptyRequestBody,
    queryParameters: QueryParameters,
    abortSignal: null,
    fileUri: string,
    expectedStatusCodes: ReadonlyArray<T>
  ): Promise<T> {
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

      this.checkStatusCode(method, url, response.status, expectedStatusCodes);

      return String(response.status) as T;
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
