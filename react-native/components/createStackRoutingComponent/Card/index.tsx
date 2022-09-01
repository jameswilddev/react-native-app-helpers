import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  swipeableChildrenContainer: {
    width: `100%`,
    height: `100%`,
  },
  leftActionsView: {
    width: `100%`,
  },
});

export const Card: React.FunctionComponent<
  React.PropsWithChildren<{
    pop(): void;
    onBack(pop: () => void, cancel: () => void): void;
    readonly allowsSwiping: boolean;
  }>
> = ({ pop, allowsSwiping, onBack, children }) => {
  const ref = React.useRef<null | Swipeable>(null);

  return (
    <Swipeable
      ref={ref}
      childrenContainerStyle={styles.swipeableChildrenContainer}
      {...(allowsSwiping
        ? {
            renderLeftActions: () => <View style={styles.leftActionsView} />,
            onSwipeableLeftOpen() {
              onBack(pop, () => {
                ref.current?.close();
              });
            },
          }
        : {})}
    >
      {children}
    </Swipeable>
  );
};
