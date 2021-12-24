# `react-native-app-helpers/Request`

Allows HTTP/S requests to be made for JSON and files relative to a base URL.

## Usage

```tsx
import { Request } from "react-native-app-helpers";

const request = new Request(
  `https://your-base-url.com/with/optional/paths`,
  30000,
  () => `BEARER your-authorization-header`,
);

await request.withoutResponse(
  `PUT`,
  `your/sub/path`,
  { type: `empty` },
  { queryParameterKey: `Query Parameter Value` },
  null,
);

await request.withoutResponse(
  `PUT`,
  `your/sub/path`,
  { type: `json`, value: `Example Content` },
  { queryParameterKey: `Query Parameter Value` },
  null,
);

await request.withoutResponse(
  `PUT`,
  `your/sub/path`,
  { type: `file`, fileUri: `your/file/path` },
  { queryParameterKey: `Query Parameter Value` },
  null,
);

const value: T = await request.returningJson<T>(
  `PUT`,
  `your/sub/path`,
  { type: `empty` },
  { queryParameterKey: `Query Parameter Value` },
  null,
);

const value: T = await request.returningJson<T>(
  `PUT`,
  `your/sub/path`,
  { type: `json`, value: `Example Content` },
  { queryParameterKey: `Query Parameter Value` },
  null,
);

await request.returningFile(
  `GET`,
  `your/sub/path`,
  { type: `empty` },
  { queryParameterKey: `Query Parameter Value` },
  null,
  `your-file-path
);
```
