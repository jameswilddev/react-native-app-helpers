import * as React from "react";
import {
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
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
    const [open, setOpen] = React.useState(false);

    // Ensure that the drop-down does not re-open itself if it is disabled while
    // open, then re-enabled.
    React.useEffect(() => {
      if (disabled && open) {
        setOpen(false);
      }
    }, [disabled, open]);

    const [additionalModalViewStyle, setAdditionalModalViewStyle] =
      React.useState<null | {
        readonly position: `absolute`;
        readonly maxHeight: number;
        readonly left: number;
        readonly width: number;
        readonly top?: number;
        readonly bottom?: number;
      }>(null);

    const [mostRecentLayout, setMostRecentLayout] = React.useState<null | {
      readonly x: number;
      readonly y: number;
      readonly width: number;
      readonly height: number;
    }>(null);

    const windowDimensions = useWindowDimensions();

    React.useEffect(() => {
      if (mostRecentLayout !== null) {
        const distanceToBottom =
          windowDimensions.height -
          mostRecentLayout.y -
          mostRecentLayout.height;

        let next: {
          readonly position: `absolute`;
          readonly maxHeight: number;
          readonly left: number;
          readonly width: number;
          readonly top?: number;
          readonly bottom?: number;
        };

        if (distanceToBottom < maximumHeight) {
          next = {
            position: `absolute`,
            maxHeight: maximumHeight,
            left: mostRecentLayout.x,
            width: mostRecentLayout.width,
            bottom: windowDimensions.height - mostRecentLayout.y,
          };
        } else {
          next = {
            position: `absolute`,
            maxHeight: maximumHeight,
            left: mostRecentLayout.x,
            width: mostRecentLayout.width,
            top: mostRecentLayout.y + mostRecentLayout.height,
          };
        }
        if (
          additionalModalViewStyle === null ||
          additionalModalViewStyle.left !== next.left ||
          additionalModalViewStyle.width !== next.width ||
          additionalModalViewStyle.top !== next.top ||
          additionalModalViewStyle.bottom !== next.bottom
        ) {
          setAdditionalModalViewStyle(next);
        }
      }
    }, [windowDimensions.height, mostRecentLayout]);

    const inline = (
      <TouchableWithoutFeedback
        onLayout={({
          nativeEvent: {
            layout: { x, y, width, height },
          },
        }) => {
          setMostRecentLayout({
            x,
            y,
            width,
            height,
          });
        }}
        onPress={() => {
          setOpen(true);
        }}
        disabled={disabled}
      >
        <View>{button}</View>
      </TouchableWithoutFeedback>
    );

    if (disabled || !open || additionalModalViewStyle === null) {
      return inline;
    }

    return (
      <React.Fragment>
        {inline}
        <SimpleModal
          onClose={() => {
            setOpen(false);
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
