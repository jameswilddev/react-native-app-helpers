import * as React from "react";
import {
  View,
  useWindowDimensions,
  ViewStyle,
  StyleSheet,
  TextInput,
} from "react-native";
import type { ControlStyle } from "../../types/ControlStyle";
import { useRefresh } from "../../hooks/useRefresh";
import { Hitbox } from "../Hitbox";
import { SimpleModal } from "../SimpleModal";
import {
  createControlStateStyleInstance,
  createControlStyleInstance,
  createControlTextStyleInstance,
  createDropDownStateStyleInstance,
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
  readonly disabled: undefined | boolean;

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
    upperValidView: withoutBottomBorder(
      createDropDownStateStyleInstance(controlStyle.focusedValid, maximumHeight)
    ),
    upperInvalidView: withoutBottomBorder(
      createDropDownStateStyleInstance(
        controlStyle.focusedInvalid,
        maximumHeight
      )
    ),
    lowerValidView: withoutTopBorder(
      createDropDownStateStyleInstance(controlStyle.focusedValid, maximumHeight)
    ),
    lowerInvalidView: withoutTopBorder(
      createDropDownStateStyleInstance(
        controlStyle.focusedInvalid,
        maximumHeight
      )
    ),
  });

  return ({ label, placeholder, disabled, valid, children }) => {
    disabled = disabled ?? false;

    const refresh = useRefresh();

    const state = React.useRef<{
      open: boolean;
      layout: null | {
        readonly pageX: number;
        readonly pageY: number;
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
        left: state.current.layout.pageX,
        width: state.current.layout.width,
      };

      const distanceToBottom =
        windowDimensions.height -
        state.current.layout.pageY -
        state.current.layout.height;

      if (distanceToBottom < maximumHeight) {
        additionalModalViewStyle.bottom =
          windowDimensions.height - state.current.layout.pageY;

        position = `upper`;
      } else {
        additionalModalViewStyle.top =
          state.current.layout.pageY + state.current.layout.height;

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
        onMeasure={(x, y, width, height, pageX, pageY) => {
          x;
          y;

          if (
            state.current.layout === null ||
            pageX !== state.current.layout.pageX ||
            pageY !== state.current.layout.pageY ||
            width !== state.current.layout.width ||
            height !== state.current.layout.height
          ) {
            state.current.layout = {
              pageX,
              pageY,
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
        <TextInput
          style={
            disabled
              ? valid
                ? styles.disabledValidText
                : styles.disabledInvalidText
              : position === `closed`
              ? valid
                ? styles.blurredValidText
                : styles.blurredInvalidText
              : valid
              ? styles.focusedValidText
              : styles.focusedInvalidText
          }
          pointerEvents="none"
          editable={false}
          value={label ?? undefined}
          placeholder={placeholder}
          placeholderTextColor={
            disabled
              ? valid
                ? controlStyle.disabledValid.placeholderColor
                : controlStyle.disabledInvalid.placeholderColor
              : position === `closed`
              ? valid
                ? controlStyle.blurredValid.placeholderColor
                : controlStyle.blurredInvalid.placeholderColor
              : valid
              ? controlStyle.focusedValid.placeholderColor
              : controlStyle.focusedInvalid.placeholderColor
          }
        />
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
            <View
              style={[
                valid
                  ? position === `upper`
                    ? styles.upperValidView
                    : styles.lowerValidView
                  : position === `upper`
                  ? styles.upperInvalidView
                  : styles.lowerInvalidView,
                additionalModalViewStyle,
              ]}
            >
              {children}
            </View>
          </SimpleModal>
        </React.Fragment>
      );
    }
  };
};
