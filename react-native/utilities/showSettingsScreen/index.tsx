import { Platform, Linking } from "react-native";
import * as IntentLauncher from "expo-intent-launcher";
import Constants from "expo-constants";

/**
 * Shows the settings screen for the current application.  Only available on iOS
 * and Android.
 */
export const showSettingsScreen = async () => {
  switch (Platform.OS) {
    case `ios`:
      Linking.openURL(`app-settings:`);
      break;

    case `android`: {
      let packageName: string;

      if (Constants.manifest === undefined || Constants.manifest === null) {
        throw new Error(
          `Unable to show the settings screen as the manifest is unavailable.`
        );
      } else {
        if (Constants.manifest.releaseChannel === undefined) {
          packageName = `host.exp.exponent`;
        } else {
          if (Constants.manifest.android === undefined) {
            throw new Error(
              `Unable to show the settings screen as the manifest's "android" object is unavailable.`
            );
          } else if (Constants.manifest.android.package === undefined) {
            throw new Error(
              `Unable to show the settings screen as the manifest's "android" object does not contain a package name.`
            );
          } else {
            packageName = Constants.manifest.android.package;
          }
        }
      }

      try {
        await IntentLauncher.startActivityAsync(
          IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS,
          {
            data: `package:${packageName}`,
          }
        );
      } catch (e) {
        await IntentLauncher.startActivityAsync(
          IntentLauncher.ActivityAction.APPLICATION_SETTINGS,
          {
            data: `package:${packageName}`,
          }
        );
      }
      break;
    }

    default:
      throw new Error(`The settings screen is not available on this platform.`);
  }
};
