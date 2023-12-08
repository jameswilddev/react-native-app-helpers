/**
 * The methods made available by the SyncController implementation.
 */
export interface SyncControllerInterface {
  /**
     * The controller starts in a "paused" state, in which it is not possible to
     * start sync (run() will just return `noChangesMade`).  Call resume() to
     * allow sync to start.  Does nothing in any other state.
     * @throws When pausing.
     */
  resume: () => void

  /**
     * Requests that the current sync be cancelled, if any.  Does not wait for
     * the change to be applied.
     * @throws When paused.
     * @throws When pausing.
     */
  requestCancel: () => void

  /**
     * Requests that a sync start.
     * - If idle, sync starts.
     * - If running, the current sync is cancelled and started again.
     * - If cancelling, the current sync is allowed to cancel and is then
     *   started again.
     * - If paused or pausing, returns no changes made.
     * @returns The outcome of the run.
     */
  run: () => Promise<'noChangesMade' | 'atLeastOneChangeMade' | 'failed'>

  /**
   * Returns the controller to the "paused" state.  This will wait until any running sync is cancelled before moving to the "paused" state and resolving its returned promise.
   * @throws When paused.
   * @throws When pausing.
   */
  pause: () => Promise<void>
}
