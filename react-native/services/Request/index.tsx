import { type Directory, File, Paths } from 'expo-file-system'
import type { EmptyRequestBody } from '../../types/EmptyRequestBody'
import type { FileRequestBody } from '../../types/FileRequestBody'
import type { Json } from '../../types/Json'
import type { JsonRequestBody } from '../../types/JsonRequestBody'
import type { QueryParameter } from '../../types/QueryParameter'
import type { QueryParameters } from '../../types/QueryParameters'
import type { RequestInterface } from '../../types/RequestInterface'
import type { UuidGeneratorInterface } from '../../types/UuidGeneratorInterface'

/**
 * Allows HTTP/S requests to be made for JSON and files relative to a base URL.
 */
export class Request implements RequestInterface {
  private readonly baseUrl: string

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
   * @param fetch                      Expo's implementation of fetch().
   * @param uuidGenerator              A generator of UUIDs.
   */
  constructor (
    baseUrl: string,
    private readonly timeoutMilliseconds: number,
    private readonly authorizationHeaderFactory: () => null | string,
    private readonly fetch: GlobalFetch['fetch'],
    private readonly uuidGenerator: UuidGeneratorInterface
  ) {
    if (!/^[a-z]+:\/\//.test(baseUrl)) {
      baseUrl = `https://${baseUrl}`
    }

    if (!baseUrl.endsWith('/')) {
      baseUrl += '/'
    }

    this.baseUrl = baseUrl
  }

  private constructUrl (
    route: string,
    queryParameters: QueryParameters
  ): string {
    let url = this.baseUrl + route

    for (const queryParameterKey in queryParameters) {
      const queryParameterValue = queryParameters[
        queryParameterKey
      ] as QueryParameter

      if (queryParameterValue === false) {
        continue
      } else {
        const delimiter = url.includes('?') ? '&' : '?'
        const encodedQueryParameterKey = encodeURIComponent(queryParameterKey)

        if (queryParameterValue === true) {
          url += `${delimiter}${encodedQueryParameterKey}`
        } else {
          const encodedQueryParameterValue =
            encodeURIComponent(queryParameterValue)

          url += `${delimiter}${encodedQueryParameterKey}=${encodedQueryParameterValue}`
        }
      }
    }

    return url
  }

  private async withTimeout<T>(
    abortSignal: null | AbortSignal,
    then: (signal: AbortSignal) => Promise<T>
  ): Promise<T> {
    const internalAbortController = new AbortController()
    const abortControllerCallback = (): void => {
      internalAbortController.abort()
    }

    let timeout: null | NodeJS.Timeout = null

    try {
      if (abortSignal !== null) {
        abortSignal.addEventListener('abort', abortControllerCallback)
      }

      timeout = setTimeout(abortControllerCallback, this.timeoutMilliseconds)

      return await then(internalAbortController.signal)
    } finally {
      if (abortSignal !== null) {
        abortSignal.removeEventListener('abort', abortControllerCallback)
      }

      // It is impossible to skip this branch by force.
      /* istanbul ignore else */
      if (timeout !== null) {
        clearTimeout(timeout)
      }
    }
  }

  private checkStatusCode (
    method: string,
    url: string,
    statusCode: number,
    expectedStatusCodes: readonly string[]
  ): void {
    if (!expectedStatusCodes.includes(String(statusCode))) {
      throw new Error(
        `Unexpected status code ${statusCode} during ${method} of ${url}.`
      )
    }
  }

  private commonHeaders (): Readonly<Record<string, string>> {
    const authorizationHeader = this.authorizationHeaderFactory()

    if (authorizationHeader === null) {
      return {}
    } else {
      return {
        Authorization: authorizationHeader
      }
    }
  }

  private requestBodyHeaders (
    requestBody: EmptyRequestBody | JsonRequestBody | FileRequestBody
  ): Readonly<Record<string, string>> {
    switch (requestBody.type) {
      case 'empty':
      case 'file':
        return {}

      case 'json':
        return {
          'Content-Type': 'application/json'
        }
    }
  }

  private requestBodyBody (
    requestBody: EmptyRequestBody | JsonRequestBody | FileRequestBody
  ): null | BodyInit {
    switch (requestBody.type) {
      case 'empty':
        return null

      case 'file': {
        const original = new File(...requestBody.fileUri)
        const temporaryCopy = new File(Paths.cache, `${this.uuidGenerator.generate()}.bin`)
        original.copy(temporaryCopy)
        return temporaryCopy
      }

      case 'json':
        return JSON.stringify(requestBody.value)
    }
  }

  private cleanUpBodyBody (body: null | BodyInit): void {
    if (body instanceof File) {
      body.delete()
    }
  }

  async withoutResponse<T extends string>(
    method: string,
    route: string,
    requestBody: EmptyRequestBody | JsonRequestBody | FileRequestBody,
    queryParameters: QueryParameters,
    abortSignal: null | AbortSignal,
    expectedStatusCodes: readonly T[]
  ): Promise<T> {
    return await this.withTimeout(abortSignal, async (signal) => {
      const url = this.constructUrl(route, queryParameters)
      let body: null | BodyInit = null
      let response: Response

      try {
        body = this.requestBodyBody(requestBody)

        response = await this.fetch(url, {
          signal,
          method,
          headers: {
            ...this.commonHeaders(),
            ...this.requestBodyHeaders(requestBody),
            Accept: 'application/json' // If we do not do this, Laravel will redirect to / in the event of an error, hiding the returned validation error.
          },
          body
        })
      } finally {
        this.cleanUpBodyBody(body)
      }

      this.checkStatusCode(method, url, response.status, expectedStatusCodes)

      return String(response.status) as T
    })
  }

  async returningJson<
    T extends Readonly<Record<string, Json>>
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
        readonly statusCode: TStatusCode
        readonly value: T[TStatusCode]
      };
    }[keyof T]
    > {
    return await this.withTimeout(abortSignal, async (signal) => {
      const url = this.constructUrl(route, queryParameters)
      let body: null | BodyInit = null
      let response: Response

      try {
        body = this.requestBodyBody(requestBody)

        response = await this.fetch(url, {
          signal,
          method,
          headers: {
            ...this.commonHeaders(),
            ...this.requestBodyHeaders(requestBody),
            Accept: 'application/json'
          },
          body
        })
      } finally {
        this.cleanUpBodyBody(body)
      }

      this.checkStatusCode(method, url, response.status, expectedStatusCodes as readonly string[])

      return {
        statusCode: String(response.status) as keyof T,
        value: await response.json()
      }
    })
  }

  async returningFile (
    _method: 'GET',
    route: string,
    requestBody: EmptyRequestBody,
    queryParameters: QueryParameters,

    // Not yet possible with File.downloadAsync.
    _abortSignal: null,

    fileUri: ReadonlyArray<Directory | string>
  ): Promise<void> {
    const url = this.constructUrl(route, queryParameters)

    await File.downloadFileAsync(url, new File(...fileUri), {
      headers: {
        ...this.commonHeaders(),
        ...this.requestBodyHeaders(requestBody)
      }
    })
  }
}
