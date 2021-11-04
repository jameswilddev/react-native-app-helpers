import * as React from "react";
import type { FunctionComponent } from "react";
import type { RouteParameters } from "../../types/RouteParameters";
import type { RouteTable } from "../../types/RouteTable";
import type { StackRouterState } from "../../types/StackRouterState";
import { StyleSheet, View, ViewStyle } from "react-native";

const viewBase: ViewStyle = {
  width: `100%`,
  height: `100%`,
};

const styles = StyleSheet.create({
  activeView: {
    ...viewBase,
  },
  inactiveView: {
    ...viewBase,
    display: `none`,
  },
});

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
  TOtherProps extends { readonly [key: string]: any }
>(
  routeTable: RouteTable<TRouteParameters, TOtherProps>
): FunctionComponent<
  {
    readonly routeState: StackRouterState<TRouteParameters>;
  } & TOtherProps
> => {
  return (props) => (
    <React.Fragment>
      {props.routeState.map((item, index) => (
        <View
          key={index}
          style={
            index === props.routeState.length - 1
              ? styles.activeView
              : styles.inactiveView
          }
        >
          {React.createElement(routeTable[item.key], {
            ...props,
            routeState: item,
          })}
        </View>
      ))}
    </React.Fragment>
  );
};
