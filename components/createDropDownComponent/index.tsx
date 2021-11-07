import * as React from "react";
import {
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import { useRefresh } from "../..";
import { SimpleModal } from "../SimpleModal";

/**
 * Creates a new React component which displays a button which can be pressed to
 * show an element in a drop-down area.
 * @param maximumHeight The maximum height of the drop-down area.
 * @returns             The created React component.
 */
export const createDropDownComponent = (
  maximumHeight: number
): React.FunctionComponent<{
  /**
   * Shown in-line.  Tapping this element will open the drop-down.
   */
  readonly button: JSX.Element;

  /**
   * Shown when the drop-down is open, above or below the button.
   */
  readonly body: (position: `above` | `below`) => JSX.Element;

  /**
   * When true, the button cannot be pressed and the body is not shown.
   */
  readonly disabled: boolean;
}> => {
  return ({ button, body, disabled }) => {
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

    const inline = (
      <TouchableWithoutFeedback
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
        <View>{button}</View>
      </TouchableWithoutFeedback>
    );

    if (disabled || !state.current.open || state.current.layout === null) {
      return inline;
    }

    const additionalModalViewStyle: ViewStyle = {
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
    } else {
      additionalModalViewStyle.top =
        state.current.layout.y + state.current.layout.height;
    }

    return (
      <React.Fragment>
        {inline}
        <SimpleModal
          onClose={() => {
            state.current.open = false;

            refresh();
          }}
        >
          <View style={additionalModalViewStyle}>
            {body(
              additionalModalViewStyle.top === undefined ? `above` : `below`
            )}
          </View>
        </SimpleModal>
      </React.Fragment>
    );
  };
};
