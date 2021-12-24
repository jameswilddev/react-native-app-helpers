import { Request } from "../../..";
import * as FileSystem from "expo-file-system";

class AbortError extends Error {
  constructor() {
    super(`Aborted`);

    this.name = `AbortError`;
  }
}

test(`nothing happens`, async () => {
  const authorizationHeaderFactory = jest.fn();
  const fetch = jest.fn();
  (global as unknown as { fetch: unknown }).fetch = fetch;

  new Request(
    `example-base-url.com/example/sub/path/`,
    1000,
    authorizationHeaderFactory
  );

  expect(authorizationHeaderFactory).not.toBeCalled();
  expect(fetch).not.toBeCalled();
  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response empty missing protocol`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 254,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  await request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response empty missing trailing slash`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 254,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  await request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response empty no authorization`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 254,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => null
  );
  const abortController = new AbortController();

  await request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {},
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response empty no abort signal`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 254,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );

  await request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    null
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response empty no query parameters`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 254,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  await request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {},
    abortController.signal
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response empty no retained query parameters`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 254,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  await request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": false,
      "Example Query Parameter B Key": false,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": false,
    },
    abortController.signal
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response empty first query parameter dropped`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 254,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  await request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": false,
      "Example Query Parameter B Key": false,
      "Example Query Parameter C Key": `Example Query Parameter C Value`,
      "Example Query Parameter D Key": false,
    },
    abortController.signal
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20C%20Key=Example%20Query%20Parameter%20C%20Value`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response empty 200`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 200,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  await request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response empty 299`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 299,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  await request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response empty 198`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 198,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  const promise = request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  await expect(promise).rejects.toEqual(
    new Error(
      `Unexpected status code 198 during PUT of https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key.`
    )
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response empty 199`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 199,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  const promise = request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  await expect(promise).rejects.toEqual(
    new Error(
      `Unexpected status code 199 during PUT of https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key.`
    )
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response empty 300`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 300,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  const promise = request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  await expect(promise).rejects.toEqual(
    new Error(
      `Unexpected status code 300 during PUT of https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key.`
    )
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response empty 301`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 301,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  const promise = request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  await expect(promise).rejects.toEqual(
    new Error(
      `Unexpected status code 301 during PUT of https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key.`
    )
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response empty external abort`, async () => {
  const fetch = jest.fn((_, init: undefined | RequestInit) => {
    let reject: (reason: Error) => void;

    const promise = new Promise<Response>((_, _reject) => {
      reject = _reject;
    });

    init?.signal?.addEventListener(`abort`, () => {
      reject(new AbortError());
    });

    return promise;
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();
  const promise = request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  abortController.abort();

  await expect(promise).rejects.toEqual(new AbortError());

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response before timeout`, async () => {
  const fetch = jest.fn(async () => {
    await new Promise((resolve) => setTimeout(resolve, 950));
    return { status: 254 };
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  await request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response empty timeout`, async () => {
  const fetch = jest.fn((_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void;
    let reject: (reason: Error) => void;

    const promise = new Promise<{ readonly status: number }>(
      (_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
      }
    );

    init?.signal?.addEventListener(`abort`, () => {
      reject(new AbortError());
    });

    setTimeout(() => {
      resolve({ status: 254 });
    }, 1050);

    return promise;
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();
  const promise = request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  abortController.abort();

  await expect(promise).rejects.toEqual(new AbortError());

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request json response empty`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 254,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  await request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `json`, value: { example: [`json`, `value`] } },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
        "Content-Type": `application/json`,
      },
      body: `{"example":["json","value"]}`,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request json response empty external abort`, async () => {
  const fetch = jest.fn((_, init: undefined | RequestInit) => {
    let reject: (reason: Error) => void;

    const promise = new Promise<Response>((_, _reject) => {
      reject = _reject;
    });

    init?.signal?.addEventListener(`abort`, () => {
      reject(new AbortError());
    });

    return promise;
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();
  const promise = request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `json`, value: { example: [`json`, `value`] } },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  abortController.abort();

  await expect(promise).rejects.toEqual(new AbortError());

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
        "Content-Type": `application/json`,
      },
      body: `{"example":["json","value"]}`,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request json response empty timeout`, async () => {
  const fetch = jest.fn((_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void;
    let reject: (reason: Error) => void;

    const promise = new Promise<{ readonly status: number }>(
      (_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
      }
    );

    init?.signal?.addEventListener(`abort`, () => {
      reject(new AbortError());
    });

    setTimeout(() => {
      resolve({ status: 254 });
    }, 1050);

    return promise;
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();
  const promise = request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `json`, value: { example: [`json`, `value`] } },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  abortController.abort();

  await expect(promise).rejects.toEqual(new AbortError());

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
        "Content-Type": `application/json`,
      },
      body: `{"example":["json","value"]}`,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request json response empty invalid status code`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 301,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  const promise = request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `json`, value: { example: [`json`, `value`] } },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  await expect(promise).rejects.toEqual(
    new Error(
      `Unexpected status code 301 during PUT of https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key.`
    )
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
        "Content-Type": `application/json`,
      },
      body: `{"example":["json","value"]}`,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request file response empty`, async () => {
  const fetch = jest.fn();
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const cancelAsync = jest.fn();
  const uploadAsync = jest.fn(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 950);
    });

    return { status: 254 };
  });
  (
    FileSystem.createUploadTask as unknown as {
      mockReturnValue(value: unknown): void;
    }
  ).mockReturnValue({
    cancelAsync,
    uploadAsync,
  });
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  await request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `file`, fileUri: `Example File Uri` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  expect(FileSystem.createUploadTask).toBeCalledTimes(1);
  expect(FileSystem.createUploadTask).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    `Example File Uri`,
    {
      uploadType: `Test Binary Content`,
      headers: { Authorization: `Example Authorization Header` },
    }
  );
  expect(cancelAsync).not.toHaveBeenCalled();
  expect(uploadAsync).toBeCalledTimes(1);

  expect(fetch).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request file response empty external abort`, async () => {
  const fetch = jest.fn();
  (global as unknown as { fetch: unknown }).fetch = fetch;
  let resolve: () => void;
  const cancelAsync = jest.fn(() => {
    resolve();
  });
  const uploadAsync = jest.fn(() => {
    return new Promise<void>((_resolve) => {
      resolve = _resolve;
    });
  });
  (
    FileSystem.createUploadTask as unknown as {
      mockReturnValue(value: unknown): void;
    }
  ).mockReturnValue({
    cancelAsync,
    uploadAsync,
  });
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();
  const promise = request.withoutResponse(
    `PUT`,
    `example/route`,
    { type: `file`, fileUri: `Example File Uri` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  abortController.abort();

  expect(promise).rejects.toEqual(new AbortError());

  expect(FileSystem.createUploadTask).toBeCalledTimes(1);
  expect(FileSystem.createUploadTask).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    `Example File Uri`,
    {
      uploadType: `Test Binary Content`,
      headers: { Authorization: `Example Authorization Header` },
    }
  );
  expect(cancelAsync).toBeCalledTimes(1);
  expect(uploadAsync).toBeCalledTimes(1);

  expect(fetch).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response json`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 254,
    json: async () => ({
      example: [`json`, `response`],
    }),
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  const response = await request.returningJson<{
    readonly example: ReadonlyArray<string>;
  }>(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  expect(response.example).toEqual([`json`, `response`]);

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
        Accept: `application/json`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response json external abort`, async () => {
  const fetch = jest.fn((_, init: undefined | RequestInit) => {
    let reject: (reason: Error) => void;

    const promise = new Promise<Response>((_, _reject) => {
      reject = _reject;
    });

    init?.signal?.addEventListener(`abort`, () => {
      reject(new AbortError());
    });

    return promise;
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();
  const promise = request.returningJson(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  abortController.abort();

  await expect(promise).rejects.toEqual(new AbortError());

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
        Accept: `application/json`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response json timeout`, async () => {
  const fetch = jest.fn((_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void;
    let reject: (reason: Error) => void;

    const promise = new Promise<{ readonly status: number }>(
      (_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
      }
    );

    init?.signal?.addEventListener(`abort`, () => {
      reject(new AbortError());
    });

    setTimeout(() => {
      resolve({ status: 254 });
    }, 1050);

    return promise;
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();
  const promise = request.returningJson(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  abortController.abort();

  await expect(promise).rejects.toEqual(new AbortError());

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
        Accept: `application/json`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response json invalid status code`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 301,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  const promise = request.returningJson(
    `PUT`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  await expect(promise).rejects.toEqual(
    new Error(
      `Unexpected status code 301 during PUT of https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key.`
    )
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
        Accept: `application/json`,
      },
      body: null,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request json response json`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 254,
    json: async () => ({
      example: [`json`, `response`],
    }),
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  const response = await request.returningJson<{
    readonly example: ReadonlyArray<string>;
  }>(
    `PUT`,
    `example/route`,
    { type: `json`, value: { example: [`json`, `request`] } },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  expect(response.example).toEqual([`json`, `response`]);

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
        "Content-Type": `application/json`,
        Accept: `application/json`,
      },
      body: `{"example":["json","request"]}`,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request json response json external abort`, async () => {
  const fetch = jest.fn((_, init: undefined | RequestInit) => {
    let reject: (reason: Error) => void;

    const promise = new Promise<Response>((_, _reject) => {
      reject = _reject;
    });

    init?.signal?.addEventListener(`abort`, () => {
      reject(new AbortError());
    });

    return promise;
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();
  const promise = request.returningJson(
    `PUT`,
    `example/route`,
    { type: `json`, value: { example: [`json`, `value`] } },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  abortController.abort();

  await expect(promise).rejects.toEqual(new AbortError());

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
        "Content-Type": `application/json`,
        Accept: `application/json`,
      },
      body: `{"example":["json","value"]}`,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request json response json timeout`, async () => {
  const fetch = jest.fn((_, init: undefined | RequestInit) => {
    let resolve: (result: { readonly status: number }) => void;
    let reject: (reason: Error) => void;

    const promise = new Promise<{ readonly status: number }>(
      (_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
      }
    );

    init?.signal?.addEventListener(`abort`, () => {
      reject(new AbortError());
    });

    setTimeout(() => {
      resolve({ status: 254 });
    }, 1050);

    return promise;
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();
  const promise = request.returningJson(
    `PUT`,
    `example/route`,
    { type: `json`, value: { example: [`json`, `value`] } },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  abortController.abort();

  await expect(promise).rejects.toEqual(new AbortError());

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
        "Content-Type": `application/json`,
        Accept: `application/json`,
      },
      body: `{"example":["json","value"]}`,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request json response json invalid status code`, async () => {
  const fetch = jest.fn().mockResolvedValue({
    status: 301,
  });
  (global as unknown as { fetch: unknown }).fetch = fetch;
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );
  const abortController = new AbortController();

  const promise = request.returningJson(
    `PUT`,
    `example/route`,
    { type: `json`, value: { example: [`json`, `value`] } },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    abortController.signal
  );

  await expect(promise).rejects.toEqual(
    new Error(
      `Unexpected status code 301 during PUT of https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key.`
    )
  );

  expect(fetch).toBeCalledTimes(1);
  expect(fetch).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    {
      signal: expect.any(AbortSignal),
      method: `PUT`,
      headers: {
        Authorization: `Example Authorization Header`,
        "Content-Type": `application/json`,
        Accept: `application/json`,
      },
      body: `{"example":["json","value"]}`,
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(FileSystem.downloadAsync).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response file`, async () => {
  const fetch = jest.fn();
  (global as unknown as { fetch: unknown }).fetch = fetch;
  (
    FileSystem.downloadAsync as unknown as {
      mockResolvedValue(value: unknown): void;
    }
  ).mockResolvedValue({
    status: 254,
  });
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );

  await request.returningFile(
    `GET`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    null,
    `Example File Uri`
  );

  expect(FileSystem.downloadAsync).toBeCalledTimes(1);
  expect(FileSystem.downloadAsync).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    `Example File Uri`,
    {
      headers: { Authorization: `Example Authorization Header` },
    }
  );

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(fetch).not.toHaveBeenCalled();
  expect(FileSystem.deleteAsync).not.toHaveBeenCalled();
});

test(`get request empty response file invalid status code`, async () => {
  const fetch = jest.fn();
  (global as unknown as { fetch: unknown }).fetch = fetch;
  (
    FileSystem.downloadAsync as unknown as {
      mockResolvedValue(value: unknown): void;
    }
  ).mockResolvedValue({
    status: 198,
  });
  const request = new Request(
    `https://example-base-url.com/example/sub/path/`,
    1000,
    () => `Example Authorization Header`
  );

  const promise = request.returningFile(
    `GET`,
    `example/route`,
    { type: `empty` },
    {
      "Example Query Parameter A Key": `Example Query Parameter A Value`,
      "Example Query Parameter B Key": 12.34,
      "Example Query Parameter C Key": false,
      "Example Query Parameter D Key": true,
    },
    null,
    `Example File Uri`
  );

  await expect(promise).rejects.toEqual(
    new Error(
      `Unexpected status code 198 during GET of https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key.`
    )
  );

  expect(FileSystem.downloadAsync).toBeCalledTimes(1);
  expect(FileSystem.downloadAsync).toBeCalledWith(
    `https://example-base-url.com/example/sub/path/example/route?Example%20Query%20Parameter%20A%20Key=Example%20Query%20Parameter%20A%20Value&Example%20Query%20Parameter%20B%20Key=12.34&Example%20Query%20Parameter%20D%20Key`,
    `Example File Uri`,
    {
      headers: { Authorization: `Example Authorization Header` },
    }
  );

  expect(FileSystem.deleteAsync).toBeCalledTimes(1);
  expect(FileSystem.deleteAsync).toBeCalledWith(`Example File Uri`, {
    idempotent: true,
  });

  expect(FileSystem.createUploadTask).not.toHaveBeenCalled();
  expect(fetch).not.toHaveBeenCalled();
});
