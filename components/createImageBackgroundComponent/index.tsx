import * as React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  image: {
    position: `absolute`,
    left: 0,
    top: 0,
    width: `100%`,
    height: `100%`,
  },
});

/**
 * Creates a new React component which displays an image background behind its
 * children.
 * @param source The source to use.
 * @returns      A new React component which displays the specified image
 *               background behind its children.
 */
export const createImageBackgroundComponent = (
  source: ImageSourcePropType
): React.FunctionComponent => {
  return ({ children }) => (
    <View>
      <Image source={source} style={styles.image} resizeMode="cover" />
      {children}
    </View>
  );
};
