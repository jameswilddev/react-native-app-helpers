import * as React from "react";
import {
  View,
  useWindowDimensions,
  ViewStyle,
  Text,
  StyleSheet,
} from "react-native";
import type { ControlStyle } from "../../types/ControlStyle";
import { useRefresh } from "../../hooks/useRefresh";
import { Hitbox } from "../Hitbox";
import { SimpleModal } from "../SimpleModal";
import {
  createControlPlaceholderTextStyleInstance,
  createControlStateStyleInstance,
  createControlStyleInstance,
  createControlTextStyleInstance,
  withoutBottomBorder,
  withoutTopBorder,
} from "../helpers";

/**
 * Creates a new React component which displays a button which can be pressed to
 * show an element in a drop-down area.
 * @param controlStyle  The styling to use.
 * @param maximumHeight The maximum height of the drop-down area.
 * @returns             The created React component.
 */
export const createDropDownComponent = (
  controlStyle: ControlStyle,
  maximumHeight: number
): React.FunctionComponent<{
  /**
   * The text shown in the button.  When null, the placeholder is shown instead.
   */
  readonly label: null | string;

  /**
   * The placeholder text shown in the button when there is no text.
   */
  readonly placeholder: string;

  /**
   * When true, the button cannot be pressed and the body is not shown.
   */
  readonly disabled: boolean;

  /**
   * When true, the control is styled as though it is valid.  It is otherwise
   * styles as though it is invalid.
   */
  readonly valid: boolean;
}> => {
  const styles = StyleSheet.create({
    blurredValidHitbox: createControlStyleInstance(
      controlStyle,
      controlStyle.blurredValid
    ),
    blurredInvalidHitbox: createControlStateStyleInstance(
      controlStyle,
      controlStyle.blurredInvalid
    ),
    // todo wrong way around
    upperValidHitbox: withoutTopBorder(
      createControlStateStyleInstance(controlStyle, controlStyle.focusedValid)
    ),
    upperInvalidHitbox: withoutTopBorder(
      createControlStateStyleInstance(controlStyle, controlStyle.focusedInvalid)
    ),
    lowerValidHitbox: withoutBottomBorder(
      createControlStateStyleInstance(controlStyle, controlStyle.focusedValid)
    ),
    lowerInvalidHitbox: withoutBottomBorder(
      createControlStateStyleInstance(controlStyle, controlStyle.focusedInvalid)
    ),
    disabledValidHitbox: createControlStateStyleInstance(
      controlStyle,
      controlStyle.disabledValid
    ),
    disabledInvalidHitbox: createControlStateStyleInstance(
      controlStyle,
      controlStyle.disabledInvalid
    ),
    disabledValidText: createControlTextStyleInstance(
      controlStyle,
      controlStyle.disabledValid
    ),
    disabledInvalidText: createControlTextStyleInstance(
      controlStyle,
      controlStyle.disabledInvalid
    ),
    blurredValidText: createControlTextStyleInstance(
      controlStyle,
      controlStyle.blurredValid
    ),
    blurredInvalidText: createControlTextStyleInstance(
      controlStyle,
      controlStyle.blurredInvalid
    ),
    focusedValidText: createControlTextStyleInstance(
      controlStyle,
      controlStyle.focusedValid
    ),
    focusedInvalidText: createControlTextStyleInstance(
      controlStyle,
      controlStyle.focusedInvalid
    ),
    disabledValidPlaceholderText: createControlPlaceholderTextStyleInstance(
      controlStyle,
      controlStyle.disabledValid
    ),
    disabledInvalidPlaceholderText: createControlPlaceholderTextStyleInstance(
      controlStyle,
      controlStyle.disabledInvalid
    ),
    blurredValidPlaceholderText: createControlPlaceholderTextStyleInstance(
      controlStyle,
      controlStyle.blurredValid
    ),
    blurredInvalidPlaceholderText: createControlPlaceholderTextStyleInstance(
      controlStyle,
      controlStyle.blurredInvalid
    ),
    focusedValidPlaceholderText: createControlPlaceholderTextStyleInstance(
      controlStyle,
      controlStyle.focusedValid
    ),
    focusedInvalidPlaceholderText: createControlPlaceholderTextStyleInstance(
      controlStyle,
      controlStyle.focusedInvalid
    ),
  });

  return ({ label, placeholder, disabled, valid, children }) => {
    const refresh = useRefresh();

    const state = React.useRef<{
      open: boolean;
      layout: null | {
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
      };
    }>({
      open: false,
      layout: null,
    });

    // Ensure that the drop-down does not re-open itself if it is disabled while
    // open, then re-enabled.
    if (disabled) {
      state.current.open = false;
    }

    const windowDimensions = useWindowDimensions();

    let additionalModalViewStyle: null | ViewStyle;
    let position: `closed` | `upper` | `lower`;

    if (disabled || !state.current.open || state.current.layout === null) {
      additionalModalViewStyle = null;
      position = `closed`;
    } else {
      additionalModalViewStyle = {
        position: `absolute`,
        maxHeight: maximumHeight,
        left: state.current.layout.x,
        width: state.current.layout.width,
      };

      const distanceToBottom =
        windowDimensions.height -
        state.current.layout.y -
        state.current.layout.height;

      if (distanceToBottom < maximumHeight) {
        additionalModalViewStyle.bottom =
          windowDimensions.height - state.current.layout.y;

        position = `upper`;
      } else {
        additionalModalViewStyle.top =
          state.current.layout.y + state.current.layout.height;

        position = `lower`;
      }
    }

    const inline = (
      <Hitbox
        style={
          disabled
            ? valid
              ? styles.disabledValidHitbox
              : styles.disabledInvalidHitbox
            : position === `closed`
              ? valid
                ? styles.blurredValidHitbox
                : styles.blurredInvalidHitbox
              : position === `upper`
                ? valid
                  ? styles.upperValidHitbox
                  : styles.upperInvalidHitbox
                : valid
                  ? styles.lowerValidHitbox
                  : styles.lowerInvalidHitbox
        }
        onLayout={({
          nativeEvent: {
            layout: { x, y, width, height },
          },
        }) => {
          if (
            state.current.layout === null ||
            x !== state.current.layout.x ||
            y !== state.current.layout.y ||
            width !== state.current.layout.width ||
            height !== state.current.layout.height
          ) {
            state.current.layout = {
              x,
              y,
              width,
              height,
            };

            refresh();
          }
        }}
        onPress={() => {
          state.current.open = true;

          refresh();
        }}
        disabled={disabled}
      >
        <Text
          style={
            disabled
              ? valid
                ? label === null
                  ? styles.disabledValidPlaceholderText
                  : styles.disabledValidText
                : label === null
                  ? styles.disabledInvalidPlaceholderText
                  : styles.disabledInvalidText
              : position === `closed`
                ? valid
                  ? label === null
                    ? styles.blurredValidPlaceholderText
                    : styles.blurredValidText
                  : label === null
                    ? styles.blurredInvalidPlaceholderText
                    : styles.blurredInvalidText
                : valid
                  ? label === null
                    ? styles.focusedValidPlaceholderText
                    : styles.focusedValidText
                  : label === null
                    ? styles.focusedInvalidPlaceholderText
                    : styles.focusedInvalidText
          }
        >
          {label ?? placeholder}
        </Text>
      </Hitbox>
    );

    if (position === `closed`) {
      return inline;
    } else {
      return (
        <React.Fragment>
          {inline}
          <SimpleModal
            onClose={() => {
              state.current.open = false;

              refresh();
            }}
          >
            <View style={additionalModalViewStyle}>{children}</View>
          </SimpleModal>
        </React.Fragment>
      );
    }
  };
};
