import * as React from "react";
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  Text,
  View,
} from "react-native";
import * as TestRenderer from "react-test-renderer";
import { createSearchableMultiSelectChildrenComponent } from ".";
import { Hitbox } from "../../Hitbox";

type TestValue = 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100 | 110 | 120;

test(`renders as expected without a filter`, () => {
  const Component = createSearchableMultiSelectChildrenComponent<TestValue>({
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 5,
      border: {
        width: 4,
        color: `#FF00FF`,
      },
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 6,
        color: `#9A9A8E`,
      },
    },
    focusedValid: {
      textColor: `#55EA13`,
      placeholderColor: `#273346`,
      backgroundColor: `#CABA99`,
      radius: 3,
      border: {
        width: 5,
        color: `#646464`,
      },
    },
    focusedInvalid: {
      textColor: `#ABAADE`,
      placeholderColor: `#47ADAD`,
      backgroundColor: `#32AA88`,
      radius: 47,
      border: {
        width: 12,
        color: `#98ADAA`,
      },
    },
    disabledValid: {
      textColor: `#AE2195`,
      placeholderColor: `#FFAAEE`,
      backgroundColor: `#772728`,
      radius: 100,
      border: {
        width: 14,
        color: `#5E5E5E`,
      },
    },
    disabledInvalid: {
      textColor: `#340297`,
      placeholderColor: `#233832`,
      backgroundColor: `#938837`,
      radius: 2,
      border: {
        width: 19,
        color: `#573829`,
      },
    },
  });
  const onChange = jest.fn();
  const close = jest.fn();
  const stub = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option D Label`,
        },
        {
          value: 40,
          label: `Example Option F Label`,
        },
        {
          value: 110,
          label: `Example Option H Label`,
        },
        {
          value: 90,
          label: `Example Option G Label`,
        },
        {
          value: 60,
          label: `Example Option B Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ]}
      values={[50, 20, 10, 30]}
      placeholder="Example Placeholder"
      onChange={onChange}
      close={close}
      noMatchesText="Example No Matches Text"
    />
  );

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: View,
    props: {
      style: { flex: 1 },
      children: [
        expect.objectContaining({
          type: FlatList,
          props: {
            style: { marginBottom: -6 },
            inverted: true,
            data: [
              {
                value: 10,
                label: `Example Option A Label`,
              },
              {
                value: 60,
                label: `Example Option B Label`,
              },
              {
                value: 30,
                label: `Example Option C Label`,
              },
              {
                value: 20,
                label: `Example Option D Label`,
              },
              {
                value: 40,
                label: `Example Option F Label`,
              },
              {
                value: 90,
                label: `Example Option G Label`,
              },
              {
                value: 110,
                label: `Example Option H Label`,
              },
            ],
            keyExtractor: expect.any(Function),
            renderItem: expect.any(Function),
            keyboardShouldPersistTaps: `handled`,
            ListEmptyComponent: expect.objectContaining({
              type: Text,
              props: {
                style: {
                  fontFamily: `Example Font Family`,
                  fontSize: 37,
                  lineHeight: 51.8,
                  color: `#273346`,
                  paddingHorizontal: 29,
                  paddingVertical: 12,
                },
                children: `Example No Matches Text`,
              },
            }),
          },
        }),
        expect.objectContaining({
          props: {
            leftIcon: null,
            rightIcon: null,
            value: ``,
            onChange: expect.any(Function),
            secureTextEntry: false,
            disabled: false,
            placeholder: `Example Placeholder`,
            onSubmit: expect.any(Function),
            context: null,
          },
        }),
      ],
    },
  });

  const flatListProps: FlatListProps<unknown> = (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props[`children`][0].props;

  expect(
    (flatListProps.keyExtractor as (item: unknown, index: number) => string)(
      {
        value: 30,
        label: `Example Label`,
      },
      123
    )
  ).toEqual(`30`);

  const unselectedItem = (flatListProps.renderItem as ListRenderItem<unknown>)({
    item: {
      value: 40,
      label: `Example Label`,
    },
    index: 123,
    separators: {
      highlight: stub,
      unhighlight: stub,
      updateProps: stub,
    },
  });

  expect(unselectedItem).toMatchObject({
    type: Hitbox,
    props: {
      disabled: false,
      onPress: expect.any(Function),
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 37,
            lineHeight: 51.8,
            color: `#FFEE00`,
            paddingHorizontal: 29,
            paddingVertical: 6,
          },
          children: [
            expect.objectContaining({
              type: Text,
              props: {
                style: { color: `transparent` },
                children: `✓`,
              },
            }),
            ` `,
            `Example Label`,
          ],
        },
      }),
    },
  });

  const selectedItem = (flatListProps.renderItem as ListRenderItem<unknown>)({
    item: {
      value: 30,
      label: `Example Label`,
    },
    index: 123,
    separators: {
      highlight: stub,
      unhighlight: stub,
      updateProps: stub,
    },
  });

  expect(selectedItem).toMatchObject({
    type: Hitbox,
    props: {
      disabled: false,
      onPress: expect.any(Function),
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 37,
            lineHeight: 51.8,
            color: `#55EA13`,
            paddingHorizontal: 29,
            paddingVertical: 6,
          },
          children: [
            expect.objectContaining({
              type: Text,
              props: {
                style: { color: `#55EA13` },
                children: `✓`,
              },
            }),
            ` `,
            `Example Label`,
          ],
        },
      }),
    },
  });

  const inputType = (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props[`children`][1].type;

  expect(inputType).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle: {
        fontFamily: `Example Font Family`,
        fontSize: 37,
        paddingVertical: 12,
        paddingHorizontal: 29,
        blurredValid: {
          textColor: `#FFEE00`,
          placeholderColor: `#E7AA32`,
          backgroundColor: `#32AE12`,
          radius: 0,
          border: null,
        },
        blurredInvalid: {
          textColor: `#99FE88`,
          placeholderColor: `#CACA3A`,
          backgroundColor: `#259284`,
          radius: 0,
          border: null,
        },
        focusedValid: {
          textColor: `#55EA13`,
          placeholderColor: `#273346`,
          backgroundColor: `#CABA99`,
          radius: 0,
          border: null,
        },
        focusedInvalid: {
          textColor: `#ABAADE`,
          placeholderColor: `#47ADAD`,
          backgroundColor: `#32AA88`,
          radius: 0,
          border: null,
        },
        disabledValid: {
          textColor: `#AE2195`,
          placeholderColor: `#FFAAEE`,
          backgroundColor: `#772728`,
          radius: 0,
          border: null,
        },
        disabledInvalid: {
          textColor: `#340297`,
          placeholderColor: `#233832`,
          backgroundColor: `#938837`,
          radius: 0,
          border: null,
        },
      },
      multiLine: false,
      autoComplete: `off`,
      keyboardType: `default`,
      autoFocus: true,
      keepFocusOnSubmit: true,
    },
  });

  expect(inputType.inputComponent.stringify(`Example Text`)).toEqual(
    `Example Text`
  );

  expect(inputType.inputComponent.tryParse(``)).toEqual(``);
  expect(inputType.inputComponent.tryParse(`   \n     \r     \t    `)).toEqual(
    ``
  );
  expect(
    inputType.inputComponent.tryParse(
      `   \n     \r     \t     \n  Example Text   \n \r    \t `
    )
  ).toEqual(`Example Text`);

  renderer.unmount();
  expect(onChange).not.toHaveBeenCalled();
  expect(close).not.toHaveBeenCalled();
  expect(stub).not.toHaveBeenCalled();
});

test(`filters the list down to only those matching the user's input`, () => {
  const Component = createSearchableMultiSelectChildrenComponent<TestValue>({
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 5,
      border: {
        width: 4,
        color: `#FF00FF`,
      },
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 6,
        color: `#9A9A8E`,
      },
    },
    focusedValid: {
      textColor: `#55EA13`,
      placeholderColor: `#273346`,
      backgroundColor: `#CABA99`,
      radius: 3,
      border: {
        width: 5,
        color: `#646464`,
      },
    },
    focusedInvalid: {
      textColor: `#ABAADE`,
      placeholderColor: `#47ADAD`,
      backgroundColor: `#32AA88`,
      radius: 47,
      border: {
        width: 12,
        color: `#98ADAA`,
      },
    },
    disabledValid: {
      textColor: `#AE2195`,
      placeholderColor: `#FFAAEE`,
      backgroundColor: `#772728`,
      radius: 100,
      border: {
        width: 14,
        color: `#5E5E5E`,
      },
    },
    disabledInvalid: {
      textColor: `#340297`,
      placeholderColor: `#233832`,
      backgroundColor: `#938837`,
      radius: 2,
      border: {
        width: 19,
        color: `#573829`,
      },
    },
  });
  const onChange = jest.fn();
  const close = jest.fn();
  const stub = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option D Label`,
        },
        {
          value: 40,
          label: `Example Option F Label`,
        },
        {
          value: 110,
          label: `Example Option H Label`,
        },
        {
          value: 90,
          label: `Example Option G \t RED \r apple \n Label`,
        },
        {
          value: 60,
          label: `Example Option B  \n \n \r red \t \r APPLE \n \r \t Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ]}
      values={[50, 20, 10, 30]}
      placeholder="Example Placeholder"
      onChange={onChange}
      close={close}
      noMatchesText="Example No Matches Text"
    />
  );

  TestRenderer.act(() => {
    (
      (renderer.toTree() as TestRenderer.ReactTestRendererTree)
        .rendered as TestRenderer.ReactTestRendererTree
    ).props[`children`][1].props.onChange(
      `  \n  \t \r  ReD    \n \n \r \t  APPle \t \n \r`
    );
  });

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: View,
    props: {
      style: { flex: 1 },
      children: [
        expect.objectContaining({
          type: FlatList,
          props: {
            style: { marginBottom: -6 },
            inverted: true,
            data: [
              {
                value: 60,
                label: `Example Option B  \n \n \r red \t \r APPLE \n \r \t Label`,
              },
              {
                value: 90,
                label: `Example Option G \t RED \r apple \n Label`,
              },
            ],
            keyExtractor: expect.any(Function),
            renderItem: expect.any(Function),
            keyboardShouldPersistTaps: `handled`,
            ListEmptyComponent: expect.objectContaining({
              type: Text,
              props: {
                style: {
                  fontFamily: `Example Font Family`,
                  fontSize: 37,
                  lineHeight: 51.8,
                  color: `#273346`,
                  paddingHorizontal: 29,
                  paddingVertical: 12,
                },
                children: `Example No Matches Text`,
              },
            }),
          },
        }),
        expect.objectContaining({
          props: {
            leftIcon: null,
            rightIcon: null,
            value: `  \n  \t \r  ReD    \n \n \r \t  APPle \t \n \r`,
            onChange: expect.any(Function),
            secureTextEntry: false,
            disabled: false,
            placeholder: `Example Placeholder`,
            onSubmit: expect.any(Function),
            context: null,
          },
        }),
      ],
    },
  });

  renderer.unmount();
  expect(onChange).not.toHaveBeenCalled();
  expect(close).not.toHaveBeenCalled();
  expect(stub).not.toHaveBeenCalled();
});

test(`selects items on press`, () => {
  const Component = createSearchableMultiSelectChildrenComponent<TestValue>({
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 5,
      border: {
        width: 4,
        color: `#FF00FF`,
      },
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 6,
        color: `#9A9A8E`,
      },
    },
    focusedValid: {
      textColor: `#55EA13`,
      placeholderColor: `#273346`,
      backgroundColor: `#CABA99`,
      radius: 3,
      border: {
        width: 5,
        color: `#646464`,
      },
    },
    focusedInvalid: {
      textColor: `#ABAADE`,
      placeholderColor: `#47ADAD`,
      backgroundColor: `#32AA88`,
      radius: 47,
      border: {
        width: 12,
        color: `#98ADAA`,
      },
    },
    disabledValid: {
      textColor: `#AE2195`,
      placeholderColor: `#FFAAEE`,
      backgroundColor: `#772728`,
      radius: 100,
      border: {
        width: 14,
        color: `#5E5E5E`,
      },
    },
    disabledInvalid: {
      textColor: `#340297`,
      placeholderColor: `#233832`,
      backgroundColor: `#938837`,
      radius: 2,
      border: {
        width: 19,
        color: `#573829`,
      },
    },
  });
  const onChange = jest.fn();
  const close = jest.fn();
  const stub = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option D Label`,
        },
        {
          value: 40,
          label: `Example Option F Label`,
        },
        {
          value: 110,
          label: `Example Option H Label`,
        },
        {
          value: 90,
          label: `Example Option G \t RED \r apple \n Label`,
        },
        {
          value: 60,
          label: `Example Option B  \n \n \r red \t \r APPLE \n \r \t Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ]}
      values={[50, 20, 10, 30]}
      placeholder="Example Placeholder"
      onChange={onChange}
      close={close}
      noMatchesText="Example No Matches Text"
    />
  );

  const flatListProps: FlatListProps<unknown> = (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props[`children`][0].props;

  const unselectedItem = (flatListProps.renderItem as ListRenderItem<unknown>)({
    item: {
      value: 90,
      label: `Example Label`,
    },
    index: 123,
    separators: {
      highlight: stub,
      unhighlight: stub,
      updateProps: stub,
    },
  });

  unselectedItem?.props.onPress();

  renderer.unmount();
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith([50, 20, 10, 30, 90]);
  expect(close).not.toHaveBeenCalled();
  expect(stub).not.toHaveBeenCalled();
});

test(`deselects items on press`, () => {
  const Component = createSearchableMultiSelectChildrenComponent<TestValue>({
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 5,
      border: {
        width: 4,
        color: `#FF00FF`,
      },
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 6,
        color: `#9A9A8E`,
      },
    },
    focusedValid: {
      textColor: `#55EA13`,
      placeholderColor: `#273346`,
      backgroundColor: `#CABA99`,
      radius: 3,
      border: {
        width: 5,
        color: `#646464`,
      },
    },
    focusedInvalid: {
      textColor: `#ABAADE`,
      placeholderColor: `#47ADAD`,
      backgroundColor: `#32AA88`,
      radius: 47,
      border: {
        width: 12,
        color: `#98ADAA`,
      },
    },
    disabledValid: {
      textColor: `#AE2195`,
      placeholderColor: `#FFAAEE`,
      backgroundColor: `#772728`,
      radius: 100,
      border: {
        width: 14,
        color: `#5E5E5E`,
      },
    },
    disabledInvalid: {
      textColor: `#340297`,
      placeholderColor: `#233832`,
      backgroundColor: `#938837`,
      radius: 2,
      border: {
        width: 19,
        color: `#573829`,
      },
    },
  });
  const onChange = jest.fn();
  const close = jest.fn();
  const stub = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option D Label`,
        },
        {
          value: 40,
          label: `Example Option F Label`,
        },
        {
          value: 110,
          label: `Example Option H Label`,
        },
        {
          value: 90,
          label: `Example Option G \t RED \r apple \n Label`,
        },
        {
          value: 60,
          label: `Example Option B  \n \n \r red \t \r APPLE \n \r \t Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ]}
      values={[50, 20, 10, 30]}
      placeholder="Example Placeholder"
      onChange={onChange}
      close={close}
      noMatchesText="Example No Matches Text"
    />
  );

  const flatListProps: FlatListProps<unknown> = (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props[`children`][0].props;

  const selectedItem = (flatListProps.renderItem as ListRenderItem<unknown>)({
    item: {
      value: 20,
      label: `Example Label`,
    },
    index: 123,
    separators: {
      highlight: stub,
      unhighlight: stub,
      updateProps: stub,
    },
  });

  selectedItem?.props.onPress();

  renderer.unmount();
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith([50, 10, 30]);
  expect(close).not.toHaveBeenCalled();
  expect(stub).not.toHaveBeenCalled();
});

test(`closes the select when submitting without any input`, () => {
  const Component = createSearchableMultiSelectChildrenComponent<TestValue>({
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 5,
      border: {
        width: 4,
        color: `#FF00FF`,
      },
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 6,
        color: `#9A9A8E`,
      },
    },
    focusedValid: {
      textColor: `#55EA13`,
      placeholderColor: `#273346`,
      backgroundColor: `#CABA99`,
      radius: 3,
      border: {
        width: 5,
        color: `#646464`,
      },
    },
    focusedInvalid: {
      textColor: `#ABAADE`,
      placeholderColor: `#47ADAD`,
      backgroundColor: `#32AA88`,
      radius: 47,
      border: {
        width: 12,
        color: `#98ADAA`,
      },
    },
    disabledValid: {
      textColor: `#AE2195`,
      placeholderColor: `#FFAAEE`,
      backgroundColor: `#772728`,
      radius: 100,
      border: {
        width: 14,
        color: `#5E5E5E`,
      },
    },
    disabledInvalid: {
      textColor: `#340297`,
      placeholderColor: `#233832`,
      backgroundColor: `#938837`,
      radius: 2,
      border: {
        width: 19,
        color: `#573829`,
      },
    },
  });
  const onChange = jest.fn();
  const close = jest.fn();
  const stub = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option D Label`,
        },
        {
          value: 40,
          label: `Example Option F Label`,
        },
        {
          value: 110,
          label: `Example Option H Label`,
        },
        {
          value: 90,
          label: `Example Option G \t RED \r apple \n Label`,
        },
        {
          value: 60,
          label: `Example Option B  \n \n \r red \t \r APPLE \n \r \t Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ]}
      values={[50, 20, 10, 30]}
      placeholder="Example Placeholder"
      onChange={onChange}
      close={close}
      noMatchesText="Example No Matches Text"
    />
  );

  (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props[`children`][1].props.onSubmit(
    `  \n  \t \r      \n \n \r \t   \t \n \r`
  );

  renderer.unmount();
  expect(onChange).not.toHaveBeenCalled();
  expect(close).toHaveBeenCalledTimes(1);
  expect(stub).not.toHaveBeenCalled();
});

test(`selects the first matching item on submitting`, () => {
  const Component = createSearchableMultiSelectChildrenComponent<TestValue>({
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 5,
      border: {
        width: 4,
        color: `#FF00FF`,
      },
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 6,
        color: `#9A9A8E`,
      },
    },
    focusedValid: {
      textColor: `#55EA13`,
      placeholderColor: `#273346`,
      backgroundColor: `#CABA99`,
      radius: 3,
      border: {
        width: 5,
        color: `#646464`,
      },
    },
    focusedInvalid: {
      textColor: `#ABAADE`,
      placeholderColor: `#47ADAD`,
      backgroundColor: `#32AA88`,
      radius: 47,
      border: {
        width: 12,
        color: `#98ADAA`,
      },
    },
    disabledValid: {
      textColor: `#AE2195`,
      placeholderColor: `#FFAAEE`,
      backgroundColor: `#772728`,
      radius: 100,
      border: {
        width: 14,
        color: `#5E5E5E`,
      },
    },
    disabledInvalid: {
      textColor: `#340297`,
      placeholderColor: `#233832`,
      backgroundColor: `#938837`,
      radius: 2,
      border: {
        width: 19,
        color: `#573829`,
      },
    },
  });
  const onChange = jest.fn();
  const close = jest.fn();
  const stub = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option D Label`,
        },
        {
          value: 40,
          label: `Example Option F Label`,
        },
        {
          value: 110,
          label: `Example Option H Label`,
        },
        {
          value: 90,
          label: `Example Option G \t RED \r apple \n Label`,
        },
        {
          value: 60,
          label: `Example Option B  \n \n \r red \t \r APPLE \n \r \t Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ]}
      values={[50, 20, 10, 30]}
      placeholder="Example Placeholder"
      onChange={onChange}
      close={close}
      noMatchesText="Example No Matches Text"
    />
  );

  (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props[`children`][1].props.onSubmit(
    `  \n  \t \r  ReD    \n \n \r \t  APPle \t \n \r`
  );

  renderer.unmount();
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith([50, 20, 10, 30, 60]);
  expect(close).toHaveBeenCalledTimes(1);
  expect(stub).not.toHaveBeenCalled();
});

test(`deselects the first matching item on submitting`, () => {
  const Component = createSearchableMultiSelectChildrenComponent<TestValue>({
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 5,
      border: {
        width: 4,
        color: `#FF00FF`,
      },
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 6,
        color: `#9A9A8E`,
      },
    },
    focusedValid: {
      textColor: `#55EA13`,
      placeholderColor: `#273346`,
      backgroundColor: `#CABA99`,
      radius: 3,
      border: {
        width: 5,
        color: `#646464`,
      },
    },
    focusedInvalid: {
      textColor: `#ABAADE`,
      placeholderColor: `#47ADAD`,
      backgroundColor: `#32AA88`,
      radius: 47,
      border: {
        width: 12,
        color: `#98ADAA`,
      },
    },
    disabledValid: {
      textColor: `#AE2195`,
      placeholderColor: `#FFAAEE`,
      backgroundColor: `#772728`,
      radius: 100,
      border: {
        width: 14,
        color: `#5E5E5E`,
      },
    },
    disabledInvalid: {
      textColor: `#340297`,
      placeholderColor: `#233832`,
      backgroundColor: `#938837`,
      radius: 2,
      border: {
        width: 19,
        color: `#573829`,
      },
    },
  });
  const onChange = jest.fn();
  const close = jest.fn();
  const stub = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option D Label`,
        },
        {
          value: 40,
          label: `Example Option F Label`,
        },
        {
          value: 110,
          label: `Example Option H Label`,
        },
        {
          value: 90,
          label: `Example Option G \t RED \r apple \n Label`,
        },
        {
          value: 60,
          label: `Example Option B  \n \n \r red \t \r APPLE \n \r \t Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ]}
      values={[50, 20, 60, 30]}
      placeholder="Example Placeholder"
      onChange={onChange}
      close={close}
      noMatchesText="Example No Matches Text"
    />
  );

  (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props[`children`][1].props.onSubmit(
    `  \n  \t \r  ReD    \n \n \r \t  APPle \t \n \r`
  );

  renderer.unmount();
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith([50, 20, 30]);
  expect(close).toHaveBeenCalledTimes(1);
  expect(stub).not.toHaveBeenCalled();
});

test(`closes the select when submitting without matches`, () => {
  const Component = createSearchableMultiSelectChildrenComponent<TestValue>({
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 5,
      border: {
        width: 4,
        color: `#FF00FF`,
      },
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 6,
        color: `#9A9A8E`,
      },
    },
    focusedValid: {
      textColor: `#55EA13`,
      placeholderColor: `#273346`,
      backgroundColor: `#CABA99`,
      radius: 3,
      border: {
        width: 5,
        color: `#646464`,
      },
    },
    focusedInvalid: {
      textColor: `#ABAADE`,
      placeholderColor: `#47ADAD`,
      backgroundColor: `#32AA88`,
      radius: 47,
      border: {
        width: 12,
        color: `#98ADAA`,
      },
    },
    disabledValid: {
      textColor: `#AE2195`,
      placeholderColor: `#FFAAEE`,
      backgroundColor: `#772728`,
      radius: 100,
      border: {
        width: 14,
        color: `#5E5E5E`,
      },
    },
    disabledInvalid: {
      textColor: `#340297`,
      placeholderColor: `#233832`,
      backgroundColor: `#938837`,
      radius: 2,
      border: {
        width: 19,
        color: `#573829`,
      },
    },
  });
  const onChange = jest.fn();
  const close = jest.fn();
  const stub = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option D Label`,
        },
        {
          value: 40,
          label: `Example Option F Label`,
        },
        {
          value: 110,
          label: `Example Option H Label`,
        },
        {
          value: 90,
          label: `Example Option G \t RED \r apple \n Label`,
        },
        {
          value: 60,
          label: `Example Option B  \n \n \r red \t \r APPLE \n \r \t Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ]}
      values={[50, 20, 10, 30]}
      placeholder="Example Placeholder"
      onChange={onChange}
      close={close}
      noMatchesText="Example No Matches Text"
    />
  );

  (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props[`children`][1].props.onSubmit(
    `  \n  \t \r  GrEEn    \n \n \r \t  APPle \t \n \r`
  );

  renderer.unmount();
  expect(onChange).not.toHaveBeenCalled();
  expect(close).toHaveBeenCalledTimes(1);
  expect(stub).not.toHaveBeenCalled();
});

test(`renders as expected without horizontal padding`, () => {
  const Component = createSearchableMultiSelectChildrenComponent<TestValue>({
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 0,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 5,
      border: {
        width: 4,
        color: `#FF00FF`,
      },
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 6,
        color: `#9A9A8E`,
      },
    },
    focusedValid: {
      textColor: `#55EA13`,
      placeholderColor: `#273346`,
      backgroundColor: `#CABA99`,
      radius: 3,
      border: {
        width: 5,
        color: `#646464`,
      },
    },
    focusedInvalid: {
      textColor: `#ABAADE`,
      placeholderColor: `#47ADAD`,
      backgroundColor: `#32AA88`,
      radius: 47,
      border: {
        width: 12,
        color: `#98ADAA`,
      },
    },
    disabledValid: {
      textColor: `#AE2195`,
      placeholderColor: `#FFAAEE`,
      backgroundColor: `#772728`,
      radius: 100,
      border: {
        width: 14,
        color: `#5E5E5E`,
      },
    },
    disabledInvalid: {
      textColor: `#340297`,
      placeholderColor: `#233832`,
      backgroundColor: `#938837`,
      radius: 2,
      border: {
        width: 19,
        color: `#573829`,
      },
    },
  });
  const onChange = jest.fn();
  const close = jest.fn();
  const stub = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option D Label`,
        },
        {
          value: 40,
          label: `Example Option F Label`,
        },
        {
          value: 110,
          label: `Example Option H Label`,
        },
        {
          value: 90,
          label: `Example Option G Label`,
        },
        {
          value: 60,
          label: `Example Option B Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ]}
      values={[50, 20, 10, 30]}
      placeholder="Example Placeholder"
      onChange={onChange}
      close={close}
      noMatchesText="Example No Matches Text"
    />
  );

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: View,
    props: {
      style: { flex: 1 },
      children: [
        expect.objectContaining({
          type: FlatList,
          props: {
            style: { marginBottom: -6 },
            inverted: true,
            data: [
              {
                value: 10,
                label: `Example Option A Label`,
              },
              {
                value: 60,
                label: `Example Option B Label`,
              },
              {
                value: 30,
                label: `Example Option C Label`,
              },
              {
                value: 20,
                label: `Example Option D Label`,
              },
              {
                value: 40,
                label: `Example Option F Label`,
              },
              {
                value: 90,
                label: `Example Option G Label`,
              },
              {
                value: 110,
                label: `Example Option H Label`,
              },
            ],
            keyExtractor: expect.any(Function),
            renderItem: expect.any(Function),
            keyboardShouldPersistTaps: `handled`,
            ListEmptyComponent: expect.objectContaining({
              type: Text,
              props: {
                style: {
                  fontFamily: `Example Font Family`,
                  fontSize: 37,
                  lineHeight: 51.8,
                  color: `#273346`,
                  paddingVertical: 12,
                },
                children: `Example No Matches Text`,
              },
            }),
          },
        }),
        expect.objectContaining({
          props: {
            leftIcon: null,
            rightIcon: null,
            value: ``,
            onChange: expect.any(Function),
            secureTextEntry: false,
            disabled: false,
            placeholder: `Example Placeholder`,
            onSubmit: expect.any(Function),
            context: null,
          },
        }),
      ],
    },
  });

  const flatListProps: FlatListProps<unknown> = (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props[`children`][0].props;

  expect(
    (flatListProps.keyExtractor as (item: unknown, index: number) => string)(
      {
        value: 30,
        label: `Example Label`,
      },
      123
    )
  ).toEqual(`30`);

  const unselectedItem = (flatListProps.renderItem as ListRenderItem<unknown>)({
    item: {
      value: 40,
      label: `Example Label`,
    },
    index: 123,
    separators: {
      highlight: stub,
      unhighlight: stub,
      updateProps: stub,
    },
  });

  expect(unselectedItem).toMatchObject({
    type: Hitbox,
    props: {
      disabled: false,
      onPress: expect.any(Function),
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 37,
            lineHeight: 51.8,
            color: `#FFEE00`,
            paddingVertical: 6,
          },
          children: [
            expect.objectContaining({
              type: Text,
              props: {
                style: { color: `transparent` },
                children: `✓`,
              },
            }),
            ` `,
            `Example Label`,
          ],
        },
      }),
    },
  });

  const selectedItem = (flatListProps.renderItem as ListRenderItem<unknown>)({
    item: {
      value: 30,
      label: `Example Label`,
    },
    index: 123,
    separators: {
      highlight: stub,
      unhighlight: stub,
      updateProps: stub,
    },
  });

  expect(selectedItem).toMatchObject({
    type: Hitbox,
    props: {
      disabled: false,
      onPress: expect.any(Function),
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 37,
            lineHeight: 51.8,
            color: `#55EA13`,
            paddingVertical: 6,
          },
          children: [
            expect.objectContaining({
              type: Text,
              props: {
                style: { color: `#55EA13` },
                children: `✓`,
              },
            }),
            ` `,
            `Example Label`,
          ],
        },
      }),
    },
  });

  const inputType = (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props[`children`][1].type;

  expect(inputType).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle: {
        fontFamily: `Example Font Family`,
        fontSize: 37,
        paddingVertical: 12,
        blurredValid: {
          textColor: `#FFEE00`,
          placeholderColor: `#E7AA32`,
          backgroundColor: `#32AE12`,
          radius: 0,
          border: null,
        },
        blurredInvalid: {
          textColor: `#99FE88`,
          placeholderColor: `#CACA3A`,
          backgroundColor: `#259284`,
          radius: 0,
          border: null,
        },
        focusedValid: {
          textColor: `#55EA13`,
          placeholderColor: `#273346`,
          backgroundColor: `#CABA99`,
          radius: 0,
          border: null,
        },
        focusedInvalid: {
          textColor: `#ABAADE`,
          placeholderColor: `#47ADAD`,
          backgroundColor: `#32AA88`,
          radius: 0,
          border: null,
        },
        disabledValid: {
          textColor: `#AE2195`,
          placeholderColor: `#FFAAEE`,
          backgroundColor: `#772728`,
          radius: 0,
          border: null,
        },
        disabledInvalid: {
          textColor: `#340297`,
          placeholderColor: `#233832`,
          backgroundColor: `#938837`,
          radius: 0,
          border: null,
        },
      },
      multiLine: false,
      autoComplete: `off`,
      keyboardType: `default`,
      autoFocus: true,
      keepFocusOnSubmit: true,
    },
  });

  expect(inputType.inputComponent.stringify(`Example Text`)).toEqual(
    `Example Text`
  );

  expect(inputType.inputComponent.tryParse(``)).toEqual(``);
  expect(inputType.inputComponent.tryParse(`   \n     \r     \t    `)).toEqual(
    ``
  );
  expect(
    inputType.inputComponent.tryParse(
      `   \n     \r     \t     \n  Example Text   \n \r    \t `
    )
  ).toEqual(`Example Text`);

  renderer.unmount();
  expect(onChange).not.toHaveBeenCalled();
  expect(close).not.toHaveBeenCalled();
  expect(stub).not.toHaveBeenCalled();
});

test(`renders as expected without vertical padding`, () => {
  const Component = createSearchableMultiSelectChildrenComponent<TestValue>({
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 0,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 5,
      border: {
        width: 4,
        color: `#FF00FF`,
      },
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 6,
        color: `#9A9A8E`,
      },
    },
    focusedValid: {
      textColor: `#55EA13`,
      placeholderColor: `#273346`,
      backgroundColor: `#CABA99`,
      radius: 3,
      border: {
        width: 5,
        color: `#646464`,
      },
    },
    focusedInvalid: {
      textColor: `#ABAADE`,
      placeholderColor: `#47ADAD`,
      backgroundColor: `#32AA88`,
      radius: 47,
      border: {
        width: 12,
        color: `#98ADAA`,
      },
    },
    disabledValid: {
      textColor: `#AE2195`,
      placeholderColor: `#FFAAEE`,
      backgroundColor: `#772728`,
      radius: 100,
      border: {
        width: 14,
        color: `#5E5E5E`,
      },
    },
    disabledInvalid: {
      textColor: `#340297`,
      placeholderColor: `#233832`,
      backgroundColor: `#938837`,
      radius: 2,
      border: {
        width: 19,
        color: `#573829`,
      },
    },
  });
  const onChange = jest.fn();
  const close = jest.fn();
  const stub = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option D Label`,
        },
        {
          value: 40,
          label: `Example Option F Label`,
        },
        {
          value: 110,
          label: `Example Option H Label`,
        },
        {
          value: 90,
          label: `Example Option G Label`,
        },
        {
          value: 60,
          label: `Example Option B Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ]}
      values={[50, 20, 10, 30]}
      placeholder="Example Placeholder"
      onChange={onChange}
      close={close}
      noMatchesText="Example No Matches Text"
    />
  );

  expect(renderer.toTree()?.rendered).toMatchObject({
    type: View,
    props: {
      style: { flex: 1 },
      children: [
        expect.objectContaining({
          type: FlatList,
          props: {
            inverted: true,
            data: [
              {
                value: 10,
                label: `Example Option A Label`,
              },
              {
                value: 60,
                label: `Example Option B Label`,
              },
              {
                value: 30,
                label: `Example Option C Label`,
              },
              {
                value: 20,
                label: `Example Option D Label`,
              },
              {
                value: 40,
                label: `Example Option F Label`,
              },
              {
                value: 90,
                label: `Example Option G Label`,
              },
              {
                value: 110,
                label: `Example Option H Label`,
              },
            ],
            keyExtractor: expect.any(Function),
            renderItem: expect.any(Function),
            keyboardShouldPersistTaps: `handled`,
            ListEmptyComponent: expect.objectContaining({
              type: Text,
              props: {
                style: {
                  fontFamily: `Example Font Family`,
                  fontSize: 37,
                  lineHeight: 51.8,
                  color: `#273346`,
                  paddingHorizontal: 29,
                },
                children: `Example No Matches Text`,
              },
            }),
          },
        }),
        expect.objectContaining({
          props: {
            leftIcon: null,
            rightIcon: null,
            value: ``,
            onChange: expect.any(Function),
            secureTextEntry: false,
            disabled: false,
            placeholder: `Example Placeholder`,
            onSubmit: expect.any(Function),
            context: null,
          },
        }),
      ],
    },
  });

  const flatListProps: FlatListProps<unknown> = (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props[`children`][0].props;

  expect(
    (flatListProps.keyExtractor as (item: unknown, index: number) => string)(
      {
        value: 30,
        label: `Example Label`,
      },
      123
    )
  ).toEqual(`30`);

  const unselectedItem = (flatListProps.renderItem as ListRenderItem<unknown>)({
    item: {
      value: 40,
      label: `Example Label`,
    },
    index: 123,
    separators: {
      highlight: stub,
      unhighlight: stub,
      updateProps: stub,
    },
  });

  expect(unselectedItem).toMatchObject({
    type: Hitbox,
    props: {
      disabled: false,
      onPress: expect.any(Function),
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 37,
            lineHeight: 51.8,
            color: `#FFEE00`,
            paddingHorizontal: 29,
          },
          children: [
            expect.objectContaining({
              type: Text,
              props: {
                style: { color: `transparent` },
                children: `✓`,
              },
            }),
            ` `,
            `Example Label`,
          ],
        },
      }),
    },
  });

  const selectedItem = (flatListProps.renderItem as ListRenderItem<unknown>)({
    item: {
      value: 30,
      label: `Example Label`,
    },
    index: 123,
    separators: {
      highlight: stub,
      unhighlight: stub,
      updateProps: stub,
    },
  });

  expect(selectedItem).toMatchObject({
    type: Hitbox,
    props: {
      disabled: false,
      onPress: expect.any(Function),
      children: expect.objectContaining({
        type: Text,
        props: {
          style: {
            fontFamily: `Example Font Family`,
            fontSize: 37,
            lineHeight: 51.8,
            color: `#55EA13`,
            paddingHorizontal: 29,
          },
          children: [
            expect.objectContaining({
              type: Text,
              props: {
                style: { color: `#55EA13` },
                children: `✓`,
              },
            }),
            ` `,
            `Example Label`,
          ],
        },
      }),
    },
  });

  const inputType = (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props[`children`][1].type;

  expect(inputType).toBeAFunctionWithTheStaticProperties({
    inputComponent: {
      stringify: expect.any(Function),
      tryParse: expect.any(Function),
      controlStyle: {
        fontFamily: `Example Font Family`,
        fontSize: 37,
        paddingHorizontal: 29,
        blurredValid: {
          textColor: `#FFEE00`,
          placeholderColor: `#E7AA32`,
          backgroundColor: `#32AE12`,
          radius: 0,
          border: null,
        },
        blurredInvalid: {
          textColor: `#99FE88`,
          placeholderColor: `#CACA3A`,
          backgroundColor: `#259284`,
          radius: 0,
          border: null,
        },
        focusedValid: {
          textColor: `#55EA13`,
          placeholderColor: `#273346`,
          backgroundColor: `#CABA99`,
          radius: 0,
          border: null,
        },
        focusedInvalid: {
          textColor: `#ABAADE`,
          placeholderColor: `#47ADAD`,
          backgroundColor: `#32AA88`,
          radius: 0,
          border: null,
        },
        disabledValid: {
          textColor: `#AE2195`,
          placeholderColor: `#FFAAEE`,
          backgroundColor: `#772728`,
          radius: 0,
          border: null,
        },
        disabledInvalid: {
          textColor: `#340297`,
          placeholderColor: `#233832`,
          backgroundColor: `#938837`,
          radius: 0,
          border: null,
        },
      },
      multiLine: false,
      autoComplete: `off`,
      keyboardType: `default`,
      autoFocus: true,
      keepFocusOnSubmit: true,
    },
  });

  expect(inputType.inputComponent.stringify(`Example Text`)).toEqual(
    `Example Text`
  );

  expect(inputType.inputComponent.tryParse(``)).toEqual(``);
  expect(inputType.inputComponent.tryParse(`   \n     \r     \t    `)).toEqual(
    ``
  );
  expect(
    inputType.inputComponent.tryParse(
      `   \n     \r     \t     \n  Example Text   \n \r    \t `
    )
  ).toEqual(`Example Text`);

  renderer.unmount();
  expect(onChange).not.toHaveBeenCalled();
  expect(close).not.toHaveBeenCalled();
  expect(stub).not.toHaveBeenCalled();
});

test(`does nothing when user input is invalid`, () => {
  const Component = createSearchableMultiSelectChildrenComponent<TestValue>({
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 0,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 5,
      border: {
        width: 4,
        color: `#FF00FF`,
      },
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 6,
        color: `#9A9A8E`,
      },
    },
    focusedValid: {
      textColor: `#55EA13`,
      placeholderColor: `#273346`,
      backgroundColor: `#CABA99`,
      radius: 3,
      border: {
        width: 5,
        color: `#646464`,
      },
    },
    focusedInvalid: {
      textColor: `#ABAADE`,
      placeholderColor: `#47ADAD`,
      backgroundColor: `#32AA88`,
      radius: 47,
      border: {
        width: 12,
        color: `#98ADAA`,
      },
    },
    disabledValid: {
      textColor: `#AE2195`,
      placeholderColor: `#FFAAEE`,
      backgroundColor: `#772728`,
      radius: 100,
      border: {
        width: 14,
        color: `#5E5E5E`,
      },
    },
    disabledInvalid: {
      textColor: `#340297`,
      placeholderColor: `#233832`,
      backgroundColor: `#938837`,
      radius: 2,
      border: {
        width: 19,
        color: `#573829`,
      },
    },
  });
  const onChange = jest.fn();
  const close = jest.fn();
  const stub = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      options={[
        {
          value: 10,
          label: `Example Option A Label`,
        },
        {
          value: 20,
          label: `Example Option D Label`,
        },
        {
          value: 40,
          label: `Example Option F Label`,
        },
        {
          value: 110,
          label: `Example Option H Label`,
        },
        {
          value: 90,
          label: `Example Option G Label`,
        },
        {
          value: 60,
          label: `Example Option B Label`,
        },
        {
          value: 30,
          label: `Example Option C Label`,
        },
      ]}
      values={[50, 20, 10, 30]}
      placeholder="Example Placeholder"
      onChange={onChange}
      close={close}
      noMatchesText="Example No Matches Text"
    />
  );

  (
    (renderer.toTree() as TestRenderer.ReactTestRendererTree)
      .rendered as TestRenderer.ReactTestRendererTree
  ).props[`children`][1].props.onChange(undefined);

  renderer.unmount();
  expect(onChange).not.toHaveBeenCalled();
  expect(close).not.toHaveBeenCalled();
  expect(stub).not.toHaveBeenCalled();
});
