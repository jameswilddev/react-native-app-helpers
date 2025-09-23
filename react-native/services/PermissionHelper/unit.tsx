import { showSettingsScreen, PermissionHelper } from '../../..'

test('executes the success callback when permissions are granted', async () => {
  const onFailure = jest.fn().mockResolvedValue(undefined)
  const onSuccess = jest.fn().mockResolvedValue(undefined)

  const getFirstPermission = jest.fn().mockResolvedValue({ granted: false })
  const requestFirstPermission = jest.fn().mockResolvedValue({ granted: true })
  const getSecondPermission = jest.fn().mockResolvedValue({ granted: false })
  const requestSecondPermission = jest.fn().mockResolvedValue({ granted: true })
  const getThirdPermission = jest.fn().mockResolvedValue({ granted: false })
  const requestThirdPermission = jest.fn().mockResolvedValue({ granted: true })

  const permissionHelper = new PermissionHelper()

  await permissionHelper.acquire(
    [{
      get: getFirstPermission,
      request: requestFirstPermission
    }, {
      get: getSecondPermission,
      request: requestSecondPermission
    }, {
      get: getThirdPermission,
      request: requestThirdPermission
    }],
    onFailure,
    onSuccess
  )

  expect(getFirstPermission).toHaveBeenCalledTimes(1)
  expect(requestFirstPermission).toHaveBeenCalledTimes(1)
  expect(getSecondPermission).toHaveBeenCalledTimes(1)
  expect(requestSecondPermission).toHaveBeenCalledTimes(1)
  expect(getThirdPermission).toHaveBeenCalledTimes(1)
  expect(requestThirdPermission).toHaveBeenCalledTimes(1)
  expect(onFailure).not.toHaveBeenCalled()
  expect(onSuccess).toBeCalledTimes(1)
})

test('executes the failure callback when permissions are denied', async () => {
  const onFailure = jest.fn().mockResolvedValue(undefined)
  const onSuccess = jest.fn().mockResolvedValue(undefined)

  const getFirstPermission = jest.fn().mockResolvedValue({ granted: false })
  const requestFirstPermission = jest.fn().mockResolvedValue({ granted: true })
  const getSecondPermission = jest.fn().mockResolvedValue({ granted: false })
  const requestSecondPermission = jest.fn().mockResolvedValue({ granted: false })
  const getThirdPermission = jest.fn().mockResolvedValue({ granted: false })
  const requestThirdPermission = jest.fn()

  const permissionHelper = new PermissionHelper()

  await permissionHelper.acquire(
    [{
      get: getFirstPermission,
      request: requestFirstPermission
    }, {
      get: getSecondPermission,
      request: requestSecondPermission
    }, {
      get: getThirdPermission,
      request: requestThirdPermission
    }],
    onFailure,
    onSuccess
  )

  expect(getFirstPermission).toHaveBeenCalledTimes(1)
  expect(requestFirstPermission).toHaveBeenCalledTimes(1)
  expect(getSecondPermission).toHaveBeenCalledTimes(1)
  expect(requestSecondPermission).toHaveBeenCalledTimes(1)
  expect(getThirdPermission).not.toHaveBeenCalled()
  expect(requestThirdPermission).not.toHaveBeenCalled()
  expect(onFailure).toBeCalledTimes(1)
  expect(onFailure).toBeCalledWith(showSettingsScreen)
  expect(onSuccess).not.toHaveBeenCalled()
})
