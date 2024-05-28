# `react-native-app-helpers/PermissionHelper`

Provides helpers for working with permissions.

## Usage

```tsx
import * as ImagePicker from "expo-image-picker";
import type { PermissionHelper } from "react-native-app-helpers";

const permissionHelper = new PermissionHelper();

await permissionHelper.acquire(
  [ImagePicker.requestCameraPermissionsAsync, ImagePicker.requestMediaLibraryPermissionsAsync],
  async (showSettingsScreen) => {
    console.log(`Redirecting to settings screen for privacy settings as permissions were denied...`);
    await showSettingsScreen();
  },
  async () => {
    console.log(`Permissions were granted.`);
  },
);
```
