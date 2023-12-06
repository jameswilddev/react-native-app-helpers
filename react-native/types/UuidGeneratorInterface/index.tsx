/**
 * The methods made available by the UUID generator implementation
 */
export interface UuidGeneratorInterface {
  /**
   * Generates a new V4 UUID.
   * @return The generated V4 UUID.
   */
  generate: () => string
}
