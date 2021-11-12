import * as React from "react";
import { View, StyleSheet, ColorValue } from "react-native";

export const createHrComponent = (color: ColorValue, height: number) => {
  const styles = StyleSheet.create({
    view: {
      width: `100%`,
      height,
      backgroundColor: color,
    },
  });

  return () => <View style={styles.view} />;
};
