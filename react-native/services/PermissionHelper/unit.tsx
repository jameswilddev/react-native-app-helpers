import { showSettingsScreen, PermissionHelper } from '../../..'

test('executes the success callback when permissions are granted', async () => {
  const onFailure = jest.fn().mockResolvedValue(undefined)
  const onSuccess = jest.fn().mockResolvedValue(undefined)

  const firstPermission = jest.fn().mockResolvedValue({ granted: true })
  const secondPermission = jest.fn().mockResolvedValue({ granted: true })
  const thirdPermission = jest.fn().mockResolvedValue({ granted: true })

  const permissionHelper = new PermissionHelper()

  await permissionHelper.acquire(
    [firstPermission, secondPermission, thirdPermission],
    onFailure,
    onSuccess
  )

  expect(firstPermission).toHaveBeenCalledTimes(1)
  expect(secondPermission).toHaveBeenCalledTimes(1)
  expect(thirdPermission).toHaveBeenCalledTimes(1)
  expect(onFailure).not.toHaveBeenCalled()
  expect(onSuccess).toBeCalledTimes(1)
})

test('executes the failure callback when permissions are denied', async () => {
  const onFailure = jest.fn().mockResolvedValue(undefined)
  const onSuccess = jest.fn().mockResolvedValue(undefined)

  const firstPermission = jest.fn().mockResolvedValue({ granted: true })
  const secondPermission = jest.fn().mockResolvedValue({ granted: false })
  const thirdPermission = jest.fn()

  const permissionHelper = new PermissionHelper()

  await permissionHelper.acquire(
    [firstPermission, secondPermission, thirdPermission],
    onFailure,
    onSuccess
  )

  expect(firstPermission).toHaveBeenCalledTimes(1)
  expect(secondPermission).toHaveBeenCalledTimes(1)
  expect(thirdPermission).not.toHaveBeenCalled()
  expect(onFailure).toBeCalledTimes(1)
  expect(onFailure).toBeCalledWith(showSettingsScreen)
  expect(onSuccess).not.toHaveBeenCalled()
})
