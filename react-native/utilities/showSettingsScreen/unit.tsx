import { Platform } from "react-native";
import { showSettingsScreen } from "../../..";

const Constants = jest.requireMock(`expo-constants`);
const Linking = jest.requireMock(`react-native/Libraries/Linking/Linking`);
const IntentLauncher = jest.requireMock(`expo-intent-launcher`);

const withPlatformOs = async (
  os: string,
  callback: () => Promise<void>
): Promise<void> => {
  const platform = Platform as unknown as { OS: string };

  const originalOs = platform.OS;

  try {
    platform.OS = os;

    await callback();
  } finally {
    platform.OS = originalOs;
  }
};

test(`ios uses linking`, async () => {
  await withPlatformOs(`ios`, async () => {
    await showSettingsScreen();

    expect(Linking.openURL).toBeCalledTimes(1);
    expect(Linking.openURL).toBeCalledWith(`app-settings:`);
    expect(IntentLauncher.startActivityAsync).not.toHaveBeenCalled();
  });
});

test(`android throws an exception when the manifest is undefined`, async () => {
  await withPlatformOs(`android`, async () => {
    await expect(showSettingsScreen()).rejects.toEqual(
      new Error(
        `Unable to show the settings screen as the manifest is unavailable.`
      )
    );

    expect(Linking.openURL).not.toHaveBeenCalled();
    expect(IntentLauncher.startActivityAsync).not.toHaveBeenCalled();
  });
});

test(`android throws an exception when the manifest is null`, async () => {
  await withPlatformOs(`android`, async () => {
    Constants.manifest = null;

    await expect(showSettingsScreen()).rejects.toEqual(
      new Error(
        `Unable to show the settings screen as the manifest is unavailable.`
      )
    );

    expect(Linking.openURL).not.toHaveBeenCalled();
    expect(IntentLauncher.startActivityAsync).not.toHaveBeenCalled();
  });
});

test(`android can use the application details screen during development`, async () => {
  await withPlatformOs(`android`, async () => {
    Constants.manifest = {};
    IntentLauncher.startActivityAsync.mockResolvedValue();

    await showSettingsScreen();

    expect(Linking.openURL).not.toHaveBeenCalled();
    expect(IntentLauncher.startActivityAsync).toHaveBeenCalledTimes(1);
    expect(IntentLauncher.startActivityAsync).toHaveBeenCalledWith(
      `Example Application Details Settings`,
      {
        data: `package:host.exp.exponent`,
      }
    );
  });
});

test(`android can use the application screen during development`, async () => {
  await withPlatformOs(`android`, async () => {
    Constants.manifest = {};
    IntentLauncher.startActivityAsync
      .mockRejectedValueOnce()
      .mockResolvedValue();

    await showSettingsScreen();

    expect(Linking.openURL).not.toHaveBeenCalled();
    expect(IntentLauncher.startActivityAsync).toHaveBeenCalledTimes(2);
    expect(IntentLauncher.startActivityAsync).toHaveBeenCalledWith(
      `Example Application Details Settings`,
      {
        data: `package:host.exp.exponent`,
      }
    );
    expect(IntentLauncher.startActivityAsync).toHaveBeenCalledWith(
      `Example Application Settings`,
      {
        data: `package:host.exp.exponent`,
      }
    );
  });
});

test(`android throws an exception when the manifest lacks the android object`, async () => {
  await withPlatformOs(`android`, async () => {
    Constants.manifest = {
      releaseChannel: `Example Release Channel`,
    };

    await expect(showSettingsScreen()).rejects.toEqual(
      new Error(
        `Unable to show the settings screen as the manifest's "android" object is unavailable.`
      )
    );

    expect(Linking.openURL).not.toHaveBeenCalled();
    expect(IntentLauncher.startActivityAsync).not.toHaveBeenCalled();
  });
});

test(`android throws an exception when the manifest lacks a package name`, async () => {
  await withPlatformOs(`android`, async () => {
    Constants.manifest = {
      releaseChannel: `Example Release Channel`,
      android: {},
    };

    await expect(showSettingsScreen()).rejects.toEqual(
      new Error(
        `Unable to show the settings screen as the manifest's "android" object does not contain a package name.`
      )
    );

    expect(Linking.openURL).not.toHaveBeenCalled();
    expect(IntentLauncher.startActivityAsync).not.toHaveBeenCalled();
  });
});

test(`android can use the application details screen in production`, async () => {
  await withPlatformOs(`android`, async () => {
    Constants.manifest = {
      releaseChannel: `Example Release Channel`,
      android: {
        package: `Example Package`,
      },
    };
    IntentLauncher.startActivityAsync.mockResolvedValue();

    await showSettingsScreen();

    expect(Linking.openURL).not.toHaveBeenCalled();
    expect(IntentLauncher.startActivityAsync).toHaveBeenCalledTimes(1);
    expect(IntentLauncher.startActivityAsync).toHaveBeenCalledWith(
      `Example Application Details Settings`,
      {
        data: `package:Example Package`,
      }
    );
  });
});

test(`android can use the application screen in production`, async () => {
  await withPlatformOs(`android`, async () => {
    Constants.manifest = {
      releaseChannel: `Example Release Channel`,
      android: {
        package: `Example Package`,
      },
    };
    IntentLauncher.startActivityAsync
      .mockRejectedValueOnce()
      .mockResolvedValue();

    await showSettingsScreen();

    expect(Linking.openURL).not.toHaveBeenCalled();
    expect(IntentLauncher.startActivityAsync).toHaveBeenCalledTimes(2);
    expect(IntentLauncher.startActivityAsync).toHaveBeenCalledWith(
      `Example Application Details Settings`,
      {
        data: `package:Example Package`,
      }
    );
    expect(IntentLauncher.startActivityAsync).toHaveBeenCalledWith(
      `Example Application Settings`,
      {
        data: `package:Example Package`,
      }
    );
  });
});

test(`web throws an exception`, async () => {
  await withPlatformOs(`web`, async () => {
    await expect(showSettingsScreen()).rejects.toEqual(
      new Error(`The settings screen is not available on this platform.`)
    );

    expect(Linking.openURL).not.toHaveBeenCalled();
    expect(IntentLauncher.startActivityAsync).not.toHaveBeenCalled();
  });
});

test(`windows throws an exception`, async () => {
  await withPlatformOs(`windows`, async () => {
    await expect(showSettingsScreen()).rejects.toEqual(
      new Error(`The settings screen is not available on this platform.`)
    );

    expect(Linking.openURL).not.toHaveBeenCalled();
    expect(IntentLauncher.startActivityAsync).not.toHaveBeenCalled();
  });
});

test(`macos throws an exception`, async () => {
  await withPlatformOs(`macos`, async () => {
    await expect(showSettingsScreen()).rejects.toEqual(
      new Error(`The settings screen is not available on this platform.`)
    );

    expect(Linking.openURL).not.toHaveBeenCalled();
    expect(IntentLauncher.startActivityAsync).not.toHaveBeenCalled();
  });
});
