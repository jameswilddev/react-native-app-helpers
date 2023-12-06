import * as React from 'react'
import { useRefresh } from '../useRefresh'

/**
 * A React hook which refreshes the Component each time an event is raised.
 * @param event     The event to listen to.
 * @param eventType The type of event which is to refresh the Component.
 */
export const useEventRefresh = <T extends string>(
  event: {
    addListener: (eventType: T, listener: () => void) => void
    removeListener: (eventType: T, listener: () => void) => void
  },
  eventType: T
): void => {
  const refresh = useRefresh()

  React.useEffect(() => {
    event.addListener(eventType, refresh)

    return () => {
      event.removeListener(eventType, refresh)
    }
  }, [event, eventType])
}
