# `react-native-app-helpers/PermissionHelper`

Provides helpers for working with permissions.

## Usage

```tsx
import * as Permissions from "expo-permissions";
import type { PermissionHelper } from "react-native-app-helpers";

const permissionHelper = new PermissionHelper();

await permissionHelper.acquire(
  [Permissions.CAMERA, Permissions.MEDIA_LIBRARY],
  async (showSettingsScreen) => {
    console.log(`Redirecting to settings screen for privacy settings as permissions were denied...`);
    await showSettingsScreen();
  },
  async () => {
    console.log(`Permissions were granted.`);
  },
);
```
