import * as React from "react";
import { View, ViewStyle, StyleSheet, TextInput } from "react-native";
import type { ControlStyle } from "../../types/ControlStyle";
import { useRefresh } from "../../hooks/useRefresh";
import { Hitbox } from "../Hitbox";
import { SimpleModal } from "../SimpleModal";
import {
  createControlStateStyleInstance,
  createControlStyleInstance,
  createControlTextStyleInstance,
  createFullHeightPopoverStateStyleInstance,
} from "../helpers";
import { ContainerFillingKeyboardAvoidingView } from "../ContainerFillingKeyboardAvoidingView";
import { SizedSafeAreaView } from "../SizedSafeAreaView";

type Instance = React.FunctionComponent<{
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
}>;

/**
 * The arguments used to create a full-height pop-over component; for testing
 * higher-order components.
 */
type Introspection = {
  /**
   * The styling to use.
   */
  readonly controlStyle: ControlStyle;
};

/**
 * Creates a new React component which displays a button which can be pressed to
 * show an element in a pop-over which fills the display vertically.
 * @param controlStyle  The styling to use.
 * @returns             The created React component.
 */
export const createFullHeightPopoverComponent = (
  controlStyle: ControlStyle
): Instance & { readonly fullHeightPopover: Introspection } => {
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
    validView: createFullHeightPopoverStateStyleInstance(
      controlStyle.focusedValid
    ),
    invalidView: createFullHeightPopoverStateStyleInstance(
      controlStyle.focusedInvalid
    ),
  });

  const FullHeightPopOver: Instance & { fullHeightPopover?: Introspection } = ({
    label,
    placeholder,
    disabled,
    valid,
    children,
  }) => {
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
        <TextInput
          style={
            disabled
              ? valid
                ? styles.disabledValidText
                : styles.disabledInvalidText
              : valid
              ? styles.validText
              : styles.invalidText
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
              : valid
              ? controlStyle.blurredValid.placeholderColor
              : controlStyle.blurredInvalid.placeholderColor
          }
        />
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
              <ContainerFillingKeyboardAvoidingView>
                <SizedSafeAreaView
                  width="fillsContainer"
                  height="fillsContainer"
                >
                  {children(onClose)}
                </SizedSafeAreaView>
              </ContainerFillingKeyboardAvoidingView>
            </View>
          </SimpleModal>
        </React.Fragment>
      );
    }
  };

  FullHeightPopOver.fullHeightPopover = { controlStyle };

  return FullHeightPopOver as Instance & {
    readonly fullHeightPopover: Introspection;
  };
};
