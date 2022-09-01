import * as React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import {
  flattenRenderedToArray,
  SplitButtonStyle,
  SplitButtonStateStyle,
} from "../../..";
import { Hitbox } from "../Hitbox";

const createSingleButtonHitboxStyleInstance = (
  splitButtonStyle: SplitButtonStyle<string>,
  splitButtonStateStyle: SplitButtonStateStyle
): ViewStyle => {
  const output: ViewStyle = {
    backgroundColor: splitButtonStateStyle.backgroundColor,
  };

  if (splitButtonStyle.horizontalPadding !== 0) {
    output.paddingHorizontal = splitButtonStyle.horizontalPadding;
  }

  if (splitButtonStyle.verticalPadding !== 0) {
    output.paddingVertical = splitButtonStyle.verticalPadding;
  }

  if (splitButtonStateStyle.radius !== 0) {
    output.borderRadius = splitButtonStateStyle.radius;
  }

  if (splitButtonStateStyle.border !== null) {
    output.borderWidth = splitButtonStateStyle.border.width;
    output.borderColor = splitButtonStateStyle.border.color;
  }

  const effectiveBorderWidth =
    splitButtonStateStyle.border === null
      ? 0
      : splitButtonStateStyle.border.width;

  const margin = splitButtonStyle.neutralBorderWidth - effectiveBorderWidth;

  if (margin !== 0) {
    output.margin = margin;
  }

  return output;
};

const createLeftButtonHitboxStyleInstance = (
  splitButtonStyle: SplitButtonStyle<string>,
  splitButtonStateStyle: SplitButtonStateStyle
): ViewStyle => {
  const output = createSingleButtonHitboxStyleInstance(
    splitButtonStyle,
    splitButtonStateStyle
  );

  if (output.borderWidth) {
    output.borderRightWidth = 0;
  }

  if (output.borderRadius) {
    output.borderTopLeftRadius = output.borderRadius;
    output.borderBottomLeftRadius = output.borderRadius;
    delete output.borderRadius;
  }

  if (output.margin) {
    output.marginRight = 0;
  }

  return output;
};

const createMiddleButtonHitboxStyleInstance = (
  splitButtonStyle: SplitButtonStyle<string>,
  splitButtonStateStyle: SplitButtonStateStyle
): ViewStyle => {
  const output = createSingleButtonHitboxStyleInstance(
    splitButtonStyle,
    splitButtonStateStyle
  );

  if (output.borderWidth) {
    output.borderTopWidth = output.borderWidth;
    output.borderBottomWidth = output.borderWidth;
    delete output.borderWidth;
  }

  if (output.margin) {
    output.marginVertical = output.margin;
    delete output.margin;
  }

  delete output.borderRadius;

  return output;
};

const createRightButtonHitboxStyleInstance = (
  splitButtonStyle: SplitButtonStyle<string>,
  splitButtonStateStyle: SplitButtonStateStyle
): ViewStyle => {
  const output = createSingleButtonHitboxStyleInstance(
    splitButtonStyle,
    splitButtonStateStyle
  );

  if (output.borderWidth) {
    output.borderLeftWidth = 0;
  }

  if (output.borderRadius) {
    output.borderTopRightRadius = output.borderRadius;
    output.borderBottomRightRadius = output.borderRadius;
    delete output.borderRadius;
  }

  if (output.margin) {
    output.marginLeft = 0;
  }

  return output;
};

const createButtonTextStyleInstance = (
  splitButtonStyle: SplitButtonStyle<string>,
  splitButtonStateStyle: SplitButtonStateStyle
): TextStyle => {
  return {
    fontFamily: splitButtonStyle.fontFamily,
    fontSize: splitButtonStyle.fontSize,
    lineHeight: splitButtonStyle.fontSize * 1.4,
    color: splitButtonStateStyle.color,
  };
};

type Instance<TValue extends null | number | string> = React.FunctionComponent<
  React.PropsWithChildren<{
    /**
     * The currently selected value.
     */
    readonly value: TValue;

    /**
     * Invoked when the selected value changes.
     * @param to The newly selected value.
     */
    onChange(to: TValue): void;
  }>
>;

type SegmentInstance<TValue extends null | number | string> =
  React.FunctionComponent<{
    /**
     * The value of the segment.
     */
    readonly value: TValue;

    /**
     * When true, the segment will style itself to appear disabled, and will not
     * accept user input.  It will otherwise style itself to appear enabled, and
     * will select the segment's value on press (assuming it is not already
     * selected).
     */
    readonly disabled: boolean;

    /**
     * The text to display within the segment.
     */
    readonly children: string;
  }>;

/**
 * Creates a new React component representing a split button.
 * @template TType         The types of segment within the button.
 * @template TValue        The value selected using the button.
 * @param splitButtonStyle The style to apply to the split button.
 * @returns                The created React component.
 */
export const createSplitButtonComponent = <
  TType extends string,
  TValue extends null | number | string
>(
  splitButtonStyle: SplitButtonStyle<TType>
): Instance<TValue> & {
  readonly segments: {
    readonly [TTypeItem in TType]: SegmentInstance<TValue>;
  };
} => {
  const styles = StyleSheet.create({
    view: {
      flexDirection: `row`,
      alignItems: `stretch`,
    },
  });

  const partialSegments: {
    [TTypeItem in TType]?: SegmentInstance<TValue>;
  } = {};

  const partialButtonFactories: {
    [TTypeItem in TType]?: (
      value: TValue,
      onChange: (to: TValue) => void,
      buttonPosition: `single` | `left` | `middle` | `right`,
      buttonValue: TValue,
      buttonLabel: string,
      buttonDisabled: boolean
    ) => JSX.Element;
  } = {};

  for (const typeKey in splitButtonStyle.types) {
    const typeValue = splitButtonStyle.types[typeKey];

    const typeStyles = StyleSheet.create({
      inactiveEnabledSingleHitbox: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled
      ),
      inactiveEnabledLeftHitbox: createLeftButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled
      ),
      inactiveEnabledMiddleHitbox: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled
      ),
      inactiveEnabledRightHitbox: createRightButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled
      ),
      inactiveEnabledText: createButtonTextStyleInstance(
        splitButtonStyle,
        typeValue.inactiveEnabled
      ),
      inactiveDisabledSingleHitbox: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled
      ),
      inactiveDisabledLeftHitbox: createLeftButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled
      ),
      inactiveDisabledMiddleHitbox: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled
      ),
      inactiveDisabledRightHitbox: createRightButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled
      ),
      inactiveDisabledText: createButtonTextStyleInstance(
        splitButtonStyle,
        typeValue.inactiveDisabled
      ),
      activeEnabledSingleHitbox: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled
      ),
      activeEnabledLeftHitbox: createLeftButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled
      ),
      activeEnabledMiddleHitbox: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled
      ),
      activeEnabledRightHitbox: createRightButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled
      ),
      activeEnabledText: createButtonTextStyleInstance(
        splitButtonStyle,
        typeValue.activeEnabled
      ),
      activeDisabledSingleHitbox: createSingleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled
      ),
      activeDisabledLeftHitbox: createLeftButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled
      ),
      activeDisabledMiddleHitbox: createMiddleButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled
      ),
      activeDisabledRightHitbox: createRightButtonHitboxStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled
      ),
      activeDisabledText: createButtonTextStyleInstance(
        splitButtonStyle,
        typeValue.activeDisabled
      ),
    });

    /* istanbul ignore next */
    partialSegments[typeKey] = () => null;

    partialButtonFactories[typeKey] = (
      value,
      onChange,
      buttonPosition,
      buttonValue,
      buttonLabel,
      buttonDisabled
    ) => {
      let hitboxStyle: ViewStyle;
      let textStyle: TextStyle;

      if (buttonValue === value) {
        if (buttonDisabled) {
          switch (buttonPosition) {
            case `single`:
              hitboxStyle = typeStyles.activeDisabledSingleHitbox;
              break;

            case `left`:
              hitboxStyle = typeStyles.activeDisabledLeftHitbox;
              break;

            case `middle`:
              hitboxStyle = typeStyles.activeDisabledMiddleHitbox;
              break;

            case `right`:
              hitboxStyle = typeStyles.activeDisabledRightHitbox;
              break;
          }

          textStyle = typeStyles.activeDisabledText;
        } else {
          switch (buttonPosition) {
            case `single`:
              hitboxStyle = typeStyles.activeEnabledSingleHitbox;
              break;

            case `left`:
              hitboxStyle = typeStyles.activeEnabledLeftHitbox;
              break;

            case `middle`:
              hitboxStyle = typeStyles.activeEnabledMiddleHitbox;
              break;

            case `right`:
              hitboxStyle = typeStyles.activeEnabledRightHitbox;
              break;
          }

          textStyle = typeStyles.activeEnabledText;
        }
      } else {
        if (buttonDisabled) {
          switch (buttonPosition) {
            case `single`:
              hitboxStyle = typeStyles.inactiveDisabledSingleHitbox;
              break;

            case `left`:
              hitboxStyle = typeStyles.inactiveDisabledLeftHitbox;
              break;

            case `middle`:
              hitboxStyle = typeStyles.inactiveDisabledMiddleHitbox;
              break;

            case `right`:
              hitboxStyle = typeStyles.inactiveDisabledRightHitbox;
              break;
          }

          textStyle = typeStyles.inactiveDisabledText;
        } else {
          switch (buttonPosition) {
            case `single`:
              hitboxStyle = typeStyles.inactiveEnabledSingleHitbox;
              break;

            case `left`:
              hitboxStyle = typeStyles.inactiveEnabledLeftHitbox;
              break;

            case `middle`:
              hitboxStyle = typeStyles.inactiveEnabledMiddleHitbox;
              break;

            case `right`:
              hitboxStyle = typeStyles.inactiveEnabledRightHitbox;
              break;
          }

          textStyle = typeStyles.inactiveEnabledText;
        }
      }

      return (
        <Hitbox
          key={String(buttonValue)}
          style={hitboxStyle}
          disabled={buttonDisabled || buttonValue === value}
          onPress={() => {
            onChange(buttonValue);
          }}
        >
          <Text style={textStyle} numberOfLines={1}>
            {buttonLabel}
          </Text>
        </Hitbox>
      );
    };
  }

  const segments = partialSegments as {
    readonly [TTypeItem in TType]: SegmentInstance<TValue>;
  };

  const buttonFactories: {
    readonly [TTypeItem in TType]: (
      value: TValue,
      onChange: (to: TValue) => void,
      buttonPosition: `single` | `left` | `middle` | `right`,
      buttonValue: TValue,
      buttonLabel: string,
      buttonDisabled: boolean
    ) => JSX.Element;
  } = partialButtonFactories as {
    [TTypeItem in TType]: (
      value: TValue,
      onChange: (to: TValue) => void,
      buttonPosition: `single` | `left` | `middle` | `right`,
      buttonValue: TValue,
      buttonLabel: string,
      buttonDisabled: boolean
    ) => JSX.Element;
  };

  const SplitButton: Instance<TValue> & {
    segments?: {
      readonly [TTypeItem in TType]: SegmentInstance<TValue>;
    };
  } = ({ value, onChange, children }) => {
    const childrenArray = flattenRenderedToArray(children);

    return (
      <View style={styles.view}>
        {childrenArray
          .filter((element): element is JSX.Element => element !== null)
          .map((element, i) => {
            if (typeof element === `object` && `type` in element) {
              for (const typeKey in segments) {
                if (segments[typeKey] === element.type) {
                  return buttonFactories[typeKey](
                    value,
                    onChange,
                    childrenArray.length === 1
                      ? `single`
                      : i === 0
                      ? `left`
                      : i === childrenArray.length - 1
                      ? `right`
                      : `middle`,
                    element.props[`value`],
                    element.props[`children`],
                    element.props[`disabled`]
                  );
                }
              }
            }

            throw new Error(`Unexpected child in split button.`);
          })}
      </View>
    );
  };

  SplitButton.segments = segments;

  return SplitButton as Instance<TValue> & {
    readonly segments: {
      readonly [TTypeItem in TType]: SegmentInstance<TValue>;
    };
  };
};
