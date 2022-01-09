import * as React from "react";
import type { FunctionComponent } from "react";
import type { RouteParameters } from "../../types/RouteParameters";
import type { StackRouterState } from "../../types/StackRouterState";
import { StyleSheet, View, ViewStyle } from "react-native";
import type { StackRouteTable } from "../../types/StackRouteTable";

const viewBase: ViewStyle = {
  position: `absolute`,
  height: `100%`,
  width: `100%`,
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
  TOtherProps extends { readonly [key: string]: unknown }
>(
  routeTable: StackRouteTable<TRouteParameters, TOtherProps>
): FunctionComponent<
  {
    readonly routeState: StackRouterState<TRouteParameters>;
    readonly setRouteState: (to: StackRouterState<TRouteParameters>) => void;
  } & TOtherProps
> => {
  return (props) => (
    <React.Fragment>
      {props.routeState.map((item, index) => {
        return (
          <View
            key={item.uuid}
            style={
              index === props.routeState.length - 1
                ? styles.activeView
                : styles.inactiveView
            }
          >
            {React.createElement(routeTable[item.key], {
              parameters: item.parameters,
              push: (...itemsToAdd) => {
                props.setRouteState([...props.routeState, ...itemsToAdd]);
              },
              pop: (numberOfItemsToRemove) => {
                const popped = [...props.routeState];

                for (let i = 0; i < (numberOfItemsToRemove ?? 1); i++) {
                  popped.pop();
                }

                props.setRouteState(popped);
              },
              replace: (numberOfItemsToRemove, ...itemsToAdd) => {
                const popped = [...props.routeState];

                for (let i = 0; i < numberOfItemsToRemove; i++) {
                  popped.pop();
                }

                popped.push(...itemsToAdd);

                props.setRouteState(popped);
              },
              reset: (...replacementItems) => {
                props.setRouteState(replacementItems);
              },
              ...props,
            })}
          </View>
        );
      })}
    </React.Fragment>
  );
};
