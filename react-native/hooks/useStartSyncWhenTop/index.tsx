import * as React from 'react'
import type { SyncControllerInterface } from '../../types/SyncControllerInterface'

/**
 * Automatically starts a sync when this is the top card in a stack router.
 * @param    syncController The sync controller which is to be signalled when this is the top card in a stack router.
 * @param    top            When true, this is the top card in the stack router.
 */
export function useStartSyncWhenTop (
  syncController: SyncControllerInterface,
  top: boolean
): void {
  React.useEffect(() => {
    if (top) {
      syncController.resume()

      void syncController.run()
    }
  }, [top])
}
