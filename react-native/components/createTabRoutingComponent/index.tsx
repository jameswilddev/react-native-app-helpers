import * as React from 'react'
import type { FunctionComponent } from 'react'
import type { TabRouteTable } from '../../types/TabRouteTable'
import { StyleSheet, View, type ViewStyle } from 'react-native'
import type { TabRoutingProps } from '../../types/TabRoutingProps'

const viewBase: ViewStyle = {
  width: '100%',
  height: '100%'
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
 * Creates a React component which displays a single route at a time (though all
 * are kept rendered at all times).
 * @template TRoute      The key used to select a route.
 * @template TOtherProps Any other props the routes accept.
 * @param routeTable     The route table the component will render from.
 * @returns              A React component which renders a route from the given
 *                       table.
 */
export const createTabRoutingComponent = <
  TRoute extends string,
  TOtherProps extends Readonly<Record<string, unknown>>
>(
    routeTable: TabRouteTable<TRoute, TOtherProps>
  ): FunctionComponent<TabRoutingProps<TRoute, TOtherProps>> => {
  const keys = Object.keys(
    routeTable
  ).sort() as unknown as readonly TRoute[]

  return (props) => (
    <React.Fragment>
      {keys.map((key) => (
        <View
          key={key}
          style={key === props.route ? styles.activeView : styles.inactiveView}
        >
          {React.createElement(routeTable[key], props)}
        </View>
      ))}
    </React.Fragment>
  )
}
