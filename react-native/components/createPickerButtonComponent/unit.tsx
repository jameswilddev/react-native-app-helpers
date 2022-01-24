import * as React from "react";
import { TextInput } from "react-native";
import * as TestRenderer from "react-test-renderer";
import {
  createPickerButtonComponent,
  SvgIcon,
  unwrapRenderedFunctionComponent,
} from "../../..";
import { Hitbox } from "../Hitbox";

test(`renders as expected when valid`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      valid
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#FFEE00`,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#E7AA32`,
              pointerEvents: `none`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders as expected when invalid`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      label={null}
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      valid={false}
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#259284`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 6,
          borderColor: `#9A9A8E`,
          borderRadius: 10,
          margin: -2,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#99FE88`,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: undefined,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#CACA3A`,
              pointerEvents: `none`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders as expected when disabled when valid`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      disabled
      placeholder="Test Placeholder"
      valid
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#772728`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 14,
          borderColor: `#5E5E5E`,
          borderRadius: 100,
          margin: -10,
        },
        onPress,
        onMeasure,
        disabled: true,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#AE2195`,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#FFAAEE`,
              pointerEvents: `none`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders as expected when disabled when invalid`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      label={null}
      onPress={onPress}
      disabled
      placeholder="Test Placeholder"
      valid={false}
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#938837`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 19,
          borderColor: `#573829`,
          borderRadius: 2,
          margin: -15,
        },
        onPress,
        onMeasure,
        disabled: true,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#340297`,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: undefined,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#233832`,
              pointerEvents: `none`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders as expected when the border width does not change`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 4,
        color: `#9A9A8E`,
      },
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      label={null}
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      valid={false}
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: expect.objectContaining({
        style: {
          backgroundColor: `#259284`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#9A9A8E`,
          borderRadius: 10,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#99FE88`,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: undefined,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#CACA3A`,
              pointerEvents: `none`,
            },
          }),
        ],
      }),
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders with a left icon`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();
  const LeftIcon: SvgIcon = () => null;

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      valid
      leftIcon={LeftIcon}
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: LeftIcon,
            props: {
              fill: `#43AE21`,
            },
          }),
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#FFEE00`,
                paddingLeft: 29,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#E7AA32`,
              pointerEvents: `none`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders with a right icon`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();
  const RightIcon: SvgIcon = () => null;

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      rightIcon={RightIcon}
      valid
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#FFEE00`,
                paddingRight: 29,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#E7AA32`,
              pointerEvents: `none`,
            },
          }),
          expect.objectContaining({
            type: RightIcon,
            props: {
              fill: `#43AE21`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders with left and right icons`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();
  const LeftIcon: SvgIcon = () => null;
  const RightIcon: SvgIcon = () => null;

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={LeftIcon}
      rightIcon={RightIcon}
      valid
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: LeftIcon,
            props: {
              fill: `#43AE21`,
            },
          }),
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#FFEE00`,
                paddingHorizontal: 29,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#E7AA32`,
              pointerEvents: `none`,
            },
          }),
          expect.objectContaining({
            type: RightIcon,
            props: {
              fill: `#43AE21`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders as expected with a left icon when invalid`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();
  const LeftIcon: SvgIcon = () => null;

  const renderer = TestRenderer.create(
    <Component
      label={null}
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={LeftIcon}
      valid={false}
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#259284`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 6,
          borderColor: `#9A9A8E`,
          borderRadius: 10,
          margin: -2,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: LeftIcon,
            props: {
              fill: `#985E00`,
            },
          }),
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#99FE88`,
                paddingVertical: 12,
                paddingLeft: 29,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: undefined,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#CACA3A`,
              pointerEvents: `none`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders as expected with a right icon when invalid`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();
  const RightIcon: SvgIcon = () => null;

  const renderer = TestRenderer.create(
    <Component
      label={null}
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      rightIcon={RightIcon}
      valid={false}
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#259284`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 6,
          borderColor: `#9A9A8E`,
          borderRadius: 10,
          margin: -2,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#99FE88`,
                paddingVertical: 12,
                paddingRight: 29,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: undefined,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#CACA3A`,
              pointerEvents: `none`,
            },
          }),
          expect.objectContaining({
            type: RightIcon,
            props: {
              fill: `#985E00`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders as expected with left and right icons when invalid`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();
  const LeftIcon: SvgIcon = () => null;
  const RightIcon: SvgIcon = () => null;

  const renderer = TestRenderer.create(
    <Component
      label={null}
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      valid={false}
      leftIcon={LeftIcon}
      rightIcon={RightIcon}
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#259284`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 6,
          borderColor: `#9A9A8E`,
          borderRadius: 10,
          margin: -2,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: LeftIcon,
            props: {
              fill: `#985E00`,
            },
          }),
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#99FE88`,
                paddingVertical: 12,
                paddingHorizontal: 29,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: undefined,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#CACA3A`,
              pointerEvents: `none`,
            },
          }),
          expect.objectContaining({
            type: RightIcon,
            props: {
              fill: `#985E00`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders without horizontal padding`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      valid
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#FFEE00`,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#E7AA32`,
              pointerEvents: `none`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders with a left icon without horizontal padding`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();
  const LeftIcon: SvgIcon = () => null;

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={LeftIcon}
      valid
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: expect.objectContaining({
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: LeftIcon,
            props: {
              fill: `#43AE21`,
            },
          }),
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#FFEE00`,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#E7AA32`,
              pointerEvents: `none`,
            },
          }),
        ],
      }),
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders with a right icon without horizontal padding`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();
  const RightIcon: SvgIcon = () => null;

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      rightIcon={RightIcon}
      valid
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#FFEE00`,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#E7AA32`,
              pointerEvents: `none`,
            },
          }),
          expect.objectContaining({
            type: RightIcon,
            props: {
              fill: `#43AE21`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders with left and right icons without horizontal padding`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();
  const LeftIcon: SvgIcon = () => null;
  const RightIcon: SvgIcon = () => null;

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      leftIcon={LeftIcon}
      rightIcon={RightIcon}
      valid
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: LeftIcon,
            props: {
              fill: `#43AE21`,
            },
          }),
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#FFEE00`,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#E7AA32`,
              pointerEvents: `none`,
            },
          }),
          expect.objectContaining({
            type: RightIcon,
            props: {
              fill: `#43AE21`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders as expected without vertical padding`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      valid
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#FFEE00`,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#E7AA32`,
              pointerEvents: `none`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders as expected without borders`, () => {
  const Component = createPickerButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 5,
      border: null,
      iconColor: `#43AE21`,
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: null,
      iconColor: `#985E00`,
    },
    focusedValid: {
      textColor: `#55EA13`,
      placeholderColor: `#273346`,
      backgroundColor: `#CABA99`,
      radius: 3,
      border: null,
      iconColor: `#789521`,
    },
    focusedInvalid: {
      textColor: `#ABAADE`,
      placeholderColor: `#47ADAD`,
      backgroundColor: `#32AA88`,
      radius: 47,
      border: null,
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      valid
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderRadius: 5,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#FFEE00`,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#E7AA32`,
              pointerEvents: `none`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders as expected when a state does not alter border thickness`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
    },
    blurredInvalid: {
      textColor: `#99FE88`,
      placeholderColor: `#CACA3A`,
      backgroundColor: `#259284`,
      radius: 10,
      border: {
        width: 4,
        color: `#9A9A8E`,
      },
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      label={null}
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      valid={false}
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#259284`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#9A9A8E`,
          borderRadius: 10,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#99FE88`,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: undefined,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#CACA3A`,
              pointerEvents: `none`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders as expected without a radius`, () => {
  const Component = createPickerButtonComponent({
    fontFamily: `Example Font Family`,
    fontSize: 37,
    paddingVertical: 12,
    paddingHorizontal: 29,
    blurredValid: {
      textColor: `#FFEE00`,
      placeholderColor: `#E7AA32`,
      backgroundColor: `#32AE12`,
      radius: 0,
      border: {
        width: 4,
        color: `#FF00FF`,
      },
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      valid
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#FF00FF`,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#FFEE00`,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#E7AA32`,
              pointerEvents: `none`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders when disabled with a left icon`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();
  const LeftIcon: SvgIcon = () => null;

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      disabled
      placeholder="Test Placeholder"
      leftIcon={LeftIcon}
      valid
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#772728`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 14,
          borderColor: `#5E5E5E`,
          borderRadius: 100,
          margin: -10,
        },
        onPress,
        onMeasure,
        disabled: true,
        children: [
          expect.objectContaining({
            type: LeftIcon,
            props: {
              fill: `#ADAADA`,
            },
          }),
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#AE2195`,
                paddingLeft: 29,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#FFAAEE`,
              pointerEvents: `none`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders when disabled with a right icon`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();
  const RightIcon: SvgIcon = () => null;

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      disabled
      placeholder="Test Placeholder"
      rightIcon={RightIcon}
      valid
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#772728`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 14,
          borderColor: `#5E5E5E`,
          borderRadius: 100,
          margin: -10,
        },
        onPress,
        onMeasure,
        disabled: true,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#AE2195`,
                paddingRight: 29,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#FFAAEE`,
              pointerEvents: `none`,
            },
          }),
          expect.objectContaining({
            type: RightIcon,
            props: {
              fill: `#ADAADA`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders when disabled with left and right icons`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();
  const LeftIcon: SvgIcon = () => null;
  const RightIcon: SvgIcon = () => null;

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      disabled
      placeholder="Test Placeholder"
      leftIcon={LeftIcon}
      rightIcon={RightIcon}
      valid
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#772728`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 14,
          borderColor: `#5E5E5E`,
          borderRadius: 100,
          margin: -10,
        },
        onPress,
        onMeasure,
        disabled: true,
        children: [
          expect.objectContaining({
            type: LeftIcon,
            props: {
              fill: `#ADAADA`,
            },
          }),
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#AE2195`,
                paddingHorizontal: 29,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#FFAAEE`,
              pointerEvents: `none`,
            },
          }),
          expect.objectContaining({
            type: RightIcon,
            props: {
              fill: `#ADAADA`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders as expected when disabled with a left icon when invalid`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();
  const LeftIcon: SvgIcon = () => null;

  const renderer = TestRenderer.create(
    <Component
      label={null}
      onPress={onPress}
      disabled
      placeholder="Test Placeholder"
      leftIcon={LeftIcon}
      valid={false}
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#938837`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 19,
          borderColor: `#573829`,
          borderRadius: 2,
          margin: -15,
        },
        onPress,
        onMeasure,
        disabled: true,
        children: [
          expect.objectContaining({
            type: LeftIcon,
            props: {
              fill: `#709709`,
            },
          }),
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#340297`,
                paddingVertical: 12,
                paddingLeft: 29,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: undefined,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#233832`,
              pointerEvents: `none`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders as expected when disabled with a right icon when invalid`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();
  const RightIcon: SvgIcon = () => null;

  const renderer = TestRenderer.create(
    <Component
      label={null}
      onPress={onPress}
      disabled
      placeholder="Test Placeholder"
      rightIcon={RightIcon}
      valid={false}
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#938837`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 19,
          borderColor: `#573829`,
          borderRadius: 2,
          margin: -15,
        },
        onPress,
        onMeasure,
        disabled: true,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#340297`,
                paddingVertical: 12,
                paddingRight: 29,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: undefined,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#233832`,
              pointerEvents: `none`,
            },
          }),
          expect.objectContaining({
            type: RightIcon,
            props: {
              fill: `#709709`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`renders as expected when disabled with left and right icons when invalid`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();
  const LeftIcon: SvgIcon = () => null;
  const RightIcon: SvgIcon = () => null;

  const renderer = TestRenderer.create(
    <Component
      label={null}
      onPress={onPress}
      disabled
      placeholder="Test Placeholder"
      leftIcon={LeftIcon}
      rightIcon={RightIcon}
      valid={false}
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#938837`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 19,
          borderColor: `#573829`,
          borderRadius: 2,
          margin: -15,
        },
        onPress,
        onMeasure,
        disabled: true,
        children: [
          expect.objectContaining({
            type: LeftIcon,
            props: {
              fill: `#709709`,
            },
          }),
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#340297`,
                paddingVertical: 12,
                paddingHorizontal: 29,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: undefined,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#233832`,
              pointerEvents: `none`,
            },
          }),
          expect.objectContaining({
            type: RightIcon,
            props: {
              fill: `#709709`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`allows introspection when used in a higher-order component`, () => {
  const controlStyle = {
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  };
  const InputComponent = createPickerButtonComponent(controlStyle);
  const onPress = jest.fn();
  const onMeasure = jest.fn();
  const ParentComponent = () => (
    <InputComponent
      label="Example Label"
      onPress={onPress}
      disabled={false}
      placeholder="Test Placeholder"
      valid
      onMeasure={onMeasure}
    />
  );

  const rendered = <ParentComponent />;

  expect(
    unwrapRenderedFunctionComponent(rendered).type
  ).toBeAFunctionWithTheStaticProperties({
    pickerButton: {
      controlStyle,
    },
  });
});

test(`treats disabled missing as disabled false`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      placeholder="Test Placeholder"
      valid
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#FFEE00`,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#E7AA32`,
              pointerEvents: `none`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});

test(`treats disabled undefined as disabled false`, () => {
  const Component = createPickerButtonComponent({
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
      iconColor: `#43AE21`,
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
      iconColor: `#985E00`,
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
      iconColor: `#789521`,
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
      iconColor: `#449438`,
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
      iconColor: `#ADAADA`,
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
      iconColor: `#709709`,
    },
  });
  const onPress = jest.fn();
  const onMeasure = jest.fn();

  const renderer = TestRenderer.create(
    <Component
      label="Example Label"
      onPress={onPress}
      disabled={undefined}
      placeholder="Test Placeholder"
      valid
      onMeasure={onMeasure}
    />
  );

  expect(renderer.toTree()?.rendered).toEqual(
    expect.objectContaining({
      nodeType: `component`,
      type: Hitbox,
      props: {
        style: {
          backgroundColor: `#32AE12`,
          flexDirection: `row`,
          alignItems: `center`,
          paddingHorizontal: 29,
          borderWidth: 4,
          borderColor: `#FF00FF`,
          borderRadius: 5,
        },
        onPress,
        onMeasure,
        disabled: false,
        children: [
          expect.objectContaining({
            type: TextInput,
            props: {
              style: {
                flexGrow: 1,
                color: `#FFEE00`,
                paddingVertical: 12,
                fontFamily: `Example Font Family`,
                fontSize: 37,
              },
              value: `Example Label`,
              editable: false,
              placeholder: `Test Placeholder`,
              placeholderTextColor: `#E7AA32`,
              pointerEvents: `none`,
            },
          }),
        ],
      },
    })
  );

  renderer.unmount();

  expect(onPress).not.toHaveBeenCalled();
  expect(onMeasure).not.toHaveBeenCalled();
});
