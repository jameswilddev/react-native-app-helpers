import { SyncController, type LoggerInterface, type SyncInterface, type ErrorReporterInterface, type AbortControllerFactoryInterface } from '../../..'

interface TestSchema {
  readonly singletons: Record<never, never>
  readonly collections: Record<never, never>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TestAdditionalCollectionData = {
  readonly testAdditionalCollectionDataKey: string
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TestAdditionalCollectionItemData = {
  readonly testAdditionalCollectionDataItemKey: string
}

test('does nothing', () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn()
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn()
  }

  // eslint-disable-next-line no-new
  new SyncController(sync, logger, errorReporter, abortControllerFactory)

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).not.toHaveBeenCalled()
  expect(abortControllerFactory.create).not.toHaveBeenCalled()

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).not.toHaveBeenCalled()
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()
})

test('does nothing after resume', () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn()
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn()
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)

  syncController.resume()

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).not.toHaveBeenCalled()
  expect(abortControllerFactory.create).not.toHaveBeenCalled()

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller has resumed.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()
})

test('can be paused after resuming', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn()
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn()
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)

  syncController.resume();

  (logger.information as jest.Mock).mockClear()

  await syncController.pause()

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).not.toHaveBeenCalled()
  expect(abortControllerFactory.create).not.toHaveBeenCalled()

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller has paused.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()
})

test('does nothing after resuming twice', () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn()
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn()
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)

  syncController.resume()
  syncController.resume()

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).not.toHaveBeenCalled()
  expect(abortControllerFactory.create).not.toHaveBeenCalled()

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller has resumed.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()
})

test('does nothing when running without resuming', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn()
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn()
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)

  const promise = syncController.run()

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).not.toHaveBeenCalled()
  expect(abortControllerFactory.create).not.toHaveBeenCalled()

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).not.toHaveBeenCalled()
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  await expect(promise).resolves.toEqual('noChangesMade')
})

test('throws when requesting the cancellation of a paused sync controller', () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn()
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn()
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)

  expect(() => { syncController.requestCancel() }).toThrowError('Unable to cancel a paused sync controller.')

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).not.toHaveBeenCalled()
  expect(abortControllerFactory.create).not.toHaveBeenCalled()

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).not.toHaveBeenCalled()
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()
})

test('throws when requesting the cancellation of a pausing sync controller', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      const output = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

      return await output
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const promise = syncController.run();
  (logger.information as jest.Mock).mockReset()

  const pausePromise = syncController.pause()

  expect(() => { syncController.requestCancel() }).toThrowError('Unable to cancel a pausing sync controller.')

  let resolved = false
  let rejected = false
  promise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  pausePromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller is waiting for previous run to cancel for a pause...')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})

test('can start pausing while running', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      const output = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

      return await output
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const promise = syncController.run();
  (logger.information as jest.Mock).mockReset()

  const pausePromise = syncController.pause()

  let resolved = false
  let rejected = false
  promise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  pausePromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller is waiting for previous run to cancel for a pause...')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})

test('can complete pausing after a successful run where no changes were made', async () => {
  let runResolve: ((value: 'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade') => void)
  const runPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((resolve) => {
    runResolve = resolve
  })
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn().mockReturnValue(runPromise)
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const promise = syncController.run()
  const pausePromise = syncController.pause();
  (logger.information as jest.Mock).mockReset()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  runResolve!('noChangesMade')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller run was interrupted by pause.')
  expect(logger.information).toHaveBeenCalledWith('Sync controller has paused.')
  expect(logger.information).toHaveBeenCalledTimes(2)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  await expect(promise).resolves.toEqual('failed')
  await expect(pausePromise).resolves.not.toThrow()
})

test('can complete pausing after a successful run where another run was required', async () => {
  let runResolve: ((value: 'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade') => void)
  const runPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((resolve) => {
    runResolve = resolve
  })
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn().mockReturnValue(runPromise)
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const promise = syncController.run()
  const pausePromise = syncController.pause();
  (logger.information as jest.Mock).mockReset()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  runResolve!('needsToRunAgain')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller run was interrupted by pause.')
  expect(logger.information).toHaveBeenCalledWith('Sync controller has paused.')
  expect(logger.information).toHaveBeenCalledTimes(2)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  await expect(promise).resolves.toEqual('failed')
  await expect(pausePromise).resolves.not.toThrow()
})

test('can complete pausing after a successful run where at least one change was made', async () => {
  let runResolve: ((value: 'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade') => void)
  const runPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((resolve) => {
    runResolve = resolve
  })
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn().mockReturnValue(runPromise)
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const promise = syncController.run()
  const pausePromise = syncController.pause();
  (logger.information as jest.Mock).mockReset()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  runResolve!('atLeastOneChangeMade')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller run was interrupted by pause.')
  expect(logger.information).toHaveBeenCalledWith('Sync controller has paused.')
  expect(logger.information).toHaveBeenCalledTimes(2)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  await expect(promise).resolves.toEqual('failed')
  await expect(pausePromise).resolves.not.toThrow()
})

test('can complete pausing after an unsuccessful run', async () => {
  let runReject: ((reason?: any) => void)
  const runPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((_resolve, reject) => {
    runReject = reject
  })
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn().mockReturnValue(runPromise)
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const promise = syncController.run()
  const pausePromise = syncController.pause();
  (logger.information as jest.Mock).mockReset()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  runReject!('Test Reason')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller run was interrupted by pause.')
  expect(logger.information).toHaveBeenCalledWith('Sync controller has paused.')
  expect(logger.information).toHaveBeenCalledTimes(2)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).toHaveBeenCalledWith('Test Reason')
  expect(errorReporter.report).toHaveBeenCalledTimes(1)

  await expect(promise).resolves.toEqual('failed')
  await expect(pausePromise).resolves.not.toThrow()
})

test('can start running once resumed', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      const output = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

      return await output
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume();
  (logger.information as jest.Mock).mockReset()

  const promise = syncController.run()

  let resolved = false
  let rejected = false
  promise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).not.toHaveBeenCalled()

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller is starting a new sync.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})

test('can fail to run once resumed', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn().mockRejectedValue('Test Reason')
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume();
  (logger.information as jest.Mock).mockReset()

  const promise = syncController.run()

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).not.toHaveBeenCalled()

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller is starting a new sync.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  await expect(promise).resolves.toEqual('failed')
})

test('can successfully run with no changes made once resumed', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn().mockResolvedValue('noChangesMade')
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume();
  (logger.information as jest.Mock).mockReset()

  const promise = syncController.run()

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).not.toHaveBeenCalled()

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller is starting a new sync.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  await expect(promise).resolves.toEqual('noChangesMade')
})

test('can successfully run and need to run again once resumed', async () => {
  let invocations = 0

  let runResolve: ((value: 'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade') => void)
  const runPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((resolve) => {
    runResolve = resolve
  })

  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      switch (invocations++) {
        case 0:
          return await runPromise

        case 1:
          return await new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

        default:
          fail(`Unexpected ${invocations - 1} invocations`)
      }
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const firstAbortSignal = {}
  const firstAbortController = {
    signal: firstAbortSignal,
    abort: jest.fn()
  }
  const secondAbortSignal = {}
  const secondAbortController = {
    signal: firstAbortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValueOnce(firstAbortController).mockReturnValueOnce(secondAbortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()

  const promise = syncController.run()

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  });

  (logger.information as jest.Mock).mockReset()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  runResolve!('needsToRunAgain')

  let resolved = false
  let rejected = false
  promise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(2)
  expect(sync.run).toHaveBeenCalledWith(firstAbortSignal)
  expect(firstAbortController.abort).not.toHaveBeenCalled()
  expect(secondAbortController.abort).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledWith(secondAbortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(2)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller run interrupted as needs to restart.')
  expect(logger.information).toHaveBeenCalledWith('Sync controller is starting a new sync.')
  expect(logger.information).toHaveBeenCalledTimes(2)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})

test('can successfully run and need to run again to completion once resumed', async () => {
  let invocations = 0

  let firstRunResolve: ((value: 'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade') => void)
  const firstRunPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((resolve) => {
    firstRunResolve = resolve
  })

  let secondRunResolve: ((value: 'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade') => void)
  const secondRunPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((resolve) => {
    secondRunResolve = resolve
  })

  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      switch (invocations++) {
        case 0:
          return await firstRunPromise

        case 1:
          return await secondRunPromise

        default:
          fail(`Unexpected ${invocations - 1} invocations`)
      }
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const firstAbortSignal = {}
  const firstAbortController = {
    signal: firstAbortSignal,
    abort: jest.fn()
  }
  const secondAbortSignal = {}
  const secondAbortController = {
    signal: firstAbortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValueOnce(firstAbortController).mockReturnValueOnce(secondAbortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()

  const promise = syncController.run()

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  firstRunResolve!('needsToRunAgain')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  });

  (logger.information as jest.Mock).mockReset()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  secondRunResolve!('noChangesMade')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(2)
  expect(sync.run).toHaveBeenCalledWith(firstAbortSignal)
  expect(firstAbortController.abort).not.toHaveBeenCalled()
  expect(secondAbortController.abort).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledWith(secondAbortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(2)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller run completed without interruption.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  await expect(promise).resolves.toEqual('noChangesMade')
})

test('can successfully run with at least one change made once resumed', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn().mockResolvedValue('atLeastOneChangeMade')
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume();
  (logger.information as jest.Mock).mockReset()

  const promise = syncController.run()

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).not.toHaveBeenCalled()

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller is starting a new sync.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  await expect(promise).resolves.toEqual('atLeastOneChangeMade')
})

test('does nothing after requesting cancellation', () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn()
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn()
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume();
  (logger.information as jest.Mock).mockReset()

  syncController.requestCancel()

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).not.toHaveBeenCalled()
  expect(abortControllerFactory.create).not.toHaveBeenCalled()

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Ignoring request to cancel an idle sync controller.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()
})

test('throws when requesting the pause of a pausing sync controller', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      const output = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

      return await output
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const promise = syncController.run();
  (logger.information as jest.Mock).mockReset()

  const pausePromise = syncController.pause()

  await expect(syncController.pause()).rejects.toThrowError('Unable to pause a pausing sync controller.')

  let resolved = false
  let rejected = false
  promise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  pausePromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller is waiting for previous run to cancel for a pause...')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})

test('throws when requesting the pause of a paused sync controller', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      const output = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

      return await output
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn()
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)

  await expect(syncController.pause()).rejects.toThrowError('Unable to pause a paused sync controller.')

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).not.toHaveBeenCalled()
  expect(abortControllerFactory.create).not.toHaveBeenCalled()

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).not.toHaveBeenCalled()
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()
})

test('can start pausing while running', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      const output = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

      return await output
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const promise = syncController.run();
  (logger.information as jest.Mock).mockReset()

  const pausePromise = syncController.pause()

  let resolved = false
  let rejected = false
  promise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  pausePromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller is waiting for previous run to cancel for a pause...')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})

test('can start cancelling while running', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      const output = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

      return await output
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const promise = syncController.run();
  (logger.information as jest.Mock).mockReset()

  syncController.requestCancel()

  let resolved = false
  let rejected = false
  promise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller is attempting to cancel sync.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})

test('can restart while cancelling', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      const output = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

      return await output
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const firstPromise = syncController.run()

  syncController.requestCancel();

  (logger.information as jest.Mock).mockReset()

  const secondPromise = syncController.run()

  let resolved = false
  let rejected = false
  firstPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  secondPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller is restarting the process as a run was requested while cancelling...')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})

test('can queue a restart', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      const output = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

      return await output
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const firstPromise = syncController.run();

  (logger.information as jest.Mock).mockReset()

  const secondPromise = syncController.run()

  let resolved = false
  let rejected = false
  firstPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  secondPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller is restarting the process as a run was requested while running...')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})

test('can queue multiple restarts', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      const output = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

      return await output
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const firstPromise = syncController.run()
  const secondPromise = syncController.run();

  (logger.information as jest.Mock).mockReset()

  const thirdPromise = syncController.run()

  let resolved = false
  let rejected = false
  firstPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  secondPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  thirdPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller is awaiting a previously enqueued restart...')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})

test('can begin a restart', async () => {
  let invocations = 0

  let firstRunResolve: ((value: 'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade') => void)
  const firstRunPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((resolve) => {
    firstRunResolve = resolve
  })

  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      switch (invocations++) {
        case 0:
          return await firstRunPromise

        case 1:
          return await new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

        default:
          fail(`Unexpected ${invocations - 1} invocations`)
      }
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const firstAbortSignal = {}
  const firstAbortController = {
    signal: firstAbortSignal,
    abort: jest.fn()
  }
  const secondAbortSignal = {}
  const secondAbortController = {
    signal: firstAbortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValueOnce(firstAbortController).mockReturnValueOnce(secondAbortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const firstPromise = syncController.run()
  const secondPromise = syncController.run();

  (logger.information as jest.Mock).mockReset()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  firstRunResolve!('atLeastOneChangeMade')

  let resolved = false
  let rejected = false
  firstPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  secondPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(2)
  expect(sync.run).toHaveBeenCalledWith(firstAbortSignal)
  expect(firstAbortController.abort).toBeCalledTimes(1)
  expect(secondAbortController.abort).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledWith(secondAbortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(2)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller run interrupted for restart.')
  expect(logger.information).toHaveBeenCalledWith('Sync controller is starting a new sync.')
  expect(logger.information).toHaveBeenCalledTimes(2)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})

test('can complete a restart', async () => {
  let invocations = 0

  let firstRunResolve: ((value: 'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade') => void)
  const firstRunPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((resolve) => {
    firstRunResolve = resolve
  })

  let secondRunResolve: ((value: 'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade') => void)
  const secondRunPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((resolve) => {
    secondRunResolve = resolve
  })

  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      switch (invocations++) {
        case 0:
          return await firstRunPromise

        case 1:
          return await secondRunPromise

        default:
          fail(`Unexpected ${invocations - 1} invocations`)
      }
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const firstAbortSignal = {}
  const firstAbortController = {
    signal: firstAbortSignal,
    abort: jest.fn()
  }
  const secondAbortSignal = {}
  const secondAbortController = {
    signal: firstAbortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValueOnce(firstAbortController).mockReturnValueOnce(secondAbortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const firstPromise = syncController.run()
  const secondPromise = syncController.run()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  firstRunResolve!('atLeastOneChangeMade')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  });

  (logger.information as jest.Mock).mockReset()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  secondRunResolve!('noChangesMade')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(2)
  expect(sync.run).toHaveBeenCalledWith(firstAbortSignal)
  expect(firstAbortController.abort).toBeCalledTimes(1)
  expect(secondAbortController.abort).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledWith(secondAbortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(2)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller run completed without interruption.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  await expect(firstPromise).resolves.toEqual('noChangesMade')
  await expect(secondPromise).resolves.toEqual('noChangesMade')
})

test('can begin multiple restarts', async () => {
  let invocations = 0

  let firstRunResolve: ((value: 'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade') => void)
  const firstRunPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((resolve) => {
    firstRunResolve = resolve
  })

  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      switch (invocations++) {
        case 0:
          return await firstRunPromise

        case 1:
          return await new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

        default:
          fail(`Unexpected ${invocations - 1} invocations`)
      }
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const firstAbortSignal = {}
  const firstAbortController = {
    signal: firstAbortSignal,
    abort: jest.fn()
  }
  const secondAbortSignal = {}
  const secondAbortController = {
    signal: firstAbortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValueOnce(firstAbortController).mockReturnValueOnce(secondAbortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const firstPromise = syncController.run()
  const secondPromise = syncController.run()
  const thirdPromise = syncController.run();

  (logger.information as jest.Mock).mockReset()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  firstRunResolve!('atLeastOneChangeMade')

  let resolved = false
  let rejected = false
  firstPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  secondPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  thirdPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(2)
  expect(sync.run).toHaveBeenCalledWith(firstAbortSignal)
  expect(firstAbortController.abort).toBeCalledTimes(1)
  expect(secondAbortController.abort).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledWith(secondAbortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(2)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller run interrupted for restart.')
  expect(logger.information).toHaveBeenCalledWith('Sync controller is starting a new sync.')
  expect(logger.information).toHaveBeenCalledTimes(2)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})

test('can complete multiple restarts', async () => {
  let invocations = 0

  let firstRunResolve: ((value: 'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade') => void)
  const firstRunPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((resolve) => {
    firstRunResolve = resolve
  })

  let secondRunResolve: ((value: 'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade') => void)
  const secondRunPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((resolve) => {
    secondRunResolve = resolve
  })

  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      switch (invocations++) {
        case 0:
          return await firstRunPromise

        case 1:
          return await secondRunPromise

        default:
          fail(`Unexpected ${invocations - 1} invocations`)
      }
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const firstAbortSignal = {}
  const firstAbortController = {
    signal: firstAbortSignal,
    abort: jest.fn()
  }
  const secondAbortSignal = {}
  const secondAbortController = {
    signal: firstAbortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValueOnce(firstAbortController).mockReturnValueOnce(secondAbortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const firstPromise = syncController.run()
  const secondPromise = syncController.run()
  const thirdPromise = syncController.run()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  firstRunResolve!('atLeastOneChangeMade')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  });

  (logger.information as jest.Mock).mockReset()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  secondRunResolve!('noChangesMade')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(2)
  expect(sync.run).toHaveBeenCalledWith(firstAbortSignal)
  expect(firstAbortController.abort).toBeCalledTimes(1)
  expect(secondAbortController.abort).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledWith(secondAbortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(2)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller run completed without interruption.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  await expect(firstPromise).resolves.toEqual('noChangesMade')
  await expect(secondPromise).resolves.toEqual('noChangesMade')
  await expect(thirdPromise).resolves.toEqual('noChangesMade')
})

test('can queue a restart then request cancellation', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      const output = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

      return await output
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const firstPromise = syncController.run()
  const secondPromise = syncController.run();

  (logger.information as jest.Mock).mockReset()

  syncController.requestCancel()

  let resolved = false
  let rejected = false
  firstPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  secondPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller will now cancel rather than restart.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})

test('can complete a cancellation', async () => {
  let firstRunResolve: ((value: 'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade') => void)
  const firstRunPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((resolve) => {
    firstRunResolve = resolve
  })

  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn().mockReturnValue(firstRunPromise)
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const firstPromise = syncController.run()
  const secondPromise = syncController.run()
  syncController.requestCancel();

  (logger.information as jest.Mock).mockReset()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  firstRunResolve!('atLeastOneChangeMade')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller run interrupted for cancellation.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  await expect(firstPromise).resolves.toEqual('failed')
  await expect(secondPromise).resolves.toEqual('failed')
})

test('can complete a cancellation of a restart', async () => {
  let firstRunResolve: ((value: 'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade') => void)
  const firstRunPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((resolve) => {
    firstRunResolve = resolve
  })

  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn().mockReturnValue(firstRunPromise)
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const firstPromise = syncController.run()
  const secondPromise = syncController.run()
  syncController.requestCancel();

  (logger.information as jest.Mock).mockReset()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  firstRunResolve!('atLeastOneChangeMade')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller run interrupted for cancellation.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  await expect(firstPromise).resolves.toEqual('failed')
  await expect(secondPromise).resolves.toEqual('failed')
})

test('ignores duplicate cancellations', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      const output = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

      return await output
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const promise = syncController.run()

  syncController.requestCancel();
  (logger.information as jest.Mock).mockReset()

  syncController.requestCancel()

  let resolved = false
  let rejected = false
  promise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Ignoring request to cancel a sync controller which is already cancelling.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})

test('can start pausing a restart', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      const output = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

      return await output
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const firstPromise = syncController.run()
  const secondPromise = syncController.run();

  (logger.information as jest.Mock).mockReset()

  const pausePromise = syncController.pause()

  let resolved = false
  let rejected = false
  firstPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  secondPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  pausePromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller will now pause rather than restarting.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})

test('can complete a pause during a restart', async () => {
  let firstRunResolve: ((value: 'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade') => void)
  const firstRunPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((resolve) => {
    firstRunResolve = resolve
  })

  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn().mockReturnValue(firstRunPromise)
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const firstPromise = syncController.run()
  const secondPromise = syncController.run()
  const pausePromise = syncController.pause();

  (logger.information as jest.Mock).mockReset()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  firstRunResolve!('atLeastOneChangeMade')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller run was interrupted by pause.')
  expect(logger.information).toHaveBeenCalledWith('Sync controller has paused.')
  expect(logger.information).toHaveBeenCalledTimes(2)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  await expect(firstPromise).resolves.toEqual('failed')
  await expect(secondPromise).resolves.toEqual('failed')
  await expect(pausePromise).resolves.not.toThrow()
})

test('can start pausing a cancellation', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      const output = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

      return await output
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const firstPromise = syncController.run()
  syncController.requestCancel();

  (logger.information as jest.Mock).mockReset()

  const pausePromise = syncController.pause()

  let resolved = false
  let rejected = false
  firstPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  pausePromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller will now pause rather than cancelling.')
  expect(logger.information).toHaveBeenCalledTimes(1)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})

test('can complete a pause during a cancellation', async () => {
  let firstRunResolve: ((value: 'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade') => void)
  const firstRunPromise = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>((resolve) => {
    firstRunResolve = resolve
  })

  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn().mockReturnValue(firstRunPromise)
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const firstPromise = syncController.run()
  syncController.requestCancel()
  const pausePromise = syncController.pause();

  (logger.information as jest.Mock).mockReset()

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  firstRunResolve!('atLeastOneChangeMade')

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).toHaveBeenCalledWith('Sync controller run was interrupted by pause.')
  expect(logger.information).toHaveBeenCalledWith('Sync controller has paused.')
  expect(logger.information).toHaveBeenCalledTimes(2)
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  await expect(firstPromise).resolves.toEqual('failed')
  await expect(pausePromise).resolves.not.toThrow()
})

test('throws when resuming during a pause', async () => {
  const sync: SyncInterface<TestSchema, TestAdditionalCollectionData, TestAdditionalCollectionItemData> = {
    fileCleanUpBlockers: 1234,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    getState: jest.fn(),
    run: jest.fn(async () => {
      const output = new Promise<'noChangesMade' | 'needsToRunAgain' | 'atLeastOneChangeMade'>(() => {})

      return await output
    })
  }

  const logger: LoggerInterface = {
    error: jest.fn(),
    warning: jest.fn(),
    information: jest.fn(),
    debug: jest.fn()
  }

  const errorReporter: ErrorReporterInterface = {
    report: jest.fn()
  }

  const abortSignal = {}
  const abortController = {
    signal: abortSignal,
    abort: jest.fn()
  }
  const abortControllerFactory: AbortControllerFactoryInterface = {
    create: jest.fn().mockReturnValue(abortController)
  }

  const syncController = new SyncController(sync, logger, errorReporter, abortControllerFactory)
  syncController.resume()
  const firstPromise = syncController.run()
  syncController.requestCancel()
  const pausePromise = syncController.pause();

  (logger.information as jest.Mock).mockReset()
  expect(() => { syncController.resume() }).toThrowError('Unable to resume a pausing sync controller.')

  let resolved = false
  let rejected = false
  firstPromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  pausePromise.then(
    () => {
      resolved = true
    },
    () => {
      rejected = true
    }
  )
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100)
  })

  expect(sync.fileCleanUpBlockers).toEqual(1234)
  expect(sync.addListener).not.toHaveBeenCalled()
  expect(sync.removeListener).not.toHaveBeenCalled()
  expect(sync.getState).not.toHaveBeenCalled()
  expect(sync.run).toHaveBeenCalledTimes(1)
  expect(sync.run).toHaveBeenCalledWith(abortSignal)
  expect(abortControllerFactory.create).toBeCalledTimes(1)
  expect(abortController.abort).toHaveBeenCalledTimes(1)

  expect(logger.error).not.toHaveBeenCalled()
  expect(logger.warning).not.toHaveBeenCalled()
  expect(logger.information).not.toHaveBeenCalled()
  expect(logger.debug).not.toHaveBeenCalled()

  expect(errorReporter.report).not.toHaveBeenCalled()

  expect(resolved).toBeFalsy()
  expect(rejected).toBeFalsy()
})
