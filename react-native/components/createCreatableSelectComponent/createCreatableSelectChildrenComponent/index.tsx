import * as React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import type { ControlStyle } from "../../../types/ControlStyle";
import { createInputComponent } from "../../createInputComponent";
import { Hitbox } from "../../Hitbox";

type Instance<T extends null | number | string> = React.FunctionComponent<{
  readonly options: ReadonlyArray<{
    readonly value: T;
    readonly label: string;
  }>;
  readonly selectedOption: null | { readonly value: T; readonly label: string };
  readonly placeholder: string;
  onChange(to: T): void;
  onCreate(label: string): void;
  close(): void;
  readonly noMatchesText: string;
  readonly willCreateText: string;
}>;

type Introspection = {
  readonly controlStyle: ControlStyle;
};

const normalize = (value: string) =>
  value.trim().replace(/\s+/g, ` `).toLowerCase();

const globalStyles = StyleSheet.create({
  wrappingView: {
    flex: 1,
  },
});

export const createCreatableSelectChildrenComponent = <
  T extends null | number | string
>(
  controlStyle: ControlStyle
): Instance<T> & { readonly creatableSelectChildren: Introspection } => {
  const InputComponent = createInputComponent<string, null>(
    (value) => value,
    (value) => value.trim(),
    {
      ...controlStyle,
      blurredInvalid: {
        ...controlStyle.blurredInvalid,
        border: null,
        radius: 0,
      },
      blurredValid: { ...controlStyle.blurredValid, border: null, radius: 0 },
      focusedInvalid: {
        ...controlStyle.focusedInvalid,
        border: null,
        radius: 0,
      },
      focusedValid: { ...controlStyle.focusedValid, border: null, radius: 0 },
      disabledInvalid: {
        ...controlStyle.disabledInvalid,
        border: null,
        radius: 0,
      },
      disabledValid: { ...controlStyle.disabledValid, border: null, radius: 0 },
    },
    false,
    `off`,
    `default`,
    `sentences`,
    true,
    false,
    `left`
  );

  let flatList: null | ViewStyle = null;

  const optionTextBase: TextStyle = {
    fontFamily: controlStyle.fontFamily,
    fontSize: controlStyle.fontSize,
    lineHeight: controlStyle.fontSize * 1.4,
  };

  const listEmptyText: TextStyle = {
    fontFamily: controlStyle.fontFamily,
    fontSize: controlStyle.fontSize,
    lineHeight: controlStyle.fontSize * 1.4,
    color: controlStyle.focusedValid.placeholderColor,
  };

  const willCreateTextStyle: TextStyle = {
    fontFamily: controlStyle.fontFamily,
    fontSize: controlStyle.fontSize,
    lineHeight: controlStyle.fontSize * 1.4,
    color: controlStyle.focusedValid.placeholderColor,
  };

  if (controlStyle.paddingHorizontal !== 0) {
    optionTextBase.paddingHorizontal = controlStyle.paddingHorizontal;
    listEmptyText.paddingHorizontal = controlStyle.paddingHorizontal;
    willCreateTextStyle.paddingHorizontal = controlStyle.paddingHorizontal;
  }

  if (controlStyle.paddingVertical !== 0) {
    optionTextBase.paddingVertical = controlStyle.paddingVertical / 2;
    listEmptyText.paddingVertical = controlStyle.paddingVertical;
    willCreateTextStyle.paddingTop = controlStyle.paddingVertical;
    flatList = {
      marginBottom: controlStyle.paddingVertical / -2,
    };
  }

  const localStyles = StyleSheet.create({
    focusedOptionText: {
      ...optionTextBase,
      color: controlStyle.focusedValid.textColor,
    },
    blurredOptionText: {
      ...optionTextBase,
      color: controlStyle.blurredValid.textColor,
    },
    listEmptyText,
    ...(flatList === null ? {} : { flatList }),
    willCreateText: willCreateTextStyle,
  });

  const CreatableSelectChildren: Instance<T> & {
    creatableSelectChildren?: Introspection;
  } = ({
    options,
    selectedOption,
    placeholder,
    onChange,
    onCreate,
    close,
    noMatchesText,
    willCreateText,
  }) => {
    const [filter, setFilter] = React.useState(``);

    const normalizedFilter = normalize(filter);

    const sortedOptions = [...options].sort(({ label: a }, { label: b }) =>
      a.localeCompare(b, [], { numeric: true })
    );

    let filteredOptions;

    if (normalizedFilter) {
      filteredOptions = sortedOptions.filter(({ label }) =>
        normalize(label).includes(normalizedFilter)
      );
    } else {
      filteredOptions = sortedOptions;
    }

    const willCreate =
      normalizedFilter !== `` &&
      options.every(({ label }) => normalize(label) !== normalizedFilter);

    return (
      <View style={globalStyles.wrappingView}>
        <FlatList
          style={localStyles.flatList}
          data={filteredOptions}
          keyExtractor={(item) => String(item.value)}
          renderItem={({ item }) =>
            selectedOption !== null && item.value === selectedOption.value ? (
              <Text style={localStyles.focusedOptionText}>{item.label}</Text>
            ) : (
              <Hitbox
                disabled={false}
                onPress={() => {
                  onChange(item.value);
                  close();
                }}
              >
                <Text style={localStyles.blurredOptionText}>{item.label}</Text>
              </Hitbox>
            )
          }
          inverted
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <Text style={localStyles.listEmptyText}>{noMatchesText}</Text>
          }
        />
        {willCreate ? (
          <Text style={localStyles.willCreateText}>{willCreateText}</Text>
        ) : null}
        <InputComponent
          leftIcon={null}
          rightIcon={null}
          value={filter}
          onChange={(parsed, complete) => {
            complete;

            if (parsed !== undefined) {
              setFilter(parsed);
            }
          }}
          secureTextEntry={false}
          disabled={false}
          placeholder={
            selectedOption === null ? placeholder : selectedOption.label
          }
          onSubmit={(parsed) => {
            const normalizedParsed = normalize(parsed);

            const matchingOption = sortedOptions.find(
              ({ label }) => normalize(label) === normalizedParsed
            );

            if (matchingOption === undefined) {
              onCreate(parsed);
              close();
            } else {
              onChange(matchingOption.value);
              close();
            }
          }}
          context={null}
        />
      </View>
    );
  };

  CreatableSelectChildren.creatableSelectChildren = {
    controlStyle,
  };

  return CreatableSelectChildren as Instance<T> & {
    readonly creatableSelectChildren: Introspection;
  };
};
