/**
 * Represents a logger.
 */
export interface LoggerInterface {
  /**
   * Logs an error.
   * @param text The text of the error to log.
   */
  error(text: string): void;

  /**
   * Logs a warning.
   * @param text The text of the warning to log.
   */
  warning(text: string): void;

  /**
   * Logs a piece of information.
   * @param text The text of the information to log.
   */
  information(text: string): void;

  /**
   * Logs a debugging event.
   * @param text The text of the debugging event to log.
   */
  debug(text: string): void;
}
