import * as React from "react";
import { View, ViewStyle, Text, StyleSheet } from "react-native";
import type { ControlStyle } from "../../types/ControlStyle";
import { useRefresh } from "../../hooks/useRefresh";
import { Hitbox } from "../Hitbox";
import { SimpleModal } from "../SimpleModal";
import {
  createControlPlaceholderTextStyleInstance,
  createControlStateStyleInstance,
  createControlStyleInstance,
  createControlTextStyleInstance,
  createFullHeightPopoverStateStyleInstance,
} from "../helpers";

/**
 * Creates a new React component which displays a button which can be pressed to
 * show an element in a pop-over which fills the display vertically.
 * @param controlStyle  The styling to use.
 * @returns             The created React component.
 */
export const createFullHeightPopoverComponent = (
  controlStyle: ControlStyle
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

  /**
   * Describes the contents of the pop-over.
   * @param close Invoke to close the pop-over.
   * @returns     The contents of the pop-over.
   */
  children(close: () => void): null | JSX.Element;
}> => {
  const styles = StyleSheet.create({
    validHitbox: createControlStyleInstance(
      controlStyle,
      controlStyle.blurredValid
    ),
    invalidHitbox: createControlStateStyleInstance(
      controlStyle,
      controlStyle.blurredInvalid
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
    validText: createControlTextStyleInstance(
      controlStyle,
      controlStyle.blurredValid
    ),
    invalidText: createControlTextStyleInstance(
      controlStyle,
      controlStyle.blurredInvalid
    ),
    disabledValidPlaceholderText: createControlPlaceholderTextStyleInstance(
      controlStyle,
      controlStyle.disabledValid
    ),
    disabledInvalidPlaceholderText: createControlPlaceholderTextStyleInstance(
      controlStyle,
      controlStyle.disabledInvalid
    ),
    validPlaceholderText: createControlPlaceholderTextStyleInstance(
      controlStyle,
      controlStyle.blurredValid
    ),
    invalidPlaceholderText: createControlPlaceholderTextStyleInstance(
      controlStyle,
      controlStyle.blurredInvalid
    ),
    validView: createFullHeightPopoverStateStyleInstance(
      controlStyle.focusedValid
    ),
    invalidView: createFullHeightPopoverStateStyleInstance(
      controlStyle.focusedInvalid
    ),
  });

  return ({ label, placeholder, disabled, valid, children }) => {
    const refresh = useRefresh();

    const state = React.useRef<{
      open: boolean;
      layout: null | {
        readonly pageX: number;
        readonly width: number;
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

    let additionalModalViewStyle: null | ViewStyle;

    if (!disabled && state.current.open && state.current.layout !== null) {
      additionalModalViewStyle = {
        left: state.current.layout.pageX,
        width: state.current.layout.width,
      };
    } else {
      additionalModalViewStyle = null;
    }

    const inline = (
      <Hitbox
        style={
          disabled
            ? valid
              ? styles.disabledValidHitbox
              : styles.disabledInvalidHitbox
            : valid
            ? styles.validHitbox
            : styles.invalidHitbox
        }
        onMeasure={(x, y, width, height, pageX, pageY) => {
          x;
          y;
          height;
          pageY;

          if (
            state.current.layout === null ||
            pageX !== state.current.layout.pageX ||
            width !== state.current.layout.width
          ) {
            state.current.layout = {
              pageX,
              width,
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
              : valid
              ? label === null
                ? styles.validPlaceholderText
                : styles.validText
              : label === null
              ? styles.invalidPlaceholderText
              : styles.invalidText
          }
        >
          {label ?? placeholder}
        </Text>
      </Hitbox>
    );

    if (additionalModalViewStyle === null) {
      return inline;
    } else {
      const onClose = () => {
        state.current.open = false;

        refresh();
      };

      return (
        <React.Fragment>
          {inline}
          <SimpleModal onClose={onClose}>
            <View
              style={[
                valid ? styles.validView : styles.invalidView,
                additionalModalViewStyle,
              ]}
            >
              {children(onClose)}
            </View>
          </SimpleModal>
        </React.Fragment>
      );
    }
  };
};
