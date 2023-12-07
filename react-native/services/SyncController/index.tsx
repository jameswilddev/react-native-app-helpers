import type { ErrorReporterInterface } from '../../types/ErrorReporterInterface'
import type { Json } from '../../types/Json'
import type { LoggerInterface } from '../../types/LoggerInterface'
import type { SyncInterface } from '../../types/SyncInterface'
import type { SyncableSchema } from '../../types/SyncableSchema'

type Outcome =
    | 'noChangesMade'
    | 'needsToRunAgain'
    | 'atLeastOneChangeMade'
    | 'failed'

type State =
    | { readonly type: 'paused' }
    | { readonly type: 'idle' }
    | {
      readonly type: 'running'
      readonly abortController: AbortController
      readonly promise: Promise<Outcome>
    }
    | {
      readonly type: 'cancelling'
      readonly promise: Promise<Outcome>
    }
    | {
      readonly type: 'restarting'
      readonly promise: Promise<Outcome>
    }
    | {
      readonly type: 'pausing'
    }

/**
 * Provides "fire-and-forget" sync status control.
 * @template TSchema                       The schema of the synced StateStore.
 * @template TAdditionalCollectionData     Any additional information which
 *                                         should be held against a collection,
 *                                         e.g. strings for progress bars.
 * @template TAdditionalCollectionItemData Any additional information which
 *                                         should be held against a collection
 *                                         item, e.g. strings for progress bars.
 */
export class SyncController<
    TSchema extends SyncableSchema,
    TAdditionalCollectionData extends Record<string, unknown>,
    TAdditionalCollectionItemData extends Record<string, Json>
> {
  private state: State = { type: 'paused' }

  constructor (
    private readonly sync: SyncInterface<
    TSchema,
    TAdditionalCollectionData,
    TAdditionalCollectionItemData
    >,
    private readonly logger: LoggerInterface,
    private readonly errorReporter: ErrorReporterInterface
  ) {}

  /**
     * The controller starts in a "paused" state, in which it is not possible to
     * start sync (run() will just return `noChangesMade`).  Call resume() to
     * allow sync to start.  Does nothing in any other state.
     * @throws When pausing.
     */
  resume (): void {
    switch (this.state.type) {
      case 'paused':
        this.state = { type: 'idle' }
        this.logger.information('Sync controller has resumed.')
        break

      case 'pausing':
        throw new Error('Unable to resume a pausing sync controller.')
    }
  }

  /**
     * Requests that the current sync be cancelled, if any.  Does not wait for
     * the change to be applied.
     * @throws When paused.
     * @throws When pausing.
     */
  requestCancel (): void {
    switch (this.state.type) {
      case 'paused':
        throw new Error('Unable to cancel a paused sync controller.')

      case 'pausing':
        throw new Error('Unable to cancel a pausing sync controller.')

      case 'idle':
        this.logger.information('Ignoring request to cancel an idle sync controller.')
        break

      case 'cancelling':
        this.logger.information('Ignoring request to cancel a sync controller which is already cancelling.')
        break

      case 'running': {
        const previousState = this.state

        this.state = {
          type: 'cancelling',
          promise: this.state.promise
        }

        previousState.abortController.abort()

        this.logger.information('Sync controller is attempting to cancel sync.')
        break
      }

      case 'restarting':
        this.state = {
          type: 'cancelling',
          promise: this.state.promise
        }

        this.logger.information('Sync controller will now cancel rather than restart.')
        break
    }
  }

  /**
     * Requests that a sync start.
     * - If idle, sync starts.
     * - If running, the current sync is cancelled and started again.
     * - If cancelling, the current sync is allowed to cancel and is then
     *   started again.
     * - If paused or pausing, returns no changes made.
     * @returns The outcome of the run.
     */
  async run (): Promise<Outcome> {
    switch (this.state.type) {
      case 'paused':
      case 'pausing':
        return 'noChangesMade'

      case 'idle': {
        this.logger.information(
          'Sync controller is starting a new sync.'
        )

        const abortController = new AbortController()
        let resolve: (as: Outcome) => void
        const promise = new Promise<Outcome>((_resolve) => {
          resolve = _resolve
        })

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        resolve = resolve!

        this.state = {
          type: 'running',
          abortController,
          promise
        }

        let outcome: Outcome

        try {
          outcome = await this.sync.run(abortController.signal)
        } catch (e) {
          this.errorReporter.report(e)
          outcome = 'failed'
        }

        const nextState = this.state as State

        switch (nextState.type) {
          case 'pausing':
            this.logger.information(
              'Sync controller run was interrupted by pause.'
            )

            resolve('failed')
            return 'failed'

            /* istanbul ignore next */
          case 'paused':
            throw new Error(
              'Unexpectedly in the "paused" state following a run.'
            )

            /* istanbul ignore next */
          case 'idle':
            throw new Error(
              'Unexpectedly in the "idle" state following a run.'
            )

          case 'running':
            if (outcome === 'needsToRunAgain') {
              this.logger.information(
                'Sync controller run interrupted as needs to restart.'
              )

              this.state = { type: 'idle' }

              outcome = await this.run()

              resolve(outcome)
              return outcome
            } else {
              this.logger.information(
                'Sync controller run completed without interruption.'
              )

              this.state = { type: 'idle' }

              resolve(outcome)
              return outcome
            }

          case 'restarting':
            this.logger.information('Sync controller run interrupted for restart.')

            this.state = { type: 'idle' }

            outcome = await this.run()

            resolve(outcome)
            return outcome

          case 'cancelling':
            this.logger.information(
              'Sync controller run interrupted for cancellation.'
            )

            this.state = { type: 'idle' }

            resolve('failed')
            return 'failed'
        }
      }

      // eslint-disable-next-line no-fallthrough
      case 'running': {
        this.logger.information(
          'Sync controller is restarting the process as a run was requested while running...'
        )

        const previousState = this.state

        this.state = {
          type: 'restarting',
          promise: previousState.promise
        }

        previousState.abortController.abort()

        return await previousState.promise
      }

      case 'cancelling':
        this.logger.information(
          'Sync controller is restarting the process as a run was requested while cancelling...'
        )

        this.state = {
          type: 'restarting',
          promise: this.state.promise
        }

        return await this.state.promise

      case 'restarting':
        this.logger.information(
          'Sync controller is awaiting a previously enqueued restart...'
        )

        return await this.state.promise
    }
  }

  async pause (): Promise<void> {
    switch (this.state.type) {
      case 'paused':
        throw new Error('Unable to pause a paused sync controller.')

      case 'pausing':
        throw new Error('Unable to pause a pausing sync controller.')

      case 'idle':
        this.state = { type: 'paused' }
        this.logger.information('Sync controller has paused.')
        break

      case 'running': {
        const previousState = this.state

        this.state = {
          type: 'pausing'
        }

        this.logger.information(
          'Sync controller is waiting for previous run to cancel for a pause...'
        )

        previousState.abortController.abort()

        await previousState.promise

        this.state = { type: 'paused' }
        this.logger.information('Sync controller has paused.')

        break
      }

      case 'restarting': {
        const previousState = this.state

        this.state = {
          type: 'pausing'
        }

        this.logger.information(
          'Sync controller will now pause rather than restarting.'
        )

        await previousState.promise

        this.state = { type: 'paused' }
        this.logger.information('Sync controller has paused.')

        break
      }

      case 'cancelling': {
        const previousState = this.state

        this.state = {
          type: 'pausing'
        }

        this.logger.information(
          'Sync controller will now pause rather than cancelling.'
        )

        await previousState.promise

        this.state = { type: 'paused' }
        this.logger.information('Sync controller has paused.')

        break
      }
    }
  }
}
