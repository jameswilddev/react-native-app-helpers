# `react-native-app-helpers/SvgIcon`

Represents a SVG icon imported using react-native-svg-transformer.  A fill color
override is available.

## Usage

```tsx
import * as React from "react";
import type { SvgIcon } from "react-native-app-helpers";

const example: React.FunctionComponent<{
  readonly icon: SvgIcon;
}> = ({ icon }) => React.createElement(icon, { fill: `red` });
```
