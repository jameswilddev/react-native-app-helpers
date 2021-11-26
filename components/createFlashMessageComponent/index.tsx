import * as React from "react";
import { StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import { useRefresh } from "../../hooks/useRefresh";
import type { FlashMessageState } from "../../types/FlashMessageState";
import type { FlashMessageStyle } from "../../types/FlashMessageStyle";
import { Hitbox } from "../Hitbox";

/**
 * Creates a new React component representing a flash message.
 * @template T              The names of the types available.
 * @param flashMessageStyle The style of the flash message to create.
 * @returns                 The created React component.
 */
export function createFlashMessageComponent<T extends string>(
  flashMessageStyle: FlashMessageStyle<T>
): React.FunctionComponent<{
  /**
   * When null, the flash message is closed.  When non-null, the details of the
   * flash message which may be displayed (the user can dismiss the current
   * message).
   */
  readonly state: null | FlashMessageState<T>;
}> {
  const hitboxStylesInput: { [TKey in T]?: ViewStyle } = {};
  const textStylesInput: { [TKey in T]?: TextStyle } = {};

  for (const typeKey in flashMessageStyle.types) {
    const typeValue = flashMessageStyle.types[typeKey];

    const hitboxStyle: ViewStyle = {
      backgroundColor: typeValue.backgroundColor,
    };

    if (typeValue.border !== null) {
      hitboxStyle.borderWidth = typeValue.border.width;
      hitboxStyle.borderColor = typeValue.border.color;
    }

    if (flashMessageStyle.horizontalPadding !== 0) {
      hitboxStyle.paddingHorizontal = flashMessageStyle.horizontalPadding;
    }

    if (flashMessageStyle.verticalPadding !== 0) {
      hitboxStyle.paddingVertical = flashMessageStyle.verticalPadding;
    }

    if (flashMessageStyle.radius !== 0) {
      hitboxStyle.borderRadius = flashMessageStyle.radius;
    }

    hitboxStylesInput[typeKey] = hitboxStyle;

    const textStyle: TextStyle = {
      fontFamily: flashMessageStyle.fontFamily,
      fontSize: flashMessageStyle.fontSize,
      lineHeight: flashMessageStyle.fontSize * 1.4,
      color: typeValue.color,
    };

    textStylesInput[typeKey] = textStyle;
  }

  const hitboxStyles = StyleSheet.create(
    hitboxStylesInput as { readonly [TKey in T]: ViewStyle }
  );

  const textStyles = StyleSheet.create(
    textStylesInput as { readonly [TKey in T]: TextStyle }
  );

  return ({ state }) => {
    const refresh = useRefresh();
    const internalState = React.useRef({
      open: state !== null,
      type: state === null ? null : state.type,
      message: state === null ? null : state.message,
    });

    if (state === null) {
      internalState.current.open = false;
      internalState.current.type = null;
      internalState.current.message = null;
    } else if (
      state.type !== internalState.current.type ||
      state.message !== internalState.current.message
    ) {
      internalState.current.open = true;
      internalState.current.type = state.type;
      internalState.current.message = state.message;
    }

    if (state !== null && internalState.current.open) {
      return (
        <Hitbox
          disabled={false}
          onPress={() => {
            internalState.current.open = false;
            refresh();
          }}
          style={hitboxStyles[state.type]}
        >
          <Text style={textStyles[state.type]}>{state.message}</Text>
        </Hitbox>
      );
    } else {
      return null;
    }
  };
}
