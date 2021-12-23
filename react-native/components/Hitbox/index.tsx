import * as React from "react";
import {
  LayoutChangeEvent,
  MeasureOnSuccessCallback,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useMeasure } from "../../..";

type Component = React.FunctionComponent<{
  /**
   * When true, this component does not accept touch input.
   * This will, of course, not apply until the next render.  To synchronously
   * disable all Hitboxes, use the "enabled" static property.
   */
  readonly disabled?: undefined | boolean;

  /**
   * Passed down to TouchableOpacity.
   */
  readonly style?: ViewStyle;

  /**
   * Passed to useMeasure.
   */
  readonly onMeasure?: MeasureOnSuccessCallback;

  /**
   * Similar to TouchableOpacity's onPress, but remote-controlled using the
   * "enabled" static property.
   */
  readonly onPress: () => void;
}>;

/**
 * A React component which mimics TouchableOpacity, but can be remotely,
 * synchronously disabled using the "enabled" static property.
 */
export const Hitbox: Component & {
  /**
   * When false, all Hitboxes will ignore all touch input.
   * Set this to false when pressing a button with an asynchronous side effect,
   * and set it back to true when the side effect succeeds or fails.  This will
   * prevent accidental concurrency where the user rapidly taps buttons.
   */
  enabled: boolean;
} = (({ disabled, style, onMeasure, onPress, children }) => {
  let ref: undefined | React.RefCallback<TouchableOpacity>;
  let onLayout: undefined | ((event: LayoutChangeEvent) => void);

  if (onMeasure === undefined) {
    ref = undefined;
    onLayout = undefined;
  } else {
    [ref, onLayout] = useMeasure(onMeasure);
  }

  return (
    <TouchableOpacity
      disabled={disabled ?? false}
      style={style}
      ref={ref}
      onLayout={onLayout}
      onPress={() => {
        if (Hitbox.enabled) {
          onPress();
        }
      }}
    >
      {children}
    </TouchableOpacity>
  );
}) as Component as unknown as Component & {
  enabled: boolean;
};

Hitbox.enabled = true;
