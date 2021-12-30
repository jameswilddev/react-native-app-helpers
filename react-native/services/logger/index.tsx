import type { LoggerInterface } from "../../types/LoggerInterface";

/**
 * A wrapper around console for easier mocking in tests.
 */
export const logger: LoggerInterface = {
  error(text: string): void {
    console.error(text);
  },

  warning(text: string): void {
    console.warn(text);
  },

  information(text: string): void {
    console.info(text);
  },
  debug(text: string): void {
    console.debug(text);
  },
};
