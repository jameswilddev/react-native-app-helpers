# `react-native-app-helpers/createStatusPillComponent`

Creates a new React component for showing a status in a "pill".

## Usage

```tsx
import React from "react";
import { StatusPill } from "react-native-app-helpers";

const StatusPill = createStatusPillComponent({
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
});

export default () => (
  <React.Fragment>
    <StatusPill status="exampleStatusB" />
  </React.Fragment>
);
```
