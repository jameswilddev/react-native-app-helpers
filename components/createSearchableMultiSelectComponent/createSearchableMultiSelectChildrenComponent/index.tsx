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
  readonly placeholder: string;
  readonly values: ReadonlyArray<T>;
  onChange(to: ReadonlyArray<T>): void;
  close(): void;
  readonly noMatchesText: string;
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
  transparentText: {
    color: `transparent`,
  },
});

export const createSearchableMultiSelectChildrenComponent = <
  T extends null | number | string
>(
  controlStyle: ControlStyle
): Instance<T> & { readonly searchableMultiSelectChildren: Introspection } => {
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
    true,
    true
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

  if (controlStyle.paddingHorizontal !== 0) {
    optionTextBase.paddingHorizontal = controlStyle.paddingHorizontal;
    listEmptyText.paddingHorizontal = controlStyle.paddingHorizontal;
  }

  if (controlStyle.paddingVertical !== 0) {
    optionTextBase.paddingVertical = controlStyle.paddingVertical / 2;
    listEmptyText.paddingVertical = controlStyle.paddingVertical;
    flatList = {
      marginBottom: controlStyle.paddingVertical / -2,
    };
  }

  const localStyles = StyleSheet.create({
    focusedOptionText: {
      ...optionTextBase,
      color: controlStyle.focusedValid.textColor,
    },
    focusedCheckText: {
      color: controlStyle.focusedValid.textColor,
    },
    blurredOptionText: {
      ...optionTextBase,
      color: controlStyle.blurredValid.textColor,
    },
    listEmptyText,
    ...(flatList === null ? {} : { flatList }),
  });

  const SearchableMultiSelectChildren: Instance<T> & {
    searchableMultiSelectChildren?: Introspection;
  } = ({ options, placeholder, values, onChange, close, noMatchesText }) => {
    const [filter, setFilter] = React.useState(``);

    const normalizedFilter = normalize(filter);

    const sortedOptions = [...options].sort(({ label: a }, { label: b }) =>
      a.localeCompare(b)
    );

    let filteredOptions;

    if (normalizedFilter) {
      filteredOptions = sortedOptions.filter(({ label }) =>
        normalize(label).includes(normalizedFilter)
      );
    } else {
      filteredOptions = sortedOptions;
    }

    return (
      <View style={globalStyles.wrappingView}>
        <FlatList
          style={localStyles.flatList}
          data={filteredOptions}
          keyExtractor={(item) => String(item.value)}
          renderItem={({ item }) => {
            const index = values.indexOf(item.value);

            return (
              <Hitbox
                disabled={false}
                onPress={() => {
                  if (index === -1) {
                    onChange([...values, item.value]);
                  } else {
                    const valuesCopy = [...values];
                    valuesCopy.splice(index, 1);

                    onChange(valuesCopy);
                  }
                }}
              >
                <Text
                  style={
                    index === -1
                      ? localStyles.blurredOptionText
                      : localStyles.focusedOptionText
                  }
                >
                  <Text
                    style={
                      index === -1
                        ? globalStyles.transparentText
                        : localStyles.focusedCheckText
                    }
                  >
                    ✓
                  </Text>{" "}
                  {item.label}
                </Text>
              </Hitbox>
            );
          }}
          inverted
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <Text style={localStyles.listEmptyText}>{noMatchesText}</Text>
          }
        />
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
          placeholder={placeholder}
          onSubmit={(parsed) => {
            const normalizedParsed = normalize(parsed);

            if (normalizedParsed !== ``) {
              const filteredOptions = sortedOptions.filter(({ label }) =>
                normalize(label).includes(normalizedParsed)
              );

              if (filteredOptions.length > 0) {
                const firstMatchingOption = filteredOptions[0] as {
                  readonly value: T;
                };

                const index = values.indexOf(firstMatchingOption.value);

                if (index === -1) {
                  onChange([...values, firstMatchingOption.value]);
                } else {
                  const valuesCopy = [...values];
                  valuesCopy.splice(index, 1);

                  onChange(valuesCopy);
                }
              }
            }

            close();
          }}
          context={null}
        />
      </View>
    );
  };

  SearchableMultiSelectChildren.searchableMultiSelectChildren = {
    controlStyle,
  };

  return SearchableMultiSelectChildren as Instance<T> & {
    readonly searchableMultiSelectChildren: Introspection;
  };
};
