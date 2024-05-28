import type { AbortControllerFactoryInterface } from '../../types/AbortControllerFactoryInterface'

/**
 * A source of abort controllers.
 */
export const abortControllerFactory: AbortControllerFactoryInterface = {
  create () {
    return new AbortController()
  }
}
