import * as React from "react";
import { StyleSheet, ScrollView, ScrollViewProps } from "react-native";

const styles = StyleSheet.create({
  scrollView: {
    width: `100%`,
    height: `100%`,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
  },
});

/**
 * A ScrollView which is styled to fill its container.
 */
export const ContainerFillingScrollView: React.FunctionComponent<
  ScrollViewProps
> = (props) => (
  <ScrollView
    pointerEvents="box-none"
    style={styles.scrollView}
    contentContainerStyle={styles.scrollViewContentContainer}
    keyboardShouldPersistTaps="handled"
    {...props}
  />
);
