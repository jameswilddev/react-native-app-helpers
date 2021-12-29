# `react-native-app-helpers/SvgIcon`

The style of a particular status of a status pill.

## Usage

```tsx
import * as React from "react";
import type { StatusPillStyleStatus } from "react-native-app-helpers";

const example: StatusPillStyleStatus = {
  fontFamily: `Example Font Family`,
  fontSize: 12,
  padding: 2,
  statuses: {
    exampleStatusA: {
      label: `Example Status A`,
      color: `red`,
      background: `purple`,
    },
    exampleStatusB: {
      label: `Example Status B`,
      color: `yellow`,
      background: `orange`,
    },
    exampleStatusC: {
      label: `Example Status C`,
      color: `green`,
      background: `cyan`,
    },
  },
};
```
