import * as React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: `100%`,
    height: `100%`,
  },
  imageWrapper: {
    position: `absolute`,
    left: 0,
    top: 0,
    width: `100%`,
    height: `100%`,
  },
  containerFillingView: {
    flexGrow: 1,
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
): React.FunctionComponent<{ size: `fitsContent` | `fillsContainer` }> => {
  return ({ size, children }) => (
    <View
      {...(size === `fillsContainer`
        ? { style: styles.containerFillingView }
        : {})}
      pointerEvents="box-none"
    >
      <View style={styles.imageWrapper} pointerEvents="none">
        <Image source={source} style={styles.image} resizeMode="cover" />
      </View>
      {children}
    </View>
  );
};
