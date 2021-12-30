import { logger } from "../../..";

test(`error`, () => {
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalInfo = console.info;
  const originalDebug = console.debug;

  try {
    const log = jest.fn();
    const error = jest.fn();
    const warn = jest.fn();
    const info = jest.fn();
    const debug = jest.fn();
    console.log = log;
    console.error = error;
    console.warn = warn;
    console.info = info;
    console.debug = debug;

    logger.error(`Example Text`);

    expect(log).not.toHaveBeenCalled();
    expect(error).toBeCalledTimes(1);
    expect(error).toBeCalledWith(`Example Text`);
    expect(error.mock.instances[0]).toBe(console);
    expect(warn).not.toHaveBeenCalled();
    expect(info).not.toHaveBeenCalled();
    expect(debug).not.toHaveBeenCalled();
  } finally {
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
    console.info = originalInfo;
    console.debug = originalDebug;
  }
});

test(`warning`, () => {
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalInfo = console.info;
  const originalDebug = console.debug;

  try {
    const log = jest.fn();
    const error = jest.fn();
    const warn = jest.fn();
    const info = jest.fn();
    const debug = jest.fn();
    console.log = log;
    console.error = error;
    console.warn = warn;
    console.info = info;
    console.debug = debug;

    logger.warning(`Example Text`);

    expect(log).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    expect(warn).toBeCalledTimes(1);
    expect(warn).toBeCalledWith(`Example Text`);
    expect(warn.mock.instances[0]).toBe(console);
    expect(info).not.toHaveBeenCalled();
    expect(debug).not.toHaveBeenCalled();
  } finally {
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
    console.info = originalInfo;
    console.debug = originalDebug;
  }
});

test(`information`, () => {
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalInfo = console.info;
  const originalDebug = console.debug;

  try {
    const log = jest.fn();
    const error = jest.fn();
    const warn = jest.fn();
    const info = jest.fn();
    const debug = jest.fn();
    console.log = log;
    console.error = error;
    console.warn = warn;
    console.info = info;
    console.debug = debug;

    logger.information(`Example Text`);

    expect(log).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    expect(warn).not.toHaveBeenCalled();
    expect(info).toBeCalledTimes(1);
    expect(info).toBeCalledWith(`Example Text`);
    expect(info.mock.instances[0]).toBe(console);
    expect(debug).not.toHaveBeenCalled();
  } finally {
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
    console.info = originalInfo;
    console.debug = originalDebug;
  }
});

test(`debug`, () => {
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalInfo = console.info;
  const originalDebug = console.debug;

  try {
    const log = jest.fn();
    const error = jest.fn();
    const warn = jest.fn();
    const info = jest.fn();
    const debug = jest.fn();
    console.log = log;
    console.error = error;
    console.warn = warn;
    console.info = info;
    console.debug = debug;

    logger.debug(`Example Text`);

    expect(log).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    expect(warn).not.toHaveBeenCalled();
    expect(info).not.toHaveBeenCalled();
    expect(debug).toBeCalledTimes(1);
    expect(debug).toBeCalledWith(`Example Text`);
    expect(debug.mock.instances[0]).toBe(console);
  } finally {
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
    console.info = originalInfo;
    console.debug = originalDebug;
  }
});
