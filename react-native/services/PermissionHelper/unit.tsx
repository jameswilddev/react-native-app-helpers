import { showSettingsScreen } from "../../..";
import { PermissionHelper } from "../../..";
const Permissions = jest.requireMock(`expo-permissions`);

test(`executes the success callback when permissions are granted`, async () => {
  Permissions.askAsync.mockResolvedValue({ granted: true });

  const onFailure = jest.fn().mockResolvedValue(undefined);
  const onSuccess = jest.fn().mockResolvedValue(undefined);

  const permissionHelper = new PermissionHelper();

  await permissionHelper.acquire(
    [`locationForeground`, `motion`, `notifications`],
    onFailure,
    onSuccess
  );

  expect(Permissions.askAsync).toBeCalledTimes(1);
  expect(Permissions.askAsync).toBeCalledWith(
    `locationForeground`,
    `motion`,
    `notifications`
  );
  expect(onFailure).not.toHaveBeenCalled();
  expect(onSuccess).toBeCalledTimes(1);
});

test(`executes the failure callback when permissions are denied`, async () => {
  Permissions.askAsync.mockResolvedValue({ granted: false });

  const onFailure = jest.fn().mockResolvedValue(undefined);
  const onSuccess = jest.fn().mockResolvedValue(undefined);

  const permissionHelper = new PermissionHelper();

  await permissionHelper.acquire(
    [`locationForeground`, `motion`, `notifications`],
    onFailure,
    onSuccess
  );

  expect(Permissions.askAsync).toBeCalledTimes(1);
  expect(Permissions.askAsync).toBeCalledWith(
    `locationForeground`,
    `motion`,
    `notifications`
  );
  expect(onFailure).toBeCalledTimes(1);
  expect(onFailure).toBeCalledWith(showSettingsScreen);
  expect(onSuccess).not.toHaveBeenCalled();
});
