# `react-native-app-helpers/PictureHelper`

Provides helpers for working with pictures.

## Usage

```tsx
import type { PictureHelper } from "react-native-app-helpers";

const pictureHelper = new PictureHelper(fileStore, permissionHelper);

// Do NOT save to media library.
await permissionHelper.takePicture(
  false,
  async (showSettingsScreen) => {
    console.log(`Redirecting to settings screen for privacy settings as permissions were denied...`);
    await showSettingsScreen();
  },
  async () => {
    console.log(`The user cancelled.`);
  },
  async (uuid) => {
    console.log(`Imported into the file store as "${uuid}".`);
  },
);

// DO save to media library.
await permissionHelper.takePicture(
  true,
  async (showSettingsScreen) => {
    console.log(`Redirecting to settings screen for privacy settings as permissions were denied...`);
    await showSettingsScreen();
  },
  async () => {
    console.log(`The user cancelled.`);
  },
  async (uuid) => {
    console.log(`Imported into the file store as "${uuid}".`);
  },
);

await permissionHelper.selectOnePictureFromMediaLibrary(
  async (showSettingsScreen) => {
    console.log(`Redirecting to settings screen for privacy settings as permissions were denied...`);
    await showSettingsScreen();
  },
  async () => {
    console.log(`The user cancelled.`);
  },
  async (uuid) => {
    console.log(`Imported into the file store as "${uuid}".`);
  },
);

await permissionHelper.selectMultiplePicturesFromMediaLibrary(
  async (showSettingsScreen) => {
    console.log(`Redirecting to settings screen for privacy settings as permissions were denied...`);
    await showSettingsScreen();
  },
  async () => {
    console.log(`The user cancelled.`);
  },
  async (uuids) => {
    console.log(`Imported into the file store as "${uuids.join(`, `)}".`);
  },
);
```
