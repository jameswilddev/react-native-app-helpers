/**
 * A source of abort controllers.
 */
export interface AbortControllerFactoryInterface {
  /**
   * Creates a new abort controller.
   * @return The created abort controller.
   */
  create: () => AbortController
}
