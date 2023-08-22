import * as React from 'react'
import type { FunctionComponent } from 'react'
import type { RouteParameters } from '../../types/RouteParameters'
import type { StackRouterState } from '../../types/StackRouterState'
import { StyleSheet, View, type ViewStyle } from 'react-native'
import type { StackRouteTable } from '../../types/StackRouteTable'
import { useBackButton } from '../../hooks/useBackButton'
import { Card } from './Card'

const viewBase: ViewStyle = {
  position: 'absolute',
  height: '100%',
  width: '100%'
}

const styles = StyleSheet.create({
  activeView: {
    ...viewBase
  },
  inactiveView: {
    ...viewBase,
    display: 'none'
  }
})

/**
 * Creates a React component which displays the top of a stack of routes (though
 * all items in the stack are continuously rendered).
 * @template TRouteParameters The parameters of the routes mapped.
 * @template TOtherProps      Any other props the routes accept.
 * @param routeTable          The route table the component will render from.
 * @returns                   Creates a React component which displays the top
 *                            of a stack of routes
 */
export const createStackRoutingComponent = <
  TRouteParameters extends RouteParameters,
  TOtherProps extends Readonly<Record<string, unknown>>
>(
    routeTable: StackRouteTable<TRouteParameters, TOtherProps>
  ): FunctionComponent<
  {
    readonly routeState: StackRouterState<TRouteParameters>
    readonly setRouteState: (to: StackRouterState<TRouteParameters>) => void

    /**
     * Called when the user makes a gesture to go back, e.g. swiping from the
     * left or pressing the hardware "back" button.
     * @param pop    Call to proceed, popping the current card from the top of
     *               the stack.
     * @param cancel Call to cancel; for a swipe gesture, this will unswipe the
     *               top card.
     */
    onBack: (pop: () => void, cancel: () => void) => void
  } & TOtherProps
  > => {
  return (props) => {
    useBackButton(() => {
      if (props.routeState.length > 1) {
        props.onBack(
          () => {
            const popped = [...props.routeState]
            popped.pop()

            props.setRouteState(popped)
          },
          () => {
            // No swipe to cancel.
          }
        )

        return true
      } else {
        return false
      }
    })

    return (
      <React.Fragment>
        {props.routeState.map((item, index) => {
          return (
            <View
              key={item.uuid}
              style={
                index >= props.routeState.length - 2
                  ? styles.activeView
                  : styles.inactiveView
              }
              pointerEvents={
                index === props.routeState.length - 1 ? 'auto' : 'none'
              }
            >
              <Card
                pop={() => {
                  const popped = [...props.routeState]
                  popped.pop()

                  props.setRouteState(popped)
                }}
                onBack={props.onBack}
                allowsSwiping={
                  index > 0 &&
                  index === props.routeState.length - 1 &&
                  routeTable[item.key].allowsSwiping
                }
              >
                {React.createElement(routeTable[item.key].component, {
                  parameters: item.parameters,
                  push: (...itemsToAdd) => {
                    props.setRouteState([...props.routeState, ...itemsToAdd])
                  },
                  pop: (numberOfItemsToRemove) => {
                    const popped = [...props.routeState]

                    for (let i = 0; i < (numberOfItemsToRemove ?? 1); i++) {
                      popped.pop()
                    }

                    props.setRouteState(popped)
                  },
                  replace: (numberOfItemsToRemove, ...itemsToAdd) => {
                    const popped = [...props.routeState]

                    for (let i = 0; i < numberOfItemsToRemove; i++) {
                      popped.pop()
                    }

                    popped.push(...itemsToAdd)

                    props.setRouteState(popped)
                  },
                  reset: (...replacementItems) => {
                    props.setRouteState(replacementItems)
                  },
                  setParameters: (parameters) => {
                    const routeStateCopy = [...props.routeState]

                    routeStateCopy.splice(index, 1, {
                      ...item,
                      parameters
                    })

                    props.setRouteState(routeStateCopy)
                  },
                  bottom: index === 0,
                  top: index === props.routeState.length - 1,
                  ...props
                })}
              </Card>
            </View>
          )
        })}
      </React.Fragment>
    )
  }
}
