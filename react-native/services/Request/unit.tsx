import { Request, type Json } from '../../..'
import * as FileSystem from 'expo-file-system'

class AbortError extends Error {
  constructor () {
    super('Aborted.')

    this.name = 'AbortError'
  }
}

test('nothing happens', async () => {
  const authorizationHeaderFactory = jest.fn()
  const fetch = jest.fn();
  (global as unknown as { fetch: unknown }).fetch = fetch

  // eslint-disable-next-line no-new
  new Request(
    'example-base-url.com/example/sub/path/',
    1000,
    authorizationHeaderFactory
  )

  expect(authorizationHeaderFactory).not.toBeCalled()
  expect(fetch).not.toBeCalled()
  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response empty missing protocol', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    setTimeout(() => {
      resolve({
        status: 123
      })
    }, 50)

    return await promise
  });

  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()

  const promise = request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  await expect(promise).resolves.toEqual('123')

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        Accept: 'application/json'
      },
      body: null
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response empty missing trailing slash', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    setTimeout(() => {
      resolve({
        status: 123
      })
    }, 50)

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()

  const promise = request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  await expect(promise).resolves.toEqual('123')

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        Accept: 'application/json'
      },
      body: null
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response empty no authorization', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    setTimeout(() => {
      resolve({
        status: 123
      })
    }, 50)

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => null
  )
  const abortController = new AbortController()

  const promise = request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  await expect(promise).resolves.toEqual('123')

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Accept: 'application/json'
      },
      body: null
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response empty no abort signal', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    setTimeout(() => {
      resolve({
        status: 123
      })
    }, 50)

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )

  const promise = request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    null,
    ['244', '123', '89']
  )

  await expect(promise).resolves.toEqual('123')

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        Accept: 'application/json'
      },
      body: null
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response empty no query parameters', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    setTimeout(() => {
      resolve({
        status: 123
      })
    }, 50)

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()

  const promise = request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'empty' },
    {},
    abortController.signal,
    ['244', '123', '89']
  )

  await expect(promise).resolves.toEqual('123')

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        Accept: 'application/json'
      },
      body: null
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response empty no retained query parameters', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    setTimeout(() => {
      resolve({
        status: 123
      })
    }, 50)

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()

  const promise = request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': false,
      'Example Query Parameter B Key': false,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': false
    },
    abortController.signal,
    ['244', '123', '89']
  )

  await expect(promise).resolves.toEqual('123')

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        Accept: 'application/json'
      },
      body: null
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response empty first query parameter dropped', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    setTimeout(() => {
      resolve({
        status: 123
      })
    }, 50)

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()

  const promise = request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': false,
      'Example Query Parameter B Key': false,
      'Example Query Parameter C Key': 'Example Query Parameter C Value',
      'Example Query Parameter D Key': false
    },
    abortController.signal,
    ['244', '123', '89']
  )

  await expect(promise).resolves.toEqual('123')

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20C%20Key=Example%20Query%20Parameter%20C%20Value',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        Accept: 'application/json'
      },
      body: null
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response empty invalid status code', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    setTimeout(() => {
      resolve({
        status: 889
      })
    }, 50)

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()

  const promise = request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  await expect(promise).rejects.toEqual(
    new Error(
      'Unexpected status code 889 during PUT of https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key.'
    )
  )

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        Accept: 'application/json'
      },
      body: null
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response empty external abort', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()
  const promise = request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  abortController.abort()

  await expect(promise).rejects.toEqual(new AbortError())

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        Accept: 'application/json'
      },
      body: null
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response before timeout', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    setTimeout(() => {
      resolve({
        status: 123
      })
    }, 950)

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()

  await request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        Accept: 'application/json'
      },
      body: null
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response empty timeout', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()
  const promise = request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  await expect(promise).rejects.toEqual(new AbortError())

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        Accept: 'application/json'
      },
      body: null
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request json response empty', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    setTimeout(() => {
      resolve({
        status: 123
      })
    }, 50)

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()

  await request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'json', value: { example: ['json', 'value'] } },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: '{"example":["json","value"]}'
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request json response empty external abort', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()
  const promise = request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'json', value: { example: ['json', 'value'] } },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  abortController.abort()

  await expect(promise).rejects.toEqual(new AbortError())

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: '{"example":["json","value"]}'
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request json response empty timeout', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()
  const promise = request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'json', value: { example: ['json', 'value'] } },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  await expect(promise).rejects.toEqual(new AbortError())

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: '{"example":["json","value"]}'
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request json response empty invalid status code', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    setTimeout(() => {
      resolve({
        status: 889
      })
    }, 50)

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()

  const promise = request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'json', value: { example: ['json', 'value'] } },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  await expect(promise).rejects.toEqual(
    new Error(
      'Unexpected status code 889 during PUT of https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key.'
    )
  )

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: '{"example":["json","value"]}'
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request file response empty', async () => {
  const fetch = jest.fn();
  (global as unknown as { fetch: unknown }).fetch = fetch
  const cancelAsync = jest.fn()
  const uploadAsync = jest.fn(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 950)
    })

    return { status: 123 }
  });
  (
    FileSystem.createUploadTask as unknown as {
      mockReturnValue: (value: unknown) => void
    }
  ).mockReturnValue({
    cancelAsync,
    uploadAsync
  })
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()

  await request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'file', fileUri: 'Example File Uri' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  expect(FileSystem.createUploadTask).toBeCalledTimes(1)
  expect(FileSystem.createUploadTask).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    'Example File Uri',
    {
      uploadType: 'Test Binary Content',
      headers: {
        Authorization: 'Example Authorization Header',
        Accept: 'application/json'
      }
    }
  )
  expect(cancelAsync).not.toHaveBeenCalled()
  expect(uploadAsync).toBeCalledTimes(1)

  expect(fetch).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request file response empty external abort', async () => {
  const fetch = jest.fn();
  (global as unknown as { fetch: unknown }).fetch = fetch
  let resolve: () => void
  const cancelAsync = jest.fn(() => {
    resolve()
  })
  const uploadAsync = jest.fn(async () => {
    await new Promise<void>((_resolve) => {
      resolve = _resolve
    })
  });
  (
    FileSystem.createUploadTask as unknown as {
      mockReturnValue: (value: unknown) => void
    }
  ).mockReturnValue({
    cancelAsync,
    uploadAsync
  })
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()
  const promise = request.withoutResponse(
    'PUT',
    'example/route',
    { type: 'file', fileUri: 'Example File Uri' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  abortController.abort()

  await expect(promise).rejects.toEqual(new AbortError())

  expect(FileSystem.createUploadTask).toBeCalledTimes(1)
  expect(FileSystem.createUploadTask).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    'Example File Uri',
    {
      uploadType: 'Test Binary Content',
      headers: {
        Authorization: 'Example Authorization Header',
        Accept: 'application/json'
      }
    }
  )
  expect(cancelAsync).toBeCalledTimes(1)
  expect(uploadAsync).toBeCalledTimes(1)

  expect(fetch).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response json', async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 123,
    json: async () => ({
      example: ['json', 'response']
    })
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()

  const response = await request.returningJson<{
    readonly '244': never
    readonly '123': {
      readonly example: readonly string[]
    }
    readonly '89': never
  }>(
    'PUT',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  expect(response.statusCode).toEqual('123')
  expect(response.value).toEqual({ example: ['json', 'response'] })

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        Accept: 'application/json'
      },
      body: null
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response json external abort', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()
  const promise = request.returningJson<{
    readonly '244': never
    readonly '123': {
      readonly example: readonly string[]
    }
    readonly '89': never
  }>(
    'PUT',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  abortController.abort()

  await expect(promise).rejects.toEqual(new AbortError())

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        Accept: 'application/json'
      },
      body: null
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response json timeout', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()
  const promise = request.returningJson<{
    readonly '244': never
    readonly '123': {
      readonly example: readonly string[]
    }
    readonly '89': never
  }>(
    'PUT',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  await expect(promise).rejects.toEqual(new AbortError())

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        Accept: 'application/json'
      },
      body: null
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response json invalid status code', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    setTimeout(() => {
      resolve({
        status: 889
      })
    }, 50)

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()

  const promise = request.returningJson<{
    readonly '244': never
    readonly '123': {
      readonly example: readonly string[]
    }
    readonly '89': never
  }>(
    'PUT',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  await expect(promise).rejects.toEqual(
    new Error(
      'Unexpected status code 889 during PUT of https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key.'
    )
  )

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        Accept: 'application/json'
      },
      body: null
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request json response json', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number, json: () => Promise<Json> }) => void
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    setTimeout(() => {
      resolve({
        status: 123,
        json: async () => ({
          example: ['json', 'response']
        })
      })
    }, 50)

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()

  const response = await request.returningJson<{
    readonly '244': never
    readonly '123': {
      readonly example: readonly string[]
    }
    readonly '89': never
  }>(
    'PUT',
    'example/route',
    { type: 'json', value: { example: ['json', 'request'] } },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  expect(response.statusCode).toEqual('123')
  expect(response.value.example).toEqual(['json', 'response'])

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: '{"example":["json","request"]}'
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request json response json external abort', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()
  const promise = request.returningJson<{
    readonly '244': never
    readonly '123': {
      readonly example: readonly string[]
    }
    readonly '89': never
  }>(
    'PUT',
    'example/route',
    { type: 'json', value: { example: ['json', 'value'] } },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  abortController.abort()

  await expect(promise).rejects.toEqual(new AbortError())

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: '{"example":["json","value"]}'
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request json response json timeout', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()
  const promise = request.returningJson<{
    readonly '244': never
    readonly '123': {
      readonly example: readonly string[]
    }
    readonly '89': never
  }>(
    'PUT',
    'example/route',
    { type: 'json', value: { example: ['json', 'value'] } },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  await expect(promise).rejects.toEqual(new AbortError())

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: '{"example":["json","value"]}'
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request json response json invalid status code', async () => {
  const fetch = jest.fn(async (_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void
    let reject: (reason: Error) => void

    const promise = new Promise<{ readonly status: number }>((_resolve, _reject) => {
      resolve = _resolve
      reject = _reject
    })

    init?.signal?.addEventListener('abort', () => {
      reject(new AbortError())
    })

    setTimeout(() => {
      resolve({
        status: 889
      })
    }, 50)

    return await promise
  });
  (global as unknown as { fetch: unknown }).fetch = fetch
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )
  const abortController = new AbortController()

  const promise = request.returningJson<{
    readonly '244': never
    readonly '123': {
      readonly example: readonly string[]
    }
    readonly '89': never
  }>(
    'PUT',
    'example/route',
    { type: 'json', value: { example: ['json', 'value'] } },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    abortController.signal,
    ['244', '123', '89']
  )

  await expect(promise).rejects.toEqual(
    new Error(
      'Unexpected status code 889 during PUT of https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key.'
    )
  )

  expect(fetch).toBeCalledTimes(1)
  expect(fetch).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    {
      signal: expect.any(AbortSignal),
      method: 'PUT',
      headers: {
        Authorization: 'Example Authorization Header',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: '{"example":["json","value"]}'
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response file', async () => {
  const fetch = jest.fn();
  (global as unknown as { fetch: unknown }).fetch = fetch;
  (
    FileSystem.downloadAsync as unknown as {
      mockResolvedValue: (value: unknown) => void
    }
  ).mockResolvedValue({
    status: 123
  })
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )

  const response = await request.returningFile(
    'GET',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    null,
    'Example File Uri',
    ['244', '123', '89'],
    ['800', '222', '347', '844']
  )

  expect(response).toEqual('123')

  expect(FileSystem.downloadAsync).toBeCalledTimes(1)
  expect(FileSystem.downloadAsync).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    'Example File Uri',
    {
      headers: { Authorization: 'Example Authorization Header' }
    }
  )

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(fetch).not.toHaveBeenCalled()
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled()
})

test('get request empty response file failure status code', async () => {
  const fetch = jest.fn();
  (global as unknown as { fetch: unknown }).fetch = fetch;
  (
    FileSystem.downloadAsync as unknown as {
      mockResolvedValue: (value: unknown) => void
    }
  ).mockResolvedValue({
    status: 347
  })
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )

  const response = await request.returningFile(
    'GET',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    null,
    'Example File Uri',
    ['244', '123', '89'],
    ['800', '222', '347', '844']
  )

  expect(response).toEqual('347')

  expect(FileSystem.downloadAsync).toBeCalledTimes(1)
  expect(FileSystem.downloadAsync).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    'Example File Uri',
    {
      headers: { Authorization: 'Example Authorization Header' }
    }
  )

  expect(FileSystem.deleteAsync).toBeCalledTimes(1)
  expect(FileSystem.deleteAsync).toBeCalledWith('Example File Uri', {
    idempotent: true
  })

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(fetch).not.toHaveBeenCalled()
})

test('get request empty response file invalid status code', async () => {
  const fetch = jest.fn();
  (global as unknown as { fetch: unknown }).fetch = fetch;
  (
    FileSystem.downloadAsync as unknown as {
      mockResolvedValue: (value: unknown) => void
    }
  ).mockResolvedValue({
    status: 889
  })
  const request = new Request(
    'https://example-base-url.com/example/sub/path/',
    1000,
    () => 'Example Authorization Header'
  )

  const promise = request.returningFile(
    'GET',
    'example/route',
    { type: 'empty' },
    {
      'Example Query Parameter A Key': 'Example Query Parameter A Value',
      'Example Query Parameter B Key': 12.34,
      'Example Query Parameter C Key': false,
      'Example Query Parameter D Key': true
    },
    null,
    'Example File Uri',
    ['244', '123', '89'],
    ['800', '222', '347', '844']
  )

  await expect(promise).rejects.toEqual(
    new Error(
      'Unexpected status code 889 during GET of https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key.'
    )
  )

  expect(FileSystem.downloadAsync).toBeCalledTimes(1)
  expect(FileSystem.downloadAsync).toBeCalledWith(
    'https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key',
    'Example File Uri',
    {
      headers: { Authorization: 'Example Authorization Header' }
    }
  )

  expect(FileSystem.deleteAsync).toBeCalledTimes(1)
  expect(FileSystem.deleteAsync).toBeCalledWith('Example File Uri', {
    idempotent: true
  })

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled()
  expect(fetch).not.toHaveBeenCalled()
})
