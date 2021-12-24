# `react-native-app-helpers/Request`

Allows HTTP/S requests to be made for JSON and files relative to a base URL.

## Usage

```tsx
import { Request } from "react-native-app-helpers";

const request = new Request(
  `https://your-base-url.com/with/optional/paths`,
  30000,
  () => `BEARER your-authorization-header`,
  ["200"],
);

await request.withoutResponse(
  `PUT`,
  `your/sub/path`,
  { type: `empty` },
  { queryParameterKey: `Query Parameter Value` },
  null,
  ["200"],
);

await request.withoutResponse(
  `PUT`,
  `your/sub/path`,
  { type: `json`, value: `Example Content` },
  { queryParameterKey: `Query Parameter Value` },
  null,
  ["200"],
);

await request.withoutResponse(
  `PUT`,
  `your/sub/path`,
  { type: `file`, fileUri: `your/file/path` },
  { queryParameterKey: `Query Parameter Value` },
  null,
  ["200"],
);

const value: {
  readonly statusCode: `200`;
  readonly value: T;
} = await request.returningJson<{
  readonly "200": T;
}>(
  `PUT`,
  `your/sub/path`,
  { type: `empty` },
  { queryParameterKey: `Query Parameter Value` },
  null,
  ["200"],
);

const value: T = await request.returningJson<T>(
  `PUT`,
  `your/sub/path`,
  { type: `json`, value: `Example Content` },
  { queryParameterKey: `Query Parameter Value` },
  null,
  ["200"],
);

await request.returningFile(
  `GET`,
  `your/sub/path`,
  { type: `empty` },
  { queryParameterKey: `Query Parameter Value` },
  null,
  `your-file-path`,
  ["200"],
);
```
