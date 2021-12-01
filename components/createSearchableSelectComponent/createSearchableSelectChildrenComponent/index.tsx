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
});

export const createSearchableSelectChildrenComponent = <
  T extends null | number | string
>(
  controlStyle: ControlStyle
): Instance<T> & { readonly searchableSelectChildren: Introspection } => {
  const InputComponent = createInputComponent<string, null>(
    (value) => value,
    (value) => value.trim() || undefined,
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
    false
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
    blurredOptionText: {
      ...optionTextBase,
      color: controlStyle.blurredValid.textColor,
    },
    listEmptyText,
    ...(flatList === null ? {} : { flatList }),
  });

  const SearchableSelectChildren: Instance<T> & {
    searchableSelectChildren?: Introspection;
  } = ({
    options,
    selectedOption,
    placeholder,
    onChange,
    close,
    noMatchesText,
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

            const filteredOptions = sortedOptions.filter(({ label }) =>
              normalize(label).includes(normalizedParsed)
            );

            if (filteredOptions.length > 0) {
              onChange(filteredOptions[0]?.value as T);
              close();
            }
          }}
          context={null}
        />
      </View>
    );
  };

  SearchableSelectChildren.searchableSelectChildren = {
    controlStyle,
  };

  return SearchableSelectChildren as Instance<T> & {
    readonly searchableSelectChildren: Introspection;
  };
};
